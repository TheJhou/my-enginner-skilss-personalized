---
name: testing
description: "Define estratégia e critérios para testes unitários, integração, componentes, APIs, banco e E2E. Use ao criar, alterar ou validar comportamento, investigar regressões e escolher evidências de qualidade."
---

# Estratégia de testes

## 1. Objetivo

Use testes para fornecer evidência reproduzível sobre comportamento, regras de negócio, integração e regressões. Testar faz parte do desenvolvimento; a quantidade e o nível dos testes devem refletir risco, arquitetura e comportamento esperado.

Esta skill cobre testes unitários, integração, componentes, API, E2E, dados, mocks, isolamento, coverage e validação de tipos. Consulte `backend`, `frontend-engineering`, `database` e `security` para o contexto técnico da área.

## 2. Princípios fundamentais

1. Teste comportamento observável, não detalhes internos sem motivo.
2. Dê a cada teste uma finalidade e uma asserção significativa.
3. Prefira testes determinísticos, independentes e reproduzíveis.
4. Teste caminhos esperados e falhas plausíveis.
5. Priorize regras críticas e impacto no produto.
6. Isole serviços externos quando isso tornar o teste confiável.
7. Não faça mocking excessivo que esconda a integração que precisa ser verificada.
8. Não altere código de produção apenas para satisfazer um teste incorreto.
9. Não modifique testes para esconder defeito.
10. Preserve cobertura relevante durante alterações.
11. Investigue falhas em vez de ignorá-las ou repetir a execução sem análise.
12. Compilar não valida comportamento de runtime.
13. Nunca afirme que um teste passou sem executá-lo.
14. Prefira testes úteis e mantíveis em vez de volume artificial.

## 3. Pirâmide de testes

Use a pirâmide como orientação geral, ajustada ao risco e ao desenho do sistema.

### 3.1 Testes unitários

Verificam uma função, serviço, hook ou regra de negócio de forma isolada. Devem ser rápidos, determinísticos e não depender de infraestrutura desnecessária.

Exemplos: cálculos, transformações, validações, regras de domínio, datas, moeda e métodos de serviço com dependências controladas. Em geral, representam a maior parte da suíte.

### 3.2 Testes de integração

Verificam a interação entre componentes, por exemplo:

- Services com repositories.
- Rotas com middlewares.
- Consultas, constraints e transações no banco.
- Autenticação e autorização.
- Componentes React com estado ou cliente de dados.
- Contratos com serviços externos simulados.

Sempre que prático, valide a interação e o contrato reais, não apenas mocks internos.

### 3.3 Testes end-to-end

Validam um fluxo completo pela perspectiva da pessoa usuária, como autenticação, cadastro, recuperação de senha, transação, formulário crítico ou navegação principal. Priorize jornadas importantes sem repetir todos os casos unitários no navegador.

### 3.4 Distribuição sugerida

Como ponto inicial de planejamento, não como meta obrigatória, considere aproximadamente 65% unitários, 25% integração e 10% E2E. Ajuste pela arquitetura e pelo risco. Não sacrifique testes de integração ou E2E necessários para atingir percentuais.

## 4. Ferramentas e seleção

| Ferramenta | Uso possível |
|---|---|
| Vitest | Testes unitários e de integração |
| Jest | Runner quando já adotado ou melhor suportado |
| React Testing Library | Comportamento de componentes React |
| `@testing-library/user-event` | Interações de pessoa usuária |
| MSW | Interceptação realista de requisições HTTP |
| Playwright | Fluxos E2E no navegador |
| TypeScript Compiler | Verificação estática de tipos |
| `node:test` | Alternativa nativa para Node.js |

Inspecione `package.json`, configuração, versões e comandos existentes antes de escolher ferramenta. Prefira dependências e setup adotados. Não mantenha múltiplos runners sem necessidade. Vitest costuma ser adequado a projetos TypeScript com Vite; Jest continua válido se já adotado; Playwright é indicado para fluxos críticos de navegador. Não migre infraestrutura existente só porque há outra opção.

## 5. TypeScript e validação estática

Diferencie execução de testes, type checking e testes de tipos: são verificações diferentes.

- Evite `any` em testes e helpers.
- Tipifique fixtures e reutilize contratos de produção quando isso for apropriado.
- Evite assertions inseguras e supressões sem justificativa.
- Use `unknown` para valores ainda não verificados.
- Valide dados em runtime; tipos não validam JSON, requisições HTTP, entradas de usuário ou registros do banco.

