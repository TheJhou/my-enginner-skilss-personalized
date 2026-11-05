---
name: backend
description: "Orienta implementação e manutenção de Node.js, TypeScript, APIs, validação, regras de negócio, operações assíncronas, integrações, observabilidade, desempenho e confiabilidade. Use ao criar ou alterar serviços e endpoints de backend."
---

# Engenharia de backend

## 1. Objetivo e escopo

Desenvolva backends confiáveis, seguros, previsíveis e preparados para evoluir. Esta skill cobre serviços Node.js e TypeScript, APIs REST, controllers e handlers, regras de negócio, validação, middlewares, integrações externas, filas, logging, observabilidade, desempenho, concorrência e resiliência.

Banco de dados e segurança têm skills próprias. Consulte também `database` para decisões de schema, SQL e migrations e `security` para análise de ameaças e controles. Esta skill explica como integrar essas preocupações ao trabalho de backend sem substituir as especialidades.

## 2. Inspecione o projeto antes de implementar

Antes de criar ou alterar um endpoint ou serviço, inspecione:

- A arquitetura, os módulos e os padrões de nomenclatura existentes.
- Rotas, controllers, handlers, services, repositories, middlewares e validators.
- Regras de negócio, contratos de API e consumidores das respostas.
- Autenticação, autorização, tratamento de erros e logging.
- Dependências, configuração do TypeScript e testes disponíveis.

Prefira estender uma implementação coesa já existente. Não replique validações, regras de domínio, integração HTTP ou tratamento de erros. Uma abstração nova deve resolver uma necessidade concreta e ter uma responsabilidade clara.

Não reorganize camadas só para seguir um modelo. A divisão abaixo é uma referência, não uma ordem para reestruturar o projeto:

| Camada | Responsabilidade típica |
|---|---|
| Routes | Declarar endpoints e associar middlewares |
| Controllers/handlers | Interpretar a requisição e compor a resposta HTTP |
| Services | Aplicar regras de negócio e orquestrar operações |
| Repositories | Encapsular acesso a dados quando a arquitetura os utiliza |
| Middlewares | Tratar preocupações transversais |
| Validators/schemas | Validar entradas e contratos |

## 3. Entradas, validação e contratos

Toda entrada externa deve ser validada no servidor, mesmo quando o frontend já valida os mesmos campos. TypeScript não valida dados em runtime.

- Valide estrutura, tipo, tamanho, formato, limites e regras de negócio na fronteira apropriada.
- Rejeite campos desconhecidos ou propriedades não permitidas quando isso fizer parte do contrato.
- Converta dados externos para tipos internos validados antes de usá-los.
- Retorne erros consistentes, sem expor stack traces, SQL, segredos ou detalhes internos.
- Preserve métodos, URLs, status, formatos e comportamentos consumidos por clientes existentes; mudanças incompatíveis precisam de plano explícito.

Não duplique a lógica de validação entre rotas se houver schemas compartilhados adequados. Separe validação de transporte das regras de domínio quando isso melhorar a clareza.

## 4. Regras de negócio e autorização

Mantenha as regras de negócio em uma camada apropriada à arquitetura do projeto; evite concentrar regras complexas em controllers. Reutilize serviços existentes e preserve invariantes do domínio.

Em operações protegidas:

- Autentique a identidade conforme o mecanismo existente.
- Verifique autorização para a ação e para o recurso específico.
- Confirme propriedade ou vínculo com o tenant em cada leitura, alteração, remoção, exportação ou operação relacionada.
- Não confie em IDs, roles ou permissões enviados pelo cliente.
- Limite campos que podem ser lidos ou alterados; não exponha entidades completas sem necessidade.

A skill `security` detalha autorização por objeto, função e propriedade, além de ameaças como BOLA/IDOR. Considere-a para qualquer operação sensível.

## 5. APIs, erros e integrações

Mantenha APIs consistentes com o projeto:

- Utilize convenções existentes para rotas, verbos, status HTTP, paginação, filtros e envelopes de resposta.
- Diferencie erros de validação, autenticação, autorização, ausência de recurso e falhas internas.
- Trate erros de dependências sem esconder falhas ou retornar sucesso fictício.
- Defina limites e timeouts para chamadas externas quando a biblioteca e o serviço permitirem.
- Considere retries apenas para operações seguras ou idempotentes; use backoff e limites para evitar duplicação e tempestades de requisições.
- Para integrações sujeitas a repetição, avalie idempotência, deduplicação e reconciliação.

Evite alterar contratos existentes incidentalmente. Documente mudanças de comportamento e compatibilidade.

## 6. Assincronicidade e concorrência

Use `async`/`await` de forma explícita e propague falhas. Evite Promises sem tratamento e callbacks assíncronos em APIs que não aguardam o resultado, como `forEach`.

Escolha a estratégia de concorrência pelo volume e pelos limites do recurso:

- Operações independentes e pequenas podem usar `Promise.all`.
- Quando cada resultado precisa ser avaliado apesar de falhas individuais, considere `Promise.allSettled`.
- Use execução sequencial quando houver dependência ou quando a concorrência puder sobrecarregar o sistema.
- Para grandes volumes, use processamento em lotes e limite de concorrência.
- Em filas, defina política de retry, idempotência, dead-letter ou procedimento equivalente conforme a infraestrutura existente.

Considere timeouts, cancelamento, corrida entre operações, reentrância, encerramento gracioso e uso de memória. Não introduza fila ou sistema de concorrência sem necessidade comprovada.

## 7. Persistência e desempenho

Avalie o custo das operações relevantes e evite consultas ou chamadas repetidas desnecessárias. Procure padrões N+1, carregamento excessivo, paginação ausente e processamento que cresce com entradas sem limite.

Use o mecanismo de persistência que o projeto já adota. Quando o trabalho envolver schema, SQL, índices, transações, migrations ou plano de execução, consulte `database`. Não crie outra abstração de acesso a dados apenas por preferência.

Meça gargalos antes de otimizações complexas e considere o custo de CPU, memória, I/O e rede.

## 8. Segurança, configuração e dados

- Armazene segredos em configuração segura do ambiente ou no gerenciador já utilizado pelo projeto; nunca os inclua no código ou em respostas.
- Não registre senhas, tokens, chaves, dados financeiros completos ou outros dados sensíveis.
- Reduza dados pessoais ao mínimo necessário e limite sua retenção conforme o produto.
- Configure CORS, cookies, rate limiting, headers, uploads e proteção contra abuso conforme a arquitetura e a ameaça.
- Use queries parametrizadas e bibliotecas criptográficas estabelecidas.
- Não exponha mensagens internas de dependências em respostas públicas.

Aplique os controles relevantes à superfície e ao modelo de ameaça; não acrescente mecanismos indiscriminadamente.

## 9. Logging e observabilidade

Registros devem ajudar a diagnosticar comportamento sem revelar dados sensíveis.

- Reutilize o logger e os campos de correlação já adotados.
- Registre falhas com contexto útil, identificadores de correlação e metadados permitidos.
- Evite duplicar logs em várias camadas para o mesmo evento.
- Não trate logs como substitutos de métricas ou rastreamento quando estes forem necessários.
- Preserve níveis e formatos usados pelo ambiente operacional.

## 10. Testes e conclusão

Consulte `testing` para escolher os níveis de teste apropriados. Cubra regras de negócio, validação, autorização, erros, concorrência e contratos conforme o risco. Não execute testes contra serviços ou dados de produção.

Antes de concluir:

- Confirme compatibilidade com contratos existentes.
- Verifique que a entrada é validada no servidor.
- Verifique autorização e propriedade do recurso em toda operação protegida.
- Avalie falhas, timeouts, limites e idempotência onde aplicável.
- Execute as validações relevantes disponíveis e informe o resultado real.

## 11. Referências oficiais

- [Node.js](https://nodejs.org/docs/latest/api/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [OWASP Top 10](https://owasp.org/projects/top-ten)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
