---
name: frontend-engineering
description: Frontend engineering standards for React and TypeScript applications. Guides agents in inspecting existing code, reusing components and utilities, designing maintainable architecture, implementing typed components, managing state, integrating APIs, and delivering high-quality frontend code.
---

# Frontend Engineering

## 1. Objetivo

Desenvolver aplicações frontend com alto padrão de qualidade técnica, priorizando:

- Arquitetura organizada e sustentável.
- Reutilização de componentes, hooks, funções e utilitários.
- TypeScript com tipagem consistente e segura.
- Componentes React bem estruturados.
- Separação adequada de responsabilidades.
- Manutenibilidade e escalabilidade.
- Integração consistente com APIs e serviços.
- Consistência com os padrões já existentes no projeto.
- Código limpo, legível e sem duplicações desnecessárias.

O objetivo não é apenas produzir código funcional, mas entregar implementações que possam evoluir sem gerar complexidade desnecessária.

## 2. Inspecionar antes de implementar

Esta é uma das regras mais importantes desta skill.

**Nunca comece criando um componente, função, hook ou estrutura sem antes investigar se já existe algo que possa ser reutilizado.**

Antes de implementar:

1. Inspecione a estrutura do projeto.
2. Identifique os componentes já existentes.
3. Procure hooks personalizados que possam atender à necessidade.
4. Verifique funções e utilitários compartilhados.
5. Analise os serviços responsáveis pela comunicação com APIs.
6. Identifique bibliotecas já instaladas que resolvam o problema.
7. Verifique os padrões de organização e nomenclatura.
8. Identifique o Design System e os padrões de estilização utilizados.

### Regras de reutilização

- Priorize componentes existentes quando forem compatíveis com a necessidade.
- Estenda componentes existentes quando isso fizer sentido arquiteturalmente.
- Reutilize funções e utilitários compartilhados.
- Evite implementar a mesma lógica em diferentes componentes.
- Não crie componentes praticamente idênticos com pequenas diferenças.
- Não instale bibliotecas quando o projeto já possui uma solução adequada.
- Não crie abstrações genéricas sem uma necessidade concreta.
- Não modifique componentes compartilhados de maneira que prejudique outras funcionalidades.

Quando uma implementação existente não atender completamente à necessidade, avalie se é melhor estendê-la ou criar uma nova solução.

A reutilização não deve comprometer a legibilidade, a coesão ou a responsabilidade dos componentes.

## 3. Arquitetura e organização

A organização deve facilitar a compreensão, manutenção e evolução da aplicação.

### Separação de responsabilidades

Cada parte da aplicação deve possuir responsabilidades bem definidas.

Considere separar:

- Componentes de apresentação.
- Componentes de composição.
- Hooks personalizados.
- Serviços de comunicação com APIs.
- Funções utilitárias.
- Tipos e interfaces.
- Constantes.
- Regras de negócio.
- Gerenciamento de estado.

Evite concentrar toda a lógica de uma funcionalidade em um único componente.

### Organização por funcionalidade

Quando compatível com a arquitetura existente, prefira organizar funcionalidades de forma coesa.

Exemplo:

```text
src/
├── components/
│   ├── ui/
│   └── shared/
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   └── users/
├── hooks/
├── services/
├── lib/
├── types/
└── utils/
```

Essa estrutura é apenas uma referência. Não reorganize um projeto existente apenas para seguir este exemplo.

### Princípios arquiteturais

- Mantenha componentes coesos.
- Evite acoplamento desnecessário.
- Separe apresentação de regras de negócio quando isso melhorar a manutenção.
- Evite dependências circulares.
- Prefira composição a hierarquias excessivas.
- Não crie camadas de abstração sem necessidade.
- Mantenha dependências explícitas.
- Evite componentes excessivamente grandes e difíceis de compreender.

## 4. Componentes React

Os componentes devem ser previsíveis, reutilizáveis e fáceis de manter.

### Responsabilidades

Cada componente deve ter uma responsabilidade clara.

Evite componentes que concentrem simultaneamente:

- Regras complexas de negócio.
- Comunicação direta com múltiplas APIs.
- Gerenciamento excessivo de estado.
- Processamento de dados.
- Renderização de grandes estruturas.
- Manipulação direta do DOM.

Quando necessário, extraia responsabilidades para hooks, serviços ou funções específicas.

### Composição

Priorize componentes compostos e reutilizáveis quando houver uma necessidade real.

Utilize adequadamente:

- `children`.
- Props tipadas.
- Componentes de composição.
- Hooks personalizados.
- Context API quando apropriado.

