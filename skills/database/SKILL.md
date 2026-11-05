---
name: database
description: "Orienta modelagem relacional, PostgreSQL, SQL, integridade, índices, transações, migrations, concorrência, backup e otimização. Use ao alterar consultas, schema, persistência ou implantação de mudanças no banco."
---

# Engenharia de banco de dados

## 1. Objetivo e escopo

Evolua bancos de dados com integridade, segurança, desempenho e mudanças rastreáveis. Esta skill cobre modelagem relacional, PostgreSQL, SQL, constraints, índices, transações, migrations, concorrência, paginação, backups, consultas e rollout.

Use o mecanismo de migration já adotado pelo projeto. Não introduza outro por preferência. Consulte também `backend` para regras de aplicação e `security` para ameaças que atravessam a camada de dados.

## 2. Inspecione antes de alterar

Verifique o banco e a versão utilizados, schemas, tabelas, colunas, tipos, constraints, relacionamentos, índices, consultas existentes, migrations e dependências de aplicação. Inspecione o journal, checksums ou controle de migrations somente se o projeto já os utiliza. Identifique consumidores das estruturas afetadas e o processo de CI/CD.

Não presuma que um objeto não existe. Não recrie colunas ou constraints, não altere o schema diretamente em produção e não ignore migrations anteriores.

## 3. Modelagem e integridade

- Modele entidades, chaves e relações segundo o domínio e as consultas reais.
- Use nomes claros; para objetos novos, siga a convenção existente. Se não houver padrão, prefira inglês e `snake_case`.
- Escolha tipos que representem o domínio, os limites e a precisão necessários.
- Use `NOT NULL`, `UNIQUE`, `CHECK` e foreign keys para invariantes que o banco deve garantir.
- Preserve integridade referencial e avalie o comportamento de exclusão/atualização em cascata.
- Normalize por padrão; desnormalize somente com motivo medido e plano de consistência.
- Evite armazenar dados derivados quando isso criar fontes de verdade divergentes.

Não renomeie objetos existentes apenas para padronizar aparência se isso exigir migração incompatível ou arriscar dados.

## 4. SQL seguro e eficiente

- Use parâmetros para valores. Nunca concatene entrada externa em SQL.
- Selecione apenas as colunas necessárias; evite `SELECT *` em consultas de aplicação.
- Evite N+1 e chamadas repetidas; agregue ou carregue dados de forma compatível com o volume.
- Use paginação estável para conjuntos grandes e defina limites.
- Examine o plano de execução de consultas importantes com `EXPLAIN`; use `EXPLAIN ANALYZE` apenas quando a execução real for segura e apropriada ao ambiente.
- Avalie seletividade, cardinalidade e padrões de filtro, ordenação e junção antes de criar índices.
- Considere custo de escrita, armazenamento e manutenção de cada índice; não indexe indiscriminadamente.
- Reavalie consultas depois de mudanças em schema, dados ou índices.

## 5. Transações e concorrência

Use transações quando múltiplas operações precisarem ser atômicas para preservar invariantes. Mantenha-as curtas e evite chamadas externas enquanto locks estiverem abertos.

Avalie isolamento, locks, deadlocks, ordem de aquisição, retries seguros e atualizações concorrentes. Um retry de transação deve ser limitado e repetir apenas operações cuja semântica seja segura. Para filas ou jobs, considere idempotência e duplicidade de entrega.

Utilize connection pooling existente e dimensione considerando conexões do processo, réplicas e limites do servidor.

## 6. Migrations e implantação

Toda mudança de schema deve ser versionada pelo mecanismo existente e considerada junto com os dados e a versão anterior da aplicação.

- Não misture ferramentas de migration sem justificativa concreta.
- Preserve journal, checksum e histórico quando o projeto os utiliza; valide-os segundo a implementação existente.
- Planeje mudanças incompatíveis em etapas compatíveis, como expandir, migrar dados e só então remover estruturas antigas.
- Considere tamanho da tabela, locks, duração, replicação e disponibilidade em produção.
- Evite operações destrutivas sem backup, estratégia de recuperação e plano de rollout.
- Inclua rollback quando ele for seguro e significativo; algumas migrações de dados não são reversíveis sem cópia ou compensação.
- Execute migrations em pipeline controlado, nunca ad hoc em produção.
- Verifique como versões antigas e novas da aplicação convivem durante o deploy.

Não invente a existência de journal ou checksum quando o projeto não adota esse mecanismo.

## 7. Backup, recuperação e dados

Use a política de backup já estabelecida. Para mudanças de risco, confirme retenção, restauração testada, ponto de recuperação e procedimento de contingência. Não use dados reais sensíveis em testes ou exemplos; isole dados de teste e remova-os de modo controlado.

## 8. Validação e conclusão

Consulte `testing` para testes de integração, migração e persistência e `security` para injeção e proteção de dados. Antes de concluir:

- Confirme que a migration usa o mecanismo e as convenções existentes.
- Revise constraints, índices, transações e efeitos sobre dados existentes.
- Avalie consultas e plano de execução quando relevante.
- Confirme compatibilidade do rollout e estratégia de recuperação.
- Execute verificações seguras no ambiente apropriado e informe o resultado real.

## 9. Referências oficiais

- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Node.js](https://nodejs.org/docs/latest/api/)
- [OWASP Top 10](https://owasp.org/projects/top-ten)
