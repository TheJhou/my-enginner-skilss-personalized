---
name: code-review
description: "Define revisão técnica baseada em evidências para código existente ou recém-alterado. Use para encontrar defeitos, regressões, riscos de segurança, tipagem, concorrência, desempenho e lacunas relevantes de teste antes da aprovação."
---

# Revisão de código

## 1. Objetivo e princípios

Revise mudanças no contexto real do projeto para encontrar defeitos que possam afetar comportamento, segurança, integridade, confiabilidade ou manutenção. Compilar, passar no lint ou funcionar no cenário principal não prova, isoladamente, que uma mudança está correta.

Baseie cada apontamento em evidência verificável. Diferencie defeito confirmado, risco potencial e recomendação. Não invente vulnerabilidades nem recomende alterações apenas por preferência pessoal. Avalie efeitos colaterais, consumidores, compatibilidade e risco de regressão antes de sugerir uma correção.

## 2. Entenda o contexto

Antes de revisar, identifique:

- O objetivo da mudança e os arquivos efetivamente alterados.
- A arquitetura, convenções, dependências e padrões relacionados.
- Chamadores, consumidores, contratos e estados que dependem do código.
- Validações, autorização, persistência, tratamento de erros e logs envolvidos.
- Testes, configurações, lint, type checking e CI disponíveis.

Não avalie uma função isoladamente quando seu comportamento depender de outros módulos. Compare com padrões existentes e leia o contexto necessário sem presumir que uma preferência arquitetural seja regra do projeto.

## 3. Correção lógica e casos de borda

Procure, entre outros problemas:

- Condições invertidas, operadores incorretos ou comparações inconsistentes.
- Valores padrão errados, estados impossíveis ou transições inválidas.
- Caminhos de execução que não tratam entradas ausentes, vazias, inválidas ou fora dos limites.
- Erros de arredondamento, datas, fuso horário, precisão numérica ou ordenação.
- Retornos que violam o contrato ou falhas tratadas como sucesso.
- Recursos não liberados, efeitos colaterais inesperados ou mutação compartilhada.
- Condições de corrida, duplicação de operações ou perda de atualização.
- Loops sem saída, recursão sem condição de parada e trabalho assíncrono não aguardado.

Verifique fronteiras e cenários negativos relacionados ao comportamento real; não exija cobrir categorias sem pertinência.

## 4. TypeScript e contratos

Investigue:

- Uso desnecessário de `any` e propagação de tipos inseguros.
- `unknown` utilizado sem narrowing ou validação.
- Type assertions e non-null assertions sem garantia demonstrável.
- Valores que podem ser `null` ou `undefined` e não são tratados.
- Tipos de parâmetros e retornos incompatíveis com o contrato.
- Union Types tratados parcialmente, generics mal definidos e interfaces divergentes.
- Dados externos tratados como válidos só porque têm uma anotação TypeScript.

Exemplo arriscado:

```ts
const user = response.data as User;
```

A assertion não valida a resposta em runtime. Verifique se dados externos passam por schema, type guard ou validação equivalente.

## 5. Loops, Promises e complexidade

Examine condições de parada, progresso de contadores, recursão, trabalho por item e mutações durante iteração. Para algoritmos relevantes, estime o custo e confronte-o com o volume e a frequência esperados; complexidade teórica, sozinha, não prova um problema.

Exemplo de padrão que não aguarda as operações:

```ts
items.forEach(async (item) => {
  await processItem(item);
});
```

Avalie execução sequencial, concorrência limitada, lotes, `Promise.all` ou `Promise.allSettled` de acordo com dependências, tolerância a falhas e capacidade do serviço. Não substitua toda iteração por concorrência ilimitada.

## 6. Segurança, autorização e dados

Examine entradas externas, autenticação, autorização por recurso e propriedade, validação no servidor, exposição de dados, injeção, segredos, uploads e controles de abuso. Verifique se o cliente pode alterar um ID ou propriedade e acessar dados de outra pessoa ou tenant. Não considere controles visuais no frontend como autorização.

Consulte a skill `security` para análise aprofundada e a skill `database` para SQL, schema, transações, constraints e migrations. Aponte uma vulnerabilidade como confirmada somente quando a evidência demonstrar a falha; caso contrário, descreva o cenário como risco a verificar.

## 7. Desempenho, memória e confiabilidade

Considere:

- Consultas ou chamadas repetidas, N+1, carregamento excessivo e falta de paginação.
- Loops aninhados custosos, processamento síncrono no event loop e operações sem limites.
- Promises rejeitadas, timeouts, retries sem limite e falhas parciais.
- Recursos, subscriptions, timers ou listeners que não são liberados.
- Alocação de grandes estruturas, caches sem política e closures que mantêm dados vivos.
- Dependências externas indisponíveis e comportamento de fallback.

Não recomende otimizações sem evidência ou relevância para volume, latência, frequência e recursos do ambiente.

## 8. Testes e regressões

Determine quais testes, type checking ou lint são relevantes para as alterações. Execute verificações quando houver ambiente e comando disponíveis e quando isso acrescentar evidência. Não é necessário executar testes indiscriminadamente em toda revisão.

Avalie se os testes cobrem:

- Caminhos positivos e negativos da regra alterada.
- Limites, permissões e erros relevantes.
- Contratos afetados entre módulos.
- A regressão específica que a mudança pretende evitar.

Não altere testes para esconder defeitos e não declare resultados que não foram executados. Consulte a skill `testing` para estratégia e padrões de testes.

## 9. Severidade e formato dos apontamentos

Classifique cada achado:

| Severidade | Uso |
|---|---|
| Critical | Exploração ou falha provável com impacto grave e amplo; exige ação imediata |
| High | Defeito importante que pode comprometer dados, segurança ou funcionalidade central |
| Medium | Defeito com impacto delimitado ou que depende de condições específicas plausíveis |
| Low | Problema de baixo impacto ou de ocorrência rara |
| Informational | Observação sem defeito confirmado, oportunidade ou contexto relevante |

Para cada achado, informe:

1. Severidade.
2. Arquivo e localização precisa.
3. Descrição objetiva do comportamento.
4. Evidência técnica no diff ou contexto.
5. Consequência possível e condições necessárias.
6. Recomendação acionável.

Separe os achados confirmados dos riscos potenciais. Ordene por severidade. Evite comentários vagos, repetidos ou sem ação clara. Se não houver achados, diga isso e registre limitações da revisão, como verificações não executadas.

## 10. Conclusão da revisão

Antes de finalizar, verifique que:

- Os achados estão ligados a linhas e evidências atuais.
- A severidade corresponde ao impacto e à probabilidade.
- As recomendações respeitam arquitetura e contratos.
- Testes ou verificações executados e não executados estão identificados.
- Riscos potenciais não foram apresentados como defeitos confirmados.
