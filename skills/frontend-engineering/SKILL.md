---
name: frontend-engineering
description: "Orienta implementação de aplicações React, TypeScript e JavaScript, incluindo componentes, hooks, estado, roteamento, formulários, APIs, desempenho e testes. Use ao criar, manter ou depurar código de frontend."
---

# Engenharia de frontend

## 1. Objetivo e escopo

Implemente interfaces com arquitetura sustentável, tipagem segura, componentes coesos, integração previsível com APIs e compatibilidade com os padrões do projeto. Esta skill cobre React, TypeScript, JavaScript, componentes, hooks, estado, roteamento, formulários, cache no cliente, desempenho e testes de frontend.

Decisões de hierarquia visual, uso, responsividade e acessibilidade de experiência pertencem principalmente à skill `ui-ux-responsive`. Consulte-a quando a tarefa alterar layout, navegação, estados visuais ou interação em diferentes telas.

## 2. Inspecione e reutilize antes de implementar

Antes de criar componentes, hooks, serviços ou utilitários:

1. Inspecione a estrutura, convenções e arquitetura existentes.
2. Procure componentes, hooks, funções e tipos reutilizáveis.
3. Identifique clientes HTTP, bibliotecas de dados e formulários já usados.
4. Verifique tokens, temas, Design System, roteamento e estratégia de testes.
5. Avalie se a solução existente pode ser estendida sem prejudicar outros consumidores.

Evite duplicar lógica ou componentes quase iguais. Não instale bibliotecas quando já existe uma solução adequada. Reutilizar não justifica abstrações genéricas, componentes excessivamente configuráveis ou mudanças globais sem avaliar impactos.

## 3. Arquitetura e organização

Mantenha responsabilidades claras entre apresentação, composição, hooks, serviços, tipos, utilitários, regras de negócio e estado. Prefira módulos coesos por funcionalidade quando o projeto já segue esse padrão.

Exemplo de estrutura possível:

```text
src/
├── components/
│   ├── ui/
│   └── shared/
├── features/
│   └── users/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── hooks/
├── services/
├── lib/
├── types/
└── utils/
```

A estrutura é ilustrativa. Não reorganize um projeto existente apenas para adotá-la. Evite dependências circulares, camadas sem necessidade e componentes monolíticos.

## 4. Componentes React

Cada componente deve ter uma responsabilidade compreensível. Extraia lógica para hook, serviço ou função quando isso melhorar coesão e manutenção, não apenas para mover linhas.

- Prefira composição por `children` e props explícitas.
- Nomeie props com clareza e tipifique seus contratos.
- Passe apenas os dados necessários em vez de objetos inteiros.
- Evite prop drilling quando a arquitetura já oferece uma solução apropriada.
- Não use dezenas de boolean props para representar combinações difíceis de compreender.
- Mantenha a renderização pura: não execute efeitos colaterais nem altere props ou estado durante render.
- Não altere arrays e objetos de estado por mutação.
- Respeite as Rules of Hooks.

## 5. TypeScript e contratos

Use tipagem explícita nas fronteiras relevantes, como props, eventos, respostas de API e parâmetros/retornos de funções importantes.

Evite `any` como atalho. Prefira `unknown` para dados ainda não verificados, type guards para narrowing, union types para alternativas e discriminated unions para estados distintos. Use generics quando a abstração for real e reutilizável. Não silencie erros com assertions indiscriminadas.

Exemplo de estados que evita combinações contraditórias:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

Mantenha tipos próximos da funcionalidade quando forem locais e em módulos compartilhados quando vários módulos dependerem do contrato. TypeScript não valida JSON, respostas HTTP nem dados externos em runtime.

Tipifique eventos React quando isso esclarecer o contrato e prefira type guards a assertions em respostas externas. Evite repetir definições de tipos ou criar interfaces globais para um único componente. Se frontend e backend compartilham schemas, reutilize-os apenas quando o projeto tiver uma estratégia compatível e mantenha validação no servidor.

## 6. Estado e dados derivados

Mantenha estado local próximo de quem o utiliza. Use estado compartilhado somente quando mais de uma área precisar dele e siga a solução adotada no projeto, como Context API, Zustand ou Redux Toolkit.

