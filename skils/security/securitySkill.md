---
name: application-security
description: Defines application security standards for TypeScript, React, and Node.js applications. Covers authentication, authorization, sessions, tokens, input validation, API exposure, secrets management, injection attacks, XSS, CSRF, SSRF, rate limiting, and security auditing. Use when developing, modifying, reviewing, debugging, or auditing application code, APIs, authentication flows, infrastructure configuration, and sensitive data handling.
---

# Application Security

## 1. Purpose

Establish security standards for applications built with TypeScript, React, and Node.js.

The objective is to identify, prevent, and remediate common and known security vulnerabilities throughout the application lifecycle.

This skill defines standards for:

- Authentication and authorization.
- Session management.
- Access tokens and refresh tokens.
- JWT security.
- Input validation and sanitization.
- API security and data exposure.
- Secrets and credentials management.
- SQL injection and other injection attacks.
- Cross-Site Scripting (XSS).
- Cross-Site Request Forgery (CSRF).
- Server-Side Request Forgery (SSRF).
- Rate limiting and abuse prevention.
- Security headers.
- Error handling and logging.
- Dependency security.
- Environment configuration.
- Secure coding practices.
- Security auditing and vulnerability remediation.

Security must be considered in every layer of the application.

A successful authentication flow, a valid TypeScript compilation, or a passing test suite does not prove that an application is secure.

## 2. Fundamental Security Principles

All agents must follow these principles:

1. Never trust data received from clients.
2. Never assume that authenticated users are authorized to access a resource.
3. Apply the principle of least privilege.
4. Validate all external input at system boundaries.
5. Never expose secrets or sensitive information to the frontend.
6. Never trust client-side validation as a security mechanism.
7. Never expose internal implementation details through API responses.
8. Never store passwords in plaintext.
9. Never log authentication credentials, tokens, or secrets.
10. Use established cryptographic libraries and algorithms.
11. Prefer explicit authorization policies over implicit access.
12. Apply defense in depth.
13. Keep dependencies and security configurations updated.
14. Never disable security controls merely to make an implementation work.
15. Evaluate the security impact of every significant architectural modification.

Security controls must be implemented on the server side whenever they protect application resources or operations.

## 3. Threat Modeling and Security Analysis

Before implementing security-sensitive functionality, identify potential attack surfaces.

Evaluate:

- Who can access the functionality?
- What data can be accessed?
- What operations can be performed?
- Which inputs are controlled by external users?
- Which secrets or credentials are involved?
- Which external services are trusted?
- What happens when authentication fails?
- What happens when authorization fails?
- Can the functionality be abused through automation?
- Can the functionality expose information across tenants or users?

### 3.1 Security Boundaries

Identify trust boundaries between:

- Browser and frontend application.
- Frontend and backend API.
- Backend and database.
- Backend and external services.
- Application and infrastructure.
- Development environment and production environment.

Never assume that data becomes trustworthy merely because it passed through another application layer.

### 3.2 Threat Categories

Consider the following common vulnerabilities:

| Vulnerability | Description |
|---|---|
| SQL Injection | Manipulation of database queries |
| XSS | Execution of malicious scripts in the browser |
| CSRF | Unauthorized actions using an authenticated browser session |
| IDOR/BOLA | Accessing resources belonging to other users |
| Broken Access Control | Unauthorized access to resources or operations |
| Mass Assignment | Modification of protected properties through uncontrolled input |
| SSRF | Server-side requests to unintended destinations |
| Session Hijacking | Unauthorized reuse of authenticated sessions |
| Token Theft | Exposure or misuse of authentication tokens |
| Secrets Leakage | Exposure of credentials and private configuration |
| Prototype Pollution | Manipulation of JavaScript object prototypes |
| Command Injection | Execution of unintended operating system commands |
| Denial of Service | Exhaustion of application resources |

Use the OWASP Top 10 and OWASP API Security Top 10 as reference frameworks for identifying relevant risks.

## 4. Authentication

Authentication is responsible for verifying the identity of a user or system.

### 4.1 General Rules

- Use established authentication mechanisms.
- Never implement custom cryptographic algorithms.
- Never trust user identifiers supplied by the client as proof of identity.
- Validate credentials on the server.
- Return generic authentication errors when appropriate.
- Avoid exposing whether an account exists through password recovery or login responses.
- Protect authentication endpoints against brute-force attacks.
- Require stronger authentication for sensitive operations when appropriate.

### 4.2 Password Storage

Passwords must never be stored in plaintext or encrypted using reversible encryption as a substitute for password hashing.

Use dedicated password hashing algorithms.

Preferred options:

- Argon2id.
- bcrypt.
- scrypt.

Use current OWASP recommendations for algorithm parameters and resource costs.

Rules:

- Use a unique salt for each password.
- Prefer established password hashing libraries.
- Never implement password hashing manually.
- Never log passwords.
- Never return password hashes through API responses.
- Never include passwords in URLs.
- Use constant-time comparison mechanisms where applicable.
- Evaluate password reset and account recovery flows as security-sensitive operations.

