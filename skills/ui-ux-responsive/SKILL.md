---
name: ui-ux-responsive
description: "Orienta design de interface, experiência de uso, responsividade, sistemas visuais e acessibilidade. Use ao criar ou ajustar hierarquia, navegação, layout, interação e apresentação em diferentes telas."
---

# Interface, UX e responsividade

## 1. Objetivo e escopo

Crie experiências compreensíveis, consistentes e acessíveis que se adaptem ao conteúdo e ao espaço disponível. Esta skill orienta decisões de hierarquia, navegação, layout, design system, feedback e interação em celular, tablet e desktop.

A skill `frontend-engineering` trata da arquitetura e implementação técnica em React, TypeScript, componentes, estado e APIs. Consulte as duas quando uma tarefa envolver decisões de experiência e código de interface.

## 2. Inspecione o produto antes de desenhar

Antes de alterar uma tela, examine:

- Identidade visual, Design System, tokens e temas.
- Componentes compartilhados, padrões de navegação e formulários.
- Hierarquia, linguagem visual e densidade de conteúdo em telas semelhantes.
- Breakpoints e regras responsivas já existentes.
- Requisitos de acessibilidade e limitações do produto.

Reutilize o padrão que resolve a necessidade. Não crie uma linguagem visual paralela, breakpoints novos ou componentes duplicados sem justificativa. Preserve a identidade e o comportamento das demais áreas.

## 3. Sistema visual e consistência

Use tokens existentes para cor, tipografia, espaçamento, dimensões, bordas, sombras e níveis de sobreposição. Não introduza cores ou valores arbitrários quando o produto já possui um sistema. Se faltar um token, proponha um valor semântico e consistente em vez de espalhar números isolados.

- Use cores semânticas e considere os estados hover, focus, active, selected e disabled.
- Não comunique estado apenas por cor.
- Mantenha hierarquia tipográfica e escalas de espaçamento coerentes.
- Reserve sombras, bordas e ênfase visual para comunicar estrutura; não as use para esconder hierarquia confusa.
- Respeite temas existentes, inclusive modo escuro, quando disponível.

## 4. Hierarquia, conteúdo e navegação

Organize a interface para que a pessoa identifique objetivo, conteúdo principal, ações e próximos passos. Agrupe informações relacionadas, use títulos descritivos e mantenha rótulos consistentes.

- Priorize ações pelo contexto e frequência; não torne ações secundárias mais fortes que a tarefa principal.
- Prefira rótulos específicos a textos vagos como “OK” ou “Clique aqui”.
- Mantenha navegação previsível e indique localização e estado atual.
- Não esconda funções essenciais para simplificar uma tela pequena.
- Para formulários, explique campos, requisitos e erros junto à tarefa correspondente.
- Para tabelas densas, avalie alternativas de leitura móvel sem remover contexto ou ações necessárias.

## 5. Responsividade planejada pelo conteúdo

Considere celular, tablet, notebook e monitor amplo desde o início. Mobile-first é útil quando o conteúdo e o fluxo permitem, mas não é uma regra absoluta: adapte a ordem e a estrutura ao uso real.

As faixas abaixo são cenários de inspeção, não breakpoints obrigatórios:

| Cenário de validação | Largura aproximada |
|---|---:|
| Celular pequeno | 320–375 CSS px |
| Celular comum | 376–430 CSS px |
| Celular grande | 431–599 CSS px |
| Tablet | 600–1023 CSS px |
| Notebook | 1024–1439 CSS px |
| Monitor amplo | 1440 CSS px ou mais |

Defina breakpoints quando o conteúdo deixar de funcionar, usando os tokens e padrões do projeto. Não otimize para um modelo específico de telefone.

Em cada largura relevante, avalie containers, grids, sidebars, menus, cabeçalhos, tabelas, formulários, modais, dashboards, gráficos e listas. Responsividade não é apenas reduzir elementos: pode exigir reordenar conteúdo, substituir navegação, recolher controles ou oferecer outra representação.

