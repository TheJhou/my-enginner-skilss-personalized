---
name: backend
description: Backend engineering standards for Node.js, TypeScript, APIs, services, business logic, database integration, validation, performance, reliability, and security. Enforces code reuse, server-side validation, English internal naming and comments, architectural consistency, and production-grade implementation.
---

# Backend Engineering

## 1. Objetivo

Desenvolver backends robustos, seguros, escaláveis e preparados para produção.

Toda implementação deve priorizar:

- Arquitetura organizada e sustentável.
- Reutilização de código e funcionalidades existentes.
- Validação obrigatória no servidor.
- Separação adequada de responsabilidades.
- Consultas de banco de dados performáticas.
- Segurança em todas as camadas.
- Tipagem consistente com TypeScript.
- Tratamento adequado de erros.
- APIs previsíveis e padronizadas.
- Manutenibilidade e observabilidade.
- Compatibilidade com a arquitetura existente.

**O backend é responsável pela integridade, validação, segurança e execução das regras de negócio. Nunca transfira essas responsabilidades para o frontend.**

O objetivo não é simplesmente fazer uma API funcionar, mas desenvolver serviços confiáveis que possam evoluir sem comprometer a aplicação.

## 2. Regras obrigatórias de nomenclatura e idioma

Todos os identificadores internos do backend devem utilizar inglês.

### Identificadores internos

Utilize inglês para:

- Nomes de rotas e endpoints.
- Nomes de funções.
- Nomes de variáveis.
- Nomes de constantes.
- Nomes de classes.
- Nomes de interfaces e types.
- Nomes de parâmetros.
- Nomes de propriedades internas.
- Nomes de middlewares.
- Nomes de serviços.
- Nomes de repositories.
- Nomes de schemas de validação.
- Nomes de eventos.
- Nomes de jobs.
- Nomes de filas.
- Nomes de arquivos e módulos novos.

### Comentários no código

**Todos os comentários escritos no código devem ser obrigatoriamente em inglês.**

Isso inclui:

- Comentários de linha.
- Comentários de bloco.
- Documentação de funções.
- JSDoc.
- TODOs.
- FIXMEs.
- Explicações de regras complexas.

Exemplo correto:

```typescript
// Validate the requested account before processing the transaction.
async function validateAccount(accountId: string) {
  // Implementation
}
```

Exemplo incorreto:

```typescript
// Validar a conta antes de processar a transação.
async function validateAccount(accountId: string) {
  // Implementação
}
```

Evite comentários desnecessários que apenas repetem o código.

### Conteúdo apresentado ao usuário

O conteúdo destinado ao usuário final deve permanecer em português brasileiro.

Isso inclui:

- Mensagens de erro.
- Mensagens de sucesso.
- Notificações.
- Textos de resposta da API.
- Mensagens de validação.
- E-mails.
- Textos de recuperação de senha.
- Conteúdo de URLs públicas apresentadas ao usuário.

Exemplo:

```typescript
return res.status(400).json({
  message: "Os dados informados são inválidos.",
});
```

### URLs e rotas

Diferencie identificadores internos de URLs destinadas ao usuário.

- Endpoints internos da API devem utilizar inglês.
- Nomes de parâmetros e recursos internos devem utilizar inglês.
- Links públicos, slugs e URLs apresentados ao usuário devem seguir o idioma português quando fizerem parte da experiência localizada do produto.
- Não traduza automaticamente endpoints existentes.
- Preserve contratos de API já utilizados pelos clientes.

Exemplo:

```text
API:
GET /api/customers
POST /api/accounts-payable

URL pública:
https://example.com/recuperar-senha
```

### Regras gerais

- Não misture português e inglês nos identificadores.
- Utilize `camelCase` para variáveis e funções TypeScript.
- Utilize `PascalCase` para classes, interfaces e componentes de tipos.
- Utilize `UPPER_SNAKE_CASE` para constantes realmente globais e imutáveis, quando compatível com a convenção do projeto.
- Utilize nomenclaturas consistentes em todos os módulos.

## 3. Inspecionar antes de implementar

**Antes de criar qualquer funcionalidade, procure soluções existentes no projeto.**

Não desenvolva uma segunda implementação de algo que já existe sem antes avaliar a possibilidade de reutilização.

### Inspeção obrigatória

