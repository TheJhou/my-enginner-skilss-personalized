import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, '..');
const expectedSkills = [
  'backend',
  'code-review',
  'database',
  'development-workflow',
  'frontend-engineering',
  'ui-ux-responsive',
  'security',
  'testing',
];
const requiredFiles = [
  'README.md',
  'memoryAgente.md',
  'scripts/validate-skills.mjs',
  '.github/workflows/validate-skills.yml',
];
const errors = [];
const names = new Map();

function report(file, reason) {
  errors.push({ file, reason });
}

async function exists(relativePath) {
  try {
    await stat(path.join(rootDirectory, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function inspectStructure() {
  for (const requiredFile of requiredFiles) {
    if (!(await exists(requiredFile))) {
      report(requiredFile, 'arquivo obrigatório ausente');
    }
  }

  const skillsPath = path.join(rootDirectory, 'skills');
  let skillEntries;

  try {
    skillEntries = await readdir(skillsPath, { withFileTypes: true });
  } catch {
    report('skills/', 'diretório obrigatório ausente ou ilegível');
    return;
  }

  const actualDirectories = skillEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const entry of skillEntries) {
    if (!entry.isDirectory()) {
      report('skills/' + entry.name, 'skills/ deve conter somente diretórios de skills');
    }
  }
  const expectedSet = new Set(expectedSkills);

  for (const skillName of expectedSkills) {
    if (!actualDirectories.includes(skillName)) {
      report('skills/' + skillName + '/', 'diretório de skill esperado ausente');
    }
  }

  for (const directoryName of actualDirectories) {
    if (!expectedSet.has(directoryName)) {
      report('skills/' + directoryName + '/', 'diretório de skill não previsto');
    }
  }

  const seenDirectoryNames = new Set();

  for (const directoryName of actualDirectories) {
    const normalizedName = directoryName.toLowerCase();

    if (seenDirectoryNames.has(normalizedName)) {
      report(
        'skills/' + directoryName + '/',
        'diretório duplicado por diferença de maiúsculas/minúsculas',
      );
    }

    seenDirectoryNames.add(normalizedName);
  }

  for (const skillName of expectedSkills) {
    const skillDirectory = path.join(skillsPath, skillName);
    let entries;

    try {
      entries = await readdir(skillDirectory, { withFileTypes: true });
    } catch {
      continue;
    }

    if (entries.length !== 1 || entries[0]?.name !== 'SKILL.md' || !entries[0].isFile()) {
      report(
        'skills/' + skillName + '/',
        'cada diretório deve conter somente o arquivo principal SKILL.md',
      );
    }
  }

  for (const legacyDirectory of ['skils', 'frontend']) {
    if (await exists(legacyDirectory)) {
      report(legacyDirectory, 'diretório antigo ainda existe após a migração');
    }
  }
}

function parseFrontmatter(file, content, expectedFolder) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    report(file, 'frontmatter YAML ausente ou sem delimitadores corretos');
    return;
  }

  const lines = match[1].split(/\r?\n/);
  const fields = new Map();

  for (const line of lines) {
    if (line.trim() === '') {
      continue;
    }

    const separator = line.indexOf(':');

    if (separator < 1) {
      report(file, 'linha de frontmatter inválida: ' + line);
      continue;
    }

    const key = line.slice(0, separator);
    const rawValue = line.slice(separator + 1).trim();

    if (!['name', 'description'].includes(key)) {
      report(file, 'propriedade não permitida no frontmatter: ' + key);
      continue;
    }

    if (fields.has(key)) {
      report(file, 'propriedade duplicada no frontmatter: ' + key);
      continue;
    }

    fields.set(key, rawValue);
  }

  if (!fields.has('name')) {
    report(file, 'campo obrigatório name ausente');
  }

  if (!fields.has('description')) {
    report(file, 'campo obrigatório description ausente');
  }

  if (fields.size !== 2) {
    report(file, 'frontmatter deve conter exatamente name e description');
  }

  const rawName = fields.get('name');

  if (rawName !== undefined) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawName) || rawName.length > 64) {
      report(file, 'name deve usar letras minúsculas, números e hífens simples, com até 64 caracteres');
    }

    if (rawName !== expectedFolder) {
      report(file, 'name "' + rawName + '" deve corresponder à pasta "' + expectedFolder + '"');
    }

    if (names.has(rawName)) {
      report(file, 'name duplicado: ' + rawName + ' (também usado em ' + names.get(rawName) + ')');
    } else {
      names.set(rawName, file);
    }
  }

  const rawDescription = fields.get('description');

  if (rawDescription !== undefined) {
    let description;

    try {
      // JSON double-quoted strings are a deliberately strict valid subset of YAML scalars.
      description = JSON.parse(rawDescription);
    } catch {
      report(file, 'description deve ser uma string YAML entre aspas duplas válidas');
      return;
    }

    if (typeof description !== 'string' || description.trim().length === 0) {
      report(file, 'description deve ser uma string não vazia');
      return;
    }

    if (description.length > 1024) {
      report(file, 'description excede o limite de 1024 caracteres da especificação Agent Skills');
    }

    if (!/\buse\b/i.test(description)) {
      report(file, 'description deve indicar quando a skill deve ser usada');
    }
  }
}

async function markdownFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const relativePath = path.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(absolutePath, relativePath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(relativePath);
    }
  }

  return files;
}

