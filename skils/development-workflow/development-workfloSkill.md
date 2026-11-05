---
name: development-workflow
description: Standardizes software development processes, Git operations, branch naming, Conventional Commits, pull requests, code integration, and release management. Use whenever starting, modifying, committing, reviewing, or integrating code changes.
---

# Development Workflow

## 1. Purpose

Establish consistent development processes across all projects and repositories.

This skill defines mandatory conventions for:

- Git branch management.
- Branch naming.
- Commit messages.
- Pull Request creation and documentation.
- Code integration.
- Merge strategies.
- Issue and task management.
- Release management.
- Repository collaboration standards.

All development agents must follow these conventions unless the repository explicitly defines stricter or different rules.

## 2. General Principles

1. Always inspect the repository before performing Git operations.
2. Never assume the current branch or working tree state.
3. Never overwrite, discard, or revert user changes without explicit authorization.
4. Keep commits focused and logically independent.
5. Never mix unrelated changes in the same commit.
6. Follow existing repository conventions when they are stricter than these guidelines.
7. Never bypass CI checks, branch protection, or review requirements.
8. Do not push, merge, or publish changes without considering the project's authorization and workflow requirements.
9. Preserve the integrity and traceability of the development history.
10. All Git-related messages intended for repository history must use English.
11. Pull Request titles must use English.
12. Pull Request descriptions must use Brazilian Portuguese.

## 3. Branch Naming Convention

### 3.1 Standard Format

All branches must follow:

`<type>/<description>`

Use lowercase letters and kebab-case for descriptions.

### 3.2 Branch Types

| Type | Purpose |
|---|---|
| feat | New features or functionality |
| fix | Bug fixes |
| hotfix | Critical production fixes |
| refactor | Internal code restructuring |
| chore | Maintenance and general tasks |
| docs | Documentation changes |
| test | Test creation or modification |
| perf | Performance improvements |
| ci | CI/CD configuration changes |
| build | Build system and dependency changes |
| style | Formatting and non-functional style changes |

### 3.3 Examples

Correct:

- `feat/user-authentication`
- `feat/payment-integration`
- `fix/invalid-date-validation`
- `hotfix/payment-processing-error`
- `refactor/dre-calculation`
- `chore/update-dependencies`
- `docs/api-documentation`
- `test/user-authentication`
- `perf/database-query-optimization`

Incorrect:

- `Feature/UserAuthentication`
- `fix_bug`
- `new-feature`
- `Jonathas/feature-login`

### 3.4 Branch Rules

- Never use spaces in branch names.
- Never use uppercase letters.
- Never use personal names.
- Always use a recognized branch type.
- Keep descriptions concise and meaningful.
- Do not create branches with ambiguous names.
- Avoid unnecessary branch nesting.

### 3.5 Branch Creation Workflow

Before creating a branch:

1. Inspect the current branch.
2. Check the working tree using `git status`.
3. Identify existing uncommitted changes.
4. Identify the project's primary integration branch.
5. Confirm the requested task and branch type.
6. Create the branch from the appropriate base branch.

Never switch branches if doing so could compromise existing uncommitted changes.

## 4. Conventional Commits

### 4.1 Mandatory Format

All commits must follow the Conventional Commits specification.

Format:

`<type>(<scope>): <description>`

The scope is optional in the Conventional Commits specification, but should be included whenever it adds meaningful context.

### 4.2 Commit Types

| Type | Description |
|---|---|
| feat | Introduces new functionality |
| fix | Corrects a bug |
| refactor | Changes code without altering external behavior |
| perf | Improves performance |
| docs | Documentation changes |
| test | Adds or modifies tests |
| style | Formatting changes without functional impact |
| chore | Maintenance tasks |
| ci | CI/CD changes |
| build | Build system or dependency changes |
| revert | Reverts a previous commit |

### 4.3 Commit Examples

Correct:

- `feat(auth): implement refresh token rotation`
- `fix(dre): correct monthly revenue calculation`
- `refactor(api): simplify request validation`
- `perf(database): optimize query execution`
- `docs(readme): update installation instructions`
- `test(auth): add token validation tests`
- `chore(deps): update dependencies`
- `ci(github): configure deployment workflow`

