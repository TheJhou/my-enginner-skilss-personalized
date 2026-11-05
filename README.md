# Skills de engenharia para agentes de desenvolvimento

Biblioteca de instruções reutilizáveis para agentes que ajudam equipes de engenharia de software. O repositório organiza padrões de implementação e qualidade por domínio, para que cada tarefa consulte somente as orientações necessárias.

## Objetivo

O projeto ajuda agentes a trabalhar com consistência em código existente: inspecionar antes de implementar, reutilizar soluções adequadas, preservar arquitetura e contratos, considerar segurança e registrar validações reais. As instruções favorecem mudanças coesas, verificáveis e compatíveis com o contexto do produto, sem impor refatorações ou ferramentas sem justificativa.

O público-alvo são pessoas desenvolvedoras e equipes que configuram agentes de desenvolvimento. Cada skill é material de referência; ela não substitui políticas específicas do projeto, revisão humana exigida, documentação oficial ou julgamento técnico.

## Skills disponíveis

| Skill | Responsabilidade |
|---|---|
| [backend](skills/backend/SKILL.md) | Node.js, TypeScript, APIs, regras de negócio, validação, operações assíncronas e confiabilidade |
| [code-review](skills/code-review/SKILL.md) | Revisão de mudanças baseada em evidências, severidade, regressões e riscos |
| [database](skills/database/SKILL.md) | Modelagem relacional, SQL, integridade, índices, transações e migrations |
| [development-workflow](skills/development-workflow/SKILL.md) | Git, branches, Conventional Commits, pull requests, CI/CD e releases |
| [frontend-engineering](skills/frontend-engineering/SKILL.md) | React, TypeScript, componentes, hooks, estado, APIs, desempenho e testes |
| [ui-ux-responsive](skills/ui-ux-responsive/SKILL.md) | Hierarquia visual, experiência, responsividade e acessibilidade |
| [security](skills/security/SKILL.md) | Threat modeling, autenticação, autorização, proteção de APIs e dados |
| [testing](skills/testing/SKILL.md) | Estratégia e padrões de testes unitários, integração, componentes, API e E2E |

## Estrutura

```text
my-enginner-skilss-personalized/
├── README.md
├── memoryAgente.md
├── skills/
│   ├── backend/
│   │   └── SKILL.md
│   ├── code-review/
│   │   └── SKILL.md
│   ├── database/
│   │   └── SKILL.md
│   ├── development-workflow/
│   │   └── SKILL.md
│   ├── frontend-engineering/
│   │   └── SKILL.md
│   ├── ui-ux-responsive/
│   │   └── SKILL.md
│   ├── security/
│   │   └── SKILL.md
│   └── testing/
│       └── SKILL.md
├── scripts/
│   └── validate-skills.mjs
└── .github/
    └── workflows/
        └── validate-skills.yml
```

## Como utilizar

[`memoryAgente.md`](memoryAgente.md) reúne regras globais e a tabela que indica quais especialidades consultar. Cada `SKILL.md` contém as instruções específicas de um domínio.

1. Leia as instruções globais e identifique as áreas envolvidas na tarefa.
2. Consulte as skills correspondentes; tarefas multidisciplinares podem exigir mais de uma.
3. Mantenha o diretório da skill junto com seu `SKILL.md` para preservar o identificador e os metadados.
4. Revise as instruções especializadas junto às convenções e à documentação do projeto em que o agente vai trabalhar.

## Integração com agentes

Os diretórios seguem o formato aberto Agent Skills: uma pasta por skill, arquivo `SKILL.md` e frontmatter com `name` e `description`. A [especificação Agent Skills](https://agentskills.io/specification) define esse formato e orienta que a descrição explique o que a skill faz e quando usá-la.

A compatibilidade e a descoberta variam entre ferramentas. Consulte a documentação oficial do agente escolhido para saber como disponibilizar skills: alguns ambientes podem aceitar um caminho, outros podem exigir instalação ou configuração explícita. Não presuma que um agente detectará automaticamente `skills/`.

`memoryAgente.md` é uma convenção global deste repositório, fora do formato obrigatório de uma skill. Configure o agente para ler esse arquivo separadamente, se o ambiente oferecer instruções globais ou contexto de projeto. A disponibilidade desse arquivo não significa que toda ferramenta o carregará automaticamente.

Para reduzir contexto desnecessário, disponibilize primeiro as regras globais e carregue somente as skills relacionadas à tarefa. Se a ferramenta não fizer seleção automática, indique os diretórios relevantes manualmente. Ao atualizar uma skill, confira também suas referências cruzadas e a seleção em `memoryAgente.md`.

## Validação local e CI

A validação é somente leitura e usa APIs nativas do Node.js:

```sh
node scripts/validate-skills.mjs
```

O script verifica a estrutura esperada, frontmatter, conteúdo Markdown, cercas de código, links e referências locais. O validador aceita deliberadamente um subconjunto estrito do YAML com somente as duas propriedades requeridas (`name` e `description`), para validar o formato usado pelo repositório sem depender de um parser incompleto ou de uma dependência adicional.

O GitHub Actions executa a mesma verificação em pull requests e em pushes para `master`.

## Contribuição

- Crie uma branch em inglês no formato `<tipo>/<descrição>`, por exemplo `fix/skill-metadata`.
- Escreva commits em inglês no padrão Conventional Commits, por exemplo `docs(readme): clarify skill integration`.
- Abra pull requests com título em inglês e descrição em português brasileiro.
- Descreva contexto, objetivo, implementação, arquivos relevantes, testes executados, impactos e limitações.
- Execute `node scripts/validate-skills.mjs` antes de pedir revisão.
- Não relate uma validação como concluída se ela não foi executada.
- Siga as regras do repositório de destino e use Squash and Merge somente quando compatível com a política do projeto.
