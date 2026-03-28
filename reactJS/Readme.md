Understanding npm audit Commands
The `npm audit` command helps identify and fix security vulnerabilities in your project's dependencies.

1. npm audit
   Runs a security audit on your project's dependencies and prints a detailed report of vulnerabilities. It categorizes them as low, moderate, high, or critical.

2.npm audit --json
This command runs a full security audit of your project dependencies and outputs the result in JSON format.

3. npm audit fix
   Automatically installs compatible dependency versions to fix reported vulnerabilities. It only applies non-breaking changes.

4. npm audit fix --force
   Forces npm to apply major version upgrades if needed. This may introduce breaking changes, so use with caution.

5. npm audit --audit-level=<level>
   Filters vulnerabilities by severity level. You can choose from:low, moderate, high, or critical. This helps focus on the most severe issues.
   Example:
   npm audit --audit-level=critical

6. npm audit fix --audit-level=<level>
   Fixes vulnerabilities only at or above the specified severity level. This allows developers to selectively patch critical issues without changing minor ones.
   Example:
   npm audit fix --audit-level=critical

# 🚀 ReactJS Interview Questions – Lead / Senior (8–12 Years)

This README is a **complete interview preparation guide** for **ReactJS Lead / Senior Engineers (8–12 years experience)**.

Use this as:

- 📘 Daily revision notes
- 🧠 Whiteboard interview prep
- 🎯 System design discussion guide

---

## 1️⃣ Core React Fundamentals

1. What problem does React solve?
2. Virtual DOM vs Real DOM
3. How React reconciliation works
4. What is JSX and why it exists
5. Importance of `key` in lists
6. Issues with non-unique keys
7. State vs Props
8. When does a component re-render?
9. What is render purity?
10. Controlled vs Uncontrolled components
11. How React batches updates
12. Why React is declarative

---

## 2️⃣ Hooks (High Weightage)

### Basics

1. Why hooks were introduced
2. Rules of hooks
3. How `useState` works internally
4. `useEffect` lifecycle mapping
5. Cleanup function in `useEffect`
6. Dependency array importance
7. Empty dependency array behavior
8. Missing dependency issues
9. `useEffect` vs `useLayoutEffect`

### Advanced

10. `useMemo` vs `useCallback`
11. When memoization is harmful
12. Referential equality problems
13. Custom hooks – when & why
14. Hook reusability patterns
15. Hooks vs HOCs
16. Can hooks replace Redux?
17. Hooks vs class lifecycle methods

---

## 3️⃣ State Management

1. Lifting state up – pros & cons
2. Prop drilling problems
3. Context API – when not to use
4. Redux vs Context API
5. Redux Toolkit advantages
6. RTK vs classic Redux
7. Thunk vs Saga
8. RTK Query vs Saga
9. Local vs global state
10. Normalized state structure
11. Importance of immutability
12. How React detects state change
13. Why mutation works in RTK
14. Redux performance optimizations

---

## 4️⃣ Component Design & Architecture

1. Smart vs Dumb components
2. Presentational vs Container components
3. Atomic design principles
4. Folder structure for large apps
5. Feature-based architecture
6. Avoiding tight coupling
7. Reusable component principles
8. Composition vs inheritance
9. Higher Order Components (HOC)
10. Render props pattern
11. Compound component pattern
12. Controlled component libraries

---

## 5️⃣ Performance Optimization

1. Why React apps become slow
2. React.memo usage
3. Memoization pitfalls
4. Reconciliation optimization
5. Avoiding unnecessary re-renders
6. Key-based rendering
7. useCallback misuse
8. Debouncing & throttling
9. List virtualization
10. Code splitting & lazy loading
11. React Suspense
12. Concurrent rendering basics
13. Update prioritization
14. React Profiler usage

---

## 6️⃣ Lifecycle Knowledge

1. Lifecycle phases
2. componentDidMount vs useEffect
3. componentDidUpdate equivalent
4. componentWillUnmount equivalent
5. Error boundaries
6. Hooks limitations
7. When class components are useful
8. Legacy lifecycle methods

---

## 7️⃣ Forms & Validation

1. Controlled form handling
2. Form performance issues
3. Large form handling strategies
4. Formik vs React Hook Form
5. Validation strategies
6. Sync vs async validation
7. Dynamic forms
8. Preventing re-renders in forms

---

## 8️⃣ Routing (React Router)

1. SPA vs server routing
2. BrowserRouter vs HashRouter
3. Route guarding
4. Protected routes
5. Lazy loaded routes
6. Nested routing
7. URL params vs query params
8. 404 handling
9. Navigation performance