Execute o compilador separadamente do runner quando houver configuração. Comando comum:

```sh
npx tsc --noEmit
```

Se o projeto tiver configuração específica, use `npx tsc -p tsconfig.json --noEmit` ou verifique separadamente as configurações relevantes. Não altere configuração para ocultar erros.

## 6. Testes React

### 6.1 Filosofia e consultas

Teste o que a pessoa vê e faz: conteúdo, interação, carregamento, erro, props e estado. Evite acoplar o teste a implementação interna.

Com React Testing Library, prefira consultas acessíveis nesta ordem geral: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`, `getByDisplayValue`; use `getByTestId` quando consultas semânticas não forem práticas.

Exemplo ilustrativo:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('submits valid credentials', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );
    await user.type(
      screen.getByLabelText(/password/i),
      'SecurePassword123!'
    );
    await user.click(
      screen.getByRole('button', { name: /sign in/i })
    );

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
```

Adapte imports, dependências e asserções ao projeto e ao comportamento real do componente.

### 6.2 Interações e estados

Use `userEvent` para simular cliques, digitação, teclado, submissão, seleção, foco, blur, checkboxes, validação e controles desabilitados. Prefira interação de usuário a chamar handlers diretamente.

Teste estados relevantes de componentes com renderização condicional: inicial, loading, success, error, empty, disabled, sem permissão e validação.

### 6.3 Hooks, formulários e assincronicidade

Teste hooks personalizados por seus efeitos observáveis: valor inicial, atualização, dependências, side effects, cleanup, erro e comportamento assíncrono.

Em formulários, verifique campos obrigatórios, entrada inválida e válida, validação de campo, submissão, loading, envio duplicado, erros do servidor e feedback de sucesso. Confirme que formulário inválido não dispara requisição indevida.

Para atualizações assíncronas, use utilitários apropriados, como `findByRole`, `findByText`, `waitFor` e `waitForElementToBeRemoved`. Não use `setTimeout` arbitrário para estabilizar teste.

## 7. Testes Node.js e backend

### 7.1 Serviços e APIs

Valide regras de negócio, retornos, argumentos inválidos, dados ausentes, falhas de dependência, erros do banco, exceções e transações. Use injeção de dependência ou mocks controlados quando apropriado.

Testes de API devem conferir método, endpoint, status, estrutura e tipos da resposta, headers, autenticação, autorização, validação, erros, paginação, filtros e ordenação.

Exemplo ilustrativo:

```ts
import { describe, expect, it } from 'vitest';

describe('GET /api/users', () => {
  it('returns the expected response structure', async () => {
    const response = await fetch('http://localhost:3000/api/users');

    expect(response.status).toBe(200);

    const body: unknown = await response.json();

    expect(body).toBeDefined();
  });
});
```

Use a instância, servidor e contrato reais do projeto. Se o objetivo é validar integração HTTP, não dependa apenas de controllers mockados.

### 7.2 Middlewares, auth e banco

Teste middlewares importantes isoladamente e em integração: autenticação, autorização, rate limiting, validação, tratamento de erros e identificação de requisição. Inclua casos permitidos e rejeitados.

Para autenticação e autorização, avalie credenciais ausentes/inválidas, token expirado ou revogado, sessão inválida, permissão insuficiente e acesso a recurso de outra pessoa. Login válido não prova autorização correta.

Quando prático, use o banco real da aplicação em testes de integração e valide insert, update, delete, foreign keys, unicidade, nulabilidade, transações, rollback, integridade, filtros, paginação e concorrência relevante. Use banco exclusivo de teste, isole dados e não execute testes destrutivos em produção. Verifique compatibilidade de migrations quando schema mudar.

### 7.3 Serviços externos

Isole serviços de pagamento, e-mail, armazenamento, APIs e provedores de identidade com mocks controlados ou interceptação HTTP determinística. Use testes de contrato ou sandbox separado quando necessário. Testes unitários comuns não devem depender de disponibilidade de terceiros.

## 8. Mocks e isolamento de dependências

Mocking deve isolar uma fronteira, não esconder defeitos.

Use mocks quando uma dependência é externa, cara, não determinística, ou quando é necessário simular falha. Evite mockar a função sob teste, regra central, todas as dependências sem critério ou interação que deveria ser testada como integração.

Use MSW quando interceptar a fronteira HTTP produzir teste mais realista. Considere sucesso, erro do cliente/servidor, falha de rede, atraso e formato inválido.

