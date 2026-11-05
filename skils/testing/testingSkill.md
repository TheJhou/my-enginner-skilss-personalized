---
name: testing-strategy
description: Defines software testing standards and quality assurance procedures for TypeScript, React, and Node.js applications. Use when creating, modifying, reviewing, debugging, or validating code and when investigating regressions, edge cases, integrations, or application behavior.
---

# Testing Strategy

## 1. Purpose

Establish a consistent and reliable testing strategy across all projects using TypeScript, React, and Node.js.

The objective is to ensure that software behaves correctly, handles unexpected situations, maintains architectural integrity, and does not introduce regressions.

This skill defines standards for:

- Unit testing.
- Integration testing.
- End-to-end testing.
- Component testing.
- Type testing.
- API testing.
- Database testing.
- Mocking and test isolation.
- Regression testing.
- Code coverage.
- Test organization.
- Test automation.
- Quality validation.

Testing must be treated as an integral part of software development, not as an optional activity performed only after implementation.

## 2. Fundamental Testing Principles

All agents must follow these principles:

1. Test behavior, not implementation details.
2. Write tests that provide meaningful confidence in the system.
3. Prefer deterministic and reproducible tests.
4. Isolate tests from external dependencies whenever appropriate.
5. Test both expected and unexpected scenarios.
6. Prioritize critical business rules and application behavior.
7. Avoid unnecessary mocking.
8. Never modify production code solely to satisfy an incorrect test.
9. Never modify a test merely to hide an implementation defect.
10. Preserve existing test coverage when modifying functionality.
11. Verify edge cases and error handling.
12. Do not consider code validated simply because it compiles.
13. Never claim a test passed without actually executing it.
14. Never ignore failing tests without investigating their cause.
15. Prefer maintainable tests over excessive test quantity.

A test must have a clear purpose, a meaningful assertion, and a reproducible result.

## 3. Testing Pyramid

Follow the testing pyramid as the default strategy.

### 3.1 Unit Tests

Test individual functions, classes, hooks, utilities, and business rules in isolation.

Characteristics:

- Fast execution.
- Minimal dependencies.
- Deterministic behavior.
- Focused assertions.
- No unnecessary infrastructure.

Examples:

- Mathematical calculations.
- Data transformations.
- Validation functions.
- Business rules.
- Utility functions.
- Date and currency calculations.
- Service methods with controlled dependencies.

Unit tests should represent the largest portion of the test suite.

### 3.2 Integration Tests

Verify that multiple application components work correctly together.

Examples:

- Services interacting with repositories.
- API routes interacting with middleware.
- Database queries and transactions.
- Authentication and authorization flows.
- React components interacting with application state.
- External service integrations.

Integration tests must validate actual contracts and interactions whenever practical.

### 3.3 End-to-End Tests

Validate complete application workflows from the perspective of the user.

Examples:

- User authentication.
- Account creation.
- Password recovery.
- Financial transactions.
- Data registration.
- Form submission.
- Dashboard navigation.
- Critical business workflows.

E2E tests should focus on critical user journeys rather than reproducing every unit test through a browser.

### 3.4 Recommended Distribution

Use the following as an initial planning guideline, not a mandatory numerical requirement:

- Unit tests: approximately 65%.
- Integration tests: approximately 25%.
- E2E tests: approximately 10%.

Adjust the distribution according to application complexity, architectural characteristics, and risk.

Do not sacrifice important integration or E2E coverage merely to achieve a numerical distribution.

## 4. Testing Tools and Frameworks

### 4.1 Preferred Tooling

Use the following tools when they fit the existing project architecture.

| Tool | Responsibility |
|---|---|
| Vitest | Unit and integration testing |
| Jest | Alternative test runner when already adopted |
| React Testing Library | React component testing |
| @testing-library/user-event | User interaction simulation |
| MSW | HTTP request interception and API mocking |
| Playwright | End-to-end testing |
| TypeScript Compiler | Static type verification |
| Node.js test runner | Native Node.js testing alternative |

### 4.2 Tool Selection Rules