---

## 9️⃣ Testing

1. Unit vs integration testing
2. Jest vs React Testing Library
3. What not to test
4. Snapshot testing pros & cons
5. Mocking API calls
6. Testing custom hooks
7. Testing Redux logic
8. E2E vs component testing
9. Flaky tests
10. Test pyramid

---

## 🔟 Error Handling & Edge Cases

1. Error boundaries purpose
2. Error boundary limitations
3. Global error handling
4. API failure handling
5. Retry strategies
6. Graceful degradation
7. Fallback UI patterns

---

## 1️⃣1️⃣ Security

1. XSS in React
2. React HTML escaping
3. dangerouslySetInnerHTML
4. CSRF protection
5. Secure token storage
6. Environment variables
7. Role-based UI rendering

---

## 1️⃣2️⃣ Build Tools & Ecosystem

1. CRA vs Vite vs Next.js
2. Webpack basics
3. Babel role
4. Tree shaking
5. Environment-based builds
6. CI/CD pipelines
7. Bundle size optimization
8. ESLint & Prettier
9. Monorepo setup
10. Micro-frontend basics

---

## 1️⃣3️⃣ SSR, SSG & Modern React

1. CSR vs SSR vs SSG
2. Hydration
3. SEO challenges
4. When SSR is needed
5. React Server Components
6. Streaming SSR
7. UI caching strategies

---

## 1️⃣4️⃣ Advanced Patterns

1. Inversion of control
2. Dependency injection
3. Event delegation
4. Observer pattern
5. Pub-Sub pattern
6. Feature toggles
7. Config-driven UI
8. Multi-tenant UI design

---

## 1️⃣5️⃣ React System Design

1. Dashboard app design
2. Role-based access UI
3. Large form builder
4. Component library design
5. State management strategy
6. Real-time UI updates
7. Pagination vs infinite scroll
8. UI caching
9. Offline-first UI
10. Error & loading strategy

---

## 1️⃣6️⃣ Behavioral & Leadership

1. Code review approach
2. Mentoring juniors
3. Enforcing best practices
4. Handling legacy React code
5. Conflict with product/design
6. Production performance issues
7. React migration strategy
8. Handling breaking changes
9. Speed vs quality tradeoff
10. Design-first development approach

---

## 🧠 Lead Interview Closing Statement

> I focus on scalable architecture, predictable state management, performance optimization, and mentoring teams while delivering high-quality React applications.

---

### ✅ How to Use This README

- Junior: Sections 1–4
- Senior: Sections 5–10
- Lead: Sections 11–16 + System Design

---

⭐ If you can confidently explain **70% of this**, you are **Lead-ready**.

# 🚀 ReactJS Interview Questions – Lead / Senior (8–12 Years)

This README is a **complete interview preparation guide** for **ReactJS Lead / Senior Engineers (8–12 years experience)**.

Use this as:

- 📘 Daily revision notes
- 🧠 Whiteboard interview prep
- 🎯 System design discussion guide

---

## 1️⃣ Core React Fundamentals

**1. What problem does React solve?**
React solves UI complexity by providing a declarative, component-based model that efficiently updates the DOM based on state changes.

**2. Virtual DOM vs Real DOM**
Virtual DOM is an in-memory representation that allows React to batch and minimize real DOM operations.

**3. How React reconciliation works**
React compares previous and next Virtual DOM trees, calculates minimal changes (diffing), and updates only what changed.

**4. What is JSX and why it exists**
JSX is a syntax sugar over `React.createElement` that improves readability and developer experience.

**5. Importance of `key` in lists**
Keys help React identify elements uniquely to optimize re-rendering.

**6. Issues with non-unique keys**
Incorrect DOM updates, unexpected UI bugs, and performance issues.

**7. State vs Props**
Props are immutable inputs; state is mutable and managed within the component.

**8. When does a component re-render?**
On state change, props change, or parent re-render.

**9. What is render purity?**
Render should be free of side effects and return the same UI for the same inputs.

**10. Controlled vs Uncontrolled components**
Controlled components rely on React state; uncontrolled use DOM refs.

**11. How React batches updates**
React batches multiple state updates into a single render for performance.

**12. Why React is declarative**
You describe _what_ the UI should look like, not _how_ to update it.

---

## 2️⃣ Hooks (High Weightage)

**Why hooks were introduced**
To reuse stateful logic without classes and reduce component complexity.

**Rules of hooks**
Only call hooks at the top level and inside React functions.

**useState internal working**
State updates trigger re-renders via React Fiber scheduling.

**useEffect lifecycle mapping**
Acts as componentDidMount, componentDidUpdate, and componentWillUnmount.

