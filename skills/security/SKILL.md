---
name: security
description: "Orienta threat modeling e segurança de aplicações, APIs, autenticação, autorização, sessões, tokens, dados e infraestrutura. Use ao criar, revisar ou alterar superfícies que protegem recursos, credenciais ou informações sensíveis."
---

# Segurança de aplicações

## 1. Objetivo e escopo

Identifique, previna e corrija vulnerabilidades ao longo do ciclo de vida da aplicação. Esta skill cobre threat modeling, APIs, autenticação, autorização, sessões, tokens, validação, injeção, XSS, CSRF, SSRF, uploads, segredos, criptografia, dependências, logs e configuração.

Aplique controles de acordo com a arquitetura, o modelo de ameaça e o impacto. Não adicione mecanismos indiscriminadamente. Consulte `backend` para desenho dos serviços, `database` para persistência e `testing` para verificações de segurança reproduzíveis.

## 2. Princípios fundamentais

1. Não confie em dados recebidos do cliente nem em validação executada apenas no frontend.
2. Autenticação confirma identidade; não substitui autorização.
3. Aplique menor privilégio em contas, serviços, permissões e dados.
4. Valide entradas nas fronteiras do sistema e codifique saídas conforme o contexto.
5. Não exponha segredos, dados sensíveis ou detalhes internos em respostas e logs.
6. Use bibliotecas criptográficas e protocolos estabelecidos; não crie criptografia própria.
7. Defina autorização explícita e aplique defesa em profundidade.
8. Não desative controles de segurança para contornar um problema de implementação.
9. Avalie o impacto de segurança de alterações relevantes de arquitetura e dependências.
10. Diferencie falhas confirmadas de hipóteses que ainda precisam de validação.

## 3. Threat modeling e superfícies de ataque

Antes de implementar uma funcionalidade sensível, identifique:

- Quem pode acessar a função e quais operações pode executar?
- Quais dados são controlados por usuário, tenant ou serviço externo?
- Quais segredos e dados pessoais estão envolvidos?
- Quais serviços são confiáveis e quais limites de confiança existem?
- O que ocorre em falhas de autenticação, autorização ou dependência?
- Há abuso por automação, enumeração, repetição ou volume?
- Um usuário pode atravessar fronteiras entre contas ou tenants?

Considere as fronteiras entre navegador e frontend, frontend e API, API e banco, aplicação e serviços externos, e ambientes de desenvolvimento e produção. Use OWASP Top 10, OWASP API Security Top 10 e ASVS como referências, ajustadas ao contexto.

## 4. Autenticação e senhas

Use o mecanismo estabelecido pelo projeto. Valide credenciais no servidor, proteja endpoints contra força bruta e retorne mensagens que não revelem desnecessariamente se uma conta existe. Considere autenticação reforçada para ações de alto impacto.

Senhas não podem ser armazenadas em texto puro nem protegidas com criptografia reversível como substituto de hash. Use biblioteca mantida e algoritmo apropriado para senhas, como Argon2id, scrypt ou bcrypt, com parâmetros alinhados à orientação atual da OWASP. Use salt único por senha; não implemente hash manualmente e não registre nem retorne hashes.

Recuperação de conta, troca de e-mail e redefinição de senha também são fluxos de autenticação: limite tentativas, use tokens de uso único e expiração adequada e evite revelar existência de conta.

## 5. Autorização e controle de acesso

Verifique autorização em toda operação protegida, inclusive leitura, atualização, exclusão, exportação e acesso a recursos relacionados. Nunca confie em botão oculto, role, tenant ou ID enviado pelo cliente.

### 5.1 Autorização por objeto (BOLA/IDOR)

Associe a consulta à identidade ou ao escopo autorizado. Uma busca apenas pelo ID recebido não demonstra permissão:

```ts
const invoice = await db.invoice.findFirst({
  where: {
    id: request.params.id,
    tenantId: authenticatedUser.tenantId
  }
});
```

Adapte a condição ao modelo real de propriedade; não copie esse exemplo sem verificar as regras do produto. Teste IDs de outro usuário e tenant.

### 5.2 Autorização por função e propriedade

Proteja operações administrativas e ações sensíveis com política de permissão explícita. Controle também quais campos a pessoa pode ler e modificar. Use schemas de entrada e DTOs de resposta em vez de retornar entidades inteiras.

Campos como `passwordHash`, `role`, `permissions`, `isAdmin`, `tenantId`, `internalNotes`, `accessToken` e `refreshToken` exigem tratamento explícito.

## 6. Sessões e cookies

Use IDs imprevisíveis, expiração e invalidação no servidor. Não coloque identificadores de sessão em URLs. Renove o identificador após login ou elevação de privilégio quando o mecanismo permitir. Invalide sessões após logout, comprometimento ou mudanças de credenciais conforme a política do produto.

Para cookies de autenticação, avalie `HttpOnly`, `Secure`, `SameSite`, `Path`, `Domain` e expiração. A configuração deve refletir HTTPS, domínios e fluxos de implantação reais. Não use `SameSite=None` sem `Secure` e requisito cross-site documentado.

Não trate apagar o cookie no navegador como revogação de sessão roubada: implemente invalidação no servidor quando necessária. Evite guardar credenciais de autenticação em `localStorage` como padrão; se a arquitetura exigir token acessível por JavaScript, avalie XSS, duração, refresh e revogação.

Se cookies autenticam requisições, avalie CSRF. Combine mecanismos adequados, como token anti-CSRF, SameSite e validação de origem. CORS, isoladamente, não impede CSRF.

## 7. Tokens e JWT