- Inspect the existing project before selecting testing tools.
- Prefer existing dependencies and configurations.
- Do not introduce multiple test runners without a clear reason.
- Use Vitest as the preferred default for new TypeScript projects using Vite-compatible tooling.
- React Testing Library should be used for React component behavior.
- Playwright should be preferred for critical browser-based E2E scenarios.
- MSW should be considered when realistic HTTP mocking is needed.
- Node.js native `node:test` is a valid alternative for suitable backend projects.
- Use Jest when it is already established or better supported by the project ecosystem.

Do not migrate an existing test infrastructure merely because another framework is available.

## 5. TypeScript Testing Standards

### 5.1 General Rules

TypeScript tests must validate both runtime behavior and static type correctness.

The agent must distinguish between:

- Runtime validation.
- Static type checking.
- Type-level testing.

These are different validation activities.

### 5.2 Type Safety

- Avoid `any` in test code.
- Prefer explicit types for test fixtures and helpers.
- Use production interfaces and types when appropriate.
- Avoid unsafe type assertions.
- Do not suppress TypeScript errors without justification.
- Avoid excessive casting to force tests to compile.
- Use `unknown` when handling values of uncertain types.
- Validate runtime data independently of TypeScript types.

TypeScript types do not validate external JSON, HTTP requests, database records, or user input at runtime.

### 5.3 Type Testing

When the project contains complex type contracts, validate them explicitly.

Examples:

- Generic utilities.
- Conditional types.
- Mapped types.
- API response contracts.
- DTO structures.
- Utility type transformations.
- Discriminated unions.

Use appropriate type-testing tools, such as `expect-type`, when necessary.

Do not create type-level tests for trivial interfaces that are already adequately checked by the compiler.

### 5.4 Type Checking

Run the project's TypeScript compiler independently of the test runner.

Preferred command:

```bash
npx tsc --noEmit
```

When the project uses a dedicated configuration:

```bash
npx tsc -p tsconfig.json --noEmit
```

For projects with multiple TypeScript configurations, validate the relevant application and test configurations separately.

A successful test execution does not guarantee that all TypeScript types have been verified.

## 6. React Testing Standards

### 6.1 Component Testing Philosophy

React components must be tested from the perspective of their users.

Prefer testing:

- What is rendered.
- What users can interact with.
- What happens after interactions.
- How loading states behave.
- How error states are presented.
- How components respond to different props.
- How application state affects the interface.

Avoid testing internal implementation details unless there is a specific technical justification.

### 6.2 React Testing Library

Use React Testing Library to render components and validate their observable behavior.

Preferred query order:

1. `getByRole`
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByDisplayValue`
6. `getByTestId` as a last resort.

Prefer accessible queries because they encourage accessible application interfaces.

Example:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('submits the form with valid credentials', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'SecurePassword123!'
    );

    await user.click(
      screen.getByRole('button', { name: /sign in/i })
    );

    expect(
      screen.getByText(/welcome/i)
    ).toBeInTheDocument();
  });
});
```

This is an illustrative example. Adapt assertions to the actual component behavior and its dependencies.

### 6.3 User Interactions

Prefer `userEvent` for realistic interaction simulation.

Test:

- Clicks.
- Typing.
- Keyboard navigation.
- Form submission.
- Selection.
- Focus and blur.
- Checkbox interactions.
- Input validation.
- Disabled states.

Avoid directly invoking component event handlers when the actual user interaction can be simulated.

### 6.4 Component States

Components with conditional rendering must be tested across their relevant states.

Examples:

- Initial state.
- Loading state.
- Success state.
- Error state.
- Empty state.
- Disabled state.
- Permission-restricted state.
- Validation state.

Do not test only the default rendering of complex components.

### 6.5 Hooks

Test custom hooks through their observable behavior.

Validate:

- Initial values.
- State updates.
- Dependencies.
- Side effects.
- Cleanup behavior.
- Error handling.
- Asynchronous updates.

Avoid coupling tests to React's internal implementation.

### 6.6 Forms

Form tests must validate:

- Required fields.
- Invalid input.
- Valid input.
- Field-level validation.
- Submission behavior.
- Loading indicators.
- Duplicate submissions.
- Server-side validation errors.
- Successful submission feedback.