### 4.3 Authentication Errors

Avoid responses that disclose unnecessary account information.

Example:

```json
{
  "message": "Invalid credentials"
}
```

Avoid unnecessarily distinguishing between nonexistent accounts and incorrect passwords in public authentication responses.

## 5. Authorization and Access Control

Authorization is separate from authentication.

A valid authenticated session does not automatically grant permission to access every resource.

### 5.1 Object-Level Authorization

Every endpoint that accesses a resource through a user-provided identifier must verify ownership or permission.

Example of an insecure implementation:

```ts
const invoice = await db.invoice.findUnique({
  where: { id: req.params.id }
});
```

The query retrieves a resource based on its identifier without demonstrating that the authenticated user has permission to access it.

Safer approach:

```ts
const invoice = await db.invoice.findFirst({
  where: {
    id: req.params.id,
    userId: req.user.id
  }
});
```

Adapt the authorization condition to the actual ownership model, tenant model, and business rules.

Rules:

- Never rely exclusively on frontend restrictions.
- Never assume that a hidden button protects an endpoint.
- Validate resource ownership.
- Validate tenant boundaries.
- Validate user permissions for every sensitive operation.
- Apply authorization to reads, updates, deletes, exports, and other operations.
- Verify authorization again when accessing related resources.

### 5.2 Broken Object Level Authorization (BOLA)

Explicitly evaluate BOLA/IDOR vulnerabilities.

An authenticated user must not be able to access another user's resources simply by changing:

- IDs in URL parameters.
- IDs in query parameters.
- IDs in request bodies.
- IDs in headers.
- Identifiers used in nested resources.

Example:

A user with ID `10` must not be able to access an invoice belonging to user ID `20` by changing the invoice identifier.

### 5.3 Function-Level Authorization

Sensitive operations must enforce permission checks.

Examples:

- Administrative operations.
- User management.
- Financial transactions.
- Account deletion.
- Role modification.
- Permission management.
- Exporting sensitive data.

Never assume that hiding an administrative route in the frontend prevents unauthorized access.

### 5.4 Property-Level Authorization

Control which properties a user can read or modify.

Never expose internal or protected properties automatically.

Examples of sensitive properties:

- `passwordHash`
- `role`
- `permissions`
- `isAdmin`
- `accountId`
- `tenantId`
- `internalNotes`
- `accessToken`
- `refreshToken`

Use explicit response DTOs and input schemas.

Never return complete database entities when the API only needs a subset of their properties.

## 6. Session Management

Session security must be evaluated independently from authentication.

### 6.1 Session Rules

- Use unpredictable session identifiers.
- Use established session management libraries.
- Never expose session identifiers in URLs.
- Never include sensitive information in session identifiers.
- Enforce session expiration on the server.
- Invalidate sessions after logout.
- Regenerate session identifiers after authentication and privilege changes when supported by the session mechanism.
- Revoke sessions after relevant credential changes.
- Protect session storage.
- Evaluate concurrent session policies according to application requirements.

### 6.2 Cookie Security

For authentication cookies, evaluate the following attributes:

| Attribute | Purpose |
|---|---|
| HttpOnly | Prevents JavaScript from reading the cookie |
| Secure | Restricts transmission to secure connections |
| SameSite | Restricts cross-site cookie transmission |
| Path | Limits cookie path scope |
| Domain | Controls cookie domain scope |
| Max-Age / Expires | Controls cookie expiration |

Example:

```ts
res.cookie('session', sessionToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 1000 * 60 * 60
});
```

The actual configuration must reflect the application's deployment architecture.

Do not blindly use `SameSite=None` without `Secure` and a documented cross-site requirement.

### 6.3 Session Fixation and Hijacking

Evaluate:

- Session identifier regeneration after login.
- Session invalidation after logout.
- Session expiration.
- Session reuse.
- Concurrent sessions.
- Token theft.
- Session revocation.
- Sensitive operations performed with old sessions.

Deleting a cookie from the browser does not necessarily invalidate a stolen session identifier.

Server-side invalidation must be implemented when required.

### 6.4 Browser Storage

Never store authentication credentials in `localStorage` or `sessionStorage` as the default authentication strategy.

These storage mechanisms are accessible to JavaScript executing within the same origin.

Prefer:

- HttpOnly, Secure cookies with appropriate SameSite protection.
- Backend-for-Frontend (BFF) architecture when appropriate.

If an application uses browser-accessible tokens for architectural reasons, explicitly evaluate XSS impact, token lifetime, refresh mechanisms, and revocation.

### 6.5 Session Security and CSRF

When cookies are used for authentication, evaluate CSRF exposure.

Use appropriate protections:

- Anti-CSRF tokens when required.
- SameSite cookie configuration.
- Origin validation.
- Referer validation where appropriate.
- Restriction of state-changing HTTP operations.

Do not rely exclusively on CORS to prevent CSRF.

## 7. Token and JWT Security

Tokens are credentials and must be handled as sensitive information.

### 7.1 General Token Rules

- Never expose signing secrets.
- Never log complete tokens.
- Never store