function checkCodeFences(file, lines) {
  const backtick = String.fromCharCode(96);
  const fencePattern = new RegExp('^ {0,3}([' + backtick + '~]{3,})(.*)$');
  const closingPattern = new RegExp('^ {0,3}([' + backtick + '~]+)[ \\t]*$');
  let openFence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fence = line.match(fencePattern);

    if (!openFence && fence) {
      const marker = fence[1][0];

      if (marker === backtick && fence[2].includes(backtick)) {
        report(file, 'cerca de código inválida na linha ' + (index + 1));
        continue;
      }

      openFence = { marker, length: fence[1].length, line: index + 1 };
      continue;
    }

    if (openFence) {
      const closing = line.match(closingPattern);

      if (
        closing &&
        closing[1][0] === openFence.marker &&
        closing[1].length >= openFence.length
      ) {
        openFence = null;
      }
    }
  }

  if (openFence) {
    report(file, 'bloco de código iniciado na linha ' + openFence.line + ' não foi fechado');
  }
}

async function checkMarkdown(file) {
  const absolutePath = path.join(rootDirectory, file);
  let content;

  try {
    content = await readFile(absolutePath, 'utf8');
  } catch (error) {
    report(file, 'não foi possível ler o arquivo: ' + error.message);
    return;
  }

  if (content.trim().length === 0) {
    report(file, 'documento vazio');
    return;
  }

  const normalized = file.split(path.sep).join('/');
  const isSkill = normalized.startsWith('skills/');
  const expectedFolder = isSkill ? normalized.split('/')[1] : undefined;

  if (isSkill) {
    parseFrontmatter(normalized, content, expectedFolder);
  }

  const lines = content.split(/\r?\n/);

  if (!lines.some((line) => /^#{1,6}\s+\S/.test(line))) {
    report(normalized, 'documento não contém títulos Markdown');
  }

  checkCodeFences(normalized, lines);

  const headings = [];

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,6})\s+\S/);

    if (heading) {
      headings.push({ line: index, level: heading[1].length });
    }
  }

  for (let index = 0; index < headings.length; index += 1) {
    const current = headings[index];

    if (current.level === 1) {
      continue;
    }

    const start = current.line + 1;
    const nextSibling = headings
      .slice(index + 1)
      .find((heading) => heading.level <= current.level);
    const end = nextSibling?.line ?? lines.length;
    const sectionContent = lines.slice(start, end).some((line) => line.trim() !== '');

    if (!sectionContent) {
      report(normalized, 'seção sem conteúdo na linha ' + (current.line + 1));
    }
  }

  if (/(?:^|\n)\s*(?:TODO|TBD|FIXME|PLACEHOLDER|LOREM IPSUM)\b/i.test(content)) {
    report(normalized, 'marcador provisório sem resolução');
  }

  const knownTruncationFragments = [
    'Não introduza uma camada de repository artificial se',
    'Condições não contempl',
    'o mínimo geral de',
    'Never store',
    '- Prote\n',
  ];

  for (const fragment of knownTruncationFragments) {
    if (content.includes(fragment)) {
      report(normalized, 'fragmento de truncamento conhecido: "' + fragment.trim() + '"');
    }
  }

  const lowerContent = content.toLowerCase();

  if (
    lowerContent.includes('skils/') ||
    lowerContent.includes('skils\\') ||
    /(?:^|[\s(])frontend[\\/]/i.test(content) ||
    lowerContent.includes('testing-strategy')
  ) {
    report(normalized, 'referência a caminho ou identificador antigo');
  }

  const rawLinks = [...content.matchAll(/\[[^\]\n]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];
  const linkStarts = content.match(/\]\(/g) ?? [];

  if (rawLinks.length !== linkStarts.length) {
    report(normalized, 'um ou mais links Markdown têm formato inválido');
  }

  for (const link of rawLinks) {
    const target = link[1];

    if (/^https?:\/\//i.test(target)) {
      try {
        const parsed = new URL(target);

        if (!['http:', 'https:'].includes(parsed.protocol)) {
          report(normalized, 'protocolo de link não permitido: ' + target);
        }
      } catch {
        report(normalized, 'URL inválida: ' + target);
      }

      continue;
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) {
      continue;
    }

    const localPath = decodeURIComponent(target.split('#')[0].split('?')[0]);
    const resolvedPath = path.resolve(path.dirname(absolutePath), localPath);

    try {
      await stat(resolvedPath);
    } catch {
      report(normalized, 'referência local não encontrada: ' + target);
    }
  }
}

async function main() {
  await inspectStructure();

  const files = await markdownFiles(rootDirectory);
  const expectedSkillFiles = expectedSkills.map((name) => 'skills/' + name + '/SKILL.md');

  for (const expectedFile of expectedSkillFiles) {
    if (!files.some((file) => file.split(path.sep).join('/') === expectedFile)) {
      report(expectedFile, 'arquivo principal SKILL.md ausente');
    }
  }

  for (const file of files) {
    await checkMarkdown(file);
  }

  if (errors.length > 0) {
    for (const error of errors) {
      process.stderr.write('ERRO ' + error.file + ': ' + error.reason + '\n');
    }

    process.stderr.write(
      '\nValidação reprovada: ' +
        errors.length +
        ' erro(s) encontrado(s) em ' +
        files.length +
        ' arquivo(s) Markdown.\n',
    );
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    'Validação aprovada: ' +
      expectedSkills.length +
      ' skills e ' +
      files.length +
      ' arquivo(s) Markdown verificados.\n',
  );
}

main().catch((error) => {
  process.stderr.write(
    'Falha inesperada na validação: ' + (error.stack ?? error.message) + '\n',
  );
  process.exitCode = 1;
});