Restaure mocks, spies, timers e estado global após cada teste. Evite estado mutável compartilhado.

## 9. Desenho de casos e Arrange, Act, Assert

Cada teste deve comunicar cenário e resultado. Use Arrange, Act, Assert quando ajudar:

```ts
import { describe, expect, it } from 'vitest';

describe('calculateTotal', () => {
  it('includes the discount', () => {
    // Arrange
    const price = 100;
    const discount = 10;

    // Act
    const result = price - discount;

    // Assert
    expect(result).toBe(90);
  });
});
```

Adapte o padrão quando outra estrutura tornar o teste mais claro. Evite setup tão complexo que esconda a intenção.

## 10. Limites e testes negativos

Escolha casos conforme entradas e regras reais.

- **Validação:** vazio, null, undefined, tipo ou formato errado, tamanho excessivo, caracteres inesperados e payload malformado.
- **Números:** zero, negativos, decimais, limites máximo e mínimo, precisão e overflow.
- **Coleções:** vazias, item único, duplicadas, grandes, elemento ausente e ordenação inválida.
- **Datas:** inválidas, fuso horário, limites de mês/ano, ano bissexto, horário de verão quando aplicável e intervalos.
- **Assincronicidade:** sucesso, rejeição, timeout, rede interrompida, concorrência, duplicidade e corrida.
- **Regras de negócio:** transições válidas e inválidas, falta de permissão, duplicidade e dados inconsistentes.

Nem todo caso se aplica a toda função. Selecione cenários pelo comportamento e risco.

## 11. Nomes e organização

Nomes de testes e identificadores de código devem usar inglês e descrever comportamento esperado.

Formato útil: `should <expected behavior> when <condition>`.

Exemplos: `should reject invalid credentials`, `should prevent unauthorized access`, `should display the loading indicator while submitting`. Evite `test 1`, `works correctly` e `should work`.

Siga os nomes existentes; exemplos comuns incluem `user.service.test.ts`, `auth.middleware.test.ts`, `LoginForm.test.tsx` e `useAuth.test.ts`.

Organize testes conforme a arquitetura. Uma pasta `tests/integration` ou `tests/e2e` é uma opção, não exigência. Não mova testes existentes sem necessidade.

## 12. Fixtures e dados

Use fixtures explícitas e determinísticas. Utilize factories quando objetos complexos se repetirem. Evite dependência desnecessária entre fixtures, dados de produção, IDs ligados ao ambiente ou usuários reais. Dados aleatórios precisam de seed controlada quando reprodutibilidade for necessária.

## 13. Determinismo e ciclo de vida

Cada teste deve poder executar isoladamente quando prático. Evite estado mutável compartilhado, dependência de ordem, requisições externas descontroladas, produção, processos em background não geridos, mocks não restaurados, relógio sem controle e asserts dependentes do ambiente.

Use setup e teardown, limpe recursos criados e garanta que execução paralela não dispute identificadores ou infraestrutura compartilhada.

## 14. End-to-end com Playwright

Priorize fluxos críticos: autenticação, cadastro, recuperação de senha, operações financeiras importantes, submissões centrais, navegação principal e ações protegidas.

Use locators voltados à pessoa usuária, como `getByRole`, `getByLabel`, `getByPlaceholder` e `getByText`. Use `data-testid` quando uma consulta semântica não for prática. Evite seletores acoplados a classes CSS e estrutura interna do DOM.

Isole contextos do browser e dados. Use auto-waiting, evite atrasos fixos, capture traces e diagnóstico útil em falhas e valide resultados visíveis. Não reproduza cada teste unitário em E2E.

## 15. Testes de regressão

Quando um comportamento existente for alterado:

1. Identifique o comportamento e módulos dependentes.
2. Examine testes e contratos relacionados.
3. Crie ou atualize cenários relevantes.
4. Execute testes da área quando disponível.
5. Avalie regressões relacionadas em outras camadas.

Ao corrigir bug, crie quando prático um teste que reproduza o defeito anterior. O teste deve falhar antes da correção e passar depois. Não limite a validação ao arquivo alterado se o fluxo atravessar camadas.

## 16. Coverage

Coverage é diagnóstico, não prova de correção. Considere linha, branch, função e cobertura de regras críticas. Priorize cálculos financeiros, autenticação, autorização, persistência, validação, tratamento de erros, transações e contratos importantes.

