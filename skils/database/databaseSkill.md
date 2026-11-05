---
name: database
description: Database engineering standards for relational databases, SQL, schema design, migrations, CI/CD deployment, data integrity, query optimization, and production database safety. Enforces English naming conventions, migration journal tracking, checksum validation, and controlled production schema changes.
---

# Database Engineering

## 1. Objetivo

Desenvolver, manter e evoluir bancos de dados com alto padrão de qualidade, integridade, segurança e desempenho.

Esta skill orienta agentes na implementação de:

- Modelagem de dados.
- Criação e manutenção de tabelas.
- Definição de colunas e relacionamentos.
- Constraints e índices.
- Consultas SQL.
- Migrations.
- Controle de versões do schema.
- Integração com CI/CD.
- Integridade e consistência dos dados.
- Otimização de consultas.
- Operações seguras em produção.

O objetivo é garantir que toda alteração no banco seja previsível, rastreável, reproduzível e segura.

**O banco de dados é uma parte crítica da aplicação. Nenhuma alteração deve ser realizada sem compreender seus impactos sobre os dados e funcionalidades existentes.**

## 2. Inspecionar antes de implementar

Antes de criar, modificar ou remover qualquer estrutura do banco, inspecione o estado atual do projeto.

### Inspeção obrigatória

Verifique:

1. O banco de dados utilizado.
2. A estrutura atual do schema.
3. As tabelas existentes.
4. As colunas e seus tipos.
5. As constraints.
6. Os relacionamentos e foreign keys.
7. Os índices existentes.
8. As migrations anteriores.
9. O sistema de journal utilizado.
10. O mecanismo de controle de migrations.
11. A configuração de CI/CD.
12. Os serviços e funcionalidades que dependem das estruturas afetadas.

### Regras

- Não presuma que uma tabela não existe sem verificar.
- Não crie colunas duplicadas.
- Não recrie estruturas que já existem.
- Não introduza convenções diferentes das utilizadas pelo projeto sem justificativa.
- Não ignore migrations anteriores.
- Não altere o schema diretamente em produção.
- Não execute alterações sem avaliar dependências.

Antes de implementar, compreenda como o projeto controla a evolução do banco.

## 3. Convenção obrigatória de nomenclatura

**Todas as tabelas e colunas novas devem utilizar nomes em inglês.**

Essa regra é obrigatória para manter padronização, interoperabilidade e consistência entre os projetos.

### Tabelas

Utilize nomes em inglês, preferencialmente no plural e em `snake_case`.

Exemplos:

| Incorreto | Correto |
|---|---|
| `usuarios` | `users` |
| `clientes` | `customers` |
| `produtos` | `products` |
| `ped