Incorrect:

- `Added login`
- `fixing bug`
- `Update files`
- `changes`
- `FEAT: NEW FEATURE`

### 4.4 Commit Rules

- Always write commit messages in English.
- Use imperative mood.
- Start descriptions with lowercase letters.
- Do not end descriptions with periods.
- Keep the subject concise, preferably under 72 characters.
- Use a scope whenever it improves traceability.
- Never use vague descriptions.
- Never combine unrelated changes in one commit.
- Do not create empty commits unless explicitly required.

### 4.5 Breaking Changes

Breaking changes must be explicitly identified.

Example:

`feat(api)!: change authentication response format`

For additional explanation, use the commit body and include:

`BREAKING CHANGE: authentication responses now require the new token structure.`

## 5. Pull Request Standards

### 5.1 Language Convention

Pull Requests must follow these language conventions:

| Element | Language |
|---|---|
| Pull Request title | English |
| Pull Request description | Brazilian Portuguese |
| Commit messages | English |
| Branch names | English |
| Code and identifiers | English |

The title and description have different purposes and must follow their respective language conventions.

### 5.2 Pull Request Title

All Pull Request titles must be written in English and follow Conventional Commits.

Mandatory format:

`<type>(<scope>): <description>`

Examples:

- `feat(auth): implement refresh token rotation`
- `fix(dre): correct monthly revenue calculation`
- `refactor(api): simplify request validation`
- `perf(database): optimize query execution`
- `chore(deps): update dependencies`

Requirements:

- Always use English.
- Include a meaningful scope.
- Use a recognized Conventional Commits type.
- Clearly summarize the main modification.
- Use lowercase descriptions.
- Avoid generic titles such as `update`, `fix bugs`, or `code improvements`.
- Do not end the title with a period.

### 5.3 Pull Request Description

All Pull Request descriptions must be written in Brazilian Portuguese.

Descriptions must be comprehensive, technically accurate, and formatted using Markdown.

The description must provide enough information for another developer to understand the changes without having to inspect every modified file.

### 5.4 Mandatory Markdown Structure

Use the following template as the default structure:

#### Resumo

Explain objectively what was implemented, modified, or corrected.

Describe the main purpose of the Pull Request and its expected outcome.

#### Contexto

Explain the problem, requirement, or motivation behind the changes.

Include relevant background information when necessary.

#### Alterações realizadas

List the main technical modifications.

Organize the changes into logical groups when multiple modules or layers are involved.

Example:

- Implementação de novos endpoints.
- Refatoração dos serviços responsáveis pelo processamento.
- Atualização dos componentes de interface.
- Criação ou alteração de migrations.
- Ajustes nas validações e regras de negócio.

#### Detalhes técnicos

Explain relevant implementation decisions.

Include architectural changes, important dependencies, data flows, API contracts, database modifications, and other technical considerations when applicable.

Use code snippets when they improve understanding.

#### Testes realizados

Document the actual tests executed.

Include:

- Testes unitários.
- Testes de integração.
- Validação de endpoints.
- Type checking.
- Linting.
- Testes manuais.

Never claim that a test was executed if it was not.

If tests were not executed, explicitly explain why.

#### Impactos e compatibilidade

Describe possible impacts on:

- Funcionalidades existentes.
- Contratos de API.
- Estruturas do banco de dados.
- Integrações externas.
- Performance.
- Compatibilidade retroativa.

If there are no relevant impacts, state that explicitly.

#### Riscos e observações

Document known limitations, migration requirements, deployment considerations, and potential risks.

Do not invent risks or claim that none exist without evaluating the changes.

#### Checklist

- [ ] Implementação concluída.
- [ ] Código revisado.
- [ ] Testes relevantes executados.
- [ ] Type checking validado.
- [ ] Linting validado.
- [ ] Documentação atualizada, quando necessário.
- [ ] Migrations incluídas, quando necessário.
- [ ] Possíveis regressões avaliadas.