- Não mantenha estado global desnecessário.
- Não guarde uma cópia de dados que pode ser derivada de estado ou props.
- Evite duas fontes de verdade para o mesmo valor.
- Preserve imutabilidade e reduza atualizações sem propósito.
- Não adote biblioteca nova de estado sem necessidade técnica.

Quando uma atualização depender do estado anterior, use a forma funcional de atualização para evitar valor obsoleto. Mantenha estado de UI separado de dados remotos quando a biblioteca de dados já for responsável por cache, sincronização e invalidação. Context API é uma opção para dependências compartilhadas, não a resposta automática a qualquer prop drilling.

## 7. Hooks personalizados

Hooks podem encapsular comportamento reutilizável, por exemplo paginação, autenticação ou integração com dados. Dê nomes iniciados por `use`, retorne valores previsíveis e tipados e respeite as Rules of Hooks.

Não crie hooks apenas para deslocar código, nem acumule responsabilidades não relacionadas em um único hook. Mantenha dependências claras e evite ciclos entre hooks.

Exemplos de responsabilidades possíveis são `useAuth`, `usePagination`, `usePermissions`, `useDebounce` e `useUsers`; adapte nomes e local ao padrão do projeto. Um hook deve ter retorno previsível e tipado e documentação somente quando o contrato não for evidente.

## 8. Efeitos colaterais e `useEffect`

Use `useEffect` para sincronizar o componente com sistemas externos: subscriptions, listeners, timers, integrações imperativas ou requisições quando não houver mecanismo melhor já adotado.

Não use um efeito para calcular estado derivado, encadear estados evitáveis ou executar lógica que pertence a uma ação do usuário. Declare dependências corretas. Quando necessário, faça cleanup, remova listeners, limpe timers, cancele requisições ou ignore respostas obsoletas. Avalie condições de corrida e montagem/desmontagem.

Um efeito pode precisar sincronizar event listeners, subscriptions, timers, APIs do navegador ou uma integração imperativa. Antes de adicionar um efeito para buscar dados, verifique se o cliente de dados adotado já trata cache, cancelamento e refetch. Evite suprimir dependências do hook para silenciar o lint.

## 9. Integração com APIs e cache

Reutilize o cliente HTTP e os serviços existentes. Mantenha comunicação de rede separada da apresentação quando isso melhorar clareza, e tipifique contratos sem presumir que tipos eliminem validação em runtime.

Considere estados de loading, success, error e empty quando aplicáveis. Em falhas, evite deixar a interface carregando indefinidamente. Trate cancelamento e resultados obsoletos quando relevantes.

Se o projeto usa TanStack Query, SWR ou biblioteca equivalente, siga seus padrões de cache, invalidação, refetch, paginação, mutations e deduplicação. Não replique manualmente um mecanismo já oferecido pela infraestrutura.

Centralize configuração compartilhada de requisições sem criar uma camada genérica excessiva. Considere loading, success, error e empty; invalidação ou cancelamento de operação obsoleta; deduplicação; e feedback de falhas. Não deixe a tela presa em loading quando uma requisição falhar.

## 10. Formulários

Reutilize componentes, bibliotecas e schemas adotados pelo projeto. Tipifique entradas e mantenha regras compartilhadas alinhadas ao backend, sem confiar na validação do cliente como proteção.

Trate erros de campo e do servidor, envio assíncrono, estado de loading, submissões duplicadas e preservação de dados após falha recuperável. Consulte `backend` para validação autoritativa no servidor e `security` para operações sensíveis.

## 11. HTML semântico e acessibilidade técnica

Use elementos de acordo com seu significado: `main` para conteúdo principal, `nav` para navegação, `button` para ações, `a` para navegação, `form` e `label` para formulários e tabelas para dados tabulares.

| Elemento | Uso esperado |
|---|---|
| `header` | Cabeçalho de página ou seção |
| `nav` | Grupo de navegação |
| `main` | Conteúdo principal da página |
| `section` | Seção temática com propósito identificável |
| `article` | Conteúdo independente |
| `aside` | Conteúdo complementar |
| `footer` | Rodapé da página ou seção |
| `button` | Ação executável |
| `a` | Navegação para outro destino |
| `form` e `label` | Formulário e identificação de campo |
| `table` | Dados tabulares com cabeçalhos apropriados |

Evite `div` como substituto universal, links usados como botões, controles sem nome acessível e ARIA quando HTML nativo resolve. Preserve teclado, foco visível, textos alternativos adequados e associações de rótulos e mensagens. A avaliação de contraste, interação e padrões WCAG está detalhada em `ui-ux-responsive`.