**Cleanup in useEffect**
Used to avoid memory leaks and remove subscriptions.

**Dependency array importance**
Controls when effect runs; incorrect dependencies cause bugs.

**useEffect vs useLayoutEffect**
useLayoutEffect runs synchronously before paint.

**useMemo vs useCallback**
useMemo memoizes values; useCallback memoizes functions.

**When memoization is harmful**
Overuse increases memory and complexity.

**Custom hooks**
Extract reusable stateful logic.

---

## 3️⃣ State Management

**Lifting state up**
Used when multiple components share data.

**Context API limitations**
Not ideal for high-frequency updates.

**Redux vs Context**
Redux offers predictability, middleware, and devtools.

**Redux Toolkit benefits**
Less boilerplate, Immer, safer defaults.

**Thunk vs Saga**
Saga provides better async orchestration and cancelation.

**Local vs global state**
UI state should stay local; shared/business state global.

**Why immutability matters**
Enables change detection and time-travel debugging.

---

## 4️⃣ Component Design & Architecture

**Smart vs Dumb components**
Smart handle logic and data; dumb focus only on UI.

**Presentational vs Container components**
Separates concerns for better reusability and testing.

**Atomic design principles**
Break UI into atoms, molecules, organisms for scalability.

**Folder structure for large apps**
Feature-based structure scales better than layer-based.

**Avoiding tight coupling**
Use composition, props, and hooks instead of direct dependencies.

**Composition vs inheritance**
Composition is preferred for flexibility and reuse.

**HOC / Render Props / Compound pattern**
Patterns to share logic across components safely.

---

## 5️⃣ Performance Optimization

**Why React apps become slow**
Unnecessary re-renders, large DOM trees, heavy computations.

**React.memo**
Prevents re-render when props don’t change.

**Memoization pitfalls**
Can increase memory and complexity if misused.

**Avoiding re-renders**
Split components, memoize handlers, normalize state.

**Debounce & throttle**
Reduce frequent state updates (e.g., search input).

**Virtualization**
Render only visible items in large lists.

**Code splitting**
Load code on demand to reduce bundle size.

---

## 6️⃣ Lifecycle Knowledge

**Lifecycle phases**
Mounting, Updating, Unmounting.

**useEffect equivalents**
Replaces componentDidMount/Update/Unmount.

**Error boundaries**
Catch runtime errors in component tree.

**Why hooks not in classes**
Hooks rely on call order, which classes break.

---

## 7️⃣ Forms & Validation

**Controlled forms**
Form state managed by React.

**Large forms**
Use libraries and isolate re-renders.

**Formik vs RHF**
RHF is more performant due to uncontrolled inputs.

---

## 8️⃣ Routing (React Router)

**SPA routing**
Client-side navigation without full reload.

**Protected routes**
Use auth checks before rendering routes.

**Lazy routes**
Improve performance using React.lazy.

---

## 9️⃣ Testing

**Unit vs integration**
Unit tests logic; integration tests behavior.

**What not to test**
Implementation details.

**Flaky tests**
Caused by async timing or shared state.

---

## 🔟 Error Handling & Edge Cases

**Error boundaries**
Handle UI crashes gracefully.

**Retry strategies**
Exponential backoff for APIs.

---

## 1️⃣1️⃣ Security

**XSS prevention**
React escapes HTML by default.

**dangerouslySetInnerHTML**
Use only with trusted content.

---

## 1️⃣2️⃣ Build Tools & Ecosystem

**Vite vs CRA**
Vite offers faster dev builds.

**Tree shaking**
Remove unused code from bundles.

---

## 1️⃣3️⃣ SSR, SSG & Modern React

**CSR vs SSR**
SSR improves SEO and initial load.

**Hydration**
Attach React to server-rendered HTML.

---

## 1️⃣4️⃣ Advanced Patterns

**Inversion of control**
Parent controls behavior via props.

**Pub-Sub**
Decouple components via events.

---

## 1️⃣5️⃣ React System Design

**Dashboard design**
Use modular widgets and global state.

**Real-time UI**
Use WebSockets and state normalization.

---

## 1️⃣6️⃣ Behavioral & Leadership

**Code reviews**
Focus on readability, performance, and correctness.

**Mentoring**
Teach fundamentals and decision-making.

**Legacy code**
Refactor incrementally, not big-bang.

**Speed vs quality**
Balance by prioritizing critical paths.

---

## 🧠 Lead Interview Closing Statement

> I design scalable React systems, optimize performance, manage state predictably, and mentor teams to deliver reliable production-grade applications.
