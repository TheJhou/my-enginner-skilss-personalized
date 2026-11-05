---
name: development-workflow
description: "Define o fluxo de desenvolvimento, Git, branches, Conventional Commits, pull requests, revisão, CI/CD e releases. Use ao planejar, modificar, versionar, integrar ou publicar mudanças em um repositório."
---

# Fluxo de desenvolvimento

## 1. Objetivo

Estabeleça um processo rastreável e consistente para alterações de software. Esta skill orienta Git, branches, commits, pull requests, revisão, integração, tarefas, CI/CD e releases.

Regras específicas do repositório podem complementar ou substituir estas convenções quando forem explícitas e compatíveis com segurança. Consulte o estado real do repositório antes de operar.

## 2. Princípios gerais

1. Inspecione branch, remote e working tree antes de qualquer operação Git.
2. Preserve alterações preexistentes; não descarte, sobrescreva ou reverta mudanças de terceiros sem autorização.
3. Mantenha cada mudança coesa e com objetivo identificável.
4. Siga políticas de branch protection, revisão e CI; não as contorne.
5. Não publique, faça push, merge ou release sem autorização ou solicitação da tarefa.
6. Use inglês para nomes de branch e mensagens de commit.
7. Use título de pull request em inglês e descrição em português brasileiro.
8. Preserve histórico, contratos e rastreabilidade.
9. Não declare um teste ou operação como concluído sem executá-lo.

## 3. Branches

### 3.1 Formato

Use `<tipo>/<descrição>`, com tipo reconhecido e descrição em inglês, minúscula e kebab-case.

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de defeito |
| `hotfix` | Correção crítica de produção |
| `refactor` | Reestruturação interna sem mudança externa pretendida |
| `chore` | Manutenção |
| `docs` | Documentação |
| `test` | Testes |
| `perf` | Desempenho |
| `ci` | CI/CD |
| `build` | Build ou dependências |
| `style` | Formatação sem mudança funcional |

Exemplos: `feat/user-authentication`, `fix/payment-validation`, `refactor/user-service`, `docs/update-readme`.

Não use espaços, nomes pessoais, letras maiúsculas, descrições ambíguas ou tipos não reconhecidos. Antes de criar uma branch, confirme base, status limpo ou mudanças preservadas e ausência de conflito com uma branch existente. Não troque de branch se isso puder comprometer trabalho local.

### 3.2 Preparação da branch

Antes de criá-la:

1. Confirme a branch atual e o estado do working tree.
2. Identifique alterações não commitadas e preserve-as.
3. Confirme a branch de integração principal e a base apropriada.
4. Verifique se a branch escolhida já existe localmente ou no remote.
5. Use o tipo que representa o objetivo principal da tarefa.

Não mude de branch descartando ou sobrescrevendo arquivos. Se a base ou o estado atual não permitir uma troca segura, documente a condição e preserve o trabalho existente.

## 4. Conventional Commits

Use o formato:

`<tipo>(<escopo opcional>): <descrição>`

