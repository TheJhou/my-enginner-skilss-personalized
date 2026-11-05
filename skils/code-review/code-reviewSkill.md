---
name: code-review
description: Comprehensive code review standards for TypeScript, JavaScript, React, Node.js, APIs, and databases. Identifies bugs, typing issues, infinite loops, logic errors, performance problems, security vulnerabilities, architectural inconsistencies, and regressions. Requires frequent unit testing, integration testing, and system testing.
---

# Code Review Engineering

## 1. Objetivo

Realizar revisões técnicas rigorosas para identificar problemas antes que eles cheguem à produção.

O objetivo é garantir que o código desenvolvido seja:

- Funcionalmente correto.
- Seguro.
- Bem tipado.
- Performático.
- Testável.
- Manutenível.
- Consistente com a arquitetura.
- Resistente a cenários inesperados.
- Compatível com as funcionalidades existentes.

A revisão não deve se limitar à aparência do código ou às convenções de formatação.

**O principal objetivo é encontrar defeitos reais, riscos técnicos, falhas de lógica e comportamentos inesperados.**

O agente deve atuar como um revisor técnico experiente, questionando decisões, verificando hipóteses e procurando situações que possam causar falhas.

## 2. Princípios fundamentais

### Revisar antes de aprovar

Nunca considere um código correto apenas porque:

- Compila.
- Não apresenta erros de lint.
- Funciona no cenário principal.
- Passa em um único teste.
- Foi desenvolvido por alguém experiente.
- Foi gerado por inteligência artificial.

A ausência de erros aparentes não significa ausência de defeitos.

### Revisão baseada em evidências

Toda descoberta deve possuir uma justificativa técnica.

Não apresente problemas hipotéticos como defeitos confirmados.

Diferencie:

- Bug confirmado.
- Vulnerabilidade identificada.
- Risco potencial.
- Melhoria recomendada.
- Preferência de implementação.

### Avaliação de impacto

Antes de recomendar uma alteração, avalie:

- O comportamento atual.
- As funcionalidades dependentes.
- Os consumidores do código.
- Os efeitos colaterais.
- Os riscos de regressão.
- O impacto na arquitetura.

Não corrija um problema criando outros.

## 3. Inspecionar antes de revisar

Antes de iniciar a revisão, compreenda o projeto.

### Inspeção obrigatória

Verifique:

1. A arquitetura existente.
2. A estrutura de diretórios.
3. As convenções de nomenclatura.
4. Os padrões de implementação.
5. As dependências.
6. Os componentes compartilhados.
7. As funções reutilizáveis.
8. Os serviços existentes.
9. Os mecanismos de validação.
10. Os testes disponíveis.
11. As configurações de TypeScript e lint.
12. O fluxo de CI/CD.
13. As alterações recentes.
14. Os contratos entre módulos.

### Regras

- Não avalie código isoladamente quando ele depender de outros módulos.
- Procure os locais que chamam as funções modificadas.
- Verifique quem consome os dados retornados.
- Identifique dependências indiretas.
- Compare com implementações semelhantes existentes.
- Não recomende mudanças arquiteturais sem compreender a arquitetura atual.

A revisão deve considerar o contexto real da aplicação.

## 4. Análise de tipagem TypeScript

A tipagem deve ser analisada rigorosamente.

Problemas de tipagem podem esconder defeitos que só aparecem durante a execução.

### Verificações obrigatórias

Procure:

- Uso desnecessário de `any`.
- Uso inadequado de `unknown`.
- Type assertions inseguras.
- Tipos incorretos em parâmetros.
- Retornos incompatíveis.
- Interfaces inconsistentes.
- Propriedades opcionais utilizadas sem verificação.
- Valores que podem ser `null` ou `undefined`.
- Tipos incompatíveis entre frontend e backend.
- Promises com retornos incorretos.
- Generics mal definidos.
- Union Types tratados parcialmente.
- Discriminated Unions incompletas.
- Eventos tipados incorretamente.
- Tipos duplicados.
- Contratos divergentes entre serviços.