Validate that invalid forms do not trigger unintended requests or state changes.

### 6.7 Asynchronous React Behavior

Use the appropriate asynchronous utilities.

Examples:

- `findByRole`
- `findByText`
- `waitFor`
- `waitForElementToBeRemoved`

Do not use arbitrary delays such as `setTimeout` to make tests pass.

Avoid assertions that execute before asynchronous updates have completed.

## 7. Node.js Testing Standards

### 7.1 Backend Testing

Backend tests must validate application behavior independently of unnecessary infrastructure.

Prioritize:

- Business logic.
- Service methods.
- Controllers.
- Route handlers.
- Middleware.
- Authentication.
- Authorization.
- Input validation.
- Error handling.
- Database operations.
- External integrations.

### 7.2 Service Testing

Services should be tested independently whenever possible.

Validate:

- Correct business rule execution.
- Expected return values.
- Invalid arguments.
- Missing data.
- Dependency failures.
- Database errors.
- Unexpected exceptions.
- Transaction behavior.

Use dependency injection or controlled mocks when appropriate.

### 7.3 API Testing

API tests must validate the actual HTTP contract.

Validate:

- HTTP method.
- Endpoint.
- Status code.
- Response structure.
- Response data types.
- Headers.
- Authentication requirements.
- Authorization requirements.
- Input validation.
- Error responses.
- Pagination.
- Filtering.
- Sorting.

Example:

```ts
import { describe, expect, it } from 'vitest';

describe('GET /api/users', () => {
  it('returns the expected response structure', async () => {
    const response = await fetch(
      'http://localhost:3000/api/users'
    );

    expect(response.status).toBe(200);

    const body: unknown = await response.json();

    expect(body).toBeDefined();
  });
});
```

This is an illustrative example. Use the project's actual HTTP testing utilities, application instance, and response contract.

Do not rely exclusively on mocked controllers when the objective is to validate HTTP integration.

### 7.4 Middleware Testing

Middleware must be tested independently when it contains important application logic.

Examples:

- Authentication middleware.
- Authorization middleware.
- Rate limiting.
- Request validation.
- Error handling.
- Logging.
- Request identification.

Validate both successful and rejected requests.

### 7.5 Authentication and Authorization

Authentication and authorization are security-critical areas.

Test:

- Missing credentials.
- Invalid credentials.
- Expired tokens.
- Malformed tokens.
- Revoked tokens.
- Invalid sessions.
- Insufficient permissions.
- Unauthorized resource access.
- Role-based restrictions.
- Ownership restrictions.

Never consider authentication complete merely because a valid login succeeds.

Verify that unauthorized users cannot access protected resources.

### 7.6 Database Testing

Database integration tests must validate actual persistence behavior whenever practical.

Test:

- Insert operations.
- Update operations.
- Delete operations.
- Foreign key constraints.
- Unique constraints.
- Nullability.
- Transactions.
- Rollbacks.
- Referential integrity.
- Filtering and pagination.
- Concurrent operations when relevant.

Rules:

- Use a dedicated test database.
- Never execute destructive tests against production.
- Isolate test data.
- Clean up created records.
- Avoid tests that depend on execution order.
- Validate migration compatibility when database structures change.

For critical database operations, prefer integration tests against the actual database engine instead of relying exclusively on mocks.

### 7.7 External Services

External services should generally be isolated during automated tests.

Examples:

- Payment providers.
- Email services.
- Cloud storage.
- Third-party APIs.
- Authentication providers.

Use controlled mocks or HTTP interception for deterministic tests.

When necessary, maintain separate contract or sandbox integration tests.

Never make ordinary unit tests depend on the availability of third-party services.

## 8. Mocking and Dependency Isolation

### 8.1 General Principles

Mocking should isolate dependencies, not hide application defects.

Use mocks when:

- A dependency is external.
- A dependency is expensive.
- A dependency introduces nondeterminism.
- A specific failure scenario needs to be simulated.
- The unit under test should be isolated.

Avoid mocking:

- The function being tested.
- The main business logic.
- Every dependency indiscriminately.
- Behavior that should be validated through integration tests.

### 8.2 HTTP Mocking