Only mark items as completed when they have actually been verified.

### 5.5 Description Quality Rules

- Use Brazilian Portuguese with correct technical terminology.
- Use Markdown headings to organize information.
- Use bullet points for lists of modifications.
- Use code blocks for relevant technical examples.
- Use tables when comparing structured information.
- Avoid unnecessarily long paragraphs.
- Avoid repeating the same information in multiple sections.
- Be specific about implementation details.
- Do not omit important architectural or behavioral changes.
- Adapt the depth of documentation to the complexity of the Pull Request.
- Do not generate generic descriptions that fail to explain the actual implementation.
- Do not invent implementation details based solely on the task description.

Not every section requires extensive text. Sections that are not applicable must be omitted or explicitly marked as not applicable when relevant.

### 5.6 Pull Request Example

**Title:**

`feat(auth): implement refresh token rotation`

**Description:**

```markdown
## Resumo

Implementada a rotação de refresh tokens para aumentar a segurança do processo de autenticação.

## Contexto

O mecanismo anterior permitia reutilizar o mesmo refresh token durante toda a sua validade, aumentando os riscos associados ao comprometimento de credenciais.

## Alterações realizadas

- Implementada a geração de novos refresh tokens.
- Adicionada invalidação do token anterior após a rotação.
- Atualizado o fluxo de renovação de sessão.
- Incluídas novas validações de autenticação.

## Detalhes técnicos

A renovação da sessão agora gera um novo refresh token e invalida o anterior.

O mecanismo impede a reutilização de tokens já consumidos.

## Testes realizados

- Testada a renovação de sessão.
- Validada a rejeição de tokens expirados.
- Validada a rejeição de tokens reutilizados.

## Impactos e compatibilidade

O fluxo de renovação de sessão foi modificado.

Clientes que utilizam o mecanismo anterior devem seguir o novo contrato de autenticação.

## Riscos e observações

A alteração exige compatibilidade entre o backend e os clientes que consomem o serviço.

## Checklist

- [x] Implementação concluída.
- [x] Código revisado.
- [x] Testes relevantes executados.
- [x] Documentação atualizada.
```

### 5.7 Pull Request Rules

- Keep Pull Requests focused on a single logical objective.
- Avoid excessively large Pull Requests.
- Never claim tests passed if they were not executed.
- Never omit important breaking changes.
- Never approve your own changes when independent review is required.
- Reference the associated issue or task when available.
- Never merge while required checks or approvals are pending.
- Always use Squash and Merge as the default integration strategy.

## 6. Git Integration Strategy

### 6.1 Default Merge Strategy

The mandatory default strategy is:

**Squash and Merge**

All Pull Requests must be integrated using Squash and Merge unless the repository explicitly requires another strategy.

### 6.2 Squash Rules

- Consolidate related commits into one commit.
- Preserve a meaningful final commit message.
- Follow Conventional Commits.
- Ensure the final commit represents the Pull Request's actual purpose.
- Avoid including unrelated changes in the squash commit.

### 6.3 Integration Workflow

1. Update the feature branch with the latest integration branch when necessary.
2. Resolve conflicts carefully.
3. Execute relevant tests.
4. Verify CI results.
5. Obtain required approvals.
6. Merge using Squash and Merge.
7. Remove the merged feature branch when repository policy allows it.

### 6.4 Conflict Resolution

When resolving conflicts:

- Inspect both versions before modifying anything.
- Understand the intent behind each conflicting change.
- Preserve valid functionality from both sides whenever possible.
- Never blindly accept all changes from one branch.
- Execute relevant tests after resolution.
- Report unresolved conflicts instead of making assumptions.

## 7. Issue and Task Management

Issues and development tasks must have clear descriptions.

Recommended structure:

### Title

Concise description of the task.

### Context

Explain the problem or requirement.

### Expected Behavior

Describe the desired outcome.

### Acceptance Criteria

Define objective conditions for completion.

### Technical Considerations

Mention dependencies, architectural constraints, and possible impacts.

Rules:

- Avoid ambiguous tasks.
- Separate unrelated requirements.
- Define acceptance criteria whenever possible.
- Keep implementation scope controlled.
- Reference related Pull Requests and commits when available.

## 8. Release Management

Releases must follow semantic versioning whenever the project uses versioned releases.

Format:

`MAJOR.MINOR.PATCH`

Rules:

- MAJOR: incompatible API or behavioral changes.
- MINOR: backward-compatible functionality.
- PATCH: backward-compatible bug fixes.

Before creating a release:

1. Verify the target version.
2. Review changes since the previous release.
3. Identify breaking changes.
4. Update the changelog when applicable.
5. Verify CI and test results.
6. Confirm deployment readiness.
7. Publish release notes when required.

Never create or publish releases without authorization.

## 9. Agent Execution Protocol

Whenever an agent receives a development task, it must follow this workflow.

### Phase 1: Repository Inspection

- Inspect repository structure.
- Identify the current branch.
- Inspect the working tree.
- Identify existing project conventions.
- Read relevant documentation.

### Phase 2: Task Analysis

- Understand the requested change.
- Identify affected modules.
- Determine the appropriate branch type.
- Evaluate dependencies and risks.
- Identify required tests.

### Phase 3: Development Preparation

- Confirm the integration branch.
- Create a correctly named feature branch when authorized and appropriate.
- Preserve existing user changes.
- Define the implementation scope.

### Phase 4: Implementation

- Follow the project's architecture.
- Keep modifications focused.
- Avoid unrelated refactoring.
- Maintain compatibility unless changes are explicitly required.

### Phase 5: Validation

- Run relevant tests.
- Execute linting and type checking when available.
- Verify the implementation.
- Inspect the final diff.
- Identify potential regressions.

### Phase 6: Git Operations

- Prepare meaningful Conventional Commits.
- Review the final commit messages.
- Push only when authorized.
- Prepare a Pull Request when requested or required by the workflow.
- Write the PR title in English.
- Write the PR description in Brazilian Portuguese using the documented Markdown structure.

### Phase 7: Final Report

Provide a concise report containing:

- What was implemented.
- Files or modules modified.
- Tests executed and their results.
- Commits created.
- Branch used.
- Pull Request created, if applicable.
- Outstanding issues or risks.

Never report an operation as completed if it was not actually executed.

## 10. Prohibited Practices

Agents must never:

- Commit directly to protected integration branches.
- Force-push without explicit authorization.
- Use `git reset --hard` without explicit authorization.
- Use destructive Git commands to discard user changes.
- Rewrite shared Git history without authorization.
- Bypass CI checks or required approvals.
- Merge Pull Requests without satisfying repository requirements.
- Include secrets or credentials in commits.
- Create commits with misleading descriptions.
- Invent test results.
- Delete branches without verifying their status and ownership.
- Create Pull Requests with generic or undocumented descriptions.
- Write Pull Request titles in Portuguese.
- Write Pull Request descriptions in English unless explicitly required by project policy.

## 11. Final Compliance Checklist

Before considering a development task complete, verify:

- [ ] Repository conventions were inspected.
- [ ] Branch naming follows the standard.
- [ ] Commits follow Conventional Commits.
- [ ] Git-related messages use English.
- [ ] Pull Request titles use English.
- [ ] Pull Request titles include a meaningful scope.
- [ ] Pull Request descriptions use Brazilian Portuguese.
- [ ] Pull Request descriptions follow Markdown documentation standards.
- [ ] Changes are focused and traceable.
- [ ] Tests and validations were performed when applicable.
- [ ] Squash and Merge is used as the default integration strategy.
- [ ] No user changes were lost.
- [ ] The final report accurately describes the work.

## 12. Source of Truth

This skill defines the default development workflow for all projects using this engineering standards repository.

Repository-specific documentation may introduce stricter requirements or explicitly override individual conventions.

When conflicts arise:

1. Respect security and repository protection requirements.
2. Respect explicit project-specific policies.
3. Apply this skill's defaults where no higher-priority rule exists.
4. Report unresolved conflicts rather than silently choosing an incompatible workflow.