### Uso de any

Identifique situações em que `any` esteja desativando a proteção do TypeScript.

Exemplo problemático:

```typescript
function getUser(user: any) {
  return user.name.toUpperCase();
}
```

O código não garante que `name` exista ou seja uma string.

Uma alternativa melhor:

```typescript
interface User {
  name: string;
}

function getUser(user: User): string {
  return user.name.toUpperCase();
}
```

### Type Assertions

Investigue usos como:

```typescript
const user = response.data as User;
```

Uma assertion não valida o conteúdo recebido.

Quando os dados vierem de fontes externas, verifique se existe validação em runtime.

### Non-null assertion

Identifique usos suspeitos de:

```typescript
const user = users.find((item) => item.id === id)!;
```

Verifique se existe garantia real de que o valor sempre estará presente.

Não aceite assertions apenas para eliminar erros de compilação.

### TypeScript Compiler

Quando disponível, execute:

```bash
npx tsc --noEmit
```

Respeite a configuração de TypeScript do projeto.

Não altere configurações para esconder erros encontrados durante a revisão.

## 5. Loops, iterações e complexidade algorítmica

**Loops devem receber atenção especial durante a revisão.**

Erros de iteração podem provocar consumo excessivo de CPU, memória, consultas ao banco e até indisponibilidade da aplicação.

### Loops infinitos

Identifique:

- Condições que nunca se tornam falsas.
- Contadores que não são incrementados corretamente.
- Condições de saída incorretas.
- Alterações de estado que mantêm o loop ativo.
- Recursões sem condição de parada.
- Loops assíncronos sem controle de encerramento.

Exemplo problemático:

```typescript
let index = 0;

while (index < 10) {
  processItem(index);
}
```

O contador nunca é incrementado.

### Loops aninhados

Avalie o custo de loops aninhados.

Exemplo:

```typescript
for (const user of users) {
  for (const order of orders) {
    if (order.userId === user.id) {
      // Process order
    }
  }
}
```

Para dois conjuntos com milhares de registros, esse processamento pode apresentar custo elevado.

Avalie alternativas utilizando estruturas como `Map` ou `Set`.

```typescript
const ordersByUser = new Map<string, Order[]>();

for (const order of orders) {
  const userOrders = ordersByUser.get(order.userId) ?? [];

  userOrders.push(order);
  ordersByUser.set(order.userId, userOrders);
}
```

### Complexidade

Avalie a complexidade algorítmica quando houver processamento relevante.

Considere:

- O(1).
- O(log n).
- O(n).
- O(n log n).
- O(n²).
- O(2ⁿ).

Não classifique automaticamente um algoritmo como problemático apenas por sua complexidade teórica.

Considere:

- Volume real dos dados.
- Frequência de execução.
- Limites de entrada.
- Custo das operações internas.
- Memória utilizada.
- Impacto no runtime.

### Iterações assíncronas

Procure padrões como:

```typescript
items.forEach(async (item) => {
  await processItem(item);
});
```

`forEach` não aguarda a conclusão das Promises.

Avalie se a operação exige:

- `Promise.all`.
- `Promise.allSettled`.
- `for...of` com `await`.
- Processamento em lotes.
- Controle de concorrência.

Não substitua tudo por `Promise.all` indiscriminadamente.

Considere o limite de recursos e a quantidade de operações simultâneas.

### Mutação durante iteração

Verifique:

- Remoção de elementos durante a iteração.
- Alteração do tamanho do array.
- Modificação de objetos compartilhados.
- Alteração de índices.
- Efeitos inesperados em coleções.

### Recursão

Verifique:

- Condição de parada.
- Profundidade máxima.
- Possibilidade de stack overflow.
- Repetição de processamento.
- Complexidade.

## 6. Identificação de erros de lógica

Analise o comportamento real das funções e dos fluxos.

### Problemas comuns

- Condições invertidas.
- Operadores incorretos.
- Comparações inconsistentes.
- Valores padrão incorretos.
- Estados impossíveis.
- Condições não contempl