Evite criar componentes excessivamente configuráveis, com dezenas de propriedades booleanas e comportamentos difíceis de entender.

### Props

- Utilize nomes claros e descritivos.
- Defina tipos explícitos.
- Evite propriedades desnecessárias.
- Evite passar objetos inteiros quando apenas alguns campos são necessários.
- Evite prop drilling excessivo.
- Não utilize `any` para contornar problemas de tipagem.

### Pureza e previsibilidade

Componentes React devem manter a renderização previsível.

- Não execute efeitos colaterais durante a renderização.
- Não altere diretamente props ou estados.
- Não modifique objetos ou arrays de estado.
- Evite mutações compartilhadas.
- Não utilize hooks fora das regras estabelecidas pelo React.
- Mantenha a lógica de renderização livre de efeitos colaterais.

## 5. TypeScript

TypeScript deve ser utilizado para aumentar a segurança, previsibilidade e manutenibilidade do código.

### Tipagem obrigatória

- Prefira tipagem explícita nas fronteiras importantes da aplicação.
- Defina interfaces ou tipos para contratos de componentes.
- Tipifique parâmetros e retornos de funções relevantes.
- Tipifique eventos React quando necessário.
- Tipifique respostas e parâmetros de APIs.
- Evite inferências excessivamente complexas e difíceis de compreender.

### Evite `any`

Não utilize `any` como solução padrão.

Prefira:

- `unknown` para valores ainda não conhecidos.
- Type Guards para validar tipos.
- Union Types para representar alternativas.
- Discriminated Unions para estados com diferentes estruturas.
- Generics para abstrações reutilizáveis e realmente necessárias.

Exemplo:

```typescript
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

Essa abordagem evita estados contraditórios e melhora a previsibilidade do código.

### Organização de tipos

- Evite repetir definições de tipos.
- Reutilize contratos compartilhados quando apropriado.
- Mantenha tipos próximos de suas funcionalidades quando forem específicos.
- Mantenha tipos globais em locais compartilhados quando realmente forem utilizados em diferentes módulos.
- Evite interfaces excessivamente genéricas.

Não utilize assertions (`as`) indiscriminadamente para silenciar erros do compilador.

## 6. Gerenciamento de estado

O gerenciamento de estado deve ser simples e proporcional à complexidade da aplicação.

### Estado local

Utilize `useState` quando o estado pertencer exclusivamente a um componente ou a uma pequena composição de componentes.

### Estado compartilhado

Quando diferentes partes da aplicação precisarem acessar o mesmo estado, avalie:

- Context API.
- Zustand.
- Redux Toolkit.
- Bibliotecas já adotadas pelo projeto.

Não introduza uma nova biblioteca de gerenciamento de estado sem necessidade técnica.

### Regras importantes

- Mantenha o estado o mais próximo possível de quem o utiliza.
- Evite estados globais desnecessários.
- Não armazene valores que possam ser derivados de outros estados.
- Evite duplicar informações.
- Preserve a imutabilidade.
- Evite atualizações de estado desnecessárias.
- Não utilize Context API como solução automática para qualquer compartilhamento de estado.

### Estado derivado

Se um valor pode ser calculado a partir de propriedades ou estados existentes, prefira calculá-lo diretamente.

Evite manter duas fontes de verdade para a mesma informação.

## 7. Hooks e lógica reutilizável

Hooks personalizados devem encapsular comportamentos reutilizáveis e responsabilidades específicas.

Exemplos:

- `useAuth`
- `useDebounce`
- `usePagination`
- `useUsers`
- `usePermissions`
- `useForm`

### Regras

- Respeite as Rules of Hooks.
- Não execute hooks dentro de condições, loops ou funções aninhadas.
- Utilize nomes iniciados por `use`.
- Evite hooks excessivamente grandes.
- Não crie hooks apenas para mover código sem melhorar sua organização.
- Evite dependências desnecessárias entre hooks.
- Mantenha os retornos previsíveis e tipados.

## 8. useEffect e efeitos colaterais

`useEffect` deve ser utilizado principalmente para sincronizar componentes com sistemas externos.

Exemplos:

- Event listeners.
- Subscriptions.
- Timers.
- APIs externas quando não houver uma solução mais apropriada no projeto.
- Integrações com bibliotecas imperativas.
- Sincronização com APIs do navegador.

### Evite utilizar useEffect para:

- Calcular valores derivados.
- Atualizar um estado a partir de outro quando o cálculo pode ser feito diretamente.
- Executar lógica que deveria ocorrer em um evento do usuário.
- Controlar artificialmente o fluxo de renderização.
- Encadear atualizações de estado desnecessárias.

### Limpeza de efeitos

Quando necessário, implemente a função de cleanup para:

- Remover event listeners.
- Cancelar subscriptions.
- Limpar timers.
- Abortar requisições.
- Evitar atualizações decorrentes de operações obsoletas.

Sempre avalie dependências do efeito e possíveis condições de corrida.

## 9. Comunicação com APIs

A comunicação com o backend deve seguir uma arquitetura consistente.

### Organização

- Centralize configurações compartilhadas de requisições.
- Reutilize clientes HTTP existentes.
- Separe comunicação HTTP da apresentação dos componentes.
- Evite requisições duplicadas.
- Mantenha contratos tipados.
- Centralize tratamentos compartilhados quando apropriado.

### Estados assíncronos

Toda operação assíncrona que afeta a interface deve considerar:

- Loading.
- Success.
- Error.
- Empty state, quando aplicável.
- Cancelamento ou invalidação de operações obsoletas, quando necessário.

Não deixe componentes presos em estados de carregamento quando uma requisição falhar.

### Bibliotecas de gerenciamento de dados

Quando o projeto já utiliza bibliotecas como TanStack Query ou SWR, respeite os padrões existentes.

Avalie recursos como:

- Cache.
- Invalidação.
- Refetch.
- Paginação.
- Mutations.
- Sincronização.
- Deduplicação de requisições.

Não implemente manualmente mecanismos complexos que a infraestrutura existente já oferece.

## 10. Formulários e validação

Formulários devem ser consistentes, previsíveis e fáceis de manter.

- Reutilize componentes de formulário existentes.
- Utilize bibliotecas já adotadas pelo projeto.
- Tipifique os dados de entrada.
- Separe validações reutilizáveis.
- Evite duplicar regras de validação.
- Mantenha os estados de submissão e erro.
- Evite múltiplos envios acidentais.
- Preserve os valores quando ocorrerem erros recuperáveis.
- Trate corretamente operações assíncronas.

Quando houver validação compartilhada entre frontend e backend, considere reutilizar contratos ou schemas compatíveis, sem presumir que a validação do frontend substitui a validação do servidor.

## 11. Design System e estilização

A estilização deve respeitar a identidade visual e os padrões estabelecidos pelo projeto.

### Evitar hardcode

**Não espalhe valores visuais diretamente nos componentes quando eles deveriam pertencer ao Design System.**

Evite hardcode de:

- Cores.
- Espaçamentos.
- Tipografia.
- Tamanhos de fonte.
- Bordas.
- Raios de borda.
- Sombras.
- Breakpoints.
- Dimensões recorrentes.
- Camadas de sobreposição (`z-index`).

Prefira utilizar:

- CSS Variables.
- Design Tokens.
- Variáveis do tema.
- Componentes visuais compartilhados.
- Configurações do framework CSS.
- Tokens semânticos.

Exemplo:

```css
:root {
  --color-primary: #123667;
  --color-background: #ffffff;
  --color-text: #172033;

  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  --radius-md: 0.5rem;
}
```

Uso:

```css
.button {
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

O exemplo é ilustrativo. Antes de criar variáveis, identifique se o projeto já possui tokens equivalentes.

### Regras de estilização

- Respeite a estratégia CSS já adotada.
- Evite estilos duplicados.
- Evite seletores excessivamente específicos.
- Evite sobrescritas desnecessárias.
- Não introduza estilos globais sem avaliar seus impactos.
- Mantenha consistência entre componentes.
- Evite dependência excessiva de valores fixos.
- Evite utilizar `!important` como solução recorrente.

Não introduza outro framework de estilização apenas por preferência pessoal.

## 12. HTML semântico e acessibilidade técnica

A estrutura HTML deve representar corretamente o significado e a finalidade de cada elemento.

### Semântica obrigatória

Utilize elementos HTML apropriados:

| Elemento | Finalidade |
|---|---|
| `header` | Cabeçalho de uma página ou seção |
| `nav` | Área de navegação |
| `main` | Conteúdo principal |
| `section` | Seção temática |
| `article` | Conteúdo independente |
| `aside` | Conteúdo complementar |
| `footer` | Rodapé |
| `button` | Ação executável |
| `a` | Navegação para outro destino |
| `form` | Formulário |
| `label` | Identificação de campos |
| `table` | Dados tabulares |

### Evite

- Utilizar `div` para absolutamente tudo.
- Utilizar `span` como substituto de elementos semânticos.
- Utilizar botões para navegação quando um link é apropriado.
- Utilizar links para executar ações sem destino de navegação.
- Criar elementos interativos sem suporte a teclado.
- Omitir labels de campos de formulário.
- Utilizar atributos ARIA quando HTML nativo já resolve a necessidade.

### Acessibilidade técnica

- Utilize textos alternativos apropriados para imagens informativas.
- Garanta nomes acessíveis para controles.
- Preserve a navegação por teclado.
- Utilize elementos e atributos HTML de acordo com sua finalidade.
- Mantenha estados de foco visíveis.
- Utilize ARIA apenas quando necessário e corretamente.

A experiência visual, a acessibilidade aprofundada e as diretrizes de usabilidade são detalhadas na skill `ui-ux-responsive`.

## 13. Performance

A otimização deve ser baseada em problemas reais, não em suposições.

### Renderização

- Evite renders desnecessários.
- Identifique componentes que atualizam frequentemente.
- Evite passar referências instáveis sem necessidade.
- Utilize `React.memo` quando houver benefício mensurável.
- Utilize `useMemo` para cálculos custosos ou estabilização necessária de valores.
- Utilize `useCallback` quando a estabilidade da referência realmente importar.

Não utilize memoização indiscriminadamente.

### Carregamento

Avalie:

- Code splitting.
- Lazy loading.
- Dynamic imports.
- Carregamento sob demanda.
- Otimização de dependências.
- Redução do bundle.
- Otimização de imagens e recursos.

### Listas e grandes volumes de dados

- Utilize keys estáveis e únicas.
- Evite utilizar índices como keys quando a lista puder mudar de ordem ou conteúdo.
- Considere virtualização para listas extensas.
- Evite processamentos custosos durante a renderização.
- Considere paginação ou carregamento incremental.

### Medição

Antes de realizar otimizações complexas, investigue o gargalo.

Utilize ferramentas apropriadas, como:

- React DevTools Profiler.
- Chrome DevTools.
- Lighthouse.
- Ferramentas de análise de bundle.

## 14. Tratamento de erros e estados

Uma implementação de qualidade precisa considerar situações além do fluxo ideal.

Avalie:

- Erros de comunicação.
- Respostas inválidas.
- Falhas de autenticação.
- Falhas de autorização.
- Dados inexistentes.
- Operações interrompidas.
- Estados de carregamento.
- Componentes que falham durante a renderização.

Utilize Error Boundaries quando apropriado.

Não esconda erros com blocos `catch` vazios.

Não apresente dados fictícios como se fossem dados reais.

Mantenha o tratamento técnico de erros separado da apresentação das mensagens ao usuário quando isso melhorar a arquitetura.

## 15. Navegação e roteamento

Respeite a biblioteca de roteamento já utilizada pelo projeto.

- Evite implementar navegação manual sem necessidade.
- Preserve os padrões de rotas.
- Evite duplicar regras de navegação.
- Utilize parâmetros e query strings de forma consistente.
- Considere estados de carregamento e falha de navegação.
- Preserve o comportamento esperado de voltar e avançar.
- Evite recarregamentos completos quando a arquitetura utiliza navegação SPA.

Verifique se as rotas e componentes possuem responsabilidades bem definidas.

## 16. Qualidade e manutenção

Todo código desenvolvido deve apresentar qualidade suficiente para manutenção por outros desenvolvedores.

### Regras obrigatórias

- Utilize nomes descritivos.
- Evite funções excessivamente extensas.
- Evite componentes monolíticos.
- Elimine código morto.
- Evite comentários que apenas repetem o código.
- Documente decisões complexas quando necessário.
- Evite abstrações prematuras.
- Evite duplicação de lógica.
- Mantenha consistência de nomenclatura.
- Respeite lint, formatter e convenções existentes.
- Não ignore erros de TypeScript.
- Não desabilite regras de lint sem justificativa técnica.

### Não faça

- Reescrever funcionalidades que já funcionam sem necessidade.
- Alterar estruturas globais sem avaliar impactos.
- Criar componentes duplicados.
- Instalar dependências sem justificativa.
- Introduzir padrões arquiteturais apenas por preferência.
- Resolver problemas visuais com correções improvisadas.
- Sacrificar legibilidade para reduzir linhas de código.
- Modificar arquivos não relacionados à tarefa sem necessidade.

## 17. Integração com outras skills

Esta skill deve trabalhar em conjunto com as demais especialidades do projeto.

| Skill | Responsabilidade |
|---|---|
| `development-workflow` | Branches, commits, pull requests e fluxo de desenvolvimento |
| `ui-ux-responsive` | UX, layout, responsividade, design