Tokens são credenciais. Não os registre, exponha em URLs ou inclua dados sensíveis no payload. Proteja chaves de assinatura, defina expiração e estratégia de renovação e revogação.

Ao verificar JWT:

- Restrinja algoritmos permitidos de acordo com a configuração confiável; não aceite algoritmo escolhido sem validação.
- Verifique assinatura, emissor, audiência, expiração e demais claims exigidos pelo contrato.
- Use chaves fortes e rotação com período de sobreposição planejado.
- Não interprete payload apenas decodificado como confiável.
- Avalie replay, roubo e revogação para o caso de uso.

Não adote JWT quando uma sessão opaca existente resolver o problema com menos complexidade.

## 8. Validação, sanitização e saída

Valide tipo, formato, tamanho, faixa e estrutura no servidor. Use schemas conhecidos e rejeite propriedades não permitidas quando houver risco de mass assignment. Canonicalize apenas quando isso for apropriado ao tipo de dado; sanitização genérica não substitui validação.

Codifique a saída para seu contexto: HTML, atributo, JavaScript, URL ou SQL têm regras diferentes. Evite interpolar conteúdo não confiável em HTML, scripts ou templates. Não use validação de entrada como único controle contra XSS ou injeção.

## 9. Injeção e execução

Use consultas parametrizadas para SQL. Não concatene entrada em query, comandos shell, LDAP, templates ou expressões. Para nomes dinâmicos de tabela/coluna que não aceitam parâmetro, use allowlist estrita. Evite executar código ou comandos construídos com dados externos.

Avalie SQL injection, command injection, template injection, NoSQL injection e prototype pollution conforme a tecnologia e os pontos de entrada reais.

## 10. XSS e segurança do navegador

Evite APIs que inserem HTML diretamente. Se conteúdo rico for requisito, use sanitizador mantido e política explícita. Configure Content Security Policy conforme a aplicação, sem tratá-la como substituto de saída segura. Use headers de segurança e política de origem adequados à arquitetura.

Não exponha tokens ou segredos em JavaScript, URLs, source maps públicos ou mensagens de erro.

## 11. CSRF, CORS e SSRF

- CSRF: proteja operações mutáveis autenticadas por cookies, verificando origem e usando medidas anti-CSRF apropriadas.
- CORS: permita somente origens e métodos necessários. Não combine credenciais com origens curingas.
- SSRF: restrinja destinos de requisições do servidor, prefira allowlists, bloqueie endereços privados/locais quando aplicável e revalide DNS/redirecionamentos para evitar bypass.
- Não aceite URLs fornecidas pelo usuário para o servidor buscar sem validação e controles de rede.

## 12. Rate limiting e abuso

Aplique limites proporcionais à sensibilidade, custo e identidade do endpoint. Considere login, recuperação de senha, busca, envio de mensagens, exportações, uploads e operações de alto custo.

Use quotas, limites de payload, timeout, concorrência e mecanismos contra automação conforme a ameaça. Uma restrição deve funcionar entre instâncias e proxies quando o ambiente exige coordenação distribuída; não presuma que um contador local protege um serviço escalado.

## 13. Uploads e arquivos

Defina limite de tamanho, quantidade e tipos permitidos. Não confie apenas na extensão ou no Content-Type declarado pelo cliente. Gere nomes de armazenamento, isole arquivos fora da raiz executável, controle autorização de leitura e avalie malware ou processamento seguro conforme o risco.

Proteja downloads contra path traversal e exposição de arquivos internos. Evite processar conteúdo não confiável com ferramentas ou permissões excessivas.

## 14. Segredos, criptografia e dados

Armazene segredos em mecanismo de configuração segura já adotado pelo ambiente. Restrinja acesso, remova segredos de logs e histórico quando expostos e planeje rotação. Não grave credenciais em código, exemplos, commits ou mensagens de erro.

Use protocolos e primitivas atuais de bibliotecas reconhecidas. Proteja chaves separadamente dos dados criptografados. Criptografia não substitui controle de acesso, gestão de chaves ou minimização de dados.

Colete e retenha somente dados necessários. Proteja dados pessoais e financeiros em trânsito, repouso, logs, backups e exportações segundo a política aplicável.

## 15. Erros, logs e auditoria

Respostas externas devem ser claras, mas não expor stack traces, queries, caminho local, segredo ou configuração. Registre eventos úteis sem senha, token, chave, session ID ou conteúdo sensível completo. Use mascaramento e identificadores de correlação seguros.

Audite alterações de privilégios e operações críticas quando houver requisito do produto. Proteja a integridade e o acesso aos registros de auditoria.

## 16. Dependências e infraestrutura

Verifique vulnerabilidades de dependências e compatibilidade com a versão realmente instalada. Atualizações devem ser avaliadas e testadas; não ignore alertas relevantes sem análise. Siga práticas de menor privilégio para processos, containers, contas de serviço, rede e CI.

Não publique segredos em artifacts ou logs de pipeline. Restrinja permissões de workflows e tokens ao necessário. Avalie variáveis de ambiente, debug, headers, TLS e acesso de rede em cada ambiente.

## 17. Testes e resposta a achados

Teste controles de forma positiva e negativa: usuário permitido, usuário sem permissão, outro owner/tenant, entrada inválida, token expirado, abuso de limite e falha de dependência, conforme o caso. Use dados isolados; não execute testes destrutivos em produção.

Ao reportar um achado, informe evidência, impacto, condições de exploração e correção recomendada. Não apresente possibilidade teórica como vulnerabilidade confirmada. Consulte `code-review` para severidade e `testing` para verificação de regressões.

## 18. Referências oficiais

- [OWASP Top 10](https://owasp.org/projects/top-ten)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Node.js](https://nodejs.org/docs/latest/api/)