## 6. Layout e adaptação

Use as ferramentas de layout de acordo com a estrutura:

- Grid para distribuição em duas dimensões, áreas e conjuntos de cartões.
- Flexbox para alinhamento e distribuição em uma direção.
- Media Queries quando a composição depender da viewport.
- Container Queries quando a adaptação depender do espaço do componente dentro do seu contexto.

Prefira dimensões flexíveis como `minmax()`, `min()`, `max()`, `clamp()` e unidades relativas quando apropriado. Evite dimensões fixas que cortem texto ou gerem overflow. `position: absolute` não deve ser a solução padrão para organizar conteúdo.

## 7. Interação em dispositivos móveis

Projete para toque sem depender de hover ou gestos sem alternativa.

- Ofereça alvos confortáveis e espaço entre controles.
- Como objetivo prático, prefira alvos próximos de 44 × 44 CSS px quando o layout permitir.
- O critério WCAG 2.2 2.5.8 nível AA define, em geral, 24 × 24 CSS px ou espaçamento suficiente, sujeito às exceções do próprio critério; 44 × 44 px é uma recomendação de conforto, não o mínimo desse critério.
- Mantenha as ações frequentes acessíveis sem menus que ocupem desnecessariamente a tela.
- Considere uso com uma mão, orientação, teclado conectado e ampliação de conteúdo.
- Mantenha controles visíveis e distinguíveis por forma, texto ou ícone com nome acessível.

## 8. Acessibilidade — referência WCAG 2.2 AA

Use WCAG 2.2 nível AA como referência de projeto. Esta skill não substitui uma auditoria formal nem garante conformidade por si só.

Avalie a experiência com teclado, leitores de tela, ampliação, contraste, movimento reduzido e diferentes formas de entrada:

- Use ordem de foco coerente, foco visível e operação integral por teclado.
- Garanta nomes acessíveis e rótulos associados a controles.
- Use HTML semântico; complemente com ARIA somente quando necessário.
- Verifique contraste de texto e componentes e não dependa exclusivamente da cor.
- Forneça texto alternativo para imagens informativas; imagens decorativas devem ser ignoradas por tecnologia assistiva.
- Associe instruções e erros aos campos e anuncie atualizações de estado quando apropriado.
- Evite armadilhas de teclado e mantenha o foco previsível em modais e menus.
- Respeite preferências de movimento reduzido e evite animações que causem desconforto.
- Confira reflow e zoom sem perda de conteúdo ou função.

## 9. Estados, feedback e recuperação

Para cada fluxo, projete os estados que ajudam a pessoa a entender o que está acontecendo:

- Inicial, carregando, sucesso, vazio, erro, desabilitado e sem permissão, quando aplicáveis.
- Confirmação para ações destrutivas ou irreversíveis.
- Feedback perceptível após ações e prevenção de envios duplicados.
- Mensagens que expliquem o problema e indiquem uma forma de recuperação.
- Preservação dos dados digitados após erros recuperáveis.

Não apresente dados fictícios como reais nem esconda falhas com estados visuais ambíguos.

## 10. Verificação de interface

Valide fluxos representativos em larguras e orientações relevantes. Inspecione conteúdo realista, texto longo, zoom, estados de erro e foco, navegação por teclado e contraste. Use ferramentas de acessibilidade como apoio, complementando a verificação com avaliação manual de interação.

Antes de concluir, confirme:

- A hierarquia e a navegação permanecem compreensíveis.
- O conteúdo não é cortado nem exige rolagem bidimensional indevida.
- Os controles funcionam com teclado e toque.
- Foco, labels, erros e estados são perceptíveis.
- Tokens e padrões existentes foram respeitados.
- Limitações e verificações realizadas foram relatadas.

## 11. Referências oficiais

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Entendimento do critério 2.5.8 — Tamanho do alvo (mínimo)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [MDN Web Docs](https://developer.mozilla.org/)
- [React — Aprenda React](https://react.dev/learn)