Use MSW when realistic HTTP request interception improves test quality.

Prefer mocking network boundaries instead of mocking internal application functions unnecessarily.

Validate:

- Successful responses.
- Client errors.
- Server errors.
- Network failures.
- Delayed responses.
- Invalid response structures.

### 8.3 Mock Cleanup

Always ensure that mocks, spies, timers, and modified global state are properly restored.

Avoid shared mutable state between tests.

## 9. Test Case Design

Every meaningful test must have a clearly defined scenario.

Use the Arrange, Act, Assert pattern.

### Arrange

Prepare the initial conditions, dependencies, and input data.

### Act

Execute the behavior being tested.

### Assert

Verify the expected outcome.

Example:

```ts
import { describe, expect, it } from 'vitest';

describe('calculateTotal', () => {
  it('calculates the total including the discount', () => {
    // Arrange
    const price = 100;
    const discount = 10;

    // Act
    const result = price - discount;

    // Assert
    expect(result).toBe(90);
  });
});
```

The test should communicate its intent without requiring the reader to reconstruct the entire application context.

## 10. Edge Cases and Negative Testing

Agents must actively identify boundary conditions and failure scenarios.

Consider the following categories.

### Input Validation

- Empty values.
- Null values.
- Undefined values.
- Incorrect types.
- Invalid formats.
- Excessively long inputs.
- Unexpected characters.
- Malformed payloads.

### Numeric Values

- Zero.
- Negative numbers.
- Decimal values.
- Maximum supported values.
- Minimum supported values.
- Floating-point precision.
- Overflow scenarios.

### Collections

- Empty arrays.
- Single elements.
- Duplicate elements.
- Large collections.
- Missing elements.
- Invalid ordering.

### Dates

- Invalid dates.
- Timezone differences.
- Month boundaries.
- Year boundaries.
- Leap years.
- Daylight saving transitions when applicable.
- Date range boundaries.

### Asynchronous Operations

- Successful completion.
- Rejected promises.
- Timeouts.
- Network interruptions.
- Concurrent requests.
- Duplicate submissions.
- Race conditions.

### Business Rules

- Valid transitions.
- Invalid transitions.
- Missing permissions.
- Duplicate transactions.
- Boundary conditions.
- Inconsistent data.

Not every category applies to every function. Select scenarios based on actual application behavior and risk.

## 11. Test Naming and Organization

### 11.1 Naming Convention

All test names and identifiers must use English.

Test names should clearly describe the expected behavior.

Preferred format:

`should <expected behavior> when <condition>`

Examples:

- `should return the user when the ID exists`
- `should reject invalid credentials`
- `should calculate the correct monthly revenue`
- `should display the loading indicator while submitting`
- `should prevent unauthorized access`

Avoid vague names:

- `test 1`
- `works correctly`
- `should work`
- `validates data`

### 11.2 File Naming

Preferred naming:

- `user.service.test.ts`
- `auth.middleware.test.ts`
- `calculate-dre.test.ts`
- `LoginForm.test.tsx`
- `useAuth.test.ts`

Follow the project's established naming convention when it differs.

### 11.3 Organization

Tests should be organized according to the project's architecture.

Example:

```text
src/
├── modules/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.service.test.ts
│   │   ├── auth.controller.ts
│   │   └── auth.controller.test.ts
│   │
│   └── users/
│       ├── users.service.ts
│       ├── users.service.test.ts
│       └── users.repository.ts
│
tests/
├── integration/
│   ├── auth.integration.test.ts
│   └── users.integration.test.ts
│
└── e2e/
    ├── authentication.spec.ts
    └── user-registration.spec.ts
```

This is a reference structure, not a mandatory directory layout.

Avoid moving existing tests unnecessarily.

## 12. Test Data and Fixtures

Test data must be predictable and independent.

Rules:

- Prefer explicit fixtures.
- Use factories when complex objects are repeated.
- Avoid unnecessary dependencies between fixtures.
- Do not use production data containing sensitive information.
- Avoid relying on real user accounts.
- Avoid hardcoded environment-specific identifiers.
- Keep test data representative of actual application contracts.

Use deterministic data whenever possible.