Não omita o rótulo de campos nem use elemento interativo sem suporte a teclado. Imagens informativas precisam de texto alternativo apropriado; imagens decorativas não devem adicionar ruído a leitores de tela. Prefira semântica nativa e só complemente com ARIA quando necessário e corretamente aplicado.

## 12. Estilização e tokens

Respeite a estratégia de CSS e Design System do projeto. Utilize variáveis, tokens, temas e componentes compartilhados para cores, espaçamentos, tipografia, raios, sombras e breakpoints. Antes de criar um token, procure um equivalente. Não introduza framework de estilos nem valores hardcoded recorrentes sem justificativa.

Mantenha estilos coesos, evite seletores excessivamente específicos e `!important` recorrente. Consulte `ui-ux-responsive` para decisões de sistema visual, hierarquia e adaptação.

Exemplo ilustrativo de tokens implementados em CSS:

```css
:root {
  --color-primary: #123667;
  --color-background: #ffffff;
  --color-text: #172033;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}

.button {
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

Antes de introduzir variáveis, procure tokens equivalentes. Respeite a estratégia CSS do projeto, evite estilos duplicados, sobrescritas desnecessárias e alterações globais cujo efeito em outras telas não tenha sido avaliado.

## 13. Desempenho

Otimize a partir de um gargalo observado:

- Examine renders e cálculos custosos antes de usar `React.memo`, `useMemo` ou `useCallback`.
- Não use memoização indiscriminadamente.
- Considere code splitting, lazy loading e import dinâmico quando reduzirem custo inicial.
- Use keys estáveis e únicas; evite índices se a lista puder mudar.
- Para listas grandes, avalie paginação ou virtualização.
- Evite processamentos caros durante renderização.
- Use React DevTools Profiler, Chrome DevTools ou análise de bundle para localizar problemas.

Considere custo de bundle e rede antes de adicionar dependências.

Avalie code splitting, dynamic imports, carregamento sob demanda, imagens, dependências e bundle inicial. Para listas extensas, considere paginação, carregamento incremental ou virtualização, conforme o comportamento esperado. Use React DevTools Profiler, Chrome DevTools, Lighthouse ou analisador de bundle para identificar o gargalo antes de otimizar.

## 14. Erros, navegação e estados

Trate falhas de rede, respostas inválidas, autenticação, autorização, dados inexistentes e erros de renderização. Use Error Boundaries quando apropriado. Não deixe blocos `catch` vazios e não substitua falhas por dados fictícios apresentados como reais.

Siga o roteador existente, preserve URLs e comportamento de voltar/avançar e evite duplicar regras de navegação. Considere carregamento e falhas de rota. Evite recarga total em aplicações que adotam navegação SPA.

Use parâmetros e query strings de forma consistente. Não implemente navegação manual quando a biblioteca do projeto já resolver o fluxo. Verifique que rotas, layouts e componentes mantêm responsabilidades claras.

## 15. Qualidade e manutenção

Use nomes descritivos, funções proporcionais à responsabilidade e comentários somente para decisões não óbvias. Remova código morto relacionado à tarefa, mas não apague testes nem altere funcionalidades sem compreender seu papel.

Respeite lint, formatter, TypeScript e convenções existentes. Não desative regras sem justificativa. Evite dependências, componentes, estilos globais, reescritas ou arquivos alheios à tarefa sem necessidade.

Não sacrifique legibilidade para reduzir linhas de código, não reorganize módulos por preferência e não reescreva funcionalidade que já atende ao comportamento esperado. Documente decisões complexas quando isso ajudar manutenção futura.

## 16. Testes e conclusão

Consulte `testing` para testes de componentes, hooks, formulários, interações e estados. Antes de concluir:

- Verifique os estados relevantes da interface.
- Confirme contratos com APIs e tratamento de falha.
- Avalie teclado e nomes acessíveis nos elementos alterados.
- Execute testes, type checking e lint relevantes quando disponíveis.
- Revise o diff e informe exatamente o que foi e não foi validado.

## 17. Referências oficiais

- [React — Aprenda React](https://react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Testing Library](https://testing-library.com/docs/)
- [Vitest](https://vitest.dev/guide/)
- [Playwright](https://playwright.dev/docs/intro)