O escopo é opcional e deve acrescentar contexto útil. Tipos comuns: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`, `build` e `revert`.

Exemplos:

- `feat(auth): implement refresh token rotation`
- `fix(payment): validate account ownership`
- `refactor(api): simplify request validation`
- `docs(readme): document skill selection`
- `test(auth): cover expired sessions`
- `ci(github): validate skill metadata`

Escreva em inglês, no imperativo, com descrição iniciada em minúscula, sem ponto final e preferencialmente até 72 caracteres. Evite mensagens vagas, commits vazios e mudanças sem relação no mesmo commit. Identifique breaking changes, por exemplo `feat(api)!: change response format`, e descreva o impacto no corpo do commit.

Tipos usuais devem refletir o conteúdo do commit: `feat` introduz funcionalidade; `fix` corrige defeito; `refactor` altera estrutura sem intenção de mudar comportamento; `perf` melhora desempenho; `test` altera testes; `docs` muda documentação; `chore` cobre manutenção; `ci` trata automação; `build` trata build/dependências; e `revert` reverte uma mudança anterior. Siga um tipo diferente somente quando a convenção do repositório justificar.

Não use mensagens como `Added login`, `fixing bug`, `Update files` ou `changes`. Quando uma alteração for incompatível, marque o tipo com `!` e inclua uma explicação `BREAKING CHANGE:` no corpo, descrevendo a consequência para consumidores.

## 5. Pull requests

### 5.1 Idioma e título

- Título: inglês, no formato Conventional Commits; inclua escopo quando trouxer contexto.
- Descrição: português brasileiro, em Markdown.
- Branch e commits: inglês.

O título deve explicar a principal alteração, não apenas “update” ou “fix bugs”.

### 5.2 Conteúdo da descrição

Adapte a profundidade ao tamanho da mudança. Inclua as seções aplicáveis:

#### Resumo
Explique o resultado e o objetivo do pull request.

#### Contexto
Descreva o problema, requisito ou motivação.

#### Alterações realizadas
Agrupe mudanças por camada ou módulo e indique arquivos relevantes.

#### Detalhes técnicos
Explique decisões de arquitetura, fluxo de dados, dependências e contratos afetados.

#### Testes realizados
Registre comandos e verificações realmente executados, incluindo testes, type checking, lint ou validação manual. Se não foram executados, diga por quê.

#### Impactos e compatibilidade
Descreva efeitos sobre funcionalidades, APIs, schema, integrações e compatibilidade.

#### Riscos e observações
Registre limitações, rollout, migrações e ações pendentes confirmadas. Não invente riscos.

#### Checklist
- [ ] Implementação concluída.
- [ ] Alterações revisadas.
- [ ] Testes relevantes executados ou limitação registrada.
- [ ] Type checking e lint executados quando aplicáveis.
- [ ] Documentação atualizada quando necessária.
- [ ] Migrations incluídas e avaliadas quando necessárias.
- [ ] Regressões e compatibilidade avaliadas.

Marque itens somente quando verificados. Omita seções não aplicáveis quando isso não causar ambiguidade.

### 5.3 Modelo e exemplo

Use este esqueleto como ponto de partida; remova seções que não se aplicarem e preencha os fatos da alteração real:

```markdown
## Resumo

Descreva o resultado da mudança.

## Contexto

Explique o problema ou requisito.

## Alterações realizadas

- Liste as mudanças por módulo ou responsabilidade.

## Detalhes técnicos

Explique decisões, contratos e impactos técnicos relevantes.

## Testes realizados

- Informe o comando executado e o resultado real.

## Impactos e compatibilidade

Descreva impactos confirmados sobre APIs, dados ou comportamento.

## Riscos e observações

Registre limitações ou condições de implantação conhecidas.

## Checklist

- [ ] Implementação revisada.
- [ ] Validações relevantes executadas ou limitação registrada.
- [ ] Documentação atualizada quando necessária.
```

Exemplo ilustrativo:

```markdown
Título: fix(auth): reject expired refresh tokens

## Resumo

O endpoint de renovação agora rejeita refresh tokens expirados e mantém o contrato de erro existente.

## Contexto

O fluxo aceitava tokens fora da janela de validade em uma condição de borda.

## Alterações realizadas

- Centralizada a verificação de expiração no serviço de autenticação.
- Adicionado cenário de regressão para token expirado.

## Testes realizados

- `npm test -- auth`: executado; registre aqui o resultado verdadeiro.

## Impactos e compatibilidade