Randomized test data must use controlled seeds when reproducibility is required.

## 13. Test Isolation and Determinism

Each test must be capable of executing independently whenever practical.

Avoid:

- Shared mutable state.
- Execution-order dependencies.
- Uncontrolled external requests.
- Real production services.
- Unmanaged background processes.
- Unrestored mocks.
- Uncontrolled system time.
- Environment-dependent assertions.

Use setup and teardown mechanisms appropriately.

Tests must clean up the resources they create.

When testing parallel execution, ensure that tests do not compete for shared resources or identifiers.

## 14. End-to-End Testing with Playwright

Use Playwright to validate critical application workflows.

Prioritize:

- Authentication.
- User registration.
- Password recovery.
- Important financial operations.
- Critical form submissions.
- Main navigation flows.
- Permission-restricted actions.

### 14.1 Locator Strategy

Prefer user-facing locators:

- `getByRole`
- `getByLabel`
- `getByPlaceholder`
- `getByText`

Use `data-testid` when semantic locators are not practical.

Avoid selectors coupled to CSS classes or internal DOM structure.

### 14.2 E2E Rules

- Isolate browser contexts and test data.
- Avoid depending on test execution order.
- Use automatic waiting and retry mechanisms.
- Avoid arbitrary fixed delays.
- Capture traces and useful diagnostics when failures occur.
- Validate visible user outcomes.
- Do not reproduce every unit test in E2E.

## 15. Regression Testing

Whenever an existing functionality is modified, evaluate the possibility of regressions.

The agent must:

1. Identify the modified behavior.
2. Identify dependent modules.
3. Inspect related tests.
4. Identify affected contracts.
5. Create or update relevant tests.
6. Execute existing tests associated with the affected area.
7. Verify that unrelated functionality remains intact when relevant.

When fixing a bug, create a regression test that reproduces the original failure whenever practical.

The regression test must fail before the fix and pass after the correction.

Do not limit regression validation to the modified file when the change affects multiple application layers.

## 16. Code Coverage

Coverage is a diagnostic metric, not proof of software correctness.

Evaluate:

- Line coverage.
- Branch coverage.
- Function coverage.
- Critical business logic coverage.

Prioritize testing:

- Financial calculations.
- Authentication.
- Authorization.
- Data persistence.
- Validation.
- Error handling.
- Transaction processing.
- Critical API contracts.

Do not write meaningless tests solely to increase coverage percentages.

Do not establish arbitrary 100% coverage requirements without a justified project policy.

When coverage thresholds exist, respect them.

Investigate uncovered critical branches even when the overall coverage percentage is high.

## 17. Test Performance and Reliability

Tests must remain practical to execute during development and CI/CD.

Agents should:

- Avoid unnecessary database initialization.
- Avoid excessive browser-based tests.
- Reuse controlled setup where appropriate.
- Parallelize independent tests safely.
- Identify slow test suites.
- Avoid unnecessary network dependencies.
- Keep test fixtures lightweight.
- Investigate flaky tests instead of repeatedly rerunning them without analysis.

Do not sacrifice isolation or correctness merely to improve execution speed.

## 18. Anti-Patterns and Prohibited Practices

Agents must never:

- Write tests without meaningful assertions.
- Test only successful scenarios.
- Ignore error handling.
- Depend on real production services.
- Use arbitrary delays to solve asynchronous test failures.
- Mock every dependency without justification.
- Assert implementation details unnecessarily.
- Modify tests to conceal application defects.
- Disable failing tests without documented justification.
- Ignore existing regression tests.
- Introduce random behavior without reproducibility controls.
- Claim successful execution without running the tests.
- Treat code coverage as proof of correctness.
- Assume TypeScript compilation validates runtime data.
- Assume a successful test run guarantees type correctness.
- Delete existing tests without understanding their purpose.
- Use production databases for destructive test operations.

## 19. Agent Testing Workflow

Whenever an agent implements or modifies code, it must follow this workflow.

### Phase 1: Project Inspection

- Inspect the project architecture.
- Identify the existing testing framework.
- Inspect available test scripts.
- Read relevant test configurations.
- Identify existing test conventions.
- Identify related tests.