Verifique:

1. A estrutura atual do backend.
2. As rotas existentes.
3. Os controllers e handlers.
4. Os services.
5. Os repositories e módulos de acesso ao banco.
6. Os middlewares.
7. Os schemas de validação.
8. As funções utilitárias.
9. Os helpers compartilhados.
10. Os tipos e interfaces.
11. Os mecanismos de autenticação e autorização.
12. Os padrões de tratamento de erros.
13. As bibliotecas já instaladas.
14. Os testes existentes.
15. Os padrões arquiteturais utilizados.

### Reutilização de código

Sempre que possível, transforme uma lógica existente em algo reutilizável em vez de implementar novamente a mesma funcionalidade.

Exemplo:

Imagine que o sistema possui uma função que verifica se um usuário possui acesso a determinado recurso.

Antes de criar outra função com a mesma responsabilidade:

- Localize a implementação existente.
- Entenda suas regras.
- Verifique se ela pode atender ao novo cenário.
- Avalie se pode ser generalizada sem comprometer seu comportamento.
- Reutilize ou estenda a implementação.

### Regras obrigatórias

- Evite duplicação de regras de negócio.
- Evite funções com comportamentos equivalentes.
- Reutilize validações compartilhadas.
- Reutilize middlewares existentes.
- Reutilize serviços e repositories.
- Reutilize mecanismos de autenticação e autorização.
- Evite criar utilitários redundantes.
- Não instale dependências quando já existir uma solução adequada.
- Não crie abstrações genéricas sem necessidade real.

### Atenção à reutilização

Reutilizar não significa criar uma função genérica que tenta resolver todos os problemas.

Uma abstração deve possuir uma responsabilidade clara.

Não transforme funções específicas e simples em estruturas excessivamente complexas apenas para aumentar a reutilização.

**Priorize reutilização com coesão, não reutilização artificial.**

## 4. Arquitetura e separação de responsabilidades

O backend deve possuir responsabilidades bem definidas, mantendo coerência com a arquitetura existente.

### Regra fundamental

**Não altere significativamente a arquitetura do projeto sem discutir a mudança antes da implementação.**

Quando identificar a necessidade de uma mudança estrutural:

1. Analise a arquitetura atual.
2. Identifique o problema.
3. Explique as limitações da estrutura existente.
4. Apresente a mudança proposta.
5. Explique os benefícios e os impactos.
6. Avalie alternativas menos invasivas.
7. Discuta a proposta antes de executar a refatoração.

Não reorganize módulos, diretórios ou camadas apenas por preferência pessoal.

### Separação de responsabilidades

Quando compatível com o projeto, considere a seguinte divisão:

| Camada | Responsabilidade |
|---|---|
| Routes | Definição dos endpoints e associação dos middlewares |
| Controllers / Handlers | Recebimento da requisição e composição da resposta HTTP |
| Services | Regras de negócio e orquestração |
| Repositories | Acesso e persistência de dados |
| Middlewares | Processamento transversal das requisições |
| Validators / Schemas | Validação de entradas e contratos |
| Utils | Funções utilitárias compartilhadas |
| Types | Contratos e definições de tipos |

Essa estrutura é uma referência, não uma exigência para reorganizar projetos existentes.

### Controllers

Controllers devem ser responsáveis pela comunicação HTTP.

Devem:

- Receber dados da requisição.
- Utilizar os serviços necessários.
- Definir status HTTP.
- Retornar respostas padronizadas.
- Encaminhar erros conforme a estratégia do projeto.

Evite concentrar regras complexas de negócio em controllers.

### Services

Services devem concentrar as regras de negócio.

Devem:

- Coordenar operações.
- Aplicar regras de domínio.
- Validar condições de negócio.
- Coordenar transações quando necessário.
- Utilizar repositories ou mecanismos de persistência existentes.

Evite services que apenas encapsulam uma chamada sem agregar responsabilidade ou clareza, salvo quando a arquitetura exigir.

### Repositories

Repositories devem organizar o acesso aos dados.

Devem:

- Centralizar consultas quando apropriado.
- Evitar duplicação de SQL.
- Manter consistência de acesso.
- Preservar tipagem.
- Evitar expor detalhes desnecessários do banco às camadas superiores.

Não introduza uma camada de repository artificial se