Não escreva testes sem valor só para elevar percentual nem exija 100% sem política justificada. Investigue branches críticos descobertos mesmo quando o percentual global for alto. Respeite thresholds que já existam.

## 17. Desempenho e confiabilidade da suíte

Mantenha testes práticos em desenvolvimento e CI. Evite inicialização desnecessária de banco, excesso de testes no browser e dependências de rede. Reutilize setup controlado, mantenha fixtures leves e paralelize apenas testes independentes com segurança.

Investigue testes flaky em vez de repetir execuções sem análise. Não sacrifique isolamento ou correção para reduzir duração.

## 18. Anti-patterns proibidos

Nunca:

- Escreva teste sem asserção significativa ou teste apenas o sucesso.
- Ignore erros e casos negativos relevantes.
- Dependa de serviços reais de produção.
- Use atraso arbitrário para resolver corrida assíncrona.
- Mocke tudo sem justificativa ou detalhe interno sem benefício.
- Altere testes para encobrir bug, desabilite falha sem justificativa registrada ou apague testes sem compreender sua finalidade.
- Introduza aleatoriedade sem controle de reprodutibilidade.
- Use banco de produção em testes destrutivos.
- Trate coverage como prova ou compilação TypeScript como validação de runtime.
- Afirme execução bem-sucedida sem rodar o comando correspondente.

## 19. Fluxo de trabalho de testes

### Fase 1 — Inspeção

Examine arquitetura, framework, scripts, configuração, convenções e testes relacionados. Não instale runner antes de avaliar a infraestrutura existente.

### Fase 2 — Planejamento

Entenda o comportamento, regras críticas, limites, dependências, nível de teste e fixtures/mocks necessários.

### Fase 3 — Implementação

Crie cenários positivos e negativos importantes, com nomes claros em inglês, isolamento e assertions significativas. Evite abstrações desnecessárias.

### Fase 4 — Execução

Use comandos configurados no projeto. Quando aplicável, execute testes unitários, integração, componentes e E2E, além de type checking, lint e coverage. Não suponha que um script existe; leia a configuração antes.

### Fase 5 — Investigação de falhas

Leia a saída completa, identifique assertion, diferencie problema de aplicação, teste, configuração ou ambiente, investigue causa raiz, corrija e execute novamente as verificações afetadas. Não suprima falhas para obter resultado verde.

### Fase 6 — Validação final

Revise resultados, testes omitidos, cobertura de comportamento crítico, código temporário e limpeza do ambiente. Informe limitações.

### Fase 7 — Relato

Registre testes criados ou alterados, cenários, comandos, resultados, type checking, lint, coverage quando disponível, limitações e pendências. Separe com clareza o que passou, falhou ou não foi executado.

## 20. Critérios de conclusão

Antes de declarar validada uma tarefa de desenvolvimento que envolva testes, avalie:

- [ ] Testes relevantes foram identificados.
- [ ] Nova funcionalidade possui testes adequados.
- [ ] Regressões foram consideradas.
- [ ] Erros e limites importantes foram cobertos.
- [ ] Isolamento foi preservado.
- [ ] Verificações pertinentes foram executadas.
- [ ] Type checking e lint foram executados quando aplicáveis.
- [ ] Falhas foram investigadas.
- [ ] Nenhum resultado foi inventado.
- [ ] Limitações e resultados estão documentados.

Se o ambiente impedir a validação, informe que a tarefa está parcialmente validada e explique a limitação.

## 21. Referências oficiais

- [Vitest — guia](https://vitest.dev/guide/)
- [Vitest — escrita de testes](https://vitest.dev/guide/learn/writing-tests)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library — user-event](https://testing-library.com/docs/user-event/intro/)
- [Playwright — instalação e introdução](https://playwright.dev/docs/intro)
- [Playwright — boas práticas](https://playwright.dev/docs/best-practices)
- [Node.js — runner de testes](https://nodejs.org/api/test.html)
- [TypeScript](https://www.typescriptlang.org/docs/)

Consulte documentação oficial antes de depender de comportamento específico. Verifique se a recomendação corresponde à versão do projeto; documentação da versão mais recente pode não se aplicar a uma dependência antiga. Não invente APIs ou opções de configuração.

---

## Princípio final

Uma suíte de testes deve aumentar a confiança de que a aplicação funciona sob condições esperadas, lida com falhas, preserva regras de negócio e continua estável conforme evolui. O objetivo não é provar apenas que o fluxo ideal funciona nem aumentar a quantidade de testes sem valor.