Do not introduce a new testing framework before evaluating the existing infrastructure.

### Phase 2: Test Planning

- Understand the expected behavior.
- Identify critical business rules.
- Identify possible edge cases.
- Identify affected components and dependencies.
- Determine the appropriate test level.
- Identify required fixtures and mocks.

### Phase 3: Test Implementation

- Create meaningful test scenarios.
- Follow Arrange, Act, Assert.
- Use descriptive English test names.
- Cover successful and unsuccessful scenarios.
- Validate important boundaries.
- Maintain test isolation.
- Avoid unnecessary abstractions.

### Phase 4: Execution

Run the relevant tests using the project's configured commands.

When applicable, execute:

1. Relevant unit tests.
2. Relevant integration tests.
3. Relevant component tests.
4. Relevant E2E tests.
5. Type checking.
6. Linting.
7. Coverage validation.

Do not assume commands or scripts exist. Inspect `package.json`, project configuration, and documentation before executing them.

### Phase 5: Failure Investigation

If a test fails:

1. Read the complete error output.
2. Identify the failing assertion.
3. Determine whether the problem is in the application, test, configuration, or environment.
4. Reproduce the failure when necessary.
5. Investigate the root cause.
6. Apply the appropriate correction.
7. Execute the affected tests again.
8. Execute relevant regression tests.

Never suppress a failure simply to obtain a successful test report.

### Phase 6: Final Validation

Before considering the task complete:

- Inspect test results.
- Verify type checking when applicable.
- Verify that no relevant tests were skipped unintentionally.
- Review coverage of critical behavior.
- Verify that no temporary debugging code remains.
- Confirm that the test environment was cleaned up.

### Phase 7: Final Report

Provide a concise report containing:

- Tests created or modified.
- Scenarios covered.
- Test commands executed.
- Number of passing tests.
- Number of failing tests.
- Number of skipped tests.
- Type checking results.
- Coverage results when available.
- Known limitations.
- Outstanding issues.

Clearly distinguish between tests that passed, tests that failed, and tests that were not executed.

## 20. Definition of Done

A development task involving testing must not be considered fully validated until the following applicable criteria have been evaluated:

- [ ] Relevant tests were identified.
- [ ] New functionality has appropriate tests.
- [ ] Existing functionality has been checked for regressions.
- [ ] Important error scenarios have been tested.
- [ ] Relevant edge cases have been considered.
- [ ] Test isolation has been preserved.
- [ ] Relevant tests were executed.
- [ ] TypeScript type checking was executed when applicable.
- [ ] Linting was executed when applicable.
- [ ] Failures were investigated.
- [ ] No test results were fabricated.
- [ ] Final validation results were documented.

A task may still be reported as incomplete when environmental limitations prevent validation. The limitation must be explicitly documented.

## 21. Source of Truth and Technical References

This skill defines the default testing standards for projects using TypeScript, React, and Node.js.

Official documentation must be consulted when framework-specific behavior, APIs, or configuration details are uncertain.

Preferred technical references:

### Vitest
https://vitest.dev/guide/

https://vitest.dev/guide/learn/writing-tests

### React Testing Library
https://testing-library.com/docs/react-testing-library/intro/

https://testing-library.com/docs/user-event/intro/

### Playwright
https://playwright.dev/docs/best-practices

https://playwright.dev/docs/test-typescript

### Node.js Test Runner
https://nodejs.org/api/test.html

### TypeScript
https://www.typescriptlang.org/docs/

### General Rules

1. Prefer official documentation over unverified examples.
2. Verify that recommended APIs are compatible with the project's installed versions.
3. Do not assume that the latest documentation applies to an older project version.
4. Do not introduce dependencies without a technical justification.
5. Respect existing project architecture.
6. Document relevant deviations from this skill.
7. Never invent framework capabilities or configuration options.

---

## Final Principle

The objective of testing is not to prove that the code works only under ideal conditions.

The objective is to provide reliable evidence that the application behaves correctly under expected conditions, handles failures appropriately, preserves business rules, and remains stable as the system evolves.

**A test suite must increase confidence in the software, not merely increase the number of tests.**