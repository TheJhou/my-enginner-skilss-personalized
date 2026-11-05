# Instruções globais de engenharia

Estas instruções se aplicam a todo trabalho neste repositório. Consulte as skills especializadas indicadas abaixo quando a tarefa envolver seu domínio. Leia apenas as skills necessárias; uma tarefa que atravesse várias áreas pode exigir mais de uma.

## Seleção das skills

| Tipo de tarefa | Skill |
|---|---|
| APIs, serviços, validação e regras de negócio no servidor | [`backend`](skills/backend/SKILL.md) |
| Revisão técnica de código existente ou recém-alterado | [`code-review`](skills/code-review/SKILL.md) |
| SQL, schema, migrations, índices e integridade de dados | [`database`](skills/database/SKILL.md) |
| Git, commits, pull requests, CI/CD e releases | [`development-workflow`](skills/development-workflow/SKILL.md) |
| React, TypeScript, componentes, estado e integração com APIs | [`frontend-engineering`](skills/frontend-engineering/SKILL.md) |
| UX, interface visual, responsividade e acessibilidade de interação | [`ui-ux-responsive`](skills/ui-ux-responsive/SKILL.md) |
| Ameaças, vulnerabilidades, autenticação e proteção de dados | [`security`](skills/security/SKILL.md) |
| Testes e evidências de comportamento | [`testing`](skills/testing/SKILL.md) |

Exemplo: um endpoint que persiste dados financeiros pode exigir `backend`, `database`, `security` e `testing`. Uma mudança visual em um formulário pode exigir `frontend-engineering`, `ui-ux-responsive` e `testing`.

## Regras obrigatórias em qualquer projeto

- Inspecione a estrutura, as convenções, o estado do Git e os arquivos relevantes antes de implementar.
- Procure componentes, funções, serviços, validações e dependências já existentes antes de criar outros.
- Reutilize o que for adequado, sem introduzir abstrações genéricas ou duplicar regras de negócio.
- Respeite a arquitetura e os contratos públicos existentes. Proponha e justifique mudanças arquiteturais amplas antes de executá-las.
- Use inglês em identificadores internos e comentários de código. Use português brasileiro em textos apresentados às pessoas usuárias.
- No frontend, prefira tokens e padrões visuais já existentes; não distribua valores de design hardcoded.
- Valide no servidor toda entrada externa e verifique autenticação, autorização e propriedade do recurso em cada operação protegida.
- Considere segurança, privacidade, integridade dos dados, acessibilidade e desempenho conforme o risco e o contexto.
- Preserve alterações preexistentes e não modifique arquivos sem relação com a tarefa.
- Não instale dependências nem ferramentas quando a infraestrutura existente for suficiente. Justifique tecnicamente qualquer adição.
- Consulte documentação oficial quando o comportamento de uma ferramenta, API, padrão ou versão não estiver claro.

## Implementação e validação

1. Identifique as áreas afetadas e consulte as skills correspondentes.
2. Defina o comportamento esperado e os riscos antes de alterar o código.
3. Implemente a menor mudança coesa que atenda ao objetivo, mantendo compatibilidade quando aplicável.
4. Execute as validações relevantes disponíveis no projeto. Não execute operações destrutivas nem use serviços de produção para testes.
5. Revise o diff e confirme que as mudanças não relacionadas foram preservadas.
6. No relato final, descreva o que mudou, os comandos realmente executados, seus resultados e limitações pendentes.

Não afirme que testes, revisões, verificações ou operações externas foram concluídos sem executar a ação correspondente. Se uma validação não puder ser executada, informe o motivo com clareza.

## Escopo destas instruções

Este arquivo reúne somente regras globais e o mapa das especialidades. Detalhes de cada domínio pertencem à respectiva `SKILL.md`; em caso de dúvida, consulte a skill especializada e a documentação oficial pertinente. Políticas específicas do projeto em que o agente estiver trabalhando têm precedência quando forem compatíveis com requisitos de segurança e instruções explícitas da tarefa.