Tokens válidos continuam usando o mesmo formato de resposta.
```

O exemplo demonstra estrutura; não copie resultados de teste ou detalhes como se fossem verdadeiros para outro pull request.

## 6. Revisão e integração

Mantenha pull requests focados e fáceis de revisar. Consulte `code-review` para critérios de revisão. Não aprove a própria alteração quando a política exigir revisão independente. Não integre enquanto verificações ou aprovações obrigatórias estiverem pendentes.

Use Squash and Merge como padrão quando a política e a configuração do repositório forem compatíveis. Se houver política diferente, siga-a e informe. O commit final deve ter mensagem Conventional Commit representativa.

Ao integrar, atualize a branch de trabalho quando necessário, resolva conflitos, execute validações, confira CI e aprovações e então use o método autorizado. Squash and Merge consolida commits relacionados em um commit final; mantenha uma mensagem clara e não inclua alterações independentes.

Ao resolver conflitos, examine os dois lados, entenda a intenção, preserve mudanças válidas e execute as verificações relevantes. Não escolha uma versão às cegas nem resolva conflito aceitando um lado completo sem revisão.

## 7. Tarefas e issues

Uma tarefa útil descreve contexto, comportamento esperado, critérios de aceitação e considerações técnicas. Divida objetivos independentes quando facilitar estimativa e revisão. Referencie issues e pull requests relacionados quando existirem.

Estrutura recomendada para uma issue:

- **Título:** resumo conciso.
- **Contexto:** problema ou motivação.
- **Comportamento esperado:** resultado desejado.
- **Critérios de aceitação:** condições observáveis de conclusão.
- **Considerações técnicas:** dependências, limites e impactos conhecidos.

Evite solicitações ambíguas e mantenha o escopo controlado. Quando as informações disponíveis não forem suficientes, registre a incerteza em vez de inventar requisito.

## 8. CI/CD

Inspecione workflows, permissões, segredos, gatilhos e comandos existentes antes de alterar automações. Use permissões mínimas, fixe versões de ações conforme a política do repositório e evite scripts externos sem necessidade. Não exponha segredos, não contorne verificações e documente como uma alteração afeta o pipeline.

## 9. Releases e versionamento

Quando o projeto adotar SemVer, use:

- MAJOR para incompatibilidade.
- MINOR para funcionalidade retrocompatível.
- PATCH para correção retrocompatível.

Antes de publicar, revise mudanças desde a versão anterior, breaking changes, changelog, CI, testes e prontidão de implantação. Não crie ou publique releases sem autorização.

Quando o projeto utiliza releases, confirme a versão alvo, leia o histórico desde a release anterior, identifique incompatibilidades, atualize changelog ou notas quando adotados, confira checks e requisitos de implantação e comunique migrações necessárias. Não crie tag, release ou anúncio sem autorização explícita.

## 10. Proibições

Nunca:

- Faça commit diretamente em branch de integração protegida.
- Use `git reset --hard`, force push ou comandos destrutivos sem autorização explícita e motivo necessário.
- Reescreva histórico compartilhado sem autorização.
- Contorne CI, revisão obrigatória ou branch protection.
- Inclua segredos em commits.
- Apague branches sem confirmar status e propriedade.
- Faça merge sem requisitos atendidos.
- Relate testes ou operações que não foram executados.

## 11. Fluxo de execução do agente

1. **Inspeção:** examine estrutura, branch, working tree, políticas do repositório, arquivos relacionados e convenções.
2. **Análise:** entenda o objetivo, os módulos afetados, dependências, riscos, critérios de aceitação, tipo de branch e validações pertinentes.
3. **Preparação:** confirme branch base, preserve trabalho existente, defina escopo e crie branch quando solicitado ou apropriado.
4. **Implementação:** respeite arquitetura e contratos, evite mudanças alheias e mantenha alterações revisáveis.
5. **Validação:** escolha testes relevantes, execute type checking e lint quando aplicáveis, revise o diff e investigue falhas. Não suponha que um comando ou script existe.
6. **Git:** prepare commits focados e mensagens Conventional Commits; examine o estado antes de cada operação.
7. **Publicação:** faça push e abra pull request quando solicitados ou autorizados. Use título em inglês, descrição em português brasileiro e informe limitações.
8. **Relato:** registre o que foi alterado, arquivos ou módulos relevantes, validações e resultados, branch, commits, PR e pendências.

## 12. Checklist final

- [ ] Convenções e estado do repositório foram inspecionados.
- [ ] Mudanças preexistentes foram preservadas.
- [ ] Branch e commits seguem as convenções.
- [ ] Título do pull request está em inglês e a descrição em português brasileiro.
- [ ] A descrição cobre contexto, implementação, testes, impactos e observações aplicáveis.
- [ ] Alterações estão focadas e rastreáveis.
- [ ] Testes, type checking e lint foram executados quando pertinentes; falhas foram investigadas.
- [ ] Validações não executadas e limitações estão identificadas.
- [ ] Integração usa a estratégia permitida pelo repositório.

## 13. Fonte de verdade

Esta skill oferece padrões padrão para repositórios sem política mais específica. Regras de segurança, proteção e políticas explícitas do projeto prevalecem. Se houver conflito, registre-o e não contorne silenciosamente a política aplicável.
