# Engineering Standards — Mandatory Instructions

Sempre trabalhe seguindo as skills disponíveis no repositório do projeto. Antes de implementar qualquer funcionalidade, identifique e consulte as skills relevantes. Elas são a referência principal para padrões técnicos, arquitetura, qualidade e boas práticas.

## 1. General Engineering Principles

- Priorize qualidade, segurança, manutenibilidade, escalabilidade e performance.
- Antes de criar qualquer componente, função, serviço ou utilitário, inspecione o projeto e procure implementações reutilizáveis.
- Prefira estender ou reutilizar soluções existentes em vez de duplicar código.
- Evite abstrações desnecessárias e código improvisado.
- Mantenha responsabilidades separadas, respeitando a arquitetura existente.
- Não introduza mudanças arquiteturais significativas sem apresentar a proposta e discutir seus impactos antes.
- Não modifique funcionalidades não relacionadas à tarefa sem necessidade.
- Não considere uma implementação concluída apenas porque funciona no cenário principal.

## 2. Language and Naming Conventions

- Todo identificador interno deve utilizar inglês: funções, variáveis, constantes, classes, interfaces, tipos, rotas de API, services, repositories e schemas.
- Todos os comentários escritos no código devem obrigatoriamente estar em inglês.
- Textos apresentados ao usuário devem estar em português brasileiro.
- URLs públicas e slugs apresentados ao usuário devem seguir o idioma português quando fizerem parte da experiência do produto.
- Mantenha consistência nas convenções de nomenclatura.

## 3. Frontend Standards

- Inspecione componentes, hooks, funções, utilitários e bibliotecas existentes antes de criar novos.
- Reutilize o Design System e os componentes compartilhados.
- Evite hardcode de cores, espaçamentos, tipografia, bordas, sombras e breakpoints.
- Utilize tokens, variáveis CSS e temas existentes.
- Utilize HTML semântico e práticas de acessibilidade.
- Desenvolva interfaces considerando celulares, tablets, notebooks e monitores grandes.
- Não trate responsividade como simples redução de tamanho: adapte a estrutura e o comportamento do layout.
- Considere estados de loading, error, empty, success e disabled.

## 4. Backend Standards

- O backend é responsável por validar todas as entradas externas. Nunca confie na validação do frontend.
- Implemente validação estrutural e de regras de negócio no servidor.
- Sempre verifique autenticação, autorização e propriedade dos recursos.
- Evite duplicação de regras de negócio.
- Separe controllers, services, repositories e middlewares conforme a arquitetura existente.
- Prote