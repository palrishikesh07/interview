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


# React Fundamentals — Interview Questions & Quick Revision

> **For senior React interviews:** Start with the short answer, then explain the reason and give a small example.

## One-minute memory table

| # | Topic | Remember this |
|---|---|---|
| 1 | What problem does React solve? | **UI complexity + predictable updates** |
| 2 | Virtual DOM vs Real DOM | **In-memory description vs browser DOM** |
| 3 | Reconciliation | **Compare element trees and commit needed changes** |
| 4 | JSX | **JavaScript syntax for describing UI** |
| 5 | Importance of `key` | **Stable identity among siblings** |
| 6 | Non-unique keys | **Ambiguous identity, bugs, warnings** |
| 7 | State vs Props | **Owned data vs received data** |
| 8 | When does a component re-render? | **State, props, context, or parent render** |
| 9 | Render purity | **Same inputs, same UI; no side effects** |
| 10 | Controlled vs Uncontrolled | **React state vs DOM owns current value** |
| 11 | Batching | **Group updates to reduce render work** |
| 12 | Declarative React | **Describe the desired UI, not every DOM step** |

---

## 1. What problem does React solve?

**Interview answer:**

“React helps build interactive user interfaces by breaking them into reusable components and keeping the UI synchronized with changing data. Instead of manually updating DOM elements for every state change, we describe what the UI should look like for the current state and let React update the DOM.”

**Memory phrase:** **Components + State + UI updates.**

### Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Clicked {count} times
    </button>
  );
}
```

When state changes, React renders the component again and commits the necessary UI updates.

**Senior follow-up:** Is React a complete framework?  
**Answer:** React is primarily a UI library. Routing, data fetching, and other application concerns may be handled by additional libraries or a framework such as Next.js.

---

## 2. Virtual DOM vs Real DOM

**Interview answer:**

“The Real DOM is the browser's actual document tree. The Virtual DOM is a common informal name for the in-memory React element tree that describes the UI. React uses that description during rendering and reconciliation to determine what changes need to be committed to the browser DOM.”

**Memory phrase:** **Real DOM = browser; React tree = description.**

| Real DOM | React element tree (often called Virtual DOM) |
|---|---|
| Browser-managed document nodes | In-memory descriptions of UI elements |
| Mutated by browser DOM APIs | Produced by React rendering |
| Represents the actual page structure | Used by React to calculate and manage updates |
| DOM operations can trigger style/layout work | Comparing descriptions is part of React's update process |

### Example

```jsx
// Declarative description
return <h1>Hello React</h1>;
```

React turns the component's output into element descriptions, reconciles updates, and commits necessary DOM changes.

**Important senior-level correction:** The Virtual DOM is not automatically faster than every direct DOM operation. React's value includes declarative programming, component composition, and managing updates; actual performance depends on the work being done.

---

## 3. How does React reconciliation work?

**Interview answer:**

“Reconciliation is the process React uses to compare the newly rendered element tree with the previous one and determine what should change. React uses element types, positions, and keys to match component and element identity. It then commits the required changes to the host environment, such as the browser DOM.”

**Memory phrase:** **Render → Reconcile → Commit.**

### High-level flow

1. **Trigger:** State, props, context, or another update causes rendering work.
2. **Render:** React calls components to calculate the next UI description.
3. **Reconcile:** React determines which parts can be reused, updated, inserted, or removed.
4. **Commit:** React applies necessary host changes and runs relevant commit-phase work.
5. **Effects:** Passive Effects such as `useEffect` are processed according to their timing.

### Example: Same type vs different type

```jsx
function App({ isAdmin }) {
  return isAdmin
    ? <AdminPanel />
    : <UserPanel />;
}
```

Switching between `AdminPanel` and `UserPanel` changes the component type at that position, so React treats them as different component identities and does not preserve the old component's local state as if it were the same component.

**Keys matter:** Stable keys help React match items when list order changes.

**Senior-level note:** Reconciliation is not simply “diff the entire Virtual DOM and change one node.” React uses heuristics and component identity rules. Rendering work can be interrupted or restarted in concurrent rendering; commit work applies the selected changes.

---

## 4. What is JSX, and why does it exist?

**Interview answer:**

“JSX is a syntax extension that lets us write HTML-like markup inside JavaScript. It makes component UI easier to read and compose. Build tools transform JSX into JavaScript calls or equivalent instructions that create React elements.”

**Memory phrase:** **JSX = readable UI inside JavaScript.**

### Example

```jsx
const element = <h1>Hello, {name}</h1>;
```

A modern JSX transform compiles this to code conceptually similar to:

```jsx
import { jsx as _jsx } from "react/jsx-runtime";

const element = _jsx("h1", {
  children: `Hello, ${name}`
});
```

The exact output depends on the compiler and configuration.

### JSX rules to remember

- Return one parent element or a Fragment (`<>...</>`).
- Use `{}` to insert JavaScript expressions.
- Use `className` rather than HTML's `class` attribute.
- Close tags, including elements such as `<img />`.
- Component names start with uppercase letters; lowercase names are treated as intrinsic elements.

**Follow-up:** Does the browser understand JSX directly?  
**Answer:** Browsers do not execute JSX syntax directly. A build tool or compiler transforms it into JavaScript first.

---

## 5. Why is `key` important in lists?

**Interview answer:**

“A `key` gives each sibling element a stable identity across renders. It helps React determine which list item was inserted, removed, moved, or updated, allowing it to preserve the correct component state and update the UI correctly.”

**Memory phrase:** **Key = identity, not decoration.**

### Correct example

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

Use a stable unique identifier from the data when available.

### Why not use the array index?

```jsx
items.map((item, index) => (
  <Row key={index} item={item} />
))
```

Index keys can cause identity mismatches if items are inserted, removed, or reordered. React may reuse a component instance for a different item, leading to incorrect local state or input values.

Index keys can be acceptable when the list is static, never reordered, and items are never inserted or deleted in a way that changes positions.

**Important:** `key` is a special React attribute and is not passed to the component as a normal prop. Pass `id` separately if the component needs it.

---

## 6. What issues can non-unique keys cause?

**Interview answer:**

“Keys must be unique among siblings. Duplicate or unstable keys make it ambiguous which rendered item corresponds to which previous item. React may warn, reuse the wrong component identity, or produce incorrect updates, especially when the list changes.”

**Memory phrase:** **Duplicate key = ambiguous identity.**

### Incorrect example

```jsx
const users = [
  { id: 1, name: "Asha" },
  { id: 1, name: "Ravi" },
];

return users.map((user) => (
  <div key={user.id}>{user.name}</div>
));
```

Both siblings have the same key.

### Correct approach

```jsx
return users.map((user) => (
  <div key={user.id}>{user.name}</div>
));
```

This is correct only if each `user.id` is genuinely unique among the rendered siblings. Fix duplicate IDs in the data or derive a stable composite key from real, unique fields.

**Senior follow-up:** Are keys globally unique?  
**Answer:** No. They need to be unique among siblings in the same list, not across the entire application.

---

## 7. State vs Props

**Interview answer:**

“Props are inputs passed from a parent component, while state is data a component manages over time. Both influence rendering. A child should treat props as read-only and use state setters or reducer dispatch to request its own state updates.”

**Memory phrase:** **Props come in; state is managed.**

| Props | State |
|---|---|
| Passed into a component | Managed by the component or a Hook/store |
| Read-only from the receiving component's perspective | Updated through a setter or dispatch |
| Change when the parent supplies different values | Changes when an update is processed |
| Used to configure a component | Used to represent changing data or UI state |

### Example

```jsx
function Greeting({ name }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section>
      <h2>Hello, {name}</h2>
      <button onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Hide" : "Show"} details
      </button>
      {expanded && <p>Extra details here</p>}
    </section>
  );
}
```

Here, `name` is a prop, while `expanded` is local state.

**Senior-level note:** Avoid copying props into state unless you intentionally need an independent, resettable snapshot. Duplicating the same source of truth can create synchronization bugs.

---

## 8. When does a component re-render?

**Interview answer:**

“A component can render again when its state updates, its parent renders, a context value it consumes changes, or an external store it subscribes to reports a change. A render does not necessarily mean React will mutate the DOM.”

**Memory phrase:** **State + Parent + Context + Store.**

### Example

```jsx
function Counter({ label }) {
  const [count, setCount] = useState(0);

  console.log("Rendering Counter");

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {label}: {count}
    </button>
  );
}
```

The component renders again when its state update is processed. It may also render when its parent renders and supplies props.

### How can unnecessary renders be reduced?

- Keep state close to the components that need it.
- Split large components when it improves isolation.
- Use `React.memo` when skipping child renders is beneficial.
- Use `useMemo` and `useCallback` when stable values/references actually help.
- Avoid unnecessary context updates or split contexts by update frequency when useful.
- Profile before optimizing.

**Important:** A render is React calculating the UI; a commit is applying changes. A render may result in no DOM changes, and concurrent rendering work may be restarted or discarded.

---

## 9. What is render purity?

**Interview answer:**

“A pure render means that for the same props, state, and context, a component calculates the same UI without causing side effects or mutating external data. Side effects belong in event handlers or appropriate Effects, not in the render body.”

**Memory phrase:** **Same inputs → same UI; no side effects.**

### Incorrect: side effect during render

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Incorrect: causes a state update during render
  if (count < 5) {
    setCount(count + 1);
  }

  return <p>{count}</p>;
}
```

### Better: update in response to an event

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {count}
    </button>
  );
}
```

**Why does purity matter?** React may render components more than once, restart rendering, or discard render work. Pure rendering makes these behaviors safe and predictable.

**Avoid in render:** Mutating global variables, manually changing the DOM, starting timers, or performing network requests.

---

## 10. Controlled vs Uncontrolled components

**Interview answer:**

“A controlled input gets its current value from React state and reports changes through an event handler. An uncontrolled input keeps its current value in the DOM, and React typically reads it using a ref or form submission. Controlled inputs are useful for validation and dynamic UI; uncontrolled inputs can be simpler for straightforward forms.”

**Memory phrase:** **Controlled = React owns value; uncontrolled = DOM owns value.**

### Controlled input

```jsx
function ControlledForm() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  );
}
```

React state is the source of truth for the input's value.

### Uncontrolled input

```jsx
function UncontrolledForm() {
  const nameRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(nameRef.current?.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="Alex" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

`defaultValue` sets the initial value; the DOM manages subsequent edits.

**Senior-level note:** For a controlled text input, keep `value` consistently a string and update it synchronously in `onChange`. Avoid switching an input between controlled and uncontrolled modes.

---

## 11. How does React batch updates?

**Interview answer:**

“Batching means React groups multiple state updates so it can process them together and reduce unnecessary rendering work. Modern React with `createRoot` supports automatic batching across more update contexts, including many promises, timers, and event handlers.”

**Memory phrase:** **Many updates → fewer render passes.**

### Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(false);

  function handleClick() {
    setCount((value) => value + 1);
    setEnabled((value) => !value);
    // React can batch these updates.
  }

  return (
    <button onClick={handleClick}>
      {count} / {enabled ? "On" : "Off"}
    </button>
  );
}
```

React can process both updates in one render rather than rendering once after each setter call.

### Why use functional updaters?

When multiple updates depend on the previous state, updater functions are safer:

```jsx
setCount((value) => value + 1);
setCount((value) => value + 1);
```

This increments twice.

**Senior-level note:** Batching does not mean every update is always combined into one render in every situation. Update priority, synchronous flushing, and framework behavior can affect scheduling. `flushSync` exists for rare cases when a synchronous DOM update is required, but it should not be the default approach.

---

## 12. Why is React declarative?

**Interview answer:**

“React is declarative because we describe what the UI should look like for the current state, and React manages the DOM updates needed to get there. In imperative code, we explicitly describe each step to manipulate the DOM.”

**Memory phrase:** **Declare what; React handles how.**

### Imperative approach

```js
const button = document.querySelector("#counter");
button.textContent = "Count: 1";
```

You directly tell the browser which DOM node to find and how to modify it.

### Declarative approach

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}
```

You describe the UI as a function of state. React handles rendering and committing the necessary updates.

**Why it helps:**
- Easier to reason about UI state.
- Encourages reusable components.
- Reduces manual DOM synchronization.
- Makes UI behavior more predictable and testable.

**Important:** React does not eliminate all imperative code. Refs, focus management, third-party integrations, and certain browser APIs may require imperative operations.

---

# Common senior-level interview traps

1. **Is the Virtual DOM always faster than the Real DOM?** No. It is an implementation approach; performance depends on the workload.
2. **Does a re-render mean the whole DOM is recreated?** No. React reconciles the new output and commits necessary changes.
3. **Are keys passed as props?** No. `key` is special; pass a separate prop if needed.
4. **Are array indexes always bad keys?** No, but avoid them for lists that can be reordered, inserted into, or deleted from.
5. **Can props be changed by a child?** Treat props as read-only; the parent owns the supplied values.
6. **Does every render change the DOM?** No. Rendering and committing DOM changes are different phases.
7. **Why must render be pure?** React may repeat, restart, or discard rendering work.
8. **Are controlled inputs always better?** No. Choose based on validation, dynamic behavior, and form complexity.
9. **Does batching change the result of state updater functions?** Updater functions are processed in order; use them when the next value depends on the previous value.
10. **Is React fully declarative?** Most UI description is declarative, but imperative escape hatches still exist.

---

# 30-second interview answer

“React helps build reusable, interactive UIs by describing the UI as a function of state and props. JSX provides readable syntax for creating React elements, and reconciliation determines which changes need to be committed to the browser DOM. Stable keys preserve list-item identity. Props are inputs, while state is managed data. Components may re-render when state, props, context, or subscribed stores change, but rendering does not necessarily change the DOM. Render should remain pure because React can repeat or restart it. Controlled inputs use React state, and uncontrolled inputs use DOM state. React batches updates to reduce rendering work, making UI code more declarative and easier to reason about.”

---

# Last-minute memory card

- **React solves:** UI complexity + predictable updates.
- **Virtual DOM:** In-memory UI description.
- **Reconciliation:** Render → Reconcile → Commit.
- **JSX:** Readable UI syntax in JavaScript.
- **Keys:** Stable identity among siblings.
- **Duplicate keys:** Ambiguous identity.
- **Props vs state:** Received inputs vs managed data.
- **Re-render:** State, parent, context, subscribed store.
- **Pure render:** Same inputs → same UI, no side effects.
- **Controlled input:** React owns value.
- **Uncontrolled input:** DOM owns value.
- **Batching:** Group updates to reduce render work.
- **Declarative:** Describe what; React handles how.

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

# React Hooks — Interview Quick Revision

> **Goal:** Remember the answer fast, explain it clearly, and add a code example only when needed.

## The 9 topics in one minute

| # | Interview question | Remember this |
|---|---|---|
| 1 | Why Hooks? | **State + Reuse + Cleaner logic** |
| 2 | Rules of Hooks? | **Top level + React functions** |
| 3 | How does `useState` work? | **State snapshot + scheduled update + re-render** |
| 4 | `useEffect` lifecycle? | **Setup after commit; cleanup before rerun/unmount** |
| 5 | Why cleanup? | **Stop what setup started** |
| 6 | Dependency array? | **Controls when synchronization repeats** |
| 7 | Empty `[]`? | **No reactive dependencies** |
| 8 | Missing dependency? | **Stale closure risk** |
| 9 | `useEffect` vs `useLayoutEffect`? | **Normal sync vs before-paint layout work** |

---

## 1. Why were Hooks introduced?

**Say this in the interview:**

“Hooks were introduced in React 16.8 so function components could use state and other React features. They also make stateful logic easier to reuse through custom Hooks and help keep related logic together.”

**Memory phrase:** **S-R-C** = State, Reuse, Cleaner code.

```jsx
const [count, setCount] = useState(0);
```

- State works in function components.
- Custom Hooks let components reuse logic.
- Hooks reduce the need for class components, HOCs, and render props in many use cases.

**Follow-up:** Do Hooks remove class components completely?  
**Answer:** No. Class components are still supported. Built-in error boundaries are still commonly implemented with class components.

---

## 2. What are the Rules of Hooks?

**Say this in the interview:**

“Call Hooks only at the top level of a React function component or custom Hook. Do not call them conditionally or inside loops and event handlers. React relies on a consistent Hook call order between renders.”

**Memory phrase:** **Top level + React function.**

❌ Don't:

```jsx
if (isLoggedIn) {
  const [user, setUser] = useState(null);
}
```

✅ Do:

```jsx
const [user, setUser] = useState(null);

if (!isLoggedIn) {
  return <p>Please log in</p>;
}
```

**Why?** Conditional calls can change the order of Hooks between renders.

---

## 3. How does `useState` work internally?

**Say this in the interview:**

“React preserves Hook state across renders. Calling the setter schedules a state update; React processes it and renders again when needed. The state variable in the current render does not change immediately.”

**Memory phrase:** **Snapshot → Schedule → Re-render.**

```jsx
const [count, setCount] = useState(0);

setCount((prev) => prev + 1);
```

### Why use a functional updater?

❌ All three calls use the same `count` snapshot:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

✅ Each updater receives the previous queued value:

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

The second version increments by 3.

**Senior point:** React associates Hook state with a component's Fiber and processes queued updates. State updates may be batched.

---

## 4. How does `useEffect` map to lifecycle methods?

**Say this in the interview:**

“`useEffect` runs after React commits a render to synchronize with external systems. Its cleanup runs before the Effect reruns with changed dependencies and when the component unmounts.”

**Memory phrase:** **Mount/setup → dependency change/cleanup + setup → unmount/cleanup.**

| Class lifecycle idea | Hook pattern |
|---|---|
| Mount-oriented work | `useEffect(() => { ... }, [])` |
| Work when a value changes | `useEffect(() => { ... }, [value])` |
| Unmount cleanup | Return a cleanup function |

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

**Important:** This is a useful mapping, not a perfect one-to-one replacement for every class lifecycle method.

---

## 5. What is the cleanup function?

**Say this in the interview:**

“Cleanup reverses or releases resources created by an Effect. It prevents leftover listeners, timers, and subscriptions when dependencies change or a component unmounts.”

**Memory phrase:** **Setup starts it; cleanup stops it.**

```jsx
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

**Common cleanup targets:** event listeners, timers, subscriptions, observers, and cancellable asynchronous work.

**Strict Mode note:** In development, React may run setup → cleanup → setup once extra to reveal unsafe Effects. Make setup and cleanup resilient to restarting.

---

## 6. Why is the dependency array important?

**Say this in the interview:**

“The dependency array lists the reactive values an Effect uses. React compares each dependency with its previous value using `Object.is`. If a dependency changes, React cleans up the old Effect and runs the new setup.”

**Memory phrase:** **Dependencies decide when to repeat.**

```jsx
useEffect(() => {
  console.log("Selected user:", userId);
}, [userId]);
```

### The three patterns

```jsx
useEffect(() => {
  // Runs after every committed render
});
```

```jsx
useEffect(() => {
  // No reactive dependencies
}, []);
```

```jsx
useEffect(() => {
  // Runs on mount and when userId changes
}, [userId]);
```

**Senior point:** Include all reactive values used by the Effect. If dependencies are awkward, reconsider the Effect's design instead of suppressing the lint warning blindly.

---

## 7. What does an empty dependency array `[]` mean?

**Say this in the interview:**

“An empty dependency array means the Effect has no reactive dependencies. In production, setup runs after mount and cleanup runs on unmount. Development Strict Mode may run an extra setup/cleanup cycle.”

**Memory phrase:** **Empty list ≠ guaranteed one setup in every environment.**

```jsx
useEffect(() => {
  console.log("Setup");

  return () => {
    console.log("Cleanup");
  };
}, []);
```

### Common trap: stale closure

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // Can keep logging the initial count
  }, 1000);

  return () => clearInterval(id);
}, []);
```

The callback captures the `count` from the initial render. If the Effect should restart when `count` changes, add `[count]`. If it should keep running while reading the latest value, consider a ref or another appropriate design.

---

## 8. What happens when a dependency is missing?

**Say this in the interview:**

“If an Effect uses a reactive value but doesn't list it as a dependency, it may keep using an old value from a previous render. This is called a stale closure and can cause outdated UI or incorrect synchronization.”

**Memory phrase:** **Missing dependency → stale closure → wrong value.**

❌ Incorrect:

```jsx
useEffect(() => {
  setMessage(`Hello, ${name}`);
}, []); // name is missing
```

✅ Correct:

```jsx
useEffect(() => {
  setMessage(`Hello, ${name}`);
}, [name]);
```

### How to fix dependency problems

1. Add reactive values used by the Effect.
2. Use functional state updates when only the previous state is needed.
3. Move Effect-only functions or objects inside the Effect.
4. Use refs for mutable values that shouldn't trigger a render.
5. Ask whether an Effect is needed at all; derived values can often be calculated during rendering.

**Interview tip:** Mention the `react-hooks/exhaustive-deps` lint rule.

---

## 9. `useEffect` vs `useLayoutEffect`

**Say this in the interview:**

“`useEffect` is for ordinary synchronization after a commit. `useLayoutEffect` runs after DOM changes are committed but before the browser repaints, so it is useful for measuring or correcting layout without a visible flicker. Because it can block painting, I use it only when necessary.”

**Memory phrase:** **Effect = ordinary work; Layout Effect = before-paint measurement.**

| `useEffect` | `useLayoutEffect` |
|---|---|
| Ordinary external synchronization | Layout measurement/correction |
| Usually lets the browser paint first for non-interaction updates | Runs before repaint |
| Preferred default | Can block painting |
| Doesn't run during server rendering | Doesn't run during server rendering; can warn in SSR contexts |

Example measurement:

```jsx
const elementRef = useRef(null);
const [height, setHeight] = useState(0);

useLayoutEffect(() => {
  if (elementRef.current) {
    setHeight(elementRef.current.getBoundingClientRect().height);
  }
}, []);
```

Use `useEffect` for fetching, subscriptions, timers, and document-title updates. Use `useLayoutEffect` when visual positioning or measurement must happen before paint.

---

# Common interview traps

1. **Does `setState` immediately change the state variable?** No. The current render sees its state snapshot.
2. **Does `useEffect(..., [])` always execute exactly once?** Not in development Strict Mode.
3. **Does every Effect need cleanup?** No. Cleanup is needed when setup creates a resource or work that must be stopped, undone, or invalidated.
4. **Does an Effect run after every render?** Only when no dependency array is provided; with dependencies, it reruns when they change.
5. **Can I use `useLayoutEffect` everywhere?** Avoid it unless pre-paint timing is necessary because it can delay painting.
6. **Should every API call be in an Effect?** No. Event-driven requests may belong in event handlers; framework loaders or server-state libraries may be more appropriate.

---

# 30-second answer to memorize

“Hooks let function components use state and reuse stateful logic. I call Hooks only at the top level of React components or custom Hooks. `useState` preserves state between renders, and its setter schedules an update. `useEffect` synchronizes with external systems after a commit, while cleanup stops or reverses that setup. The dependency array controls when synchronization repeats; missing dependencies can cause stale closures. I use `useEffect` by default and `useLayoutEffect` only when layout must be measured or corrected before the browser paints.”

---

# Last-minute memory card

- **Why Hooks?** State + Reuse + Cleaner logic.
- **Rules?** Top level + React function.
- **`useState`?** Snapshot → Schedule → Re-render.
- **Effect lifecycle?** Setup → Cleanup + Setup → Cleanup.
- **Cleanup?** Stop what setup started.
- **Dependencies?** Decide when synchronization repeats.
- **`[]`?** No reactive dependencies.
- **Missing dependency?** Stale closure risk.
- **Layout Effect?** Before-paint layout work.


# React Hooks Interview — Topics 10–17 (Quick Memory Guide)

> **Goal:** Easy-to-recall answers, compact examples, and quick revision for senior React interviews.

## One-minute memory table

| # | Topic | Remember this |
|---|---|---|
| 10 | `useMemo` vs `useCallback` | **Memoize a value vs memoize a function** |
| 11 | When memoization is harmful | **Extra complexity + comparison cost** |
| 12 | Referential equality | **Same contents doesn't mean same reference** |
| 13 | Custom Hooks | **Extract reusable stateful logic** |
| 14 | Hook reusability patterns | **Compose small Hooks around one concern** |
| 15 | Hooks vs HOCs | **Direct composition vs wrapping components** |
| 16 | Can Hooks replace Redux? | **Hooks are APIs; Redux is a state-management solution** |
| 17 | Hooks vs class lifecycles | **Describe synchronization, not just lifecycle names** |

---

## 10. What is the difference between `useMemo` and `useCallback`?

**Interview answer:**

“`useMemo` caches a calculated value between renders when its dependencies haven't changed. `useCallback` caches a function definition between renders. I use them when stable values or function references improve performance or are required by an API—not automatically everywhere.”

**Memory phrase:** **Memo = result; Callback = function.**

### `useMemo` — cache a value

```jsx
import { useMemo, useState } from "react";

function ProductList({ products, search }) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return <p>{filteredProducts.length} products found</p>;
}
```

### `useCallback` — cache a function reference

```jsx
import { useCallback, useState } from "react";

function SearchBox() {
  const [search, setSearch] = useState("");

  const handleChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  return <input value={search} onChange={handleChange} />;
}
```

### Quick comparison

| `useMemo` | `useCallback` |
|---|---|
| Returns a cached **value** | Returns a cached **function** |
| `useMemo(() => calculate(x), [x])` | `useCallback(() => doSomething(x), [x])` |
| Useful for expensive calculations or stable object values | Useful when function identity matters, e.g. a memoized child prop |

**Senior-level note:** `useCallback(fn, deps)` is conceptually similar to `useMemo(() => fn, deps)`. Both are performance optimizations, not correctness guarantees; React may discard cached values in certain situations.

---

## 11. When can memoization be harmful?

**Interview answer:**

“Memoization is not free. It adds code complexity, dependency maintenance, and comparison overhead. For cheap calculations or components that rarely re-render, it may cost more than it saves. I profile first and memoize only when it solves a measured or clear performance problem.”

**Memory phrase:** **Don't optimize without evidence.**

### Over-memoization example

```jsx
// Usually unnecessary for a trivial calculation:
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName]
);

// Simpler:
const fullName = `${firstName} ${lastName}`;
```

### When memoization may help

- An expensive calculation repeats with unchanged inputs.
- A `memo`-wrapped child re-renders because a callback prop changes identity.
- An API or Hook requires a stable reference.
- Profiling shows a meaningful render or calculation cost.

### When it may hurt

- The work is very cheap.
- Dependencies are difficult to maintain correctly.
- New objects/functions are created only to be memoized unnecessarily.
- It makes code harder to understand without measurable benefit.

**Important:** `React.memo`, `useMemo`, and `useCallback` are optimization tools. They should not be required to make application logic correct.

---

## 12. What are referential equality problems?

**Interview answer:**

“JavaScript objects, arrays, and functions are compared by reference, not by their contents. A new object or function created during every render has a new identity, even if its contents look identical. This can trigger Effects, defeat `React.memo`, or cause unnecessary work.”

**Memory phrase:** **Same contents ≠ same reference.**

### Example: An Effect runs on every render

```jsx
function UserPanel({ userId }) {
  const options = { userId };

  useEffect(() => {
    connect(options);
    return () => disconnect(options);
  }, [options]); // New object on every render
}
```

Because `options` is newly created on each render, React sees a changed dependency.

**Better: create the object inside the Effect and depend on its primitive input.**

```jsx
function UserPanel({ userId }) {
  useEffect(() => {
    const options = { userId };

    connect(options);
    return () => disconnect(options);
  }, [userId]);
}
```

### Example: `React.memo` and function props

```jsx
const Child = React.memo(function Child({ onSave }) {
  console.log("Child rendered");
  return <button onClick={onSave}>Save</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleSave = useCallback(() => {
    console.log("Saved");
  }, []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>
        Count: {count}
      </button>
      <Child onSave={handleSave} />
    </>
  );
}
```

The stable `handleSave` reference can allow `Child` to skip a re-render caused solely by the parent updating `count`, assuming its other props remain unchanged.

**Senior-level point:** React compares Effect dependencies using `Object.is`. `React.memo` shallowly compares props, so newly created object/array/function props usually count as changed.

---

## 13. What are custom Hooks, and when should we use them?

**Interview answer:**

“A custom Hook is a JavaScript function whose name starts with `use` and that can call other Hooks. It lets us extract and reuse stateful logic across components without duplicating implementation. Each component calling the custom Hook gets its own Hook state unless the Hook connects to shared state or an external store.”

**Memory phrase:** **Reuse logic, not component UI.**

### Example: `useWindowWidth`

```jsx
import { useEffect, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return width;
}

function Dashboard() {
  const width = useWindowWidth();
  return <p>Window width: {width}px</p>;
}
```

**When should you create one?**

- Multiple components repeat the same stateful behavior.
- You want to separate behavior from presentation.
- You want a focused abstraction for subscriptions, URL state, forms, or reusable interaction logic.
- A component is becoming hard to read because its behavior is mixed together.

**Avoid:** Creating a custom Hook just to wrap one simple expression or hiding behavior behind a vague abstraction.

**Important:** A custom Hook shares logic, not automatically the same state instance. Two components calling `useWindowWidth()` each have their own `width` state.

---

## 14. What are common Hook reusability patterns?

**Interview answer:**

“I build reusable behavior by composing small custom Hooks around a single concern. A Hook can encapsulate state, Effects, subscriptions, or derived behavior, and a component combines those Hooks for its needs. Shared state across components requires a shared mechanism, such as Context, an external store, or a state-management library.”

**Memory phrase:** **Small Hooks → Compose → Component.**

### Pattern A: Separate behavior from UI

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return { count, increment, decrement };
}

function Counter() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### Pattern B: Compose Hooks

```jsx
function useSearchableProducts(products) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  return { query, setQuery, filtered };
}
```

### Good design rules

- Give each custom Hook one clear responsibility.
- Return a small, intentional API.
- Clean up subscriptions and external resources.
- Keep dependencies correct.
- Test behavior independently where practical.
- Use Context or a store when components truly need shared state.

---

## 15. Hooks vs Higher-Order Components (HOCs)

**Interview answer:**

“A Higher-Order Component is a function that takes a component and returns an enhanced component. Custom Hooks let us reuse stateful logic directly inside function components without wrapping the component tree. Hooks often make composition and debugging simpler, but HOCs remain useful in existing codebases and for certain component-level composition patterns.”

**Memory phrase:** **HOC wraps a component; Hook reuses behavior.**

### HOC example

```jsx
function withLoading(Component) {
  return function WithLoading({ loading, ...props }) {
    if (loading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}
```

Usage:

```jsx
const UserListWithLoading = withLoading(UserList);
```

### Custom Hook approach

```jsx
function useUserData() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Fetch users and update state here.
  // Handle errors and cleanup as appropriate.

  return { loading, users };
}
```

Usage:

```jsx
function UserList() {
  const { loading, users } = useUserData();

  if (loading) return <p>Loading...</p>;
  return users.map((user) => <p key={user.id}>{user.name}</p>);
}
```

| Hooks | HOCs |
|---|---|
| Reuse behavior | Enhance/wrap components |
| Called inside function components or custom Hooks | Applied around a component |
| Avoid an extra wrapper component for logic reuse | Can add wrapper layers and prop-name collisions |
| Do not themselves share state automatically | Can inject props or alter component composition |

**Important:** These approaches are not mutually exclusive. Hooks are not a replacement for every HOC use case.

---

## 16. Can Hooks replace Redux?

**Interview answer:**

“No. Hooks are a React API, while Redux is a state-management library. Hooks like `useState`, `useReducer`, and `useContext` can manage local or some shared state, but Redux provides a centralized store, predictable update patterns, middleware, and ecosystem tooling. I choose based on state complexity and application requirements.”

**Memory phrase:** **Hooks are tools; Redux is a state-management solution.**

### Local state with `useState`

```jsx
const [isOpen, setIsOpen] = useState(false);
```

Best for component-specific state, such as whether a modal is open.

### Reducer + Context for a smaller shared state setup

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

With Context, the state and `dispatch` can be exposed to descendants. For large or frequently changing state trees, consider render behavior and architecture carefully.

### When to consider Redux Toolkit

- Many features depend on the same global client state.
- You need explicit, predictable state transitions.
- Middleware or complex async workflows are useful.
- You need Redux DevTools and a mature ecosystem.
- A team benefits from consistent state-management conventions.

**Important distinction:** Server state (API data, caching, refetching) is often better handled by a server-state library or framework mechanism rather than treating every API response as ordinary global client state.

---

## 17. Hooks vs class lifecycle methods

**Interview answer:**

“Class components organize behavior around lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. Function components use Effects to synchronize with external systems, with cleanup for teardown. I don't map every lifecycle method mechanically; I ask what external system the component needs to synchronize with and what starts, updates, and stops that synchronization.”

**Memory phrase:** **Class = lifecycle methods; Hooks = synchronization logic.**

### Class approach

```jsx
class Clock extends React.Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      console.log("tick");
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <p>Clock is running</p>;
  }
}
```

### Function component approach

```jsx
function Clock() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("tick");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>Clock is running</p>;
}
```

### Lifecycle mapping to remember

| Class component | Function component |
|---|---|
| `componentDidMount` | Often an Effect with `[]` |
| `componentDidUpdate` | Often an Effect with dependencies |
| `componentWillUnmount` | Effect cleanup |
| `this.state` | `useState` or `useReducer` |
| Instance methods | Ordinary functions, callbacks, or custom Hooks depending on purpose |

**Important nuance:** Effects run after a commit, and their timing is not identical to all class lifecycle methods. Do not use an Effect just to calculate data that can be derived during render.

---

# Quick revision: one sentence per topic

- **10 — `useMemo` vs `useCallback`:** Memo caches a value; Callback caches a function reference.
- **11 — Harmful memoization:** It adds complexity and overhead; profile before optimizing.
- **12 — Referential equality:** Objects and functions are compared by identity, not by contents.
- **13 — Custom Hooks:** Reuse stateful behavior across function components.
- **14 — Reusability patterns:** Compose small Hooks, each with a clear responsibility.
- **15 — Hooks vs HOCs:** Hooks reuse behavior inside a component; HOCs wrap components.
- **16 — Hooks vs Redux:** Hooks are React APIs; Redux is a state-management library.
- **17 — Hooks vs class lifecycle:** Effects synchronize external systems and cleanup reverses setup.

# 30-second interview answer

“`useMemo` caches a value, while `useCallback` caches a function reference. Memoization can hurt readability and add overhead, so I use it when profiling or referential stability justifies it. Objects and functions have reference identity, which can affect Effects and memoized children. Custom Hooks let us reuse stateful logic and compose behavior. Unlike HOCs, they don't require wrapping a component. Hooks can manage local or shared state, but they don't automatically replace Redux, which adds a centralized store and ecosystem. Finally, Effects and their cleanup provide synchronization and teardown behavior that often replaces class lifecycle code.”

## Final memory card

**Memo / Callback:** Value / Function  
**Memoization:** Measure first  
**References:** Identity matters  
**Custom Hooks:** Reuse behavior  
**Composition:** Small + focused  
**HOC:** Wraps component  
**Redux:** Centralized store + tooling  
**Lifecycle:** Setup → resynchronize → cleanup
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


# React State Management — Interview Questions & Quick Revision

> **Level:** Mid-level to Senior React  
> **How to use:** Memorize the short answer, explain the trade-off, then give the code example.

## One-minute memory table

| # | Topic | Remember this |
|---|---|---|
| 1 | Lifting state up | **One owner, shared data** |
| 2 | Prop drilling | **Props pass through components that don't need them** |
| 3 | Context: when not to use | **Avoid high-frequency, broad updates** |
| 4 | Redux vs Context | **State-management workflow vs value distribution** |
| 5 | Redux Toolkit advantages | **Less boilerplate, safer updates, better defaults** |
| 6 | RTK vs classic Redux | **Slices and generated actions vs manual setup** |
| 7 | Thunk vs Saga | **Direct async functions vs generator-based workflows** |
| 8 | RTK Query vs Saga | **Data fetching/cache vs general side-effect orchestration** |
| 9 | Local vs global state | **Keep state close to its consumers** |
| 10 | Normalized state | **Entities by ID + ID references** |
| 11 | Immutability | **New references signal changed data** |
| 12 | Detecting state changes | **Reference comparisons + update scheduling** |
| 13 | Mutation in RTK | **Immer converts draft edits to immutable updates** |
| 14 | Redux performance | **Select narrowly, normalize, memoize when needed** |

---

## 1. What is lifting state up? What are its pros and cons?

**Interview answer:**

“Lifting state up means moving state to the closest common parent of components that need to share it. The parent owns the source of truth and passes values and callbacks down as props. It keeps shared data consistent, but can increase prop passing and make the parent responsible for more state.”

**Memory phrase:** **One owner, shared data.**

### Example

```jsx
function Parent() {
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchBox value={search} onChange={setSearch} />
      <SearchResults query={search} />
    </>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function SearchResults({ query }) {
  return <p>Searching for: {query}</p>;
}
```

### Pros
- One source of truth.
- Sibling components stay synchronized.
- Easier to reason about data flow and test.

### Cons
- Props may need to pass through intermediate components.
- Parent can become too large or rerender more descendants.
- Distant components may be tightly coupled through a shared parent.

**Rule of thumb:** Lift state only as high as necessary—not automatically to the app root.

---

## 2. What is prop drilling, and why is it a problem?

**Interview answer:**

“Prop drilling is passing data through several component layers even though intermediate components do not use it. It can make component interfaces noisy and changes harder to maintain. For deeply shared data, Context or a state-management solution may help, but ordinary props are often the simplest choice for short component trees.”

**Memory phrase:** **Passing through components that don't need it.**

### Example

```jsx
function App() {
  const user = { name: "Ravi" };
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return <p>Hello, {user.name}</p>;
}
```

`Layout` and `Sidebar` only forward `user`.

**Possible solutions**
- Keep props when the tree is small and dependencies are explicit.
- Use Context for values needed by many descendants.
- Use Redux or another store for complex, widely shared client state.
- Compose components differently so a parent can pass an already-configured child.

**Senior point:** Prop drilling is not inherently bad; excessive, unrelated forwarding is the problem.

---

## 3. When should you NOT use Context API?

**Interview answer:**

“Context is useful for values needed by many descendants, such as theme, locale, or the current authenticated user. I avoid using one broad Context for frequently changing state consumed by many unrelated components because updates can trigger many consumers to render. Context also doesn't provide a complete solution for async workflows, caching, or state debugging by itself.”

**Memory phrase:** **Context distributes values; it is not automatically a state-management architecture.**

### Context example

```jsx
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}
```

### When Context may be a poor fit
- Very high-frequency updates across many consumers.
- Large, complex shared state with many update rules.
- You need advanced async orchestration, cache invalidation, or rich debugging.
- A single provider value combines unrelated state and changes frequently.

### Improvements before adding a library
- Split Contexts by responsibility or update frequency.
- Separate state and dispatch Contexts when useful.
- Keep providers close to consumers.
- Memoize provider values when reference churn is causing unnecessary updates, but remember this does not prevent consumers from updating when the actual Context value changes.

---

## 4. Redux vs Context API

**Interview answer:**

“Context is a React mechanism for making a value available to descendants. Redux is a state-management library with a centralized store, explicit update flow, middleware, selectors, and DevTools. Context can be enough for simple shared state; Redux is useful when client state and update logic become complex or need consistent tooling.”

**Memory phrase:** **Context = distribution; Redux = state workflow + tooling.**

| Context API | Redux / Redux Toolkit |
|---|---|
| Built into React | External state-management library |
| Makes values available to descendants | Centralized store with actions and reducers |
| Update logic is designed by the app | Encourages a consistent update workflow |
| No built-in Redux-style middleware or DevTools workflow | Middleware, Redux DevTools, selectors |
| Good for theme, locale, stable shared values | Good for complex shared client state and cross-feature workflows |

**Important:** Redux often uses React-Redux hooks such as `useSelector` and `useDispatch`. Context and Redux are not mutually exclusive; a Redux Provider itself uses Context internally to expose the store.

---

## 5. What are the advantages of Redux Toolkit (RTK)?

**Interview answer:**

“Redux Toolkit is the recommended way to write Redux. It reduces boilerplate with `configureStore` and `createSlice`, includes useful defaults such as thunk middleware and development checks, and uses Immer so reducers can be written with draft-style mutations while still producing immutable state.”

**Memory phrase:** **Less boilerplate + safer defaults + Immer.**

### Example

```jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    addBy(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, addBy } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
```

### Key advantages
- `configureStore` sets up the store and common middleware.
- `createSlice` generates action creators and action types.
- Immer simplifies immutable update logic.
- Strong TypeScript support.
- Redux DevTools integration.
- RTK Query is available for API fetching and caching.

**Senior point:** RTK does not change Redux's fundamental principles; it provides a more productive, safer standard approach.

---

## 6. Redux Toolkit vs classic Redux

**Interview answer:**

“Classic Redux typically requires manually defining action types, action creators, reducers, and store middleware configuration. Redux Toolkit combines related reducer logic and generated actions in slices and simplifies store setup. RTK is the recommended approach for new Redux code.”

**Memory phrase:** **Classic = manual wiring; RTK = slice + defaults.**

### Classic Redux style

```js
const INCREMENT = "counter/increment";

function increment() {
  return { type: INCREMENT };
}

function reducer(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
}
```

### RTK style

```js
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
  },
});
```

| Classic Redux | Redux Toolkit |
|---|---|
| Manually define action types | Action types generated from slice |
| Manually write action creators | Action creators generated |
| Immutable updates written manually | Immer enables draft-style updates |
| Store/middleware setup is manual | `configureStore` provides useful defaults |
| More repetitive code | Less boilerplate |

**Important:** Classic Redux still works. RTK is the recommended default for modern Redux applications.

---

## 7. Redux Thunk vs Redux Saga

**Interview answer:**

“Thunk lets us write functions that can dispatch actions and access state, making it straightforward for many async requests. Saga uses generator functions and effects to orchestrate complex workflows such as cancellation, retries, racing tasks, and long-running processes. I choose based on workflow complexity and team familiarity.”

**Memory phrase:** **Thunk = async function; Saga = workflow orchestration.**

### Thunk example

```js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId, { rejectWithValue }) => {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      return rejectWithValue("Failed to fetch user");
    }

    return response.json();
  }
);
```

Use it with a slice's `extraReducers` to handle pending, fulfilled, and rejected states.

### Saga concept

```js
import { call, put, takeLatest } from "redux-saga/effects";

function* fetchUserSaga(action) {
  try {
    const user = yield call(api.fetchUser, action.payload);
    yield put({ type: "users/fetchSuccess", payload: user });
  } catch (error) {
    yield put({ type: "users/fetchFailure", error: String(error) });
  }
}

function* watchFetchUser() {
  yield takeLatest("users/fetchRequested", fetchUserSaga);
}
```

This illustrates the generator/effect pattern; the saga middleware and API function must also be configured.

| Thunk | Saga |
|---|---|
| Functions and promises | Generator functions and effects |
| Simple learning curve | More concepts and setup |
| Good for ordinary async requests | Good for complex, coordinated workflows |
| Cancellation can be implemented, but requires care | Provides explicit workflow effects for cancellation/racing |
| Included by default in RTK store setup | Added and configured separately |

**Senior point:** For ordinary server-data fetching, consider RTK Query before introducing custom async orchestration.

---

## 8. RTK Query vs Redux Saga

**Interview answer:**

“RTK Query is designed for server-state fetching, caching, deduplication, loading/error states, and cache invalidation. Redux Saga is a general-purpose side-effect orchestration tool. They solve different problems, and an application can use both when necessary.”

**Memory phrase:** **RTK Query = API cache; Saga = complex workflows.**

| RTK Query | Redux Saga |
|---|---|
| Server-state fetching and caching | General side-effect orchestration |
| Cache keys, request deduplication, invalidation | Workflow coordination, cancellation, retries, races |
| Generates React hooks for queries/mutations | Usually dispatches actions and coordinates effects |
| Excellent for standard CRUD/data loading | Useful for complex event-driven business processes |
| Part of Redux Toolkit | Separate middleware/library |

### RTK Query example

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
```

Component:

```jsx
function Users() {
  const { data, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Could not load users.</p>;

  return data.map((user) => <p key={user.id}>{user.name}</p>);
}
```

**Choose RTK Query** for API data lifecycle and caching. **Choose Saga** for workflows that coordinate multiple actions, events, or long-running tasks. Avoid using Saga to hand-build a cache that RTK Query already provides.

---

## 9. Local state vs global state

**Interview answer:**

“Local state belongs near the component that uses it. Global or shared state is appropriate when unrelated parts of the application need a common source of truth. I keep state local by default and promote it only when multiple components or features genuinely need to share it.”

**Memory phrase:** **Local by default; global when shared.**

| Local state | Global/shared state |
|---|---|
| Modal open/closed | Shared shopping cart |
| Input field state | Cross-page client preferences |
| Component-specific tabs | Shared workflow state |
| Easy to isolate | Needs clear ownership and update rules |

### Example

```jsx
// Local state
const [isModalOpen, setIsModalOpen] = useState(false);
```

A shopping cart consumed by product pages, header, and checkout may be shared through Redux, Context, or another suitable store.

**Important distinction:** Server state (data fetched from an API) is different from client UI state. Use a server-state solution such as RTK Query when caching and refetching behavior matter.

---

## 10. What is normalized state structure?

**Interview answer:**

“Normalized state stores each entity once, usually in an object keyed by ID, and keeps relationships as IDs rather than deeply nested copies. This reduces duplication, simplifies updates, and makes lookups efficient.”

**Memory phrase:** **Entities by ID + relationships by ID.**

### Nested, duplicated shape

```js
const state = {
  posts: [
    { id: 1, title: "Hello", author: { id: 7, name: "Asha" } },
    { id: 2, title: "World", author: { id: 7, name: "Asha" } },
  ],
};
```

The author is duplicated.

### Normalized shape

```js
const state = {
  users: {
    byId: {
      7: { id: 7, name: "Asha" },
    },
    allIds: [7],
  },
  posts: {
    byId: {
      1: { id: 1, title: "Hello", authorId: 7 },
      2: { id: 2, title: "World", authorId: 7 },
    },
    allIds: [1, 2],
  },
};
```

### Benefits
- One source of truth for each entity.
- Updating an entity is simpler.
- Lookups by ID are efficient.
- Less duplication and fewer synchronization bugs.
- Selectors can derive joined views.

Redux Toolkit's `createEntityAdapter` can help manage normalized collections.

---

## 11. Why is immutability important in React and Redux?

**Interview answer:**

“Immutability means not modifying existing state objects directly; instead, produce a new object for changed data. React and Redux rely heavily on reference comparisons to detect changes and optimize updates. Direct mutation can keep the same reference, making changes difficult to detect and potentially causing stale UI or broken debugging assumptions.”

**Memory phrase:** **Changed data → new reference.**

### Incorrect direct mutation

```js
// Avoid mutating an existing state object
state.user.name = "Ravi";
```

Outside an Immer-managed draft, this can mutate existing data instead of creating a new immutable state value.

### Immutable update

```js
const nextState = {
  ...state,
  user: {
    ...state.user,
    name: "Ravi",
  },
};
```

Only the changed path receives new references; unchanged nested values can be reused.

### Why it matters
- Enables reliable reference-based change detection.
- Supports memoization and selector optimizations.
- Makes time-travel debugging and state history safer.
- Reduces accidental side effects from shared objects.

**Important:** Immutability does not mean deep-cloning everything. Copy the changed path and preserve references for unchanged data.

---

## 12. How does React detect state changes?

**Interview answer:**

“For Hook state, React compares the next state with the current state using `Object.is` to determine whether it can skip an update. When an update is scheduled, React may render the component and then reconcile its output. React does not deeply compare every object to discover mutations.”

**Memory phrase:** **Reference/value comparison, not deep mutation detection.**

### Example

```jsx
const [user, setUser] = useState({ name: "Asha" });

// Incorrect: mutate the same object and pass the same reference
user.name = "Ravi";
setUser(user);

// Better: create a new object
setUser((previous) => ({
  ...previous,
  name: "Ravi",
}));
```

The second update creates a new object reference, allowing React to recognize that the state value differs.

**Senior-level nuance:**
- React may still call a component before deciding it can bail out of further work in some situations.
- `React.memo` compares props shallowly by default.
- Effect dependencies use `Object.is`.
- Redux selectors and `useSelector` commonly use reference equality to determine whether selected results changed.

---

## 13. Why does mutation appear to work in Redux Toolkit?

**Interview answer:**

“Redux Toolkit uses Immer inside `createSlice` and `createReducer`. The reducer receives a draft proxy. We can write code that looks like mutation, and Immer records those changes and produces a new immutable state. This syntax is safe only when operating on an Immer-managed draft.”

**Memory phrase:** **Draft mutation → Immer → immutable result.**

### RTK example

```js
const todosSlice = createSlice({
  name: "todos",
  initialState: [{ id: 1, done: false }],
  reducers: {
    markDone(state, action) {
      const todo = state.find((item) => item.id === action.payload);

      if (todo) {
        todo.done = true; // Safe: state is an Immer draft
      }
    },
  },
});
```

Immer tracks the draft change and returns the appropriate next immutable state.

### Important caveats
- Do not assume direct mutation is safe in ordinary React state setters or plain Redux reducers.
- A case reducer should either mutate its draft or return a replacement state; do not do both in a conflicting way.
- Nested objects are handled through Immer's draft mechanism when accessed and modified appropriately.

---

## 14. How do you optimize Redux performance?

**Interview answer:**

“I optimize Redux by keeping state normalized, selecting only what a component needs, avoiding unnecessary reference changes, and using memoized selectors for expensive derived data. I also keep state local when it doesn't need to be global and measure with React Profiler and Redux DevTools before adding complexity.”

**Memory phrase:** **Normalize + Select narrowly + Memoize + Measure.**

### 1. Select only the needed value

```jsx
const count = useSelector((state) => state.counter.value);
```

Avoid selecting the entire store if a component only needs one field.

### 2. Avoid creating a new object on every selector call

Potentially problematic:

```jsx
const data = useSelector((state) => ({
  user: state.user,
  cart: state.cart,
}));
```

This returns a new object reference each time the selector runs. With the default React-Redux equality check, it can trigger unnecessary renders.

Possible alternatives:

```jsx
const user = useSelector((state) => state.user);
const cart = useSelector((state) => state.cart);
```

Or use a memoized selector when returning a derived object or array.

### 3. Use memoized selectors for expensive derived data

```js
import { createSelector } from "@reduxjs/toolkit";

const selectTodos = (state) => state.todos.items;
const selectFilter = (state) => state.todos.filter;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }
);
```

The result can be reused while the input selector results remain unchanged.

### 4. Normalize large collections

Store entities by ID to make updates more targeted and avoid deeply nested state.

### 5. Keep state close to where it is used

Do not put every input value, hover state, or modal flag into a global store without a reason.

### 6. Profile first

Use React Profiler, Redux DevTools, and performance measurements to find actual bottlenecks.

**Senior-level note:** Memoization and normalization help when they address real costs. They also add complexity, so apply them deliberately.

---

# Common senior-level interview traps

1. **Is Context a replacement for Redux?** Not universally. Context distributes values; Redux provides a broader state-management workflow and tooling.
2. **Does Redux Toolkit mutate real state?** No. Immer uses drafts to produce immutable next state.
3. **Should all state be global?** No. Keep state local unless it needs to be shared.
4. **Should all async work use Saga?** No. Thunk or RTK Query is often simpler for ordinary requests.
5. **Is RTK Query the same as Saga?** No. RTK Query manages server-state fetching and caching; Saga orchestrates side-effect workflows.
6. **Does immutability require deep cloning?** No. Copy the changed path and reuse unchanged references.
7. **Does normalization improve every app?** Not necessarily. It is most useful for related entities, repeated data, and complex updates.
8. **Does `useSelector` always prevent re-renders?** No. It can trigger a render when the selected result changes according to its equality function.
9. **Does Context always rerender the entire app?** No. Consumers of a changed value may rerender; component structure and memoization still matter.
10. **Why use RTK instead of classic Redux?** RTK is the recommended modern approach because it reduces boilerplate and supplies safer defaults.

---

# 30-second interview answer

“I choose state location based on who needs the data: local state by default, lifting state to the closest common parent for siblings, and Context or Redux for broader sharing. Context distributes values, while Redux Toolkit adds a predictable store, generated actions, middleware, DevTools, and Immer-based reducers. Thunk is straightforward for many async tasks; Saga is useful for complex workflows; RTK Query handles API fetching and caching. I normalize relational data, preserve immutability, select narrowly, memoize expensive selectors when needed, and profile before optimizing.”

---

# Last-minute memory card

- **Lift state:** Closest common owner.
- **Prop drilling:** Unneeded forwarding through layers.
- **Context:** Shared values, not a complete state architecture.
- **Redux vs Context:** Workflow/tooling vs value distribution.
- **RTK:** Less boilerplate + Immer + defaults.
- **Classic Redux vs RTK:** Manual wiring vs slices.
- **Thunk vs Saga:** Async function vs workflow orchestration.
- **RTK Query vs Saga:** API cache vs side-effect workflows.
- **Local vs global:** Local by default; global when shared.
- **Normalized state:** Entities by ID.
- **Immutability:** Changed path gets new references.
- **React state detection:** `Object.is` for Hook state comparisons.
- **RTK mutation syntax:** Draft → Immer → immutable state.
- **Redux performance:** Normalize, select narrowly, memoize, measure.

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

# React Component Architecture — Interview Questions & Quick Revision

> **Level:** Mid-level to Senior React  
> **Approach:** Memorize the short answer, explain the trade-off, and use the code example when asked.

## One-minute memory table

| # | Topic | Remember this |
|---|---|---|
| 1 | Smart vs Dumb components | **Know the data vs show the UI** |
| 2 | Presentational vs Container | **Display vs orchestration** |
| 3 | Atomic design | **Atoms → Molecules → Organisms → Templates → Pages** |
| 4 | Large-app folder structure | **Organize for ownership and discoverability** |
| 5 | Feature-based architecture | **Keep a feature's code together** |
| 6 | Avoiding tight coupling | **Depend on contracts, not internals** |
| 7 | Reusable components | **Clear API + single responsibility + composition** |
| 8 | Composition vs inheritance | **Build from smaller pieces** |
| 9 | HOC | **Function that wraps a component** |
| 10 | Render props | **Pass a function to decide what to render** |
| 11 | Compound components | **Related components share a coordinated API** |
| 12 | Controlled component libraries | **Parent owns the value; component reports changes** |

---

## 1. What are Smart vs Dumb components?

**Interview answer:**

“Smart components handle coordination and application behavior, such as loading data or managing state. Dumb components focus on rendering UI from props and notifying the parent through callbacks. This is a useful design guideline, not a strict React rule; modern components often combine both responsibilities when that keeps the code simpler.”

**Memory phrase:** **Smart = know the data; Dumb = show the UI.**

### Presentational example

```jsx
function UserCard({ user, onSelect }) {
  return (
    <button onClick={() => onSelect(user.id)}>
      {user.name}
    </button>
  );
}
```

This component renders supplied data and reports an interaction.

### Smart/container-style example

```jsx
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Load users here, or call a custom data Hook.

  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onSelect={setSelectedId}
        />
      ))}
      <p>Selected: {selectedId ?? "None"}</p>
    </div>
  );
}
```

**Trade-off:** Separating behavior from UI can improve reuse and testing, but creating a container for every tiny component can add unnecessary indirection.

---

## 2. Presentational vs Container components

**Interview answer:**

“Presentational components focus on how the UI looks and receive data and callbacks through props. Container components coordinate where data comes from, manage state or call Hooks, and pass the required information to presentational components. This pattern can make UI easier to reuse and test, although Hooks and custom Hooks often provide a simpler alternative to large containers.”

**Memory phrase:** **Presentational = display; Container = coordinate.**

| Presentational | Container |
|---|---|
| Focuses on UI | Focuses on coordination and behavior |
| Usually receives props | May use state, context, data Hooks, or a store |
| Often easy to test with given props | Tests data and interaction flow |
| Reusable across different data sources | May be specific to a feature |

**Senior point:** These are architectural roles, not special React component types. A component can be both, as appropriate.

---

## 3. What is Atomic Design?

**Interview answer:**

“Atomic Design is a way to organize UI from small reusable elements to complete pages. The common levels are atoms, molecules, organisms, templates, and pages. It provides a shared design vocabulary, but it should be adapted to the product rather than followed rigidly.”

**Memory phrase:** **A → M → O → T → P.**

- **Atoms:** Button, input, icon, label.
- **Molecules:** Search field made from an input and button.
- **Organisms:** Header, navigation bar, product grid.
- **Templates:** Page layout with content regions.
- **Pages:** A concrete page populated with real data.

Example hierarchy:

```text
Page: ProductsPage
└── Template: DashboardLayout
    ├── Organism: ProductGrid
    │   └── Molecule: ProductCard
    │       ├── Atom: ProductImage
    │       └── Atom: Button
    └── Organism: FilterPanel
```

**Trade-off:** Atomic Design helps design-system consistency, but excessive categorization can make feature-specific code harder to locate. Combine it with feature-based organization when useful.

---

## 4. What folder structure works for large React applications?

**Interview answer:**

“For a large application, I choose a structure that makes feature ownership clear, keeps shared code discoverable, and supports independent testing. I generally prefer feature-based organization for business logic, with a small shared layer for genuinely reusable UI, utilities, and infrastructure.”

**Memory phrase:** **Feature first; shared code second.**

### Example structure

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers/
│   └── store/
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── authSlice.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── products/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── productsSlice.ts
│   │   └── types.ts
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
└── main.tsx
```

### Design rules
- Put feature-specific code inside its feature.
- Keep app startup, providers, routing, and global store setup in `app/`.
- Put only truly cross-feature code in `shared/`.
- Co-locate tests with the code or use a consistent test directory.
- Define clear public exports for features.
- Avoid creating folders purely to satisfy a fixed template.

**Senior point:** The best structure is the one that supports how teams change, test, and own the code—not the one with the most folders.

---

## 5. What is feature-based architecture?

**Interview answer:**

“Feature-based architecture groups code by business capability, such as authentication, products, or checkout, rather than placing every component, hook, and API call into separate global folders. It improves discoverability and lets teams change a feature with fewer cross-directory edits.”

**Memory phrase:** **Keep code that changes together, together.**

### Feature-oriented example

```text
features/
├── auth/
│   ├── LoginPage.tsx
│   ├── authApi.ts
│   ├── useAuth.ts
│   ├── authSlice.ts
│   └── auth.test.ts
└── checkout/
    ├── CheckoutPage.tsx
    ├── checkoutApi.ts
    ├── useCheckout.ts
    └── checkout.test.ts
```

### Benefits
- Better code ownership.
- Easier feature-focused testing.
- Lower chance of unrelated features depending on each other.
- Easier onboarding when boundaries are clear.

### Risks
- Shared code can be duplicated if boundaries are unclear.
- Features can become oversized.
- Cross-feature dependencies still need governance.

**Good practice:** Promote code to `shared/` when it has a genuine, stable use across features, rather than anticipating reuse too early.

---

## 6. How do you avoid tight coupling in React?

**Interview answer:**

“I reduce coupling by keeping component contracts small, passing data and callbacks through props where appropriate, separating data access from presentation, and depending on stable interfaces instead of another feature's internal files. Custom Hooks and dependency injection can help isolate implementation details.”

**Memory phrase:** **Depend on contracts, not internals.**

### Tightly coupled example

```jsx
function ProductPrice() {
  // Component directly depends on a global store's internal shape.
  const price = useSelector((state) => state.products.current.price);
  return <span>{price}</span>;
}
```

This may be appropriate in some architectures, but it couples the UI component to the exact store structure.

### Looser coupling through props

```jsx
function ProductPrice({ price }) {
  return <span>{price}</span>;
}

function ProductPriceContainer() {
  const price = useSelector(
    (state) => state.products.current.price
  );

  return <ProductPrice price={price} />;
}
```

Now the display component can be reused with data from another source.

### Practical techniques
- Use props and callbacks for clear component contracts.
- Keep API calls and data transformation in a service or custom Hook where useful.
- Expose a feature's public API rather than importing its private implementation files.
- Avoid circular dependencies between features.
- Inject dependencies when tests or alternative implementations need them.
- Avoid premature abstraction; too many layers can be as harmful as too few.

---

## 7. What makes a component reusable?

**Interview answer:**

“A reusable component has a clear responsibility, a small and predictable API, minimal assumptions about its environment, and flexible composition points. It should be accessible, handle relevant states, and avoid embedding business rules that belong to a specific feature.”

**Memory phrase:** **Clear API + one responsibility + composition.**

### Example: reusable button

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Reusability checklist
- Does it solve one clear problem?
- Are its props understandable and consistent?
- Does it avoid hard-coded feature-specific data?
- Can consumers customize content through `children` or explicit slots?
- Is it keyboard accessible and semantically correct?
- Are loading, empty, error, and disabled states considered where relevant?
- Is the abstraction simpler than duplicating the code?

**Trade-off:** Do not build a universal component with dozens of flags. A focused component with composition is often easier to maintain.

---

## 8. Composition vs inheritance in React

**Interview answer:**

“React favors composition: build complex UI by combining smaller components and passing content through props or `children`. Inheritance can share behavior in object-oriented systems, but React components usually gain more flexibility from composition and Hooks.”

**Memory phrase:** **Build with pieces; don't build deep hierarchies.**

### Composition example

```jsx
function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function App() {
  return (
    <Panel title="Profile">
      <p>User details go here.</p>
      <button type="button">Edit</button>
    </Panel>
  );
}
```

`Panel` does not need to know what content it contains.

### Why composition is usually preferred
- Flexible combinations of UI.
- Less rigid class hierarchy.
- Clearer component contracts.
- Behavior can be shared through Hooks.
- Easier customization and testing.

**Senior nuance:** Composition is not the only possible abstraction, and inheritance remains valid JavaScript. The point is that React's component model generally makes composition the more natural default.

---

## 9. What is a Higher-Order Component (HOC)?

**Interview answer:**

“A Higher-Order Component is a function that accepts a component and returns a new component with additional behavior or props. HOCs were commonly used to share behavior before Hooks, and they remain useful in existing libraries and codebases.”

**Memory phrase:** **HOC = component in, enhanced component out.**

### Example

```jsx
function withLoading(Component) {
  return function WithLoading({ loading, ...props }) {
    if (loading) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };
}

function UserList({ users }) {
  return users.map((user) => (
    <p key={user.id}>{user.name}</p>
  ));
}

const UserListWithLoading = withLoading(UserList);
```

Usage:

```jsx
<UserListWithLoading loading={false} users={users} />
```

### Advantages
- Reuse behavior across components.
- Wrap components with authorization, analytics, or loading logic.
- Useful for library integrations and legacy patterns.

### Drawbacks
- Extra wrapper layers.
- Possible prop-name collisions.
- Harder component trees and debugging.
- Static properties and refs may require explicit handling.

**Senior point:** Hooks often provide a simpler alternative for reusing stateful logic in function components, but they do not make every HOC obsolete.

---

## 10. What is the render props pattern?

**Interview answer:**

“Render props is a pattern where a component receives a function prop that determines what UI to render. The component manages or provides behavior and data; the caller controls the presentation. Custom Hooks now cover many use cases, but render props remain useful for certain component APIs.”

**Memory phrase:** **Pass a function to decide the UI.**

### Example

```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(event) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return render(position);
}

function App() {
  return (
    <MouseTracker
      render={({ x, y }) => <p>Mouse: {x}, {y}</p>}
    />
  );
}
```

### Advantages
- Caller controls the rendered output.
- Behavior and presentation can be separated.
- Flexible for component libraries.

### Drawbacks
- Nested callback JSX can become hard to read.
- Inline render functions may change identity on each render.
- Hooks can be simpler when only behavior reuse is required.

**Note:** This example is browser-only because it reads mouse events. In production, consider accessibility and whether a custom Hook would be simpler.

---

## 11. What is the compound component pattern?

**Interview answer:**

“Compound components are a group of related components that work together through a shared parent or context. They provide a flexible API where consumers compose parts such as a Tabs root, TabList, Tab, and TabPanel without passing every setting through every layer.”

**Memory phrase:** **One coordinated API, multiple building blocks.**

### Example: simplified compound tabs

```jsx
const TabsContext = createContext(null);

function Tabs({ value, onValueChange, children }) {
  const contextValue = { value, onValueChange };

  return (
    <TabsContext.Provider value={contextValue}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function Tab({ value, children }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be inside Tabs");

  return (
    <button
      type="button"
      aria-selected={context.value === value}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
}

Tabs.Tab = Tab;
```

Usage idea:

```jsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.Tab value="profile">Profile</Tabs.Tab>
  <Tabs.Tab value="settings">Settings</Tabs.Tab>
</Tabs>
```

This is a simplified illustration, not a complete accessible tabs implementation. Production tabs also need correct tab roles, keyboard navigation, focus management, and associated panels.

### Advantages
- Flexible composition.
- Less prop drilling between related parts.
- Consumer controls layout and ordering.
- Good for tabs, menus, accordions, and select components.

### Trade-offs
- Relies on correct parent-child relationships.
- Context and state coordination add complexity.
- Accessibility behavior must be implemented carefully.

---

## 12. What are controlled component libraries?

**Interview answer:**

“In a controlled component API, the parent owns the current value and passes it down as a prop. The component reports user changes through a callback, and the parent updates the value. UI libraries often support both controlled and uncontrolled modes to suit different use cases.”

**Memory phrase:** **Parent owns value; component reports changes.**

### Controlled usage

```jsx
function SearchExample() {
  const [query, setQuery] = useState("");

  return (
    <SearchInput
      value={query}
      onValueChange={setQuery}
    />
  );
}
```

Example component API:

```jsx
function SearchInput({ value, onValueChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
    />
  );
}
```

### Uncontrolled usage

```jsx
<SearchInput defaultValue="React" />
```

This requires the component to support an internal state path; the controlled-only example above does not implement that mode.

### Why libraries offer controlled APIs
- The parent can validate or transform input.
- Multiple UI parts can stay synchronized.
- State can be reset or restored externally.
- The component integrates with forms and application state.

### Design considerations
- Use a clear API such as `value` + `onChange` or `value` + `onValueChange`.
- Use `defaultValue` for an initial value in uncontrolled mode.
- Avoid switching between controlled and uncontrolled modes during a component's lifetime.
- Define behavior for `undefined`, `null`, and empty values.
- Keep keyboard and screen-reader behavior accessible.

**Examples:** Many UI libraries offer controlled and uncontrolled patterns for dialogs, tabs, menus, selects, and inputs. Check the specific library API because naming and behavior differ.

---

# Common senior-level interview traps

1. **Are smart/dumb components official React types?** No. They are architectural descriptions.
2. **Should every component be reusable?** No. Optimize for clarity; abstract when there is a real reuse or consistency benefit.
3. **Is Atomic Design mandatory?** No. It is a design-system methodology, not a React requirement.
4. **Should every feature share one global component folder?** Not necessarily. Feature-local components often improve ownership.
5. **Is prop drilling always bad?** No. Explicit props can be the simplest and clearest solution.
6. **Does a HOC have to mutate the wrapped component?** No. It should normally return a wrapper component rather than modify the original.
7. **Are render props and HOCs obsolete?** No, but Hooks simplify many logic-reuse use cases.
8. **Does Context automatically make an app fast?** No. Provider value changes can cause consumers to update.
9. **Is a controlled component always better?** No. It offers more external control, but internal state may be simpler for basic use cases.
10. **Does compound component mean all state is global?** No. Shared state is usually scoped to the compound component's parent/context.

---

# 30-second interview answer

“I structure React applications around clear component responsibilities and feature boundaries. Presentational components focus on UI, while container-style components coordinate state and data. Atomic Design can help organize design systems, and feature-based folders keep business logic together. I reduce coupling with small props contracts, custom Hooks, and public feature APIs. React favors composition over inheritance. HOCs and render props are useful reuse patterns, while custom Hooks cover many behavior-sharing cases. Compound components provide flexible coordinated APIs, and controlled components let the parent own the current value.”

---

# Last-minute memory card

- **Smart vs Dumb:** Data/behavior vs UI.
- **Presentational vs Container:** Display vs coordinate.
- **Atomic Design:** Atoms → Molecules → Organisms → Templates → Pages.
- **Large app structure:** Feature first, shared second.
- **Feature architecture:** Keep code that changes together.
- **Avoid coupling:** Depend on contracts, not internals.
- **Reusable components:** Clear API + focused responsibility.
- **Composition:** Build with pieces.
- **HOC:** Component in → enhanced component out.
- **Render props:** Function decides the UI.
- **Compound components:** Related parts, coordinated API.
- **Controlled components:** Parent owns value; child reports changes.
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

# React Performance Optimization — Interview Guide & Quick Revision

> **Level:** Senior React Developer  
> **Method:** Learn the short answer, understand the trade-off, and practice explaining the example.

## One-minute memory table

| # | Topic | Remember this |
|---|---|---|
| 1 | Why React apps become slow | **Too much work, too often** |
| 2 | `React.memo` | **Skip renders when props are unchanged** |
| 3 | Memoization pitfalls | **Optimization has a cost** |
| 4 | Reconciliation optimization | **Stable identity + smaller update work** |
| 5 | Avoid unnecessary re-renders | **Localize state, narrow subscriptions** |
| 6 | Key-based rendering | **Stable keys preserve identity** |
| 7 | `useCallback` misuse | **Stable reference only when useful** |
| 8 | Debounce vs throttle | **Wait for pause vs limit frequency** |
| 9 | List virtualization | **Render only visible rows** |
| 10 | Code splitting | **Load code when needed** |
| 11 | Suspense | **Show fallback while supported work is pending** |
| 12 | Concurrent rendering | **React can pause/restart render work** |
| 13 | Update prioritization | **Urgent updates first; transitions can wait** |
| 14 | React Profiler | **Measure commits before optimizing** |

---

## 1. Why do React applications become slow?

**Interview answer:**

“React applications become slow when they do too much work or repeat work unnecessarily. Common causes include expensive render calculations, broad state updates, unstable props, large DOM lists, heavy JavaScript bundles, slow network requests, and layout or paint costs in the browser. I profile first to identify the actual bottleneck.”

**Memory phrase:** **Too much work, too often.**

### Common causes
- Large components re-render after unrelated state changes.
- Expensive calculations run on every render.
- Context or store subscriptions update too many consumers.
- New object/function props defeat memoized children.
- Thousands of DOM nodes are mounted at once.
- Large bundles delay startup.
- Images, network calls, layout, and third-party scripts dominate performance.

### Interview approach
1. Reproduce the slow interaction.
2. Measure with React Profiler and browser Performance tools.
3. Identify whether the cost is React rendering, JavaScript, network, or browser layout/paint.
4. Apply the smallest targeted optimization.
5. Measure again to confirm the improvement.

**Senior point:** A component render is not automatically a performance problem. Optimize based on user-visible latency and measured costs.

---

## 2. What is `React.memo`, and when should you use it?

**Interview answer:**

“`React.memo` is a higher-order component that can skip re-rendering a function component when its props compare equal to the previous render. By default, React compares each prop using shallow `Object.is` comparisons. It is useful for expensive components that frequently receive unchanged props.”

**Memory phrase:** **Same props → may skip render.**

### Example

```jsx
import { memo, useState } from "react";

const UserCard = memo(function UserCard({ user }) {
  console.log("UserCard rendered");
  return <p>{user.name}</p>;
});

function App() {
  const [count, setCount] = useState(0);
  const user = { id: 1, name: "Asha" };

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>
        Count: {count}
      </button>
      <UserCard user={user} />
    </>
  );
}
```

In this example, `user` is a new object on every parent render, so `React.memo` cannot skip the child render based on the default shallow comparison.

A possible fix, when appropriate:

```jsx
const user = useMemo(() => ({ id: 1, name: "Asha" }), []);
```

Or define static data outside the component if it never depends on component state.

### When to use
- The child render is expensive.
- Props often remain unchanged.
- Profiling shows the child re-render is a meaningful cost.

**Important:** `React.memo` is a performance optimization, not a guarantee. A memoized component can still render when its own state or consumed context changes.

---

## 3. What are the pitfalls of memoization?

**Interview answer:**

“Memoization adds comparison work, dependency maintenance, and complexity. It can be ineffective when dependencies change on every render, and it can hide stale-value bugs if dependencies are wrong. I use `memo`, `useMemo`, and `useCallback` only when stable identity or saved computation is valuable.”

**Memory phrase:** **Measure first; memoize with a reason.**

### Unnecessary memoization

```jsx
// Usually unnecessary for trivial work
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName]
);

// Simpler
const fullName = `${firstName} ${lastName}`;
```

### Common pitfalls
- Memoizing cheap calculations.
- Creating new object dependencies every render.
- Missing dependencies and stale closures.
- Custom comparison functions that are expensive or incorrect.
- Assuming memoization prevents every render.
- Making code harder to maintain for negligible gains.

**Senior point:** Correctness must never depend on React retaining a memoized value. Treat memoization as an optimization.

---

## 4. How do you optimize reconciliation?

**Interview answer:**

“React reconciliation uses element types, positions, and keys to decide which component instances can be reused and what needs to change. I help it by keeping component identity stable, using stable keys for dynamic lists, avoiding unnecessary state changes, splitting expensive subtrees where useful, and profiling rather than trying to manually control the reconciliation algorithm.”

**Memory phrase:** **Stable identity, smaller work.**

### Good list keys

```jsx
items.map((item) => (
  <ProductRow key={item.id} item={item} />
));
```

### Avoid defining component types inside another component

Potentially problematic:

```jsx
function Parent() {
  function Child() {
    return <div>Child</div>;
  }

  return <Child />;
}
```

`Child` is a new component function each time `Parent` renders. React can treat it as a different component type, remounting it and resetting its state.

Prefer defining it outside:

```jsx
function Child() {
  return <div>Child</div>;
}

function Parent() {
  return <Child />;
}
```

**Important:** React's reconciliation algorithm is an implementation detail. Optimize the inputs and component structure rather than relying on assumptions about a specific number of DOM operations.

---

## 5. How do you avoid unnecessary re-renders?

**Interview answer:**

“I keep state as close as possible to where it is used, split components by responsibility, select only the data each component needs, and use memoization when profiling shows it helps. I also avoid creating unstable object or function props for memoized children unless necessary.”

**Memory phrase:** **Localize + Narrow + Stabilize + Measure.**

### Practical techniques
1. Keep transient UI state local.
2. Split large components when it isolates expensive work.
3. Use `React.memo` for suitable expensive children.
4. Use `useMemo` for expensive calculations or stable object values when useful.
5. Use `useCallback` when function identity matters.
6. Split Context values by responsibility or update frequency.
7. Select narrow state slices with Redux or external stores.
8. Avoid unnecessary state updates and duplicated state.

### Example: avoid an unnecessary object prop

```jsx
const settings = useMemo(
  () => ({ theme: "dark" }),
  []
);

return <MemoizedPanel settings={settings} />;
```

Only do this if stable identity helps; a static object can also be declared outside the component.

**Senior point:** Re-rendering is not always bad. The goal is to reduce expensive, user-visible work, not to make the render count zero.

---

## 6. How do keys affect rendering performance?

**Interview answer:**

“Stable keys identify list items among siblings. They help React preserve the correct component identity during insertions, deletions, and reordering. Keys primarily ensure correct matching and state preservation; they are not a general performance switch.”

**Memory phrase:** **Stable key = stable identity.**

### Good

```jsx
products.map((product) => (
  <ProductRow key={product.id} product={product} />
));
```

### Risky for dynamic lists

```jsx
products.map((product, index) => (
  <ProductRow key={index} product={product} />
));
```

Index keys can associate an existing component instance with a different item after a reorder or deletion. This may cause incorrect input values or local component state.

**Remember:**
- Keys need to be unique among siblings.
- Use stable data IDs where possible.
- A key is not passed as a normal component prop.
- Changing a key intentionally resets that component's identity and state.

---

## 7. How can `useCallback` be misused?

**Interview answer:**

“`useCallback` caches a function reference until its dependencies change. It is helpful when a function is passed to a memoized child or used as a dependency where identity matters. Wrapping every function in `useCallback` adds complexity and may not improve performance.”

**Memory phrase:** **Stable reference only when useful.**

### Useful example

```jsx
const SaveButton = memo(function SaveButton({ onSave }) {
  return <button onClick={onSave}>Save</button>;
});

function Editor() {
  const [text, setText] = useState("");

  const handleSave = useCallback(() => {
    saveDocument(text);
  }, [text]);

  return (
    <>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <SaveButton onSave={handleSave} />
    </>
  );
}
```

The callback identity remains stable while `text` is unchanged.

### Common mistakes
- Using it for every event handler without measuring.
- Forgetting dependencies, causing stale closures.
- Expecting it to stop the component containing it from rendering.
- Assuming a stable callback prevents renders caused by state or context.
- Keeping complicated dependency logic just to avoid a trivial function allocation.

**Senior point:** `useCallback` does not prevent function execution. It preserves function identity when dependencies are unchanged.

---

## 8. What is debouncing vs throttling?

**Interview answer:**

“Debouncing waits until events stop for a specified interval before running the function. Throttling limits how often a function can run during a period. Debouncing is useful for search input; throttling can be useful for scroll or resize handlers that need periodic updates.”

**Memory phrase:** **Debounce = wait for pause; throttle = cap frequency.**

### Debounce example: search

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    searchProducts(query);
  }, 300);

  return () => clearTimeout(timer);
}, [query]);
```

The search runs after the user pauses typing for 300 ms. In production, handle request cancellation or stale responses as appropriate.

### Throttle example

A simple throttle utility:

```js
function throttle(fn, delay) {
  let lastRun = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastRun >= delay) {
      lastRun = now;
      fn(...args);
    }
  };
}
```

This is a basic leading-edge throttle; production implementations may also support trailing calls and cancellation.

**Senior point:** Debouncing and throttling control event frequency. They do not replace optimizing the work done by each invocation.

---

## 9. What is list virtualization?

**Interview answer:**

“List virtualization renders only the visible items plus a small overscan region instead of mounting thousands of rows. It reduces DOM node count, rendering work, and memory use for large lists. Libraries such as `react-window` or TanStack Virtual can handle the scrolling and measurement details.”

**Memory phrase:** **Render the window, not the whole list.**

### Without virtualization

```jsx
items.map((item) => <Row key={item.id} item={item} />);
```

A list with 20,000 items can create a very large DOM tree.

### Virtualization concept

```jsx
// Conceptual only — use a virtualization library for real windowing.
const visibleItems = items.slice(startIndex, endIndex);

return visibleItems.map((item) => (
  <Row key={item.id} item={item} />
));
```

A real virtualized list must position rows correctly and account for scrolling, row sizes, and overscan.

### Benefits
- Fewer mounted DOM nodes.
- Better scrolling responsiveness.
- Lower memory and rendering cost.

### Trade-offs
- More complex accessibility and keyboard navigation.
- Dynamic row heights require measurement.
- Find-in-page and screen-reader behavior may need special care.
- Scroll restoration and item focus need deliberate handling.

**Use it when:** The list is large enough that rendering all rows causes measurable cost.

---

## 10. What are code splitting and lazy loading?

**Interview answer:**

“Code splitting divides an application bundle into smaller chunks. Lazy loading defers downloading or evaluating some code until it is needed. In React, `lazy` can load a component dynamically, commonly for routes or large feature panels, reducing the initial JavaScript payload.”

**Memory phrase:** **Load only what is needed, when it is needed.**

### Example

```jsx
import { lazy, Suspense } from "react";

const ReportsPage = lazy(() => import("./ReportsPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading reports...</p>}>
      <ReportsPage />
    </Suspense>
  );
}
```

The bundler creates a separate chunk for `ReportsPage` when supported by the build setup. The chunk is requested when React attempts to render the lazy component.

### Good candidates
- Route-level pages.
- Admin dashboards.
- Rich editors or charts.
- Rarely used dialogs and large feature modules.

### Trade-offs
- Additional network requests/chunks.
- Loading states and possible delays when a chunk is first needed.
- Chunk boundaries should be designed around actual user flows.

**Senior point:** Code splitting can improve initial load, but excessive splitting can add network overhead. Measure bundle size and loading behavior.

---

## 11. What is React Suspense?

**Interview answer:**

“Suspense lets React show a fallback while a child is waiting on a Suspense-enabled source, such as a lazy-loaded component or a compatible data framework. It provides a declarative loading boundary. It does not automatically detect every promise or fetch call written inside an Effect.”

**Memory phrase:** **Pending supported work → fallback UI.**

### Example with lazy loading

```jsx
import { lazy, Suspense } from "react";

const SettingsPage = lazy(() => import("./SettingsPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading settings...</p>}>
      <SettingsPage />
    </Suspense>
  );
}
```

### Important points
- A nearest Suspense boundary can display its fallback while supported child work is pending.
- Nested boundaries can create staged loading experiences.
- Error Boundaries handle errors; Suspense handles pending work.
- A normal `fetch()` inside `useEffect` does not automatically suspend the component.
- Frameworks and libraries may provide Suspense-compatible data loading.

**Senior point:** Choose boundary placement carefully so the UI does not replace too much content with a fallback during a small update.

---

## 12. What is concurrent rendering in React?

**Interview answer:**

“Concurrent rendering is React's ability to prepare rendering work that can be interrupted, paused, restarted, or abandoned so urgent interactions remain responsive. It is not the same as running JavaScript rendering on multiple threads. React still commits a consistent UI rather than exposing a partially completed DOM render.”

**Memory phrase:** **Interruptible render work, consistent commit.**

### What it enables
- Prioritizing urgent updates over less urgent rendering.
- Keeping typing and interactions responsive during expensive UI updates.
- Transitions for non-urgent changes.
- Suspense integration and more flexible rendering scheduling.

### Important distinction
- Rendering work can be interrupted or restarted.
- The commit phase applies the selected changes.
- Concurrent rendering does not make CPU-heavy JavaScript automatically parallel.
- Components must be pure because React may render them more than once.

**Interview tip:** Explain the user benefit: React can keep urgent interactions responsive while preparing a larger UI update.

---

## 13. What is update prioritization? `useTransition` vs `useDeferredValue`

**Interview answer:**

“React lets us mark some updates as non-urgent. `useTransition` marks state updates as transitions, while `useDeferredValue` lets a part of the UI lag behind a rapidly changing value. These tools can keep urgent interactions, such as typing, responsive when the resulting UI is expensive to render.”

**Memory phrase:** **Urgent input first; expensive UI can follow.**

### `useTransition` example

```jsx
import { useState, useTransition } from "react";

function SearchPage({ items }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const value = event.target.value;

    // Urgent update: keep the input responsive
    setQuery(value);

    // Non-urgent update: update the expensive result view
    startTransition(() => {
      setFilter(value);
    });
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Updating results...</p>}
      <Results items={filteredItems} />
    </>
  );
}
```

This illustrates prioritization; if filtering itself is expensive, use profiling and consider a memoized calculation or virtualization too.

### `useDeferredValue` concept

```jsx
const deferredQuery = useDeferredValue(query);

const filteredItems = useMemo(
  () => filterItems(items, deferredQuery),
  [items, deferredQuery]
);
```

The result list can lag behind the latest input while React prioritizes urgent work.

**Important:** Transitions do not debounce network requests and do not make a synchronous CPU-heavy function run on another thread. They change rendering priority, not JavaScript execution mechanics.

---

## 14. How do you use React Profiler?

**Interview answer:**

“React Profiler helps identify which components render and how much time rendering commits take. I reproduce the slow interaction, record it with the React DevTools Profiler, inspect expensive commits and repeated renders, apply a targeted change, and record again to verify the improvement.”

**Memory phrase:** **Record → Find → Fix → Re-measure.**

### React DevTools workflow
1. Open React Developer Tools.
2. Select the **Profiler** tab.
3. Start recording.
4. Reproduce the slow interaction.
5. Stop recording and inspect the flame graph or ranked view.
6. Identify components with expensive or frequent renders.
7. Optimize the relevant component, state placement, selector, or calculation.
8. Repeat the recording and compare.

### Programmatic Profiler example

```jsx
import { Profiler } from "react";

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
  });
}

function App() {
  return (
    <Profiler id="ProductList" onRender={onRender}>
      <ProductList />
    </Profiler>
  );
}
```

- `actualDuration`: time spent rendering the profiled subtree for this update.
- `baseDuration`: estimate of the subtree's render cost without memoization benefits.
- `phase`: typically `"mount"` or `"update"`.

**Important:** Profiling adds overhead, and production profiling requires an appropriate profiling-enabled build. Development Strict Mode may also make render behavior differ from production.

---

# Common senior-level interview traps

1. **Does `React.memo` prevent every re-render?** No. State and consumed context changes can still render the component.
2. **Does `useCallback` prevent a function from executing?** No. It stabilizes the function reference while dependencies remain unchanged.
3. **Is a re-render always slow?** No. Measure actual cost before optimizing.
4. **Are index keys always incorrect?** No, but they are risky for dynamic or reorderable lists.
5. **Does Suspense catch every API request?** No. The data source must support Suspense; an ordinary Effect-based fetch does not suspend automatically.
6. **Is concurrent rendering multithreaded rendering?** No. It makes React rendering work interruptible and schedulable.
7. **Does `useTransition` debounce input?** No. It changes update priority, not event frequency.
8. **Does virtualization improve every list?** No. It is most useful for large lists with measurable DOM/rendering costs.
9. **Does code splitting always make the app faster?** Not necessarily; too many chunks can add network overhead.
10. **Why use Profiler before memoization?** To identify the actual bottleneck and confirm the optimization worked.

---

# 30-second interview answer

“When React apps are slow, I measure before optimizing. Common issues are expensive renders, broad state updates, unstable props, large lists, and oversized bundles. I use `React.memo` and Hook memoization only when they save meaningful work, stable keys to preserve identity, debouncing or throttling to control event frequency, and virtualization for very large lists. I use code splitting and Suspense for loading boundaries, and transitions or deferred values to prioritize urgent interactions. Finally, I use React Profiler to identify the bottleneck and verify the improvement.”

---

# Last-minute memory card

- **Slow app:** Too much work, too often.
- **`React.memo`:** Same props may skip render.
- **Memoization:** Measure first.
- **Reconciliation:** Stable identity, smaller work.
- **Re-renders:** Localize + narrow + stabilize.
- **Keys:** Stable identity among siblings.
- **`useCallback`:** Stable function reference when useful.
- **Debounce:** Wait for pause.
- **Throttle:** Limit frequency.
- **Virtualization:** Render visible rows.
- **Code splitting:** Load code when needed.
- **Suspense:** Supported pending work → fallback.
- **Concurrent rendering:** Interruptible render, consistent commit.
- **Prioritization:** Urgent input first.
- **Profiler:** Record → Find → Fix → Re-measure.

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

# React Lifecycle & Class Components — Senior Interview Guide

Senior-level interview answers with examples, trade-offs, and quick-revision notes.

## 1. What are the lifecycle phases in React?

**Interview answer:** Class components traditionally have three lifecycle phases: mounting, updating, and unmounting. Error handling is often described as an additional lifecycle category. Function components don't expose these class lifecycle methods; instead, Hooks such as `useEffect` and `useLayoutEffect` let us synchronize with external systems.

- **Mounting:** React creates the component and adds it to the UI.
- **Updating:** Props or state change, so React renders the component again and commits necessary DOM updates.
- **Unmounting:** React removes the component and runs cleanup.
- **Error handling:** Error boundaries can catch certain errors in descendant rendering and lifecycle work.

```jsx
class Example extends React.Component {
  componentDidMount() {
    // Start a subscription or fetch initial data.
  }

  componentDidUpdate(prevProps, prevState) {
    // React to relevant prop/state changes.
  }

  componentWillUnmount() {
    // Remove subscriptions and cancel ongoing work.
  }

  render() {
    return <div>{this.props.title}</div>;
  }
}
```

**Senior point:** A render is not the same as a commit. Rendering calculates what the UI should look like; commit applies changes. Rendering may be repeated or abandoned, so keep render logic pure and place side effects in the appropriate lifecycle or Hook.

## 2. `componentDidMount` vs `useEffect`

**Interview answer:** `componentDidMount` runs after a class component is mounted. `useEffect` runs after React commits a render and is used to synchronize with external systems. An effect with `[]` is often the closest functional equivalent to mount-only logic, but it is not a perfect one-to-one replacement: effects also have cleanup and rerun according to dependencies, and development Strict Mode may run an extra setup/cleanup cycle to reveal bugs.

```jsx
// Class component
class UserProfile extends React.Component {
  componentDidMount() {
    document.title = `User: ${this.props.name}`;
  }

  render() {
    return <h1>{this.props.name}</h1>;
  }
}

// Function component
function UserProfile({ name }) {
  React.useEffect(() => {
    document.title = `User: ${name}`;
  }, [name]);

  return <h1>{name}</h1>;
}
```

Use `useEffect` when the external synchronization must update as `name` changes. For truly mount-only work, `useEffect(() => { ... }, [])` can be appropriate, but make sure the effect does not depend on reactive values that should trigger a rerun.

**Important distinction:** `useEffect` generally runs after the browser paints when possible. `useLayoutEffect` runs after DOM mutations but before paint, and should be reserved for cases such as measuring layout when a post-paint visual flicker would be a problem.

## 3. What is the `componentDidUpdate` equivalent?

**Interview answer:** `useEffect` with dependencies is the usual equivalent. It runs after a commit when a dependency changes. Unlike `componentDidUpdate`, it also runs after the initial mount, so use a deliberate pattern if the effect must skip the first render.

```jsx
function SearchResults({ query }) {
  React.useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Search failed");
        return response.json();
      })
      .then((data) => {
        // setResults(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          // setError(error);
        }
      });

    return () => controller.abort();
  }, [query]);

  return null;
}
```

The effect runs on mount and whenever `query` changes. Cleanup aborts the previous request before the effect is rerun and when the component unmounts.

To compare previous and current values, keep the previous value in a ref:

```jsx
function Price({ amount }) {
  const previousAmount = React.useRef(amount);

  React.useEffect(() => {
    if (previousAmount.current !== amount) {
      console.log("Amount changed:", previousAmount.current, "->", amount);
    }

    previousAmount.current = amount;
  }, [amount]);

  return <span>{amount}</span>;
}
```

**Senior point:** Don't add a generic “skip first effect” ref by default. Often the better design is to make the effect's purpose explicit and let it run whenever its declared dependencies require synchronization.

## 4. What is the `componentWillUnmount` equivalent?

**Interview answer:** Return a cleanup function from `useEffect` or `useLayoutEffect`. Cleanup runs before an effect is rerun with changed dependencies and when the component is removed.

```jsx
function ChatRoom({ roomId }) {
  React.useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId]);

  return <p>Connected to {roomId}</p>;
}
```

When `roomId` changes, React cleans up the old connection and then sets up the new one. When the component unmounts, it disconnects the current connection.

Typical cleanup tasks:
- Remove event listeners.
- Clear timers and intervals.
- Unsubscribe from sockets or observables.
- Abort fetches where supported.
- Dispose of external resources.

**Senior point:** Cleanup should mirror setup. It should leave the external system in a valid state, including when setup and cleanup happen more than once in development Strict Mode.

## 5. What are Error Boundaries?

**Interview answer:** Error boundaries are class components that catch errors thrown while rendering descendants, in descendant constructors, and in descendant lifecycle methods. They let an application show a fallback UI instead of allowing a rendering error to break the affected part of the UI.

The two key methods are:
- `static getDerivedStateFromError(error)`: update state to render fallback UI.
- `componentDidCatch(error, info)`: report or log the error.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    reportErrorToMonitoringService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

Usage:

```jsx
<ErrorBoundary>
  <ProductDashboard />
</ErrorBoundary>
```

**What Error Boundaries generally do not catch:**
- Errors in event handlers.
- Errors in asynchronous callbacks or timers.
- Errors thrown by the boundary itself.
- Server-side rendering errors.
- Errors in ordinary code outside the descendant rendering/lifecycle path.

Handle event-handler and async errors with explicit `try/catch`, rejected-promise handling, or stateful error reporting as appropriate. Frameworks may provide additional conventions.

**Can a function component be an Error Boundary?** React's built-in Error Boundary mechanism still relies on class lifecycle methods. A function component can use a library that provides an error-boundary wrapper, but Hooks alone do not replace the built-in boundary lifecycle.

## 6. What are the limitations of Hooks?

**Interview answer:** Hooks let function components reuse stateful logic, but they have rules and are not a universal replacement for every class feature.

1. **Rules of Hooks:** Call Hooks at the top level of function components or custom Hooks—not inside loops, conditions, nested functions, or ordinary utility functions.
2. **Stable call order:** React associates Hook state with call order, so conditional Hook calls can break state association.
3. **Stale closures:** An effect or callback can capture values from an older render if dependencies are omitted or incorrectly declared.
4. **Dependency management:** Effects need accurate dependency arrays; suppressing dependency warnings can hide bugs.
5. **No direct built-in function-component Error Boundary API:** Use a class boundary or a suitable library wrapper.
6. **Not every effect is necessary:** Effects are for synchronizing with external systems; derived values often belong in render, and user-triggered actions often belong in event handlers.
7. **Overuse can reduce clarity:** Excessive `useMemo`, `useCallback`, refs, and effects can make code harder to reason about without improving performance.

Correct custom Hook example:

```jsx
function useWindowWidth() {
  const [width, setWidth] = React.useState(() => window.innerWidth);

  React.useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return width;
}
```

Usage:

```jsx
function ResponsiveLabel() {
  const width = useWindowWidth();
  return <p>Window width: {width}px</p>;
}
```

**Senior point:** Hooks are a composition mechanism, not a requirement to move every piece of logic into an effect. Keep render pure, model external synchronization explicitly, and extract custom Hooks when they create meaningful reuse.

## 7. When are class components still useful?

**Interview answer:** For most new React UI code, function components with Hooks are the default. Class components remain useful when maintaining legacy code, incrementally migrating an application, or implementing a built-in Error Boundary using React's class lifecycle API.

Good reasons to retain a class:
- The existing codebase uses classes and a rewrite would add risk without clear value.
- A class Error Boundary is needed.
- A team is migrating incrementally and wants to minimize unrelated changes.

Usually **not** good reasons:
- “Classes are faster.” There is no general performance advantage.
- “Hooks cannot handle lifecycle.” Hooks can handle most synchronization use cases, though the mental model differs.
- “Classes are always easier to read.” That depends on the code and team.

**Migration strategy:** Convert one component at a time, preserve behavior with tests, move side effects into appropriately scoped effects, and be especially careful about effect dependencies and cleanup. Do not mechanically translate every lifecycle method into one large `useEffect`.

## 8. What are legacy lifecycle methods?

Some class lifecycle methods are considered unsafe for modern React because they can run at times that make side effects or assumptions about a single render unsafe. Their names were prefixed with `UNSAFE_` in React 16.3 to signal that they should generally be avoided in new code.

| Legacy method | Why it is risky | Typical modern alternative |
|---|---|---|
| `componentWillMount` / `UNSAFE_componentWillMount` | May run before mount; side effects here are unreliable, and the method is not suitable for subscriptions or browser DOM work. | Initialize state in the constructor or field initializer; use an effect for external synchronization. |
| `componentWillReceiveProps` / `UNSAFE_componentWillReceiveProps` | Often leads to duplicated state derived from props and tricky update logic. | Derive values during render; use `componentDidUpdate` with a comparison only when synchronization is truly needed. |
| `componentWillUpdate` / `UNSAFE_componentWillUpdate` | Unsafe for side effects and may be invoked in render-related flows that are not committed. | Use `componentDidUpdate` after commit or `getSnapshotBeforeUpdate` for pre-DOM-update snapshots. |

Example of the modern class update pattern:

```jsx
class ScrollList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.items.length < this.props.items.length) {
      const node = this.listRef.current;
      return node ? node.scrollHeight - node.scrollTop : null;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null && snapshot !== undefined) {
      const node = this.listRef.current;
      if (node) node.scrollTop = node.scrollHeight - snapshot;
    }
  }

  render() {
    return <div ref={this.listRef}>{/* render items */}</div>;
  }
}
```

`getSnapshotBeforeUpdate` is a specialized method for reading DOM information immediately before React applies DOM changes; its returned value is passed to `componentDidUpdate`.

**Senior point:** Avoid side effects during render and in legacy pre-update lifecycle methods. Modern React may render more than once, so side effects belong in committed lifecycle work or effects.

---

## Quick revision — memory card

- **Lifecycle phases:** Mount → Update → Unmount; error handling is separate.
- **`componentDidMount`:** After mount; `useEffect` synchronizes after commit.
- **`componentDidUpdate`:** `useEffect` with dependencies; remember it also runs on mount.
- **`componentWillUnmount`:** Return a cleanup function from an effect.
- **Error Boundary:** `getDerivedStateFromError` for fallback state; `componentDidCatch` for logging.
- **Hooks limitations:** Rules of Hooks, closures, dependencies, no built-in function-component Error Boundary API.
- **Class components:** Mainly legacy maintenance and Error Boundaries.
- **Legacy methods:** Avoid unsafe pre-render/pre-update lifecycles; use modern lifecycle patterns.

## Strong senior-level closing answer

“When mapping class lifecycles to Hooks, I avoid treating them as exact one-to-one replacements. I first identify the intent—such as synchronizing a subscription, responding to a changed prop, cleaning up a resource, or measuring DOM layout—and then choose the correct mechanism. Effects should synchronize with external systems, cleanup should mirror setup, rendering must remain pure, and error boundaries should isolate failures in critical UI sections.”
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

# React Forms — Senior Interview Guide

Senior-level answers with practical React examples, trade-offs, and a quick-revision memory card.

## 1. How do you handle controlled forms in React?

**Interview answer:** In a controlled form, React state is the source of truth for an input's value. The input receives its value through a prop and updates state through an event handler. This makes it easy to conditionally render UI, validate fields, and coordinate related values. The trade-off is that typing causes state updates, so large forms need sensible state boundaries and render optimization.

```jsx
import { useState } from "react";

function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit", values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </label>

      <button type="submit">Sign in</button>
    </form>
  );
}
```

**Senior points:**
- Use stable field names and avoid mixing controlled and uncontrolled modes for the same input.
- For text inputs, use `value`; for checkboxes, use `checked`.
- A controlled input should synchronously update its value in `onChange`.
- Client-side validation improves UX but never replaces server-side validation.

## 2. What causes form performance issues?

Common causes include:
- Every keystroke updates state at a parent that renders a large form subtree.
- All fields subscribe to the same broad state object.
- Expensive validation runs on every keypress.
- Derived data, filtering, or calculations run repeatedly.
- New object/function props prevent memoized children from skipping renders.
- Large dropdowns render thousands of options.
- A form library's subscription model is used in a way that causes many fields to update.
- Async validation requests are fired too frequently or return out of order.

**How to diagnose:**
1. Reproduce typing lag with realistic data.
2. Use React DevTools Profiler to identify frequently rendered components and expensive commits.
3. Measure validation and derived computations separately.
4. Optimize the source of unnecessary work rather than adding memoization everywhere.
5. Re-profile to verify the change.

**Senior answer:** “I profile first. Then I reduce the render scope, isolate field state, avoid expensive work on each keystroke, and virtualize large option lists if needed. I validate the improvement with measurements rather than assuming `useMemo` or `React.memo` will fix it.”

## 3. How do you handle very large forms?

For a multi-step application or hundreds of fields, separate concerns rather than keeping all behavior in one component.

**Strategies:**
1. **Use a form library:** React Hook Form or Formik can centralize registration, validation, errors, and submission.
2. **Split into sections or steps:** Keep address, employment, payment, and other sections in focused components.
3. **Use field-level subscriptions:** Let a field subscribe only to the state it needs.
4. **Validate strategically:** Validate on blur or submit when per-keystroke validation is too costly; debounce expensive remote checks.
5. **Preserve values across steps:** Make the form state's lifetime explicit so unmounting a step does not accidentally discard data.
6. **Render expensive widgets on demand:** For example, load advanced settings only when needed.
7. **Virtualize long repeated lists:** Particularly for large select menus or repeated rows. Ensure keyboard navigation and accessibility still work.
8. **Use a schema and shared rules:** Avoid duplicating validation between steps.
9. **Handle submission robustly:** Disable or guard duplicate submissions, expose pending/error states, and handle server field errors.
10. **Test the workflow:** Include back/forward navigation, partial completion, validation, keyboard access, and server failures.

A useful component shape:

```jsx
function ApplicationForm() {
  const [step, setStep] = React.useState(0);

  return (
    <FormProvider>
      {step === 0 && <PersonalDetailsStep />}
      {step === 1 && <EmploymentDetailsStep />}
      {step === 2 && <ReviewStep />}
      <StepNavigation step={step} onStepChange={setStep} />
    </FormProvider>
  );
}
```

`FormProvider` here is illustrative; the actual provider depends on the chosen form library. In production, ensure values persist when a step unmounts and validate the current step before advancing.

## 4. Formik vs React Hook Form

**Interview answer:** Both handle form state and validation, but their default state models differ. Formik commonly uses controlled values in a central form state. React Hook Form primarily uses uncontrolled native inputs registered with the form and subscription-based updates. This often means React Hook Form can reduce rerenders in large forms, but the best choice depends on the team's needs, UI library integration, validation model, and existing codebase.

| Area | Formik | React Hook Form |
|---|---|---|
| Typical input model | Controlled values in form state | Uncontrolled inputs registered with the form; controlled integration is also supported |
| Render behavior | Form state changes can rerender subscribed/form components; field-level optimization is possible | Designed around subscriptions so unrelated fields can often avoid rerendering |
| Validation | Built-in validation patterns; commonly used with Yup and other schema approaches | Built-in rules and resolver integrations for schema libraries |
| UI library integration | Works with controlled components | `Controller`/`useController` supports controlled third-party components |
| Learning curve | Familiar state-driven model for many React developers | Requires understanding registration and subscriptions |
| Best fit | Existing Formik codebases or teams preferring explicit central values | Many forms, render-sensitive forms, and teams comfortable with registration |

**Example with React Hook Form:**

```jsx
import { useForm } from "react-hook-form";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    await saveUser(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Email
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />
      </label>
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : "Create account"}
      </button>
    </form>
  );
}
```

**How to choose:** Don't decide only by benchmark claims. Prototype with your actual component library, validation rules, accessibility requirements, and expected field count. Measure the user experience and maintenance cost.

## 5. What validation strategies do you use?

A strong strategy uses multiple layers:

- **HTML/browser constraints:** `required`, `type="email"`, `min`, `max`, and similar attributes provide basic feedback and accessibility support.
- **Client-side validation:** Fast feedback while the user types, leaves a field, or submits.
- **Schema-based validation:** Shared rules using a schema library can keep complex validation consistent.
- **Server-side validation:** The source of truth for data integrity and security. Never trust client input.
- **Business-rule validation:** Cross-field checks such as start date before end date, password confirmation, or eligibility rules.
- **Remote validation:** Check values that depend on server data, such as username availability.
- **Accessible error reporting:** Associate errors with inputs, use `aria-invalid` and `aria-describedby` where appropriate, and provide a clear summary for long forms.

Example of cross-field validation:

```js
function validateDates(values) {
  const errors = {};

  if (values.startDate && values.endDate) {
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = "End date must be on or after start date";
    }
  }

  return errors;
}
```

**Senior point:** Decide when each rule runs. Showing every error before the user interacts can be noisy, while waiting until submit for every rule can be frustrating. A common approach is blur validation for field feedback, submit validation for all fields, and carefully chosen live validation for high-value rules.

## 6. Synchronous vs asynchronous validation

**Synchronous validation** completes immediately using data already available in the browser—for example, required fields, format checks, and comparisons between fields.

**Asynchronous validation** depends on external work, usually an API—for example, checking whether an email or username is already registered.

```jsx
function validateUsernameFormat(username) {
  if (!username) return "Username is required";
  if (!/^[a-z0-9_]{3,20}$/i.test(username)) {
    return "Use 3–20 letters, numbers, or underscores";
  }
  return undefined;
}
```

Async checks should handle pending state, failures, and stale responses. Debounce them where appropriate, and ensure older requests cannot overwrite newer results.

```jsx
function useUsernameAvailability(username) {
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    const formatError = validateUsernameFormat(username);
    if (formatError) {
      setStatus("invalid");
      return;
    }

    const controller = new AbortController();
    setStatus("checking");

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/usernames/available?username=${encodeURIComponent(username)}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Availability check failed");

        const result = await response.json();
        setStatus(result.available ? "available" : "taken");
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  return status;
}
```

This example assumes the API returns `{ "available": true }` and that the status labels are rendered accessibly. Server-side validation is still required at submit time because availability can change between checking and saving.

**Trade-offs:**
- Sync validation is cheap and predictable.
- Async validation adds latency and can fail due to network issues.
- Do not make an API call for every keystroke without debouncing or cancellation.
- Treat a network failure as “could not verify,” not automatically as “available.”

## 7. How do you build dynamic forms?

Dynamic forms create fields based on user choices or data—for example, adding dependents, configurable product options, or repeating addresses.

Important design choices:
- Represent repeating rows as an array of objects.
- Give each row a stable ID; avoid array index keys when rows can be inserted, removed, or reordered.
- Derive conditional fields from current values where possible.
- Decide whether hidden fields should retain or discard their values.
- Keep validation aligned with the active form shape.
- Validate server input independently of client-side field visibility.

Example:

```jsx
function DependentsForm() {
  const [dependents, setDependents] = React.useState([
    { id: crypto.randomUUID(), name: "" },
  ]);

  function updateName(id, name) {
    setDependents((current) =>
      current.map((person) =>
        person.id === id ? { ...person, name } : person
      )
    );
  }

  function addDependent() {
    setDependents((current) => [
      ...current,
      { id: crypto.randomUUID(), name: "" },
    ]);
  }

  function removeDependent(id) {
    setDependents((current) =>
      current.filter((person) => person.id !== id)
    );
  }

  return (
    <section>
      {dependents.map((person) => (
        <div key={person.id}>
          <label>
            Name
            <input
              value={person.name}
              onChange={(event) => updateName(person.id, event.target.value)}
            />
          </label>
          <button type="button" onClick={() => removeDependent(person.id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addDependent}>
        Add dependent
      </button>
    </section>
  );
}
```

`crypto.randomUUID()` is available in secure contexts in modern browsers. For environments without it, use an appropriate ID-generation strategy. Generate IDs when creating rows, not during render.

**Senior point:** Dynamic fields affect data shape, validation, focus management, and error mapping. Test adding, removing, reordering, hiding, and restoring fields—not just the happy path.

## 8. How do you prevent unnecessary rerenders in forms?

Use the simplest effective optimization:

1. **Keep state close to the fields that need it.** Avoid putting every keystroke in a page-level state object if unrelated page sections do not need it.
2. **Use field-level subscriptions or uncontrolled registration.** React Hook Form's registration model can help reduce updates to unrelated fields.
3. **Split large forms into focused components.** Avoid a single component that renders the entire application around every field change.
4. **Avoid expensive work during typing.** Debounce remote validation and defer noncritical calculations.
5. **Memoize selectively.** `React.memo`, `useMemo`, and `useCallback` help only when they prevent meaningful work and their dependencies are correct.
6. **Keep props stable when needed.** Recreating objects or callbacks can defeat memoization, but don't add complexity without evidence.
7. **Virtualize large menus or repeated rows.** Rendering a huge list of options is often more expensive than the input itself.
8. **Profile before and after.** Confirm that the target field or section no longer triggers costly unrelated work.

Example of isolating a field's local state:

```jsx
const EmailField = React.memo(function EmailField() {
  const [email, setEmail] = React.useState("");

  return (
    <label>
      Email
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </label>
  );
});
```

This illustrates local state isolation; in a real form, coordinate the value with the chosen form library or submit mechanism. `React.memo` alone does not stop rerenders caused by the component's own state or consumed context.

**Senior point:** Some rerenders are necessary and cheap. The goal is not zero renders; it is to avoid expensive unrelated work while preserving correctness and a responsive user experience.

---

## Quick revision — memory card

- **Controlled form:** React state owns the input value.
- **Form performance:** Profile first; reduce broad state updates and expensive work.
- **Large forms:** Split sections, use field subscriptions, validate strategically, preserve values.
- **Formik vs RHF:** Central controlled state model vs registration/subscription-oriented model; measure your real use case.
- **Validation:** Browser UX + client rules + server authority + accessible errors.
- **Sync vs async:** Local checks are immediate; remote checks need pending/error/cancellation handling.
- **Dynamic forms:** Stable row IDs, explicit value retention, matching validation schema.
- **Prevent rerenders:** Localize state, subscribe narrowly, memoize selectively, virtualize large lists.

## Strong senior-level closing answer

“For production forms, I optimize for correctness, accessibility, and maintainability first, then performance based on profiling. I choose a form library based on its state and subscription model, keep validation layered between client and server, and design dynamic fields with stable identity and explicit value-retention rules. For async checks, I handle latency, cancellation, stale responses, and network failure. I don't aim for zero rerenders—I aim to prevent unnecessary expensive work.”

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

# React Routing — Senior Interview Guide

Senior-level interview answers with React Router examples, architecture trade-offs, and a quick-revision memory card.

> Examples use React Router's modern declarative APIs from `react-router-dom` (v6-style and compatible patterns in current versions). Check your installed version for any API-specific differences.

## 1. SPA routing vs server routing

**Interview answer:** In a traditional server-rendered application, navigation commonly sends a request to the server for a new document, and the server returns HTML for that URL. In a Single-Page Application (SPA), the browser initially loads the app shell; a client-side router then updates the visible UI and browser history without requesting a full HTML document for each in-app navigation. SPAs still make network requests for APIs and assets, and they still need server configuration for direct URL requests.

| Area | Traditional server routing | SPA client-side routing |
|---|---|---|
| Navigation | Often requests a new document | Usually updates UI without a full document reload |
| Rendering | Server generates HTML per request | Browser renders route components; SSR is also possible |
| Initial load | Can deliver useful HTML early | May need JavaScript before interactive UI is available |
| URL handling | Server resolves each route | Client router resolves in-app paths |
| Direct URL refresh | Server route naturally handles the request | Server must serve the SPA entry point for app routes |
| SEO | Server HTML is often straightforward to crawl | Depends on rendering strategy; SSR/SSG can help |

**Senior point:** SPA and server rendering are not mutually exclusive. Frameworks can use client-side navigation while rendering initial pages on the server. Choose based on SEO, first-load performance, interaction needs, and deployment constraints.

## 2. `BrowserRouter` vs `HashRouter`

**Interview answer:** `BrowserRouter` uses the browser History API and clean paths such as `/products/42`. The server must be configured to return the SPA entry HTML for valid app paths. `HashRouter` stores the route after `#`, such as `/#/products/42`, and the fragment is not sent to the server, which can simplify hosting on static servers that cannot configure rewrites.

```jsx
import { BrowserRouter, HashRouter } from "react-router-dom";

function BrowserApp() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function HashApp() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
```

| Concern | `BrowserRouter` | `HashRouter` |
|---|---|---|
| Example URL | `/products/42` | `/#/products/42` |
| URL style | Cleaner, standard paths | Includes `#` |
| Server fallback | Required for direct app-route requests | Usually avoids route rewrite requirements |
| Fragment use | Can use URL fragment separately | Hash is used by the router |
| Typical fit | Production apps with server/CDN rewrite control | Static hosting or environments where rewrites cannot be configured |

**Senior point:** Prefer `BrowserRouter` when you control the hosting configuration. Use `HashRouter` as a deployment trade-off, not as a security feature.

## 3. What is route guarding?

**Interview answer:** Route guarding is a UI-level mechanism that decides whether a user should see a route based on state such as authentication, role, or entitlement. In React Router, this is often implemented with a wrapper component or a route loader/redirect. A guard improves navigation and user experience, but it does not secure backend data by itself.

Typical checks:
- Is the user authenticated?
- Is authentication still loading?
- Does the user have the required role or permission?
- Should the app redirect to login and preserve the intended destination?

**Important:** The API/server must independently verify identity and authorization on every protected operation. Hiding a route in the browser does not prevent a user from calling an API directly.

## 4. How do you implement protected routes?

A wrapper can render the requested route when authenticated, show a loading state while the session is being resolved, or redirect to login.

```jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({ user, isLoading }) {
  const location = useLocation();

  if (isLoading) {
    return <p>Checking your session…</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
```

Route configuration:

```jsx
import { Routes, Route } from "react-router-dom";

function AppRoutes({ user, isLoading }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth user={user} isLoading={isLoading} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

After successful login, send the user back to the original location when appropriate:

```jsx
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogin(credentials) {
    await login(credentials);

    const destination = location.state?.from?.pathname || "/dashboard";
    navigate(destination, { replace: true });
  }

  return <LoginForm onSubmit={handleLogin} />;
}
```

In a real application, validate any redirect destination if it can originate from untrusted input; avoid open redirects. The example uses an internal router location state.

**Senior points:**
- Distinguish unauthenticated from “session still loading.”
- Preserve the intended destination where appropriate.
- Prefer permission checks based on explicit capabilities for complex applications.
- Enforce authorization on the server for APIs and data.
- Avoid storing sensitive credentials or trusting a client-side role flag as the security boundary.

## 5. How do you lazy-load routes?

**Interview answer:** Lazy loading splits route code into separate chunks and downloads a route's code when it is needed. It can reduce initial JavaScript, especially for rarely visited pages, but introduces a loading state and additional network requests.

```jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));

function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading page…</p>}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Suspense>
  );
}
```

**Best practices:**
- Split at meaningful route or feature boundaries.
- Keep the fallback useful and avoid layout shifts where possible.
- Handle failed chunk downloads with an error boundary and a recovery option.
- Avoid splitting every tiny component; too many chunks can add overhead.
- Measure bundle size and real navigation performance.

**Senior point:** Lazy loading optimizes the initial bundle, but it does not automatically make navigation faster. A route visited often may benefit from preloading or prefetching when appropriate.

## 6. What is nested routing?

**Interview answer:** Nested routing represents a parent-child UI hierarchy in the URL and component tree. Parent routes render shared layouts, and child routes render at the parent's `<Outlet />`. This helps share navigation, authorization, and layout without duplicating them across pages.

```jsx
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

function AccountLayout() {
  return (
    <div className="account-layout">
      <nav>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="security">Security</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/account" element={<AccountLayout />}>
        <Route index element={<AccountOverview />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="security" element={<SecurityPage />} />
      </Route>
    </Routes>
  );
}
```

Resulting routes:
- `/account` → account overview
- `/account/profile` → profile inside the account layout
- `/account/security` → security inside the account layout

**Senior point:** An index route renders at the parent URL. Use relative child paths and links when they should follow the parent's route hierarchy. A parent without an `<Outlet />` will not display its nested child route.

## 7. URL params vs query params

**Interview answer:** Path parameters identify a resource or route segment, while query parameters usually express optional filters, sorting, pagination, or search criteria. Both are user-controlled input and must be validated before being used in API requests.

Path parameter example:

```jsx
import { useParams } from "react-router-dom";

function ProductPage() {
  const { productId } = useParams();
  return <h1>Product: {productId}</h1>;
}

// Route: <Route path="/products/:productId" element={<ProductPage />} />
// URL: /products/42
```

Query parameter example:

```jsx
import { useSearchParams } from "react-router-dom";

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  function goToNextPage() {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set("page", String(page + 1));
      return next;
    });
  }

  return (
    <>
      <p>Search: {search}</p>
      <p>Page: {Number.isFinite(page) && page > 0 ? page : 1}</p>
      <button onClick={goToNextPage}>Next page</button>
    </>
  );
}

// URL: /products?search=keyboard&page=2
```

| Type | Example | Common purpose |
|---|---|---|
| Path parameter | `/products/42` | Identify a specific resource |
| Query parameter | `/products?category=audio&page=2` | Filter, sort, paginate, search |
| Hash fragment | `/#section-faq` | In-page anchor or hash-based routing |

**Senior point:** Query strings can be bookmarked and shared, which is useful for search/filter state. Avoid putting secrets or sensitive personal data in URLs because they can appear in browser history, logs, and referrer data.

## 8. How do you handle 404 routes?

**Interview answer:** Add a catch-all route using `path="*"`. It should appear as a fallback within the relevant route tree so unmatched URLs render a helpful not-found page. In a data router, a route-level error boundary can also handle loader/action errors, but a 404 page and an error boundary solve different problems.

```jsx
import { Routes, Route, Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <h1>404 — Page not found</h1>
      <p>The address may be incorrect or the page may have moved.</p>
      <Link to="/">Return home</Link>
    </main>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

**Deployment gotcha:** With `BrowserRouter`, refreshing `/products/42` must return the SPA entry HTML from the server/CDN. Otherwise the server may return its own 404 before React Router starts. Configure an appropriate fallback for client routes, while ensuring actual static assets and API endpoints are not incorrectly rewritten to the SPA page.

**Senior point:** If the server needs to return a true HTTP 404 for crawlers or server-rendered pages, client-only rendering of a 404 component does not by itself change the HTTP status. Coordinate the response status with the rendering/deployment architecture.

## 9. How do you improve navigation performance?

Think of navigation performance as both **code loading** and **data/UI readiness**.

1. **Measure first:** Use browser performance tools, React Profiler, Web Vitals, and real-user monitoring where available.
2. **Lazy-load route-level code:** Reduce initial bundle size for infrequently used routes.
3. **Prefetch intentionally:** Preload likely next routes or data when signals justify it; avoid wasting bandwidth on mobile or low-probability routes.
4. **Keep layouts stable:** Render shared layout elements once in parent routes and avoid remounting them unnecessarily.
5. **Avoid unnecessary remounts:** Use stable component identities and keys; don't define route components inside another component if that causes a new component type each render.
6. **Optimize data fetching:** Cache reusable responses, cancel obsolete requests, and avoid duplicate network calls.
7. **Use loading states and transitions:** Communicate pending navigation clearly; don't block urgent user interactions with expensive synchronous work.
8. **Reduce render work:** Keep state local, memoize only when profiling shows value, and virtualize large lists.
9. **Handle chunk failures:** A network or deployment mismatch can make a lazy-loaded chunk fail; provide a recovery path.
10. **Keep route state shareable:** Store useful filters and pagination in the URL so navigation, refresh, and back/forward work predictably.

**Senior point:** Distinguish first-load performance from subsequent navigation. Code splitting can improve first load while making the first visit to a lazy route slower unless data/code is prefetched. Measure both.

---

## Quick revision — memory card

- **SPA vs server routing:** Client router updates the UI; server routing returns a document. SSR and SPA navigation can coexist.
- **BrowserRouter vs HashRouter:** Clean History API paths need server fallback; hash routes are convenient on simple static hosting.
- **Route guard:** Controls UI access and redirects; not a security boundary.
- **Protected route:** Handle loading, unauthenticated redirects, and return destinations; enforce authorization on the backend.
- **Lazy routes:** `lazy()` + `Suspense`; smaller initial bundle, but route loading needs a fallback.
- **Nested routes:** Parent layout + `<Outlet />` + child routes.
- **Path vs query params:** Resource identity vs filters/search/pagination.
- **404:** Catch-all `path="*"` plus correct hosting fallback.
- **Navigation performance:** Profile, split code, optimize data, keep layouts stable, prefetch selectively.

## Strong senior-level closing answer

“I design routing around URL semantics, layout hierarchy, security boundaries, and loading behavior. I use path parameters for resource identity and query parameters for shareable view state, nest routes around stable layouts, and lazy-load substantial features where it reduces initial JavaScript. I handle auth loading and redirects carefully, but rely on server-side authorization for security. Finally, I test direct URL loads, refreshes, browser back/forward, not-found behavior, and navigation performance in the deployed environment—not only in local development.”

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

# React Testing — Senior Interview Guide

Senior-level answers, practical Jest/React Testing Library examples, testing strategy trade-offs, and a quick-revision memory card.

> Examples use Jest-style syntax with React Testing Library. Some projects use Vitest instead of Jest; the testing concepts and most Testing Library APIs remain similar, but configuration and mocking APIs differ.

## 1. Unit testing vs integration testing

**Interview answer:** Unit tests verify a small unit in isolation, such as a pure function, reducer, or validation helper. Integration tests verify that multiple pieces work together—for example, a form component, validation, state updates, and an API boundary. The boundary is a spectrum: the important question is whether the test gives confidence in the behavior at an appropriate cost.

**Unit test example:**

```js
export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
```

```js
import { formatPrice } from "./formatPrice";

test("formats a price as USD currency", () => {
  expect(formatPrice(12)).toBe("$12.00");
});
```

**Integration test example:**

```jsx
function Greeting({ loadUser }) {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    loadUser().then((user) => setName(user.name));
  }, [loadUser]);

  return <h1>{name ? `Hello, ${name}` : "Loading..."}</h1>;
}
```

```jsx
import { render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";

test("shows the loaded user's greeting", async () => {
  const loadUser = jest.fn().mockResolvedValue({ name: "Maya" });

  render(<Greeting loadUser={loadUser} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Hello, Maya" }))
    .toBeInTheDocument();
});
```

**Senior point:** Favor tests that cover meaningful behavior with realistic interactions. Pure logic is usually cheap to unit-test; wiring between components, state, and APIs benefits from integration tests.

## 2. Jest vs React Testing Library

**Interview answer:** Jest is a test runner and assertion/mocking ecosystem. React Testing Library (RTL) is a UI testing utility that renders components and encourages tests based on how users interact with the interface. They are complementary, not competing alternatives.

| Tool | Main responsibility |
|---|---|
| Jest | Test discovery/execution, assertions, mocks, spies, coverage, setup |
| React Testing Library | Render React UI, query accessible elements, simulate user interactions |
| `@testing-library/user-event` | Model user interactions such as typing, clicking, and tabbing |
| MSW (Mock Service Worker) | Intercept network requests at the HTTP boundary for realistic API tests |

Example:

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((value) => value + 1)}>Increment</button>
    </>
  );
}

test("increments the displayed count when clicked", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole("button", { name: "Increment" }));

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

**Senior point:** Prefer accessible queries such as `getByRole` and `getByLabelText`. Avoid testing internal state or implementation details when the user-visible behavior is what matters.

## 3. What should you not test?

Avoid tests that are brittle, duplicate framework guarantees, or assert details unrelated to the product's behavior.

Usually avoid:
- React internals, Hook call counts, or implementation-specific state shape.
- Testing that a simple prop was passed when the meaningful outcome can be tested instead.
- Assertions against private implementation details or CSS class names that are not part of a deliberate contract.
- Repeating the same assertion in many tests without adding meaningful coverage.
- Testing third-party libraries' internals rather than your integration with them.
- Snapshotting an entire large page without a clear reason.
- Exact timing assumptions for asynchronous UI.
- Tests that only verify a mock was called but never verify the observable outcome, unless the call itself is the contract.

Prefer testing:
- What the user can see and do.
- Validation messages and error states.
- Loading, success, empty, and failure states.
- Permission-sensitive UI behavior, while separately testing server authorization.
- Important business rules and edge cases.
- Keyboard and accessible interaction behavior.

**Senior point:** A test should protect a behavior or contract that matters. Avoid coupling tests to how the component happens to implement that behavior today.

## 4. Snapshot testing: pros and cons

**Interview answer:** Snapshot tests serialize a rendered value or UI structure and compare it with a stored baseline. They can detect broad output changes quickly, but a snapshot failing does not automatically mean the behavior is wrong, and blindly updating snapshots can hide regressions.

**Pros**
- Quick way to detect unexpected structural changes.
- Useful for stable, compact output such as a small generated document or serialized object.
- Can be convenient when output itself is the contract.

**Cons**
- Large snapshots are hard to review.
- Harmless changes can create noisy diffs.
- Reviewers may update snapshots without understanding the change.
- Snapshots do not prove interactions or accessibility.
- They can couple tests to markup details.

Example:

```jsx
import { render } from "@testing-library/react";

test("renders the compact status badge", () => {
  const { container } = render(<StatusBadge status="Active" />);
  expect(container.firstChild).toMatchSnapshot();
});
```

Use snapshots selectively. For most user-facing behavior, a targeted assertion is often clearer:

```jsx
expect(screen.getByRole("status")).toHaveTextContent("Active");
```

## 5. How do you mock API calls?

**Interview answer:** Mocking lets tests control network outcomes so they can verify loading, success, empty, and failure behavior deterministically. For UI integration tests, mocking at the network boundary with MSW often preserves more realistic application behavior than mocking every API client function. Direct function mocks can still be useful for focused unit tests.

Example with a mocked API function:

```jsx
import { render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";

function Users({ getUsers }) {
  const [state, setState] = React.useState({ loading: true, users: [], error: "" });

  React.useEffect(() => {
    let active = true;

    getUsers()
      .then((users) => {
        if (active) setState({ loading: false, users, error: "" });
      })
      .catch(() => {
        if (active) setState({ loading: false, users: [], error: "Could not load users" });
      });

    return () => {
      active = false;
    };
  }, [getUsers]);

  if (state.loading) return <p>Loading users…</p>;
  if (state.error) return <p role="alert">{state.error}</p>;

  return <ul>{state.users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}

test("renders users returned by the API", async () => {
  const getUsers = jest.fn().mockResolvedValue([
    { id: "1", name: "Ava" },
    { id: "2", name: "Noah" },
  ]);

  render(<Users getUsers={getUsers} />);

  expect(screen.getByText("Loading users…")).toBeInTheDocument();
  expect(await screen.findByText("Ava")).toBeInTheDocument();
  expect(screen.getByText("Noah")).toBeInTheDocument();
});
```

In a real app, keep the API function stable (for example, import it from a module or pass it from a stable parent) so it doesn't change identity on each render and retrigger the effect.

Test failures too:

```js
getUsers.mockRejectedValue(new Error("Network unavailable"));
```

Then assert the user-visible error message. Also test empty responses, HTTP errors, and retry behavior when those are part of the product.

**Senior point:** Don't make tests depend on live external services. Control the network boundary, reset handlers/mocks between tests, and ensure async work is awaited.

## 6. How do you test custom Hooks?

**Interview answer:** Test a custom Hook through a small component that consumes it, or use a Hook-rendering utility if supported by your installed Testing Library version. Testing through a component often reflects the real usage more closely and makes visible behavior easy to assert.

Example Hook:

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue((current) => !current);
  }, []);

  return [value, toggle];
}
```

Test through a component:

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function ToggleExample() {
  const [enabled, toggle] = useToggle();

  return (
    <>
      <p role="status">{enabled ? "Enabled" : "Disabled"}</p>
      <button onClick={toggle}>Toggle</button>
    </>
  );
}

test("toggles the state", async () => {
  const user = userEvent.setup();
  render(<ToggleExample />);

  expect(screen.getByRole("status")).toHaveTextContent("Disabled");
  await user.click(screen.getByRole("button", { name: "Toggle" }));
  expect(screen.getByRole("status")).toHaveTextContent("Enabled");
});
```

Test important cases such as initial state, state transitions, cleanup, and async behavior. Avoid relying on private Hook implementation details.

## 7. How do you test Redux logic?

**Interview answer:** Test pure reducers and selectors as unit tests, then test connected UI components with a real Redux store for integration confidence. For Redux Toolkit, use `configureStore` and the actual reducer when practical. Mock the external network boundary rather than mocking Redux internals.

Reducer unit test:

```js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

test("increments the counter", () => {
  const nextState = counterSlice.reducer(
    { value: 0 },
    counterSlice.actions.increment()
  );

  expect(nextState.value).toBe(1);
});
```

For a component using Redux, render with a fresh store per test:

```jsx
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function renderWithStore(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: { counter: counterSlice.reducer },
    preloadedState,
  });

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}
```

Create a store for each test so state does not leak between tests. Test selectors for derived values and async thunks/listeners at the appropriate integration boundary.

**Senior point:** Don't mock `useSelector` and `useDispatch` for every component test. A real test store often catches wiring mistakes that isolated mocks miss.

## 8. E2E testing vs component testing

**Interview answer:** Component tests verify a component or a small UI unit in a controlled environment. End-to-end (E2E) tests exercise a user journey through a running application, often including routing, network interactions, and backend integration. E2E tests provide broad confidence but usually cost more time and maintenance.

| Area | Component testing | E2E testing |
|---|---|---|
| Scope | Component or small UI integration | Full user workflow across app boundaries |
| Speed | Usually fast | Usually slower |
| Dependencies | Many can be controlled/mocked | More real infrastructure is involved |
| Failure diagnosis | Often localized | Can involve frontend, backend, environment, or data |
| Best for | UI states, interactions, accessibility, edge cases | Critical journeys such as sign-up, checkout, and permissions |

Example E2E scenario with Playwright:

```ts
import { test, expect } from "@playwright/test";

test("user can sign in and reach the dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("Password").fill("correct-test-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
```

Use test-only credentials and controlled environments. Avoid relying on real customer accounts or production data.

**Senior point:** Component tests do not replace E2E tests, and E2E tests should not duplicate every edge case. Cover detailed logic closer to the component and reserve E2E tests for a small set of high-value journeys.

## 9. What causes flaky tests, and how do you fix them?

A flaky test sometimes passes and sometimes fails without a relevant product change.

Common causes:
- Arbitrary sleeps instead of waiting for a condition.
- Async work not awaited.
- Shared mutable state or tests that depend on execution order.
- Network or environment dependencies.
- Time, randomness, or timezone assumptions.
- Animations and transitions.
- Incomplete cleanup of mocks, timers, event listeners, or servers.
- Selectors that depend on unstable markup.
- Parallel tests sharing the same account or data.

Bad pattern:

```js
await new Promise((resolve) => setTimeout(resolve, 1000));
expect(screen.getByText("Saved")).toBeInTheDocument();
```

Better pattern:

```js
expect(await screen.findByText("Saved")).toBeInTheDocument();
```

Practical fixes:
1. Wait for the expected observable condition.
2. Await every async action and assertion.
3. Use unique test data and isolate state.
4. Mock external dependencies where appropriate.
5. Reset mocks, timers, and network handlers after each test.
6. Control time and randomness if they affect the assertion.
7. Keep tests independent and deterministic.
8. Capture traces, logs, screenshots, and network details for failures.
9. Retry only as a diagnostic or temporary mitigation; retries do not fix the root cause.

**Senior point:** A flaky test reduces trust in the suite. Track flake rates, identify common failure modes, and prioritize fixing systemic causes rather than adding unlimited retries.

## 10. What is the test pyramid?

**Interview answer:** The test pyramid is a guideline to have many fast, focused tests at the lower levels, fewer integration tests in the middle, and a smaller number of broad E2E tests at the top. It is not a rigid ratio; the right distribution depends on system architecture, risk, and the cost of maintaining each test.

<box direction="col" gap={2}>
  <box align="center" padding={3} background="surface-secondary" radius="md">
    **E2E tests — Few**
    <text size="sm">Critical user journeys across the running system</text>
  </box>
  <box align="center" padding={3} background="surface" border radius="md">
    **Integration tests — Some**
    <text size="sm">UI + state + API boundaries working together</text>
  </box>
  <box align="center" padding={3} background="surface" border radius="md">
    **Unit tests — Many**
    <text size="sm">Pure logic, reducers, validation, selectors</text>
  </box>
</box>

**How to apply it:**
- Unit-test deterministic business logic heavily.
- Integration-test important component workflows and boundaries.
- E2E-test a concise set of high-value journeys.
- Add accessibility and performance checks where risk warrants them.
- Avoid measuring quality only by code coverage; coverage shows what executed, not whether assertions are meaningful.

**Senior point:** The goal is fast feedback with confidence. If a bug is cheap to catch in a unit test, don't require a slow E2E run to discover it—but preserve enough E2E coverage to validate critical end-to-end behavior.

---

## Quick revision — memory card

- **Unit vs integration:** Isolated logic vs connected pieces working together.
- **Jest vs RTL:** Runner/assertions/mocks vs user-oriented React rendering and queries.
- **What not to test:** Framework internals and brittle implementation details.
- **Snapshots:** Fast change detection, but noisy and not proof of behavior.
- **API mocks:** Control success, empty, loading, and failure outcomes; await async UI.
- **Custom Hooks:** Test through a consumer component or a Hook utility.
- **Redux:** Unit-test reducers/selectors; integration-test components with a real test store.
- **E2E vs component:** Broad user journeys vs focused, fast UI behavior.
- **Flaky tests:** Replace sleeps with condition-based waits; isolate data and await async work.
- **Test pyramid:** Many unit tests, useful integration coverage, few high-value E2E tests.

## Strong senior-level closing answer

“I build a testing strategy around risk and feedback speed. I use unit tests for deterministic business logic, React Testing Library integration tests for user-visible behavior and state wiring, and a focused Playwright suite for critical journeys. I mock external boundaries deliberately, test loading and failure states, and avoid brittle implementation assertions. For flaky tests, I remove timing assumptions and shared state, then track recurrence. Coverage is a signal, but meaningful assertions and reliable feedback are the goal.”

---

## 🔟 Error Handling & Edge Cases

1. Error boundaries purpose
2. Error boundary limitations
3. Global error handling
4. API failure handling
5. Retry strategies
6. Graceful degradation
7. Fallback UI patterns

# React Error Handling & Resilience — Senior Interview Guide

Senior-level interview answers with practical React examples, API resilience patterns, and a quick-revision memory card.

## 1. What is the purpose of Error Boundaries?

**Interview answer:** An Error Boundary catches certain errors thrown while rendering its descendant component tree and displays fallback UI instead of letting that rendering failure take down the affected part of the interface. It can also report error details for diagnostics. Boundaries are useful around independently recoverable areas such as dashboards, widgets, reports, or route sections.

The built-in React Error Boundary API uses a class component:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    reportErrorToMonitoringService({
      message: error.message,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>This section is temporarily unavailable.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try rendering again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
```

**Important:** Resetting `hasError` alone may cause the same broken child to throw again. In production, use a deliberate reset strategy—for example, remounting the failed subtree with a new key, or using a library's reset API when the relevant route or inputs change.

**Senior point:** Place boundaries at useful isolation points. One boundary around the entire app may preserve only a generic fallback, while boundaries around important sections can let unaffected features remain usable.

## 2. What are the limitations of Error Boundaries?

Error Boundaries are not universal exception handlers. React's built-in boundaries generally catch errors in descendant rendering, constructors, and lifecycle methods, but not:

- Errors thrown in ordinary event handlers.
- Errors from asynchronous callbacks such as `setTimeout` or promise callbacks.
- Errors thrown by the boundary itself.
- Errors during server-side rendering.
- Every failure that occurs outside the descendant React rendering/lifecycle path.

Handle those cases explicitly:

```jsx
function SaveButton() {
  const [error, setError] = React.useState("");

  async function handleSave() {
    setError("");

    try {
      await saveChanges();
    } catch (err) {
      setError("We couldn't save your changes. Please try again.");
      reportErrorToMonitoringService(err);
    }
  }

  return (
    <>
      <button onClick={handleSave}>Save</button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
```

**Senior point:** Use Error Boundaries for render-tree failures, `try/catch` for imperative and async work, and network/state handling for API outcomes. These mechanisms complement each other.

## 3. How do you implement global error handling?

**Interview answer:** I use multiple layers instead of one “global try/catch”: Error Boundaries for React rendering failures, a centralized API client for network and HTTP failures, explicit handling for async operations and event handlers, and an observability service for unexpected exceptions. Global browser events can capture some uncaught failures, but they are a last-resort reporting mechanism—not a substitute for handling errors where the app can recover.

A basic boundary can report errors:

```jsx
class AppErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    reportErrorToMonitoringService({
      message: error.message,
      componentStack: info.componentStack,
    });
  }

  render() {
    return this.state.failed
      ? <AppFallback />
      : this.props.children;
  }
}
```

Wrap the app near its root:

```jsx
function Root() {
  return (
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  );
}
```

A last-resort browser reporting layer can be useful:

```js
window.addEventListener("error", (event) => {
  reportErrorToMonitoringService({
    message: event.message,
    source: event.filename,
    line: event.lineno,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  reportErrorToMonitoringService({
    message: String(event.reason),
  });
});
```

Register these listeners once during application bootstrap and remove them if their lifecycle is shorter than the app. Avoid sending secrets, access tokens, or sensitive form values to logs. Browser-level handlers should report unexpected errors, not silently suppress them or pretend the app recovered.

**Senior point:** Centralize reporting and common transport behavior, but keep recovery decisions close to the operation that knows whether retry, fallback, or user action is appropriate.

## 4. How should an application handle API failures?

**Interview answer:** Handle API failures by separating transport errors, HTTP errors, parsing errors, validation errors, and cancellation. The UI should represent the request lifecycle—loading, success, empty, and failure—and show a useful action when recovery is possible. A failed request should not leave the user staring at an indefinite spinner.

A small fetch wrapper:

```js
export async function apiGet(url, { signal } = {}) {
  let response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    // Abort is usually intentional cancellation, not a user-facing server failure.
    if (error.name === "AbortError") throw error;
    throw new Error("Network unavailable. Check your connection.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please sign in again.");
    }
    if (response.status === 403) {
      throw new Error("You don't have permission to view this information.");
    }
    if (response.status >= 500) {
      throw new Error("The service is temporarily unavailable.");
    }
    throw new Error(`Request failed (${response.status}).`);
  }

  return response.json();
}
```

Component pattern:

```jsx
function ReportsPanel() {
  const [state, setState] = React.useState({
    status: "loading",
    reports: [],
    error: "",
  });
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();

    setState((current) => ({ ...current, status: "loading", error: "" }));

    apiGet("/api/reports", { signal: controller.signal })
      .then((reports) => {
        setState({ status: "success", reports, error: "" });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setState({ status: "error", reports: [], error: error.message });
        }
      });

    return () => controller.abort();
  }, [attempt]);

  if (state.status === "loading") return <p>Loading reports…</p>;

  if (state.status === "error") {
    return (
      <section>
        <p role="alert">{state.error}</p>
        <button onClick={() => setAttempt((value) => value + 1)}>
          Retry
        </button>
      </section>
    );
  }

  if (state.reports.length === 0) return <p>No reports are available.</p>;

  return <ReportList reports={state.reports} />;
}
```

In production, consider a query/cache library such as TanStack Query or RTK Query for deduplication, caching, cancellation, retries, and consistent request state.

**Senior points:**
- Don't treat all status codes alike.
- A `401` may require re-authentication; a `403` means access is denied.
- Validate API response shapes before using them if data integrity is uncertain.
- Don't show raw stack traces or internal server messages to end users.
- Keep useful existing data visible when a background refresh fails, if that is safe and meaningful.

## 5. What retry strategies do you use?

**Interview answer:** Retries are useful for transient failures, but retries should be bounded and applied only when repeating the operation is safe. For transient network failures and selected server errors, use a limited retry count with exponential backoff and jitter. Avoid blindly retrying validation failures, permission failures, or non-idempotent writes.

Common strategies:
- **Immediate retry:** Appropriate only for a narrow set of cases where another attempt is likely to succeed quickly.
- **Exponential backoff:** Increase the delay after each failure.
- **Jitter:** Add randomness so many clients don't retry at exactly the same time.
- **Retry budget/maximum attempts:** Stop retrying after a small, defined limit.
- **Respect `Retry-After`:** When a server provides it, honor the documented delay where appropriate.
- **Manual retry:** Let the user retry when recovery requires their decision.
- **Circuit breaker:** In service-to-service systems, temporarily stop calls to a failing dependency to prevent overload.

Example helper for a safe, repeatable operation:

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryWithBackoff(operation, {
  attempts = 3,
  baseDelayMs = 300,
  maxDelayMs = 3000,
} = {}) {
  let lastError;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === attempts - 1 || !isRetryable(error)) {
        throw error;
      }

      const exponentialDelay = Math.min(
        maxDelayMs,
        baseDelayMs * 2 ** attempt
      );
      const jitter = Math.random() * 150;

      await sleep(exponentialDelay + jitter);
    }
  }

  throw lastError;
}
```

`isRetryable` must be implemented for your error model—for example, retry selected network errors, `429`, and some `5xx` responses, but not ordinary `400`, `401`, or `403` responses. This helper does not itself enforce cancellation or `Retry-After`; production code should add those if needed.

**Critical safety point:** Retrying a payment or create-order request can duplicate side effects. Use server-supported idempotency keys or an equivalent deduplication mechanism before retrying such operations.

**Senior point:** A retry policy is part of system load management. Unbounded retries can amplify an outage, so cap attempts, add jitter, and expose a clear final failure state.

## 6. What is graceful degradation?

**Interview answer:** Graceful degradation means the core product remains useful when a noncritical dependency or feature fails. Instead of treating every failure as a total outage, isolate features, provide cached or reduced functionality when appropriate, and make limitations clear to users.

Examples:
- A dashboard shows cached metrics with a “last updated” timestamp if refresh fails.
- A product page remains usable when recommendations are unavailable.
- A profile page loads even if an optional avatar service fails.
- Search can show a retry option rather than blocking unrelated navigation.
- A nonessential analytics call can fail without preventing a form submission.

```jsx
function ProductDetails({ product, recommendations, recommendationsError }) {
  return (
    <main>
      <ProductSummary product={product} />

      <section aria-labelledby="recommendations-title">
        <h2 id="recommendations-title">Recommended for you</h2>
        {recommendationsError ? (
          <p>Recommendations are temporarily unavailable.</p>
        ) : (
          <RecommendationList items={recommendations} />
        )}
      </section>
    </main>
  );
}
```

**Senior point:** Decide which capabilities are critical, optional, or safely degradable. Never degrade security checks, authorization, or data integrity in the name of availability.

## 7. What fallback UI patterns do you use?

Choose the fallback based on the type and scope of failure.

<box direction="col" gap={3}>
  <row align="start" gap={3}>
    <box background="surface-secondary" radius="lg" padding={3}>
      <icon name="loader-circle" size="xl" />
    </box>
    <box flex="1" gap={1}>
      **Loading state**
      <text size="sm">Use a spinner, skeleton, or progress indicator while work is pending. Avoid indefinite loading without timeout or recovery behavior.</text>
    </box>
  </row>
  <divider color="subtle" />
  <row align="start" gap={3}>
    <box background="surface-secondary" radius="lg" padding={3}>
      <icon name="alert-triangle" size="xl" />
    </box>
    <box flex="1" gap={1}>
      **Inline error**
      <text size="sm">Show a concise field- or section-level message and a relevant action such as retrying or correcting input.</text>
    </box>
  </row>
  <divider color="subtle" />
  <row align="start" gap={3}>
    <box background="surface-secondary" radius="lg" padding={3}>
      <icon name="refresh-cw" size="xl" />
    </box>
    <box flex="1" gap={1}>
      **Retry panel**
      <text size="sm">Use when the failure may be transient. Prevent duplicate submissions and show progress during retry.</text>
    </box>
  </row>
  <divider color="subtle" />
  <row align="start" gap={3}>
    <box background="surface-secondary" radius="lg" padding={3}>
      <icon name="layout-dashboard" size="xl" />
    </box>
    <box flex="1" gap={1}>
      **Section-level fallback**
      <text size="sm">Replace a failed widget while keeping the rest of the page usable; Error Boundaries are useful here for render failures.</text>
    </box>
  </row>
  <divider color="subtle" />
  <row align="start" gap={3}>
    <box background="surface-secondary" radius="lg" padding={3}>
      <icon name="wifi-off" size="xl" />
    </box>
    <box flex="1" gap={1}>
      **Offline or stale-data state**
      <text size="sm">Clearly label cached content and its freshness. Don't imply that stale information is current.</text>
    </box>
  </row>
</box>

Accessibility considerations:
- Use `role="alert"` for important error messages that need immediate announcement; don't overuse it for frequent updates.
- Associate field errors with inputs using `aria-describedby` and set `aria-invalid` when appropriate.
- Preserve keyboard focus after an error or retry.
- Keep messages actionable and avoid exposing stack traces, internal URLs, tokens, or sensitive data.
- Distinguish empty results from failures; “No records found” is not the same as “Could not load records.”

**Senior point:** Match fallback scope to failure scope. A field validation error should not replace the whole page, and a broken optional widget should not make the entire application unusable.

---

## Quick revision — memory card

- **Error Boundary purpose:** Catch descendant render/lifecycle errors and show fallback UI.
- **Limitations:** Not a catch-all for event handlers, async callbacks, or server rendering.
- **Global handling:** Boundaries + API layer + explicit async handling + monitoring.
- **API failures:** Model loading, success, empty, and error states; distinguish error types.
- **Retries:** Bounded attempts, exponential backoff, jitter, and idempotency for writes.
- **Graceful degradation:** Keep core functionality available when optional features fail.
- **Fallback UI:** Loading, inline error, retry panel, section boundary, or clearly marked stale data.

## Strong senior-level closing answer

“I design error handling in layers. Error Boundaries isolate React render failures, API clients normalize transport and HTTP errors, and async actions handle expected failures close to the user interaction. I retry only transient, safe operations with bounded exponential backoff and jitter, and use idempotency for writes. I also classify features by criticality so optional dependencies can degrade gracefully. Finally, I pair useful fallback UI with structured monitoring while protecting sensitive data from logs.”

---

## 1️⃣1️⃣ Security

1. XSS in React
2. React HTML escaping
3. dangerouslySetInnerHTML
4. CSRF protection
5. Secure token storage
6. Environment variables
7. Role-based UI rendering

# React Security — Senior Interview Guide

Senior-level interview answers with examples, threat-modeling considerations, and quick-revision notes.

> Security note: frontend controls improve user experience, but authorization and input validation must be enforced by the server. No single React feature makes an application secure.

## 1. What is XSS in React?

**Interview answer:** Cross-site scripting (XSS) occurs when an attacker causes a victim's browser to execute untrusted script in the context of a trusted site. React escapes text rendered through normal JSX expressions, which blocks many common injection paths, but XSS is still possible through unsafe HTML insertion, unsafe URL handling, vulnerable dependencies, or DOM APIs that bypass React's escaping.

Common sources:
- Rendering user-provided HTML.
- Using `dangerouslySetInnerHTML` with untrusted content.
- Passing untrusted values to unsafe DOM APIs such as `innerHTML`.
- Allowing dangerous URL schemes in links or navigation.
- Relying on string-based script execution or unsafe third-party widgets.

Example: safe text rendering:

```jsx
function Comment({ text }) {
  return <p>{text}</p>;
}
```

If `text` contains markup-like characters, React treats it as text rather than executing it as HTML.

**Senior point:** Trace data from source to sink. Ask where untrusted data enters, how it is transformed, and whether it reaches an execution-capable context. Sanitization, contextual encoding, safe APIs, CSP, dependency hygiene, and testing work together; none should be treated as a complete substitute for the others.

## 2. How does React HTML escaping work?

**Interview answer:** When values are rendered as ordinary JSX text or attribute values, React escapes special HTML characters so the value is treated as data, not markup. For example, `<`, `>`, and `&` in a text value are represented safely in the DOM. This does not mean every use of a value is automatically safe: escaping depends on the output context, and React cannot protect code that deliberately interprets a string as HTML or JavaScript.

```jsx
function UserMessage({ message }) {
  return <div>{message}</div>;
}
```

If `message` is something like `<img src=x onerror=alert(1)>`, React renders the characters as text rather than creating an image element with an event handler.

Good practices:
- Render untrusted values as text by default.
- Avoid building HTML strings from user input.
- Avoid evaluating strings as code.
- Validate URL protocols and destinations before using untrusted values in links or redirects.
- Keep dependencies patched and use a Content Security Policy (CSP) as defense in depth.

**Important distinction:** HTML escaping is not a general-purpose sanitizer for URLs, CSS, SQL, or JavaScript. Each context has different rules, and server-side security remains essential.

## 3. What is `dangerouslySetInnerHTML`, and when is it safe?

**Interview answer:** `dangerouslySetInnerHTML` tells React to insert an HTML string directly into the DOM. It bypasses the normal text-escaping behavior, so passing untrusted content can create an XSS vulnerability. Use it only when HTML rendering is genuinely required and the input is trusted or sanitized with a well-maintained, allowlist-based HTML sanitizer.

Unsafe example — do not do this with untrusted data:

```jsx
function UnsafePreview({ htmlFromUser }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlFromUser }} />;
}
```

Safer pattern with an HTML sanitizer such as DOMPurify:

```jsx
import DOMPurify from "dompurify";

function RichTextPreview({ htmlFromUser }) {
  const cleanHtml = DOMPurify.sanitize(htmlFromUser);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
```

Security considerations:
- Keep the sanitizer updated.
- Configure allowed tags and attributes according to product needs.
- Do not assume a regex is a safe HTML sanitizer.
- Avoid allowing arbitrary event-handler attributes, dangerous URL schemes, or unneeded embedded content.
- Consider sanitizing at the appropriate trust boundary and re-sanitizing if the content or allowed policy changes.
- Use CSP and other defense-in-depth controls.

**Senior point:** The safest option is not to interpret untrusted input as HTML. If rich text is a business requirement, define an explicit content policy and test the sanitizer configuration against malicious payloads.

## 4. What is CSRF, and how do you protect against it?

**Interview answer:** Cross-site request forgery (CSRF) tricks a browser that is authenticated to a site into sending an unwanted request to that site. It is especially relevant when browsers automatically attach credentials, such as session cookies. XSS and CSRF are different: XSS runs attacker-controlled script in the trusted origin; CSRF abuses the browser's authenticated request behavior.

Common defenses, selected based on the authentication design:
- Set session cookies with `Secure` and `HttpOnly`; choose an appropriate `SameSite` policy.
- Use anti-CSRF tokens for state-changing requests when required by the framework and cookie/authentication model.
- Validate `Origin` and, where appropriate, `Referer` on the server.
- Use correct CORS policy, but do not treat CORS alone as a general CSRF defense.
- Require non-GET methods for state-changing operations; GET should be safe and not mutate server state.
- Re-authenticate or require confirmation for high-risk actions where appropriate.

Conceptual request example:

```js
async function updateProfile(profile, csrfToken) {
  const response = await fetch("/api/profile", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) throw new Error("Profile update failed");
  return response.json();
}
```

The server must validate the token and the request origin according to the chosen design. The token must be obtained and stored in a way appropriate to the application's architecture; adding a header in frontend code without server verification provides no protection.

**Senior point:** `SameSite` is valuable defense in depth, but its suitability depends on cross-site login, embedded flows, subdomains, and browser behavior. Coordinate frontend and backend defenses instead of assuming one cookie flag solves every CSRF risk.

## 5. Where should authentication tokens be stored?

**Interview answer:** There is no storage option that is always best for every architecture. A common browser-app pattern is a server-managed session or refresh/session cookie marked `HttpOnly`, `Secure`, and with an appropriate `SameSite` setting. `HttpOnly` prevents JavaScript from reading the cookie, which reduces token theft through some XSS paths, but it does not stop injected script from making authenticated requests while it runs in the page.

| Storage option | Advantages | Risks / trade-offs |
|---|---|---|
| `localStorage` | Easy to use; persists across tabs and reloads | JavaScript can read it, so XSS can steal stored tokens |
| `sessionStorage` | Usually scoped to a tab session | JavaScript can read it; not an XSS defense |
| In-memory state | Not persisted after page reload in a typical app | Still accessible to running injected JavaScript; refresh/session design needed |
| `HttpOnly` cookie | JavaScript cannot read its contents | Browser may attach it automatically, so CSRF defenses and cookie settings matter |

Good practices:
- Prefer a well-designed server session or a backend-for-frontend (BFF) pattern where suitable.
- Never place secrets or long-lived credentials in source code or frontend environment variables.
- Keep access-token lifetimes and refresh flows appropriate to the threat model.
- Avoid putting tokens in URLs, where they may leak through history, logs, screenshots, or referrers.
- Protect against XSS even if tokens are in `HttpOnly` cookies.
- Apply server-side authorization on every protected operation.

**Senior point:** `HttpOnly` cookies reduce direct JavaScript access to a token; they do not make XSS harmless. `localStorage` can be a deliberate choice in some architectures, but the XSS exposure should be understood and mitigated.

## 6. Are frontend environment variables secure?

**Interview answer:** No frontend environment variable should be assumed secret. Values substituted into a browser bundle can be inspected by users, even if they originate from a `.env` file. Build tools often require a public prefix—such as `VITE_` in Vite or `NEXT_PUBLIC_` in Next.js—to expose a value to client-side code. Those prefixes mean “available to the client,” not “protected.”

Example:

```env
# Public client configuration — okay if intended for browser exposure
VITE_API_BASE_URL=https://api.example.com

# Secret — never expose through a client-side variable
DATABASE_PASSWORD=do-not-put-this-in-client-bundle
```

Client usage:

```js
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

Good practices:
- Keep database passwords, private API keys, signing keys, and server credentials on the server.
- Use server-side environment variables or a secrets manager for confidential values.
- Commit a `.env.example` with placeholders, not real secrets.
- Add local `.env` files to `.gitignore` where appropriate.
- Rotate any secret that was accidentally committed or exposed; deleting the line later does not remove it from Git history or caches.
- Restrict public configuration to values that are safe for anyone to see.

**Senior point:** Obfuscation, minification, and a private repository do not make a client-bundled secret safe. If the browser must call a service using a private credential, route the operation through a controlled backend.

## 7. How should you implement role-based UI rendering?

**Interview answer:** Role-based UI rendering means showing or hiding controls based on the user's permissions—for example, hiding an “Manage users” button from users without that capability. This is a usability feature, not the security enforcement point. The backend must independently verify permission before returning sensitive data or performing the action.

Simple UI example:

```jsx
function DeleteProjectButton({ project, permissions, onDelete }) {
  if (!permissions.includes("project:delete")) {
    return null;
  }

  return (
    <button onClick={() => onDelete(project.id)}>
      Delete project
    </button>
  );
}
```

For larger apps, a permission helper keeps checks consistent:

```js
export function can(user, permission) {
  return Boolean(user?.permissions?.includes(permission));
}
```

```jsx
function ProjectActions({ user, project, onDelete }) {
  return (
    <div>
      {can(user, "project:delete") && (
        <button onClick={() => onDelete(project.id)}>Delete</button>
      )}
      {can(user, "project:edit") && (
        <a href={`/projects/${project.id}/edit`}>Edit</a>
      )}
    </div>
  );
}
```

**Senior points:**
- Prefer explicit permissions/capabilities for complex products; roles often map to a set of permissions.
- Avoid scattering hard-coded role-name checks across the UI.
- Handle permissions still loading and denied states deliberately.
- Do not trust a role or permission value supplied by an untrusted client.
- The server must enforce access control on every request, including direct API calls.
- Do not return sensitive data to the browser merely because the UI hides it.

## Quick revision — memory card

- **XSS:** Untrusted input becomes executable content in the trusted site.
- **React escaping:** Normal JSX text is escaped; unsafe HTML/DOM sinks can bypass it.
- **`dangerouslySetInnerHTML`:** Use only with trusted or correctly sanitized HTML.
- **CSRF:** Browser-sent credentials can authorize forged requests; use appropriate cookies, tokens, and server checks.
- **Token storage:** Choose based on threat model; `HttpOnly` cookies reduce JavaScript token access but require CSRF consideration.
- **Environment variables:** Client-bundled values are public; keep secrets on the server.
- **Role-based UI:** Improves UX; backend authorization is the actual security boundary.

## Strong senior-level closing answer

“I treat React security as defense in depth. I render untrusted data as text, sanitize HTML only when rich text is required, and avoid unsafe DOM sinks. For authentication, I choose cookie or token storage based on the architecture and explicitly address both XSS and CSRF. I keep secrets on the server because client environment variables are public, and I use permission checks to shape the UI while enforcing authorization independently on every backend request.”

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

# React Build Tools, Tooling & Architecture — Senior Interview Guide

Senior-level interview preparation for React engineers covering build tools, bundling, code quality, CI/CD, monorepos, and micro-frontends. Examples use modern JavaScript/TypeScript and React.

---

## 1. CRA vs Vite vs Next.js

### What is the difference?

- **Create React App (CRA):** Historically a zero-configuration way to bootstrap a client-rendered React SPA. It is now deprecated for new applications and is generally a maintenance/legacy choice.
- **Vite:** A development server and build tool. It serves source modules during development using native browser ESM where possible, then produces optimized production bundles using its build pipeline.
- **Next.js:** A React framework, not just a bundler. It provides routing, server rendering, static generation, server components, server-side capabilities, caching conventions, and deployment integrations.

| Area | CRA | Vite | Next.js |
|---|---|---|---|
| Main purpose | Bootstrap a client SPA | Fast development and production build tooling | Full-stack React framework |
| Development | Historically Webpack-based | Native ESM-based dev server with fast transforms | Framework-managed dev server |
| Routing | Add a router library | Add a router library | Built-in file-system routing |
| Rendering | Primarily client-side | Depends on the app architecture | CSR, SSR, SSG, and React Server Components depending on route/config |
| Backend features | No built-in server framework | No built-in app server framework | Route handlers/server-side features |
| Best fit | Existing legacy apps | SPAs, dashboards, libraries | SEO-sensitive sites and full-stack web apps |

### When would you choose each?

- Choose **Vite** for a new client-rendered dashboard or internal application where a separate API already exists.
- Choose **Next.js** when SEO, server rendering, routing conventions, or server-side data access are important.
- Maintain **CRA** when working on an existing app, but evaluate a migration rather than starting a new project with it.

### Vite example

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
npm run build
npm run preview
```

### Senior-level trade-offs

Do not compare these as if they were identical products: CRA and Vite primarily solve project/build-tool setup, while Next.js provides an application framework and rendering model. A migration from CRA to Vite may be relatively focused on build configuration; moving to Next.js can also change routing, data loading, rendering, and deployment architecture.

**Interview answer:** “For a new SPA I would usually choose Vite for fast feedback and a simple toolchain. For pages needing SEO or server rendering, I would evaluate Next.js. CRA is mainly a legacy option because it is deprecated for new projects.”

---

## 2. Webpack Basics

Webpack is a module bundler. It starts from one or more entry points, follows imports, builds a dependency graph, and emits assets such as JavaScript, CSS, and images.

### Core concepts

- **Entry:** Where bundling starts.
- **Output:** Where generated bundles are written.
- **Loaders:** Transform files that Webpack does not understand natively in the desired form, such as TypeScript, JSX, or CSS.
- **Plugins:** Extend the build lifecycle, for example generating HTML or defining build-time constants.
- **Mode:** Enables development or production defaults.
- **Code splitting:** Produces separate chunks that can be loaded when needed.
- **Dev server:** Serves the app during development and can provide hot updates.

### Minimal illustrative configuration

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

This is an illustrative starting point; a real TypeScript project also needs suitable Babel/TypeScript configuration and dependencies.

### Loaders vs plugins

- A **loader** transforms an individual module as it enters the module graph.
- A **plugin** can hook into and change broader compilation/build behavior.

### Why use code splitting?

```tsx
import { lazy, Suspense } from "react";

const ReportsPage = lazy(() => import("./ReportsPage"));

export function App() {
  return (
    <Suspense fallback={<p>Loading reports…</p>}>
      <ReportsPage />
    </Suspense>
  );
}
```

The dynamic import gives the bundler a split point. React renders the component when the chunk is available.

**Interview answer:** “Webpack constructs a dependency graph from entry points and transforms modules with loaders. Plugins extend the compilation process. I use splitting and content hashes to reduce initial downloads and improve cache reuse.”

---

## 3. Babel's Role

Babel is a JavaScript compiler/transformation tool. It can transform modern JavaScript syntax and JSX into syntax supported by the target environments, and it supports plugins and presets.

Babel does **not** itself provide the complete application bundling pipeline. A bundler such as Webpack or a toolchain such as Vite coordinates modules and assets; Babel may be one of the transforms used in that pipeline.

### Typical responsibilities

- Transform JSX into JavaScript.
- Transform selected modern syntax for target browsers.
- Apply project-specific syntax transforms and plugins.
- Support development tooling, such as certain fast-refresh integrations.

Babel does not automatically polyfill every missing browser API. Syntax transforms and runtime API polyfills are different concerns.

### Example Babel configuration

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": "defaults" }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

TypeScript preset removes TypeScript syntax; it does not replace the TypeScript compiler's full type-checking. Run `tsc --noEmit` separately when you want type checking.

### Babel vs TypeScript

- **Babel:** Fast syntax transformation; does not type-check TypeScript.
- **TypeScript (`tsc`):** Type checking and TypeScript compilation options.
- Many projects use Babel or a bundler transform for output and `tsc --noEmit` for type checking.

**Interview answer:** “Babel transforms JSX and modern JavaScript syntax for the configured targets. It is not a bundler and does not type-check TypeScript. In a React TypeScript pipeline, I keep transformation and type checking as distinct build steps.”

---

## 4. Tree Shaking

Tree shaking removes unused exports from the production dependency graph. It works best with static ES module imports/exports and correct package side-effect metadata.

### Example

```js
// math.ts
export function add(a: number, b: number) {
  return a + b;
}

export function expensiveChartCalculation() {
  // large implementation
}
```

```ts
// app.ts
import { add } from "./math";

console.log(add(2, 3));
```

A production bundler may omit `expensiveChartCalculation` if it can prove it is unused and safe to remove.

### What helps tree shaking?

1. Use ES modules (`import`/`export`) where possible.
2. Build in production mode.
3. Avoid unnecessary side effects at module top level.
4. Declare package side-effect behavior accurately.
5. Inspect generated bundles rather than assuming code was removed.

Example package metadata:

```json
{
  "sideEffects": ["**/*.css"]
}
```

Only use this if it accurately describes the package. Marking a module as side-effect-free when it performs required registration or global setup can break the application.

### Common limitations

- CommonJS modules can be harder to analyze statically.
- Dynamic patterns can prevent precise analysis.
- CSS and registration side effects need correct handling.
- A function can remain because it is referenced indirectly or because the bundler cannot prove removal is safe.

Tree shaking is different from minification: tree shaking removes unused code; minification compresses/rewrites retained code.

**Interview answer:** “Tree shaking is static dead-code elimination, most effective with ES modules. I verify it in production bundle analysis and treat `sideEffects` as correctness metadata, not just a size trick.”

---

## 5. Environment-Based Builds

Environment-based builds let an application use different public configuration for local development, testing, staging, and production.

Typical values include API base URLs, feature flags, analytics IDs, and public client configuration.

### Vite example

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000
```

```env
# .env.production
VITE_API_BASE_URL=https://api.example.com
```

```ts
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

Vite exposes client variables with the `VITE_` prefix. Other build systems use different conventions, such as `NEXT_PUBLIC_` in Next.js for values intended to be exposed to browser code.

### Important security rule

**Anything bundled into browser JavaScript must be treated as public.** Never put database passwords, private API keys, signing secrets, or privileged credentials in client-side environment variables.

For secrets, use server-side environment configuration or a secrets manager.

### Build commands

```bash
npm run build
```

For Vite, a mode can be selected with `--mode`, for example:

```bash
vite build --mode staging
```

Use the exact command supported by your project's scripts and configuration.

### Good practices

- Validate required variables during build/startup.
- Keep `.env` files containing secrets out of source control.
- Commit a safe `.env.example`.
- Separate build-time public config from runtime server-side secrets.
- Prefer immutable, traceable build artifacts where the deployment model allows runtime configuration to be injected separately.

**Interview answer:** “I separate environment-specific public configuration from secrets. Browser variables are visible to users, so private credentials stay server-side. I validate required configuration and make the active environment explicit in the pipeline.”

---

## 6. CI/CD Pipelines

- **Continuous Integration (CI):** Automatically checks changes by installing dependencies, linting, type-checking, testing, and building.
- **Continuous Delivery:** Keeps software releasable and may require a human approval to deploy.
- **Continuous Deployment:** Automatically deploys every change that passes the required checks.

### Typical React pipeline

```text
Pull request
   ↓
Install dependencies (lockfile-based)
   ↓
Lint + format check + TypeScript check
   ↓
Unit / component tests
   ↓
Production build
   ↓
Optional E2E tests and security checks
   ↓
Merge / approval
   ↓
Deploy immutable artifact
   ↓
Smoke tests + monitoring
```

### Example GitHub Actions workflow

```yaml
name: React CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint --if-present
      - run: npx tsc --noEmit
      - run: npm test -- --run
      - run: npm run build
```

Adapt the test command to the project's test runner. For example, Jest and Vitest may use different flags.

### Why might CI and CD run in parallel?

If independent jobs are configured without `needs`, the workflow runner can start them at the same time. Deployment should depend on validation and build jobs, for example:

```yaml
deploy:
  needs: validate
  runs-on: ubuntu-latest
  steps:
    - run: echo "Deploy the validated artifact here"
```

### Senior-level considerations

- Cache dependencies carefully; do not cache generated artifacts blindly.
- Use a lockfile and deterministic dependency installation.
- Keep secrets in the CI platform's secret store.
- Use environment approvals and least-privilege deployment permissions.
- Add rollback strategy, smoke tests, observability, and artifact provenance.
- Avoid building separately for each deployment environment if that undermines artifact promotion; choose a configuration model that suits the platform.

**Interview answer:** “My CI gate runs linting, type checks, tests, and a production build. Deployment depends on successful validation, uses controlled credentials and approvals where needed, and is followed by smoke tests and monitoring.”

---

## 7. Bundle Size Optimization

A smaller initial JavaScript payload can improve startup and interaction, especially on slower devices and networks. Optimize measured bottlenecks rather than minifying blindly.

### Practical techniques

1. Analyze the production bundle to identify large dependencies.
2. Split routes and expensive features with dynamic imports.
3. Import only the functions/components needed from libraries.
4. Replace oversized dependencies when a smaller, maintainable alternative exists.
5. Remove dead code and confirm tree shaking works.
6. Lazy-load non-critical images and components.
7. Avoid shipping development-only code in production.
8. Compress assets with Brotli or gzip at the hosting/CDN layer.
9. Use long-lived caching for content-hashed assets.
10. Track bundle-size budgets in CI.

### Route-level splitting

```tsx
import { lazy, Suspense } from "react";

const AdminPage = lazy(() => import("./pages/AdminPage"));

export function Routes() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <AdminPage />
    </Suspense>
  );
}
```

### Measure before and after

Consider:
- Initial JavaScript bytes (compressed and uncompressed).
- Largest Contentful Paint (LCP).
- Interaction to Next Paint (INP).
- Time to interactive-like user-perceived readiness.
- Chunk request count and cache hit rate.
- Performance on representative low-end devices.

Do not split every tiny module: excessive chunks can increase request overhead and complexity. The right balance depends on the app, bundler, browser support, and hosting.

**Interview answer:** “I profile production output first, reduce the initial route payload with code splitting and dependency cleanup, and validate the impact with real performance metrics and bundle budgets.”

---

## 8. ESLint & Prettier

- **ESLint** identifies code-quality problems and enforces configurable rules. With suitable plugins, it can flag React Hooks misuse, accessibility issues, and common bugs.
- **Prettier** formats code consistently. It intentionally offers fewer stylistic choices.

They complement each other: linting is not the same as formatting.

### Example scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit"
  }
}
```

Adjust file globs and scripts to your repository and tool versions.

### Recommended workflow

- Run lint and formatting checks in CI.
- Use editor integrations for fast feedback.
- Keep rules consistent across developers.
- Avoid disabling rules globally to silence isolated errors.
- Use React Hooks lint rules to catch dependency mistakes.
- Separate formatting-only changes from functional changes when practical.

### Should Prettier and ESLint overlap?

Keep Prettier responsible for formatting and ESLint responsible for correctness and code-quality rules. A compatible configuration can disable conflicting stylistic lint rules.

**Interview answer:** “Prettier removes formatting debates; ESLint catches bugs and enforces code-quality rules. I run both locally and in CI so code style and correctness do not depend on individual editor settings.”

---

## 9. Monorepo Setup

A monorepo stores multiple related packages or applications in one repository. It can make shared code, coordinated changes, and dependency management easier, but it requires clear boundaries and reliable tooling.

### Example structure

```text
repo/
├── apps/
│   ├── web/
│   └── admin/
├── packages/
│   ├── ui/
│   ├── config-eslint/
│   └── shared-types/
├── package.json
└── package-lock.json
```

### npm workspaces example

Root `package.json`:

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present"
  }
}
```

A shared package can be consumed by an app through its package name, provided its `package.json`, exports, and build setup are configured correctly.

### Benefits

- Share UI components, types, and lint configuration.
- Make cross-package changes in one reviewed commit.
- Reuse tooling and standardize versions.
- Enable task caching and affected-project checks with tools such as Nx or Turborepo.

### Challenges and mitigations

- **Accidental coupling:** Define package APIs and ownership boundaries.
- **Slow CI:** Run only affected tasks and cache reproducible outputs.
- **Dependency confusion:** Keep workspace dependencies explicit and avoid relying on undeclared hoisted packages.
- **Release complexity:** Decide whether packages version independently or are released together.
- **Large repo permissions:** Apply ownership rules and checks.

A monorepo is a repository strategy, not the same thing as a monolith at runtime. Apps in one repository can still be deployed independently.

**Interview answer:** “I use a monorepo when applications genuinely share code or need coordinated changes. I establish explicit package boundaries, workspace dependency declarations, affected-project CI, and task caching so the repository remains maintainable.”

---

## 10. Micro-Frontend Basics

Micro-frontends apply microservice-like decomposition to the frontend: independently owned parts of a user experience are developed and, in some designs, deployed separately.

Possible approaches include:
- **Build-time integration:** Packages are composed during the build.
- **Runtime integration:** Separately built applications are loaded into a shell at runtime.
- **Web Components / custom elements:** Framework-neutral integration boundaries.
- **Module Federation:** A runtime mechanism used by compatible bundler setups to expose and consume modules.

### Typical architecture

```text
                    Host / Shell
                 Routing + Layout
                  /      |      \
             Catalog   Checkout  Account
             team      team      team
```

The host commonly handles global navigation, authentication integration, layout, and cross-app navigation. Each micro-frontend owns a clearly defined business capability.

### When is it useful?

- Multiple teams need independent ownership and release cadence.
- Product areas have clear boundaries.
- A large frontend has organizational bottlenecks that cannot be solved adequately with a modular monolith.

### Costs and risks

- Duplicate dependencies increase download and memory cost.
- Shared React versions and singleton configuration can be delicate.
- Runtime loading introduces availability and version-compatibility risks.
- Cross-app state and navigation can become tightly coupled.
- Testing, local development, observability, accessibility, and design consistency require governance.
- Independent deployment does not automatically mean independent runtime failure.

### Design principles

1. Keep cross-app contracts small and versioned.
2. Prefer URL/navigation and explicit events over a giant shared global store.
3. Agree on authentication, design tokens, accessibility, telemetry, and error handling.
4. Define fallback behavior if a remote module fails.
5. Share dependencies only when version compatibility and the deployment model justify it.
6. Measure the operational overhead before splitting an existing modular frontend.

**Interview answer:** “Micro-frontends are most valuable when organizational autonomy and independent delivery justify the extra runtime and governance complexity. I first enforce modular boundaries in a single frontend; I introduce runtime federation only when there is a clear need.”

---

# Quick Revision Card

| Topic | One-line memory cue |
|---|---|
| CRA vs Vite vs Next.js | CRA is legacy; Vite is build tooling; Next.js is a React framework |
| Webpack | Entry → dependency graph → loaders/plugins → output |
| Babel | Transforms syntax; does not bundle or type-check TypeScript |
| Tree shaking | Removes unused exports when statically provable |
| Environment builds | Public browser config is not secret |
| CI/CD | Validate first; deploy only after required checks pass |
| Bundle optimization | Measure first, split critical routes, track real metrics |
| ESLint / Prettier | Code quality vs consistent formatting |
| Monorepo | Shared repository, explicit package boundaries |
| Micro-frontends | Independent frontend capabilities with added integration cost |

## Strong closing answer for a senior interview

“I choose tooling based on the product's rendering needs, team structure, and operational constraints rather than popularity. I keep the build reproducible, type-check and lint in CI, analyze production bundles before optimizing, and treat environment configuration and deployment permissions as security concerns. For architecture, I start with clear modules and introduce monorepos or micro-frontends only when the benefits outweigh their coordination and runtime costs.”
---

## 1️⃣3️⃣ SSR, SSG & Modern React

1. CSR vs SSR vs SSG
2. Hydration
3. SEO challenges
4. When SSR is needed
5. React Server Components
6. Streaming SSR
7. UI caching strategies

# React Rendering, SSR & Caching — Senior Interview Guide

Senior-level React interview preparation covering rendering models, hydration, SEO, React Server Components, streaming, and UI caching. Examples use modern React concepts; exact APIs and behavior depend on the framework and version.

---

## 1. CSR vs SSR vs SSG

These terms describe where and when HTML is produced.

### Client-Side Rendering (CSR)

The server usually returns a minimal HTML document plus JavaScript. The browser downloads JavaScript, executes React, fetches required data, and renders the UI.

**Advantages**
- Rich client-side interactions after startup.
- A straightforward fit for authenticated dashboards and internal tools.
- Can reduce repeated full-page server rendering after the app has loaded.

**Trade-offs**
- Initial content may be delayed until JavaScript executes.
- Search crawlers and social preview systems may not always see the intended content immediately.
- Large JavaScript bundles can slow startup on low-end devices.

### Server-Side Rendering (SSR)

The server generates HTML for a request, often using request-specific data. The browser can display that HTML before React hydrates it for interaction.

**Advantages**
- Useful for request-specific pages and faster initial content visibility.
- Can support SEO and social previews when HTML contains the relevant content.
- Can keep certain data access on the server.

**Trade-offs**
- Requires server compute and a caching strategy.
- Server rendering and hydration must agree on the initial output.
- Data fetching and rendering latency can affect time to first byte.

### Static Site Generation (SSG)

HTML is generated ahead of time during a build or static-generation process, then served from a CDN or static host.

**Advantages**
- Fast delivery and easy CDN caching.
- Low request-time compute requirements.
- Strong fit for documentation, marketing pages, and relatively stable content.

**Trade-offs**
- Content can become stale until regeneration or redeployment.
- Highly personalized pages need a separate runtime strategy.
- Large sites may need incremental generation or on-demand regeneration.

### Comparison

| Dimension | CSR | SSR | SSG |
|---|---|---|---|
| HTML creation | Mostly in browser | Per request or server render | Ahead of time |
| Initial content | Depends on JS and data loading | Can arrive in initial HTML | Can arrive in initial HTML |
| Personalization | Client-side or API-driven | Can use request context | Usually limited at build time |
| Request-time compute | Usually API calls, not page HTML | Typically required | Usually not required for the page |
| Cacheability | Static assets/API responses | Depends on response and data | Excellent for static output |
| Typical fit | Internal apps, rich tools | Dynamic public pages | Docs, blogs, landing pages |

### Important nuance

Many production applications mix strategies by route or even by component. “SSR is faster” is not universally true: server work, network latency, JavaScript cost, cache behavior, and page complexity all matter.

**Interview answer:** “I choose rendering per route and data freshness requirement. CSR suits authenticated interactive tools, SSR suits dynamic request-specific pages, and SSG suits content that can be generated ahead of time and cached globally.”

---

## 2. Hydration

Hydration is the process where React attaches client-side behavior to HTML that was already rendered on the server. The server HTML can be visible before hydration completes, but event handling and interactive state need the client runtime.

### Typical lifecycle

```text
Request
  ↓
Server renders HTML
  ↓
Browser displays HTML
  ↓
JavaScript downloads and executes
  ↓
React hydrates the existing HTML
  ↓
User interactions work
```

In React, `hydrateRoot` is used to hydrate server-rendered markup:

```tsx
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document.getElementById("root")!, <App />);
```

This is a conceptual example; a framework such as Next.js usually manages hydration for you.

### What is a hydration mismatch?

A mismatch occurs when the server-generated markup differs from what React expects during the initial client render. Examples include:
- Rendering `new Date()` or random values independently on server and client.
- Reading `window`, `localStorage`, or viewport size during the initial render.
- Different locale/time-zone formatting between environments.
- Invalid HTML nesting that the browser normalizes.
- Data changing between server render and client hydration.

### How to prevent mismatches

- Make the initial render deterministic.
- Pass the server-fetched initial data to the client.
- Move browser-only reads into an effect when appropriate.
- Avoid random or time-dependent output in render unless the value is shared.
- Fix invalid HTML nesting rather than suppressing warnings.
- Use framework-supported client-only boundaries for genuinely browser-only widgets.

Example:

```tsx
import { useEffect, useState } from "react";

export function ThemeLabel() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  return <span>Theme: {theme}</span>;
}
```

The initial output is deterministic. After hydration, the effect reads browser storage. Consider whether showing a temporary default is acceptable for the product.

**Interview answer:** “Hydration makes server-rendered HTML interactive. I prevent mismatches by keeping the initial server and client render deterministic, sharing initial data, and isolating browser-only logic instead of reading browser state during render.”

---

## 3. SEO Challenges in React

SEO is not simply a matter of adding meta tags. Search engines and link-preview crawlers need to receive meaningful, indexable content and accurate page metadata.

### Common challenges

1. **Empty or minimal HTML:** A CSR page may initially return little content before JavaScript executes.
2. **Metadata timing:** Title, description, canonical URL, and Open Graph tags must be correct for each route.
3. **Client-side navigation:** URL changes and route metadata must remain synchronized.
4. **Crawlability:** Internal links should use real, discoverable URLs; important content should not depend on inaccessible interactions.
5. **Duplicate URLs:** Query parameters, trailing slashes, and alternate routes can create duplicate content.
6. **Performance:** Poor Core Web Vitals can harm user experience and may affect search performance.
7. **Structured data:** JSON-LD and other structured data must match visible, accurate page content.
8. **Authentication and indexing controls:** Private pages should not be indexed; robots directives must be configured correctly.

### Practical checklist

- Return meaningful HTML for important public pages using SSR or SSG where appropriate.
- Set unique titles, descriptions, canonical URLs, and social metadata.
- Provide a sitemap and sensible robots rules.
- Use semantic HTML, descriptive links, headings, and accessible content.
- Return correct HTTP status codes, including real 404 responses for missing pages.
- Avoid relying solely on client-side event handlers for navigation.
- Test rendered HTML and URL behavior, not just what appears after a local browser app runs.

### When CSR is still fine

An internal dashboard behind authentication usually does not need public SEO. In that case, usability, accessibility, performance, and security may matter more than search indexing.

**Interview answer:** “I start by deciding which routes need to be discoverable. Public content pages often benefit from SSR or SSG, correct metadata, canonical URLs, and server-level status codes. Private dashboard routes usually do not need to be indexed.”

---

## 4. When Is SSR Needed?

SSR is valuable when the server needs to generate the initial page using request-specific context or current data.

### Good candidates

- Product pages where current price, inventory, and metadata matter.
- Public profile or listing pages with frequently changing data.
- Pages where initial HTML visibility and share previews are important.
- Request-specific content that cannot be generated once at build time.
- Pages where sensitive data access must remain on the server, while ensuring proper authorization.

### SSR may not be necessary when

- The app is an internal tool behind authentication.
- SEO is irrelevant and the page is highly interactive.
- Content changes infrequently and can be pre-generated.
- The operational cost of a rendering server outweighs the benefit.

### SSR decision questions

1. Does the page need to be indexed?
2. Must the initial HTML include request-specific data?
3. How fresh must the content be?
4. Can the result be cached safely?
5. What are the latency, compute, and operational costs?
6. Would SSG, incremental regeneration, or CSR satisfy the requirement?

### SSR is not a security boundary by itself

Server-rendering a page does not automatically protect data. The server must authorize every request and avoid serializing private data into HTML or client payloads.

**Interview answer:** “I choose SSR when initial HTML needs dynamic request-time data, but I evaluate caching and SSG first. SSR adds server latency and complexity, so I do not enable it just because a page uses React.”

---

## 5. React Server Components (RSC)

React Server Components are components that render on the server and are not shipped to the browser as client component JavaScript in the same way as ordinary client components. They can reduce client bundle size and allow server-side data access within supported frameworks.

RSC are distinct from SSR:
- **SSR** describes generating HTML on the server.
- **RSC** describes a component model and server/client boundary.
- An application can use Server Components and still use SSR to deliver initial HTML.

### Server vs Client Components

In a framework that supports RSC, a Server Component can fetch data on the server and render markup. A Client Component is used when the UI needs browser interactivity, state, effects, or event handlers.

Example using Next.js App Router conventions:

```tsx
// app/products/page.tsx — Server Component by default
import AddToCartButton from "./AddToCartButton";

export default async function ProductsPage() {
  const response = await fetch("https://api.example.com/products");
  if (!response.ok) throw new Error("Failed to load products");

  const products = await response.json();

  return (
    <main>
      <h1>Products</h1>
      {products.map((product: { id: string; name: string }) => (
        <article key={product.id}>
          <h2>{product.name}</h2>
          <AddToCartButton productId={product.id} />
        </article>
      ))}
    </main>
  );
}
```

```tsx
// app/products/AddToCartButton.tsx
"use client";

import { useState } from "react";

export default function AddToCartButton({
  productId,
}: {
  productId: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? "Added" : `Add product ${productId}`}
    </button>
  );
}
```

This illustrates the boundary. In a real application, validate API data and implement actual cart behavior on the server or through a secure API.

### Important constraints

- Server Components cannot use client-only hooks such as `useState` or `useEffect`.
- Event handlers belong in Client Components.
- Props crossing the server/client boundary must be serializable according to the framework's supported rules.
- Do not pass secrets or privileged server-only objects to client code.
- A `"use client"` boundary can pull imported modules into the client bundle, so place it as low in the component tree as practical.
- RSC require a supporting framework/build pipeline; they are not simply a replacement for `useEffect` or a universal feature that can be enabled in any React setup.

### Benefits and trade-offs

**Benefits:** Less client JavaScript for server-only UI, server-side data access, and clearer separation of server and interactive responsibilities.

**Trade-offs:** More complex debugging and caching, explicit server/client boundaries, serialization constraints, and framework-specific deployment requirements.

**Interview answer:** “Server Components let me keep data access and non-interactive rendering on the server while sending client JavaScript only for interactive boundaries. SSR generates HTML; RSC is a component architecture, and modern frameworks can combine them.”

---

## 6. Streaming SSR

Traditional SSR often waits until the full page is rendered before sending the HTML. Streaming SSR can send the shell and completed parts incrementally, allowing the browser to start displaying useful content while slower sections are still loading.

React provides streaming server APIs such as `renderToPipeableStream` for Node.js streams and `renderToReadableStream` for Web Streams environments. Frameworks often wrap these details.

### Conceptual flow

```text
Request
  ↓
Render shell
  ↓
Send shell HTML
  ↓
Stream completed sections as they become ready
  ↓
Browser progressively displays content
  ↓
Client JavaScript hydrates interactive boundaries
```

With Suspense, a slow component can be separated from the shell:

```tsx
import { Suspense } from "react";
import Recommendations from "./Recommendations";

export default function ProductPage() {
  return (
    <main>
      <h1>Product details</h1>

      <Suspense fallback={<p>Loading recommendations…</p>}>
        <Recommendations />
      </Suspense>
    </main>
  );
}
```

The framework's server rendering setup determines whether and how this boundary streams. This component example alone does not configure a streaming server.

### Benefits

- Earlier delivery of the page shell.
- Better perceived responsiveness when some sections are slow.
- Can avoid making the whole page wait for the slowest data dependency.

### Challenges

- Error handling and fallback states need design.
- Headers and status codes generally need to be decided before the response is committed.
- Streaming does not make slow data sources faster.
- Hydration and client bundle cost still matter.
- Reverse proxies, CDNs, and compression settings must preserve streaming behavior.
- A poorly designed shell may stream quickly but provide little meaningful content.

**Interview answer:** “Streaming SSR sends the shell and ready Suspense boundaries progressively instead of waiting for every part. I use it to improve perceived latency, while measuring meaningful content delivery and ensuring the infrastructure does not buffer the response.”

---

## 7. UI Caching Strategies

Caching reduces repeated work, but the correct strategy depends on data freshness, personalization, and invalidation requirements. “Cache the page” is not specific enough: HTML, API data, static assets, and client-side query results have different lifetimes.

### Main caching layers

| Layer | What it caches | Common use | Main risk |
|---|---|---|---|
| Browser HTTP cache | JS, CSS, images, some responses | Reuse assets across visits | Stale assets if headers are wrong |
| CDN / edge cache | Static assets and cacheable responses | Global delivery | Incorrect cache key or shared private data |
| Server/data cache | Expensive query or API results | Reduce repeated backend work | Staleness and invalidation complexity |
| Framework route/output cache | Rendered HTML or route output | Reuse SSR/SSG output | Personalized output cached for the wrong user |
| Client query cache | API data in the browser | Avoid duplicate fetches and manage freshness | Stale UI or invalidation gaps |
| In-memory component state | Current UI values | Keep local interaction state | Not a durable/shared data cache |

### HTTP caching basics

For versioned static assets, a long-lived immutable policy is common:

```http
Cache-Control: public, max-age=31536000, immutable
```

This is suitable only when the URL changes whenever the content changes, such as with content-hashed filenames.

For sensitive or user-specific responses, consider:

```http
Cache-Control: private, no-store
```

The right directive depends on privacy and product needs. Do not publicly cache authenticated responses without a carefully designed cache key and authorization strategy.

### Client-side server-state caching

Libraries such as TanStack Query or RTK Query can cache API responses, deduplicate requests, track freshness, and invalidate data after mutations.

Conceptual RTK Query example:

```tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Product = { id: string; name: string };

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
```

This example shows tag-based invalidation. A real setup also needs the API reducer and middleware registered in the Redux store.

### Cache invalidation questions

- How fresh must the data be?
- Is the data public or user-specific?
- What events invalidate it: mutation, time-to-live, deploy, or external updates?
- Can stale data be shown temporarily?
- Does the cache key include every input that affects the result?
- What happens if invalidation fails or a request returns an error?

### Common patterns

- **Cache-first:** Read cache and use it when valid; good for stable data.
- **Network-first:** Prefer fresh network data, fall back to cache when appropriate.
- **Stale-while-revalidate:** Return a cached result quickly while refreshing in the background.
- **Time-based expiration (TTL):** Expire entries after a defined period.
- **Tag/event invalidation:** Mark related entries stale after mutations.
- **Immutable asset caching:** Cache versioned assets for a long time.

### Senior-level rule

Caching is a correctness and security decision, not just a speed optimization. Shared caches must never leak personalized content across users, and invalidation policy should be designed before the cache is introduced.

**Interview answer:** “I identify the layer first—browser, CDN, server render/data, or client query cache—then define cache keys, freshness, and invalidation. For personalized data I prevent cross-user cache leakage; for hashed assets I use long-lived immutable caching.”

---

# Quick Revision Card

| Topic | Memory cue |
|---|---|
| CSR / SSR / SSG | Browser / request time / build time |
| Hydration | React attaches behavior to server HTML |
| SEO | Crawlable content, unique metadata, canonical URLs, correct status codes |
| When SSR? | Dynamic request-time HTML when the benefit justifies server cost |
| Server Components | Server/client component boundary; not synonymous with SSR |
| Streaming SSR | Send shell and ready boundaries progressively |
| UI caching | Choose layer, key, freshness, and invalidation |

## Strong closing answer for a senior interview

“I treat rendering and caching as product-level architecture choices. I select CSR, SSR, or SSG based on SEO, personalization, freshness, and operational cost; keep hydration deterministic; and use Server Components or streaming only when the framework and measured user experience justify them. For caching, I explicitly define cache keys, lifetime, invalidation, and privacy boundaries so performance improvements do not create stale-data or data-leakage bugs.”
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

# React Architecture & Design Patterns — Senior Interview Guide

Senior-level interview preparation for React engineers covering inversion of control, dependency injection, event delegation, Observer and Pub-Sub patterns, feature toggles, config-driven UI, and multi-tenant UI architecture.

---

## 1. Inversion of Control (IoC)

### What is IoC?

Inversion of Control means a component does not control every detail of how its dependencies or behavior are created and executed. Some control is delegated to a framework, container, callback, or higher-level component.

Without IoC, a component may directly create and tightly couple itself to a concrete implementation. With IoC, the implementation or behavior is supplied from outside.

### React example: callback-based control

```tsx
type SaveButtonProps = {
  onSave: () => void;
};

export function SaveButton({ onSave }: SaveButtonProps) {
  return <button onClick={onSave}>Save</button>;
}
```

`SaveButton` does not decide whether saving calls an API, writes to local storage, or triggers a mock. The parent supplies the behavior.

```tsx
<SaveButton onSave={() => saveDocument(documentId)} />
```

### Other common examples

- React controls component rendering and lifecycle.
- A test runner calls test functions.
- A framework calls lifecycle hooks or route handlers.
- A plugin system calls registered extensions.
- A dependency container constructs and supplies services.

### Benefits and trade-offs

**Benefits:** Lower coupling, better testability, easier substitution, clearer contracts.

**Trade-offs:** Control flow can become harder to trace, and excessive abstraction can make a small app unnecessarily complex.

**Interview answer:** “IoC means a component delegates control of behavior or dependency creation to an external mechanism. In React, passing callbacks and composing components are simple forms of IoC; frameworks and plugin systems are broader examples.”

---

## 2. Dependency Injection (DI)

Dependency Injection is a technique for implementing IoC: a class or function receives the dependencies it needs instead of constructing them internally.

### Why is DI useful?

If a service creates its own HTTP client, database client, or logger, it is harder to replace that dependency in tests. Injecting the dependency makes the contract explicit and supports mocks, alternative implementations, and configuration.

### TypeScript example

```ts
type User = { id: string; name: string };

interface UserRepository {
  findById(id: string): Promise<User | null>;
}

class UserService {
  constructor(private readonly users: UserRepository) {}

  getUser(id: string) {
    return this.users.findById(id);
  }
}
```

Production implementation and test implementation can satisfy the same interface:

```ts
const productionService = new UserService(sqlUserRepository);

const testService = new UserService({
  findById: async (id) => ({ id, name: "Test User" }),
});
```

### DI in React

A simple approach is to inject dependencies through props or context:

```tsx
type UserApi = {
  getUser: (id: string) => Promise<{ id: string; name: string }>;
};

const UserApiContext = React.createContext<UserApi | null>(null);

export function UserApiProvider({
  api,
  children,
}: {
  api: UserApi;
  children: React.ReactNode;
}) {
  return (
    <UserApiContext.Provider value={api}>
      {children}
    </UserApiContext.Provider>
  );
}
```

A custom hook can read the dependency from context and throw a clear error if the provider is missing. In production code, import React types and hooks according to your project's setup.

### IoC vs DI

- **IoC:** The broader principle—control is delegated.
- **DI:** One concrete technique—dependencies are supplied from outside.
- DI does not require a library or container; constructor arguments, props, and context can all be enough.

**Interview answer:** “IoC is the principle, DI is one way to implement it. I use explicit interfaces and injected dependencies to isolate API clients and services, making production behavior configurable and tests deterministic.”

---

## 3. Event Delegation

Event delegation attaches one event handler to a shared ancestor instead of attaching a separate handler to every child. The handler identifies the originating element using event information.

In the DOM, it relies on event bubbling for many events. It can reduce handler setup and works well for dynamic lists, but it is not automatically faster in every React app.

### Vanilla JavaScript example

```html
<ul id="products">
  <li><button data-id="p1">Open product 1</button></li>
  <li><button data-id="p2">Open product 2</button></li>
</ul>

<script>
  document.getElementById("products").addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest("button[data-id]");
    if (!button) return;

    console.log("Selected product:", button.getAttribute("data-id"));
  });
</script>
```

### React example

React already provides a synthetic event system and normal JSX handlers are usually the right default. Delegation can still be useful for a large, dynamic table or a third-party DOM integration:

```tsx
type Product = { id: string; name: string };

export function ProductList({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (id: string) => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLUListElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest<HTMLButtonElement>("button[data-product-id]");
    if (!button || !event.currentTarget.contains(button)) return;

    const id = button.dataset.productId;
    if (id) onSelect(id);
  }

  return (
    <ul onClick={handleClick}>
      {products.map((product) => (
        <li key={product.id}>
          <button data-product-id={product.id}>{product.name}</button>
        </li>
      ))}
    </ul>
  );
}
```

### Things to watch

- `event.target` is the originating node; `event.currentTarget` is the element whose handler is running.
- Use `closest()` when clicks can originate from nested icons or spans.
- Check containment and validate IDs.
- Not all events bubble the same way.
- Do not add manual DOM handlers when ordinary React handlers are simpler and clearer.

**Interview answer:** “Event delegation uses bubbling so a parent handles events from many descendants. It is useful for dynamic DOM structures, but in React I use it selectively and preserve clear event boundaries and accessibility.”

---

## 4. Observer Pattern

The Observer pattern establishes a one-to-many relationship: a subject maintains observers and notifies them when its state changes. Observers subscribe directly to the subject.

### Example

```ts
type Listener<T> = (value: T) => void;

class ObservableValue<T> {
  private listeners = new Set<Listener<T>>();

  constructor(private value: T) {}

  get() {
    return this.value;
  }

  set(next: T) {
    this.value = next;
    for (const listener of this.listeners) listener(next);
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

const temperature = new ObservableValue(20);
const unsubscribe = temperature.subscribe((value) => {
  console.log("Temperature changed:", value);
});

temperature.set(21);
unsubscribe();
```

### Where it appears

- UI state subscriptions.
- DOM events.
- Store subscriptions.
- Reactive libraries and observable streams.
- Model-view patterns.

### React considerations

React state, context, and external-store integrations can all drive updates, but an arbitrary observable object is not automatically reactive to React. For a custom external store, use a supported integration such as `useSyncExternalStore` rather than assuming React will re-render when a class property changes.

### Benefits and risks

**Benefits:** Loose coupling between state producer and subscribers; observers can react to changes independently.

**Risks:** Forgotten unsubscriptions, notification loops, unexpected update ordering, and difficult debugging when many observers are involved.

**Interview answer:** “Observer uses a subject with direct subscriptions and notifications. It is useful when several consumers need to react to a state change; I make subscriptions disposable and use React-supported external-store integration when connecting it to React rendering.”

---

## 5. Pub-Sub Pattern

Publish-Subscribe (Pub-Sub) lets publishers emit messages to a topic or event channel, while subscribers receive messages for topics they care about. Publishers generally do not know the subscribers.

### Example event bus

```ts
type AppEvents = {
  "cart:item-added": { productId: string; quantity: number };
  "user:signed-out": { reason?: string };
};

type Handler<T> = (payload: T) => void;

class EventBus<Events extends Record<string, unknown>> {
  private handlers = new Map<keyof Events, Set<Handler<any>>>();

  subscribe<K extends keyof Events>(
    topic: K,
    handler: Handler<Events[K]>
  ) {
    const listeners = this.handlers.get(topic) ?? new Set();
    listeners.add(handler);
    this.handlers.set(topic, listeners);

    return () => {
      listeners.delete(handler);
      if (listeners.size === 0) this.handlers.delete(topic);
    };
  }

  publish<K extends keyof Events>(topic: K, payload: Events[K]) {
    this.handlers.get(topic)?.forEach((handler) => handler(payload));
  }
}

const events = new EventBus<AppEvents>();

const unsubscribe = events.subscribe("cart:item-added", (event) => {
  console.log(event.productId, event.quantity);
});

events.publish("cart:item-added", { productId: "p1", quantity: 2 });
unsubscribe();
```

This is an in-process example, not a durable distributed message broker. In production code, you may choose a library and tighten the internal handler typing.

### Observer vs Pub-Sub

| Aspect | Observer | Pub-Sub |
|---|---|---|
| Relationship | Subject knows its observers | Publisher is decoupled from subscribers through a channel/broker |
| Delivery | Usually direct notification | Usually topic/channel-based |
| Coupling | Subject and observer contract | Publisher and subscriber share an event contract/topic |
| Typical scope | In-process object/state changes | App-wide events or distributed messaging |

The terminology can overlap in real libraries, so explain the architecture rather than arguing only about labels.

### When to use Pub-Sub

Good for loosely coupled cross-feature notifications such as “cart updated” or “session expired.” Avoid using a global event bus as a replacement for all application state; hidden event flow can make dependencies and data consistency hard to reason about.

**Interview answer:** “Pub-Sub decouples publishers and subscribers through named topics. I use it for cross-cutting notifications, keep event payloads typed and versionable, and avoid using it for state that should be explicit in a store or component tree.”

---

## 6. Feature Toggles (Feature Flags)

A feature toggle lets a team enable or disable functionality without necessarily deploying a new code version. Toggles can support gradual rollouts, experiments, operational kill switches, and customer-specific capabilities.

### Simple React example

```tsx
type FeatureFlags = {
  newCheckout: boolean;
  redesignedDashboard: boolean;
};

export function CheckoutEntry({
  flags,
}: {
  flags: FeatureFlags;
}) {
  return flags.newCheckout
    ? <NewCheckout />
    : <LegacyCheckout />;
}
```

In a real app, flags may come from a server, remote feature-flag provider, or environment configuration. Handle loading and failure states deliberately.

### Common toggle types

- **Release toggle:** Hide incomplete features until launch.
- **Experiment toggle:** Compare variants for a defined experiment.
- **Operational toggle:** Disable an expensive or failing capability quickly.
- **Permission/capability toggle:** Show features for eligible plans or accounts. This must not replace backend authorization.

### Best practices

- Use a typed flag registry and documented ownership.
- Define a safe default if flag fetching fails.
- Evaluate user/tenant targeting consistently.
- Keep secrets out of client-side flag configuration.
- Log or measure exposure for experiments.
- Remove temporary flags when they are no longer needed.
- Test both enabled and disabled states.
- Enforce access control on the server/API regardless of what the UI displays.

### Feature flags vs permissions

A feature flag controls rollout or availability; authorization decides whether a user may perform an action. Hiding a button is not security. The server must validate permission for every protected operation.

**Interview answer:** “Feature flags let us release progressively and turn features off quickly. I type and document flags, define failure defaults, test both paths, and keep authorization enforced by the backend.”

---

## 7. Config-Driven UI

A config-driven UI renders components from structured configuration instead of hardcoding every layout decision in a component. It can support forms, dashboards, navigation, and tenant-specific branding.

### Example

```tsx
type FieldConfig =
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "select"; name: string; label: string; options: string[] };

const fields: FieldConfig[] = [
  { type: "text", name: "firstName", label: "First name", required: true },
  {
    type: "select",
    name: "department",
    label: "Department",
    options: ["Engineering", "Sales", "Operations"],
  },
];

export function DynamicFields() {
  return (
    <form>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <label key={field.name}>
                {field.label}
                <input name={field.name} required={field.required} />
              </label>
            );
          case "select":
            return (
              <label key={field.name}>
                {field.label}
                <select name={field.name} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            );
        }
      })}
    </form>
  );
}
```

### Benefits

- Add or rearrange supported fields without duplicating component logic.
- Reuse the same renderer for multiple products or tenants.
- Centralize layout rules and validation metadata.
- Support admin-configurable experiences when designed carefully.

### Risks and mitigations

- **Invalid configuration:** Validate against a schema at the API boundary.
- **Unsafe rendering:** Map known configuration types to trusted components; never evaluate arbitrary JavaScript from config.
- **Hard-to-debug UI:** Log config version and validation errors.
- **Over-generalization:** Keep complex business interactions in explicit components.
- **Accessibility gaps:** Ensure generated controls have labels, keyboard support, and semantic markup.
- **Version drift:** Version the config schema and provide migrations/defaults.

### Senior-level design

Use a discriminated union or schema to constrain supported UI components. Configuration should describe *what* to render, not contain arbitrary executable behavior. Treat server-provided config as untrusted input and validate it.

**Interview answer:** “Config-driven UI separates layout/content choices from rendering logic. I use a typed schema, a finite registry of approved components, validation, versioning, and explicit escape hatches for complex interactions.”

---

## 8. Multi-Tenant UI Design

A multi-tenant application serves multiple organizations or customers from a shared product. Tenants may have different branding, features, navigation, roles, data, or policy settings.

### Typical architecture

```text
Authenticated request
       ↓
Resolve tenant identity
       ↓
Load tenant settings and entitlements
       ↓
Load user permissions for that tenant
       ↓
Render approved navigation and UI
       ↓
Backend authorizes each data/API operation
```

### Tenant-specific UI configuration

A tenant settings model might include:

```ts
type TenantConfig = {
  tenantId: string;
  displayName: string;
  theme: {
    primaryColor: string;
    logoUrl?: string;
  };
  enabledFeatures: {
    analytics: boolean;
    advancedReports: boolean;
  };
};
```

The UI can use these settings to choose branding and show available navigation items. The server remains the authority for tenant membership, entitlements, and access control.

### Critical design concerns

1. **Tenant resolution:** Derive tenant context from a trusted authenticated session, verified domain mapping, or validated routing mechanism. Do not trust a client-supplied tenant ID without authorization.
2. **Data isolation:** Every API and database access must enforce tenant scope. UI filtering alone is not isolation.
3. **Authorization:** Validate both user permissions and tenant entitlements on the server.
4. **Configuration caching:** Include tenant identity and config version in cache keys where relevant; avoid cross-tenant cache leakage.
5. **Theming:** Use design tokens/CSS variables rather than scattering tenant-specific styles across components.
6. **Feature flags:** Keep rollout flags distinct from authorization policies.
7. **Testing:** Test cross-tenant access attempts, missing configuration, fallback themes, and tenant-specific feature combinations.
8. **Observability:** Include tenant context in logs and metrics without leaking sensitive data.
9. **Configuration lifecycle:** Validate, version, audit, and roll back tenant configuration changes.
10. **Performance:** Cache stable settings carefully and invalidate when tenant configuration changes.

### Example: theme tokens

```tsx
export function TenantShell({
  config,
  children,
}: {
  config: TenantConfig;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        "--tenant-primary": config.theme.primaryColor,
      } as React.CSSProperties}
    >
      <header>{config.displayName}</header>
      {children}
    </div>
  );
}
```

CSS:

```css
.primary-action {
  background: var(--tenant-primary);
}
```

Validate allowed theme values and asset URLs before applying tenant configuration.

### Multi-tenant UI vs multi-tenant security

The UI adapts the experience; it does not enforce the security boundary. A malicious user can alter browser state, change requests, or call APIs directly. Backend authorization and data isolation are mandatory.

**Interview answer:** “I separate tenant identity, tenant configuration, user permissions, and feature rollout. The UI uses tenant settings for branding and navigation, but every API request enforces tenant scope and authorization server-side. I also make cache keys tenant-aware and test cross-tenant isolation.”

---

# Quick Revision Card

| Topic | Memory cue |
|---|---|
| Inversion of Control | Delegate control to a framework, parent, or external mechanism |
| Dependency Injection | Supply dependencies instead of constructing them internally |
| Event delegation | Parent handler + bubbling + identify target |
| Observer | Subject directly notifies subscribed observers |
| Pub-Sub | Publisher sends events to a topic/channel |
| Feature toggles | Gradual rollout, experiments, kill switches—not authorization |
| Config-driven UI | Typed config + approved component registry |
| Multi-tenant UI | Tenant-aware configuration; backend-enforced isolation |

## Strong closing answer for a senior interview

“I use patterns to make boundaries explicit, not to add abstraction for its own sake. I inject dependencies for testability, use event-driven patterns for genuinely decoupled communication, and apply feature flags and config-driven UI with validation and cleanup. In multi-tenant systems, tenant configuration controls the experience, while server-side authorization and data isolation protect the actual resources.”
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

# React System Design & Real-World UI Scenarios — Senior Interview Guide

Senior-level interview preparation for practical React architecture scenarios. Each topic includes a design approach, key trade-offs, implementation examples, risks, and a concise interview answer.

---

## 1. Dashboard App Design

### Requirements to clarify first

Before choosing libraries, clarify:
- Who uses the dashboard and which roles exist?
- How many widgets, records, and concurrent users are expected?
- How fresh must metrics be: seconds, minutes, or daily?
- Are filters shareable through the URL?
- Is data tenant-specific or sensitive?
- Are exports, saved views, customization, and accessibility required?

### Suggested architecture

```text
App Shell
├── Authentication / tenant context
├── Navigation and route guards
├── Dashboard page
│   ├── Filter bar (URL-synchronized)
│   ├── KPI cards
│   ├── Charts
│   ├── Data table
│   └── Export / saved-view actions
├── Feature modules
├── Shared design system
└── API/query layer
```

### State strategy

- **URL state:** shareable filters, search terms, selected tab, date range.
- **Local component state:** open popover, temporary input, modal visibility.
- **Server state:** dashboard metrics, table rows, user profile; use a query/cache layer.
- **Global client state:** cross-route UI preferences or workflow state only when needed.

### Performance and reliability

- Fetch independent widgets in parallel when possible.
- Give each widget its own loading/error/empty state so one failure does not blank the whole dashboard.
- Lazy-load less-used charts or heavy visualization libraries.
- Virtualize very large tables.
- Use request cancellation or query-library mechanisms when filters change quickly.
- Cache according to data freshness and tenant/user scope.
- Provide accessible tables or summaries for chart information.

**Interview answer:** “I start with requirements and data freshness, then separate the app shell, feature modules, shared UI, and API/query layer. I put shareable filters in the URL, server data in a query cache, and local interactions in component state. Widgets should fail independently and be measured for performance.”

---

## 2. Role-Based Access UI

### Separate authentication, authorization, and presentation

- **Authentication:** Who is the user?
- **Authorization:** What may the user do?
- **UI presentation:** Which controls should be visible or disabled?

A hidden button is not an authorization control. The API must enforce access on every protected operation.

### Prefer capabilities/permissions over role-name checks everywhere

```ts
type Permission =
  | "users:read"
  | "users:create"
  | "users:delete"
  | "reports:export";

type AuthContext = {
  permissions: ReadonlySet<Permission>;
};

function can(auth: AuthContext, permission: Permission) {
  return auth.permissions.has(permission);
}
```

A UI can use the same helper for visibility:

```tsx
function DeleteUserButton({
  auth,
  onDelete,
}: {
  auth: AuthContext;
  onDelete: () => void;
}) {
  if (!can(auth, "users:delete")) return null;

  return <button onClick={onDelete}>Delete user</button>;
}
```

In a real app, the client permission list is only a UX hint. The server must independently validate the authenticated principal and requested resource.

### Design recommendations

- Resolve permissions after authentication and handle loading/expired-session states.
- Define a consistent policy for hidden vs disabled actions.
- Avoid scattering role-name strings across components.
- Support resource-level rules where permissions depend on ownership or tenant.
- Re-check authorization on the server for every API call.
- Test direct URL access and forged requests, not just button visibility.

**Interview answer:** “I model UI access around explicit capabilities rather than scattered role-name checks. The frontend improves UX by hiding or disabling unavailable actions, but the backend remains the security authority and validates every operation.”

---

## 3. Large Form Builder

Large forms introduce validation complexity, conditional fields, dynamic sections, async checks, and performance issues.

### Architecture

```text
Form schema / configuration
        ↓ validate
Field registry + field components
        ↓
Form state + validation resolver
        ↓
Submission / API layer
```

### Design choices

- Use a form library such as React Hook Form or Formik when its features match the requirements.
- Keep field definitions typed and validated.
- Use a schema validator when validation rules are complex or shared with the server.
- Separate field rendering from business rules.
- Use field arrays for dynamic repeatable sections.
- Debounce remote validation and cancel stale requests.
- Validate on blur or submit for expensive rules; use immediate validation selectively.
- Preserve values intentionally when conditional fields unmount.
- Provide accessible labels, descriptions, error summaries, and keyboard navigation.

### Example discriminated field schema

```ts
type FieldConfig =
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "number"; name: string; label: string; min?: number; max?: number }
  | { type: "select"; name: string; label: string; options: { label: string; value: string }[] };
```

Render only known field types with a registry/switch. Never execute arbitrary JavaScript received in configuration.

### Performance techniques

- Avoid putting the entire form value object into high-level React state if every keystroke rerenders a huge tree.
- Subscribe to only the field or section that needs a value.
- Memoize expensive derived UI only after profiling.
- Keep validation pure where possible and isolate async checks.
- Use stable field identifiers for dynamic arrays.

### Reliability

- Distinguish client-side usability validation from authoritative server validation.
- Handle server errors by field and form-level summary.
- Prevent accidental duplicate submission.
- Support draft/autosave only with a deliberate privacy and conflict policy.

**Interview answer:** “I define a typed field schema and a field registry, use a form library for subscriptions and validation, and isolate rerenders to affected fields. I plan conditional values, async validation, accessible errors, and server-side validation from the start.”

---

## 4. Component Library Design

A component library is a stable API and design system, not just a folder of reusable JSX.

### Layers

1. **Design tokens:** color, spacing, typography, radii, elevation, motion.
2. **Primitives:** Button, Input, Checkbox, Dialog, Tooltip.
3. **Composed components:** DatePicker, SearchableSelect, DataTable.
4. **Patterns:** Form layouts, empty states, page headers.
5. **Documentation and examples:** Usage, variants, accessibility, migration notes.

### Example API

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      {...props}
    />
  );
}
```

This is illustrative; a production component should define class styles, focus states, disabled/loading behavior, and accessibility requirements.

### Design principles

- Keep APIs consistent and small.
- Prefer composition over many boolean props that interact unpredictably.
- Define keyboard and screen-reader behavior for interactive components.
- Provide controlled and uncontrolled forms only where the distinction is clear.
- Avoid exposing implementation details that make future refactoring difficult.
- Document breaking changes and use semantic versioning for published packages.
- Include unit tests, interaction/accessibility tests, visual regression tests, and usage examples.
- Check bundle impact and support tree-shakeable exports.

### Governance

Decide who owns tokens, how changes are reviewed, how deprecations work, and how apps adopt upgrades. A shared library can reduce duplication but becomes a bottleneck if every product change requires central approval.

**Interview answer:** “I design a component library around tokens, accessible primitives, composed patterns, stable APIs, and documentation. I add testing and versioning, and I establish ownership so consistency does not turn into a delivery bottleneck.”

---

## 5. State Management Strategy

First classify the state; do not default to one library for everything.

| State category | Examples | Typical home |
|---|---|---|
| Local UI state | Open dialog, hover, temporary input | Component state |
| URL state | Search query, filters, pagination | URL/router |
| Server state | API results, loading, freshness | RTK Query, TanStack Query, or equivalent |
| Shared client state | Cross-route workflow/preferences | Context or Redux Toolkit |
| Form state | Values, touched fields, validation | Form library |
| Persistent state | User preferences/drafts | Storage or server, with privacy policy |

### Decision process

1. Who needs to read/update the state?
2. Is it authoritative server data or client-owned UI state?
3. Should it survive route changes, refreshes, or devices?
4. Is it shareable/bookmarkable?
5. Does it need optimistic updates, invalidation, or conflict handling?
6. What are the performance and debugging requirements?

### Example rule of thumb

- Use component state for local interactions.
- Use URL parameters for navigable/shareable filters.
- Use a server-state library for API caching, refetching, and mutation invalidation.
- Use Redux Toolkit for complex shared client workflows or when explicit centralized transitions and tooling are valuable.
- Use Context for relatively stable cross-tree dependencies such as theme or current locale, not as an automatic replacement for every server-data cache.

### Common mistakes

- Duplicating server data in Redux and a query cache without a clear source of truth.
- Persisting access tokens or sensitive data casually in local storage.
- Putting every input value in global state.
- Using global events to hide all state transitions.
- Ignoring normalization, selectors, or render subscriptions in large state graphs.

**Interview answer:** “I classify state by ownership and lifetime. Server data belongs in a query cache, shareable filters in the URL, transient interactions locally, and complex shared client workflows in Redux Toolkit when needed. I avoid duplicating the same source of truth.”

---

## 6. Real-Time UI Updates

Real-time interfaces receive updates from the server without requiring the user to refresh manually.

### Choose a transport based on requirements

- **Polling:** Client asks at intervals. Simple and reliable for low-frequency updates.
- **Long polling:** A request waits until data is available or times out; useful in some constrained environments but more complex than normal polling.
- **Server-Sent Events (SSE):** Server-to-client event stream over HTTP; good for one-way updates.
- **WebSockets:** Persistent, bidirectional connection; useful for chat, collaborative tools, and interactive live systems.

### Example use cases

| Use case | Likely approach |
|---|---|
| Dashboard refresh every minute | Polling |
| Deployment/job progress | SSE or polling |
| Chat and presence | WebSockets |
| Live market-style updates | WebSockets or a purpose-built streaming protocol, depending on scale and guarantees |

### Reliability requirements

- Authenticate the connection and authorize each subscribed resource.
- Reconnect with exponential backoff and jitter.
- Handle duplicate, delayed, or out-of-order events.
- Include event IDs or sequence/version numbers when needed.
- Reconcile with a snapshot after reconnecting.
- Unsubscribe/close connections on cleanup.
- Throttle or batch UI updates under high event volume.
- Define heartbeat, timeout, and fallback behavior.
- Avoid sending sensitive data to unauthorized subscribers.

### React lifecycle example for SSE

```tsx
import { useEffect, useState } from "react";

type StatusEvent = { jobId: string; status: string };

export function useJobEvents(url: string) {
  const [events, setEvents] = useState<StatusEvent[]>([]);

  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data) as StatusEvent;
        setEvents((previous) => [...previous, event].slice(-100));
      } catch {
        // Record a safe diagnostic; do not crash rendering.
      }
    };

    return () => source.close();
  }, [url]);

  return events;
}
```

This simplified example assumes the endpoint and event payload are trusted/validated. Native `EventSource` authentication options are limited; cookie-based auth or a suitable client/proxy strategy may be required. Avoid embedding long-lived secrets in URLs.

**Interview answer:** “I select polling, SSE, or WebSockets based on update frequency and whether communication must be bidirectional. I plan reconnects, deduplication, authorization, cleanup, and snapshot reconciliation—not just the happy-path connection.”

---

## 7. Pagination vs Infinite Scroll

### Pagination

The user moves through explicit pages or uses page controls.

**Advantages**
- Clear position and total count.
- Easy to bookmark/share page state.
- Good for tables, admin screens, and tasks requiring precise navigation.

**Trade-offs**
- Requires navigation actions.
- Offset pagination can become slow or inconsistent on changing large datasets.

### Infinite scroll

More content loads as the user approaches the end of the current list.

**Advantages**
- Smooth browsing for feeds, images, and discovery experiences.
- Reduces the need for repeated manual navigation.

**Trade-offs**
- Harder to reach the footer and understand total length.
- Scroll restoration, accessibility, analytics, and memory usage need care.
- Repeated loading can become expensive without virtualization.

### Cursor vs offset pagination

- **Offset/page-based:** `?page=4&pageSize=25`; easy for page jumps, but inserts/deletes can shift results and large offsets can be expensive.
- **Cursor-based:** `?after=opaqueCursor`; often more stable and efficient for changing datasets, but arbitrary page jumps are harder.

### Decision guide

- Admin tables and searchable records: usually pagination with URL-synchronized filters.
- Social/feed/discovery: often infinite scroll with virtualization and a visible loading/error/retry state.
- Large data sets with frequent updates: consider cursor pagination.
- Always support keyboard navigation and a usable non-scroll interaction path.

**Interview answer:** “I use pagination when users need control, page position, or table workflows. I use infinite scroll for continuous discovery, but pair it with virtualization, accessible loading states, and scroll restoration. For frequently changing large datasets, cursor pagination is often safer than a large offset.”

---

## 8. UI Caching

Caching should be designed around the type of data, its freshness requirements, and who is allowed to see it.

### Layers

- **HTTP/browser cache:** Static assets and cacheable responses.
- **CDN/edge cache:** Shared delivery for public assets and safe public responses.
- **Server/data cache:** Expensive queries or API results.
- **Framework route cache:** Pre-rendered or cached route output.
- **Client query cache:** API responses and mutation invalidation.
- **Component state:** Short-lived UI values, not a general API cache.

### Example HTTP headers

For content-hashed JS/CSS assets:

```http
Cache-Control: public, max-age=31536000, immutable
```

For sensitive responses that should not be stored:

```http
Cache-Control: private, no-store
```

Choose headers according to actual data sensitivity and architecture; do not apply these blindly.

### Client query cache concepts

- **Freshness/stale time:** How long data can be treated as fresh.
- **Garbage collection/cache time:** How long unused results remain stored.
- **Invalidation:** Mark related results stale after mutations.
- **Optimistic update:** Update UI before server confirmation, with rollback on failure.
- **Deduplication:** Reuse an in-flight request for the same key.

### Rules

- Include all result-defining inputs in cache keys: tenant, user scope where applicable, filters, sorting, and page/cursor.
- Never share personalized responses in a public cache without a safe, correctly partitioned design.
- Define TTL and invalidation before adding a cache.
- Monitor hit rate, staleness, and origin load.
- Avoid caching authorization decisions longer than policy permits.

**Interview answer:** “I choose the cache layer, define the cache key and freshness, and plan invalidation. I use immutable caching for versioned assets and query-cache invalidation for server data, while ensuring tenant and user boundaries cannot leak data.”

---

## 9. Offline-First UI

Offline-first design aims to keep useful parts of an application working when the network is unavailable or unreliable. It requires more than adding a service worker.

### Architecture

```text
UI
 ↓
Local data store / cache
 ↓ sync queue
Network sync engine
 ↓
API / server
```

### Core pieces

- **Service worker:** Can cache the application shell and selected resources.
- **Local persistence:** IndexedDB is generally more suitable than localStorage for larger structured datasets.
- **Sync queue:** Records mutations that need to be sent when connectivity returns.
- **Conflict policy:** Defines what happens when local and server versions diverge.
- **Connectivity feedback:** Shows offline, syncing, success, and failure states.
- **Retry strategy:** Uses bounded exponential backoff with jitter.
- **Data policy:** Defines which records may be stored locally and for how long.

### Example UX states

- Offline: show cached content and clearly indicate that changes may not be synced.
- Pending: mark edits as “Waiting to sync.”
- Syncing: show progress only when meaningful.
- Conflict: explain the conflict and offer a resolution strategy.
- Failed: preserve the user's work and provide retry/recovery.

### Important trade-offs

- Offline data may be stale.
- Concurrent edits can conflict.
- Browser storage can be cleared or evicted.
- Service-worker caches require versioning and update handling.
- Sensitive data stored on a device introduces privacy/security risk.
- Not all actions should be queued; irreversible or high-risk actions may require online confirmation.

### Conflict strategies

- **Last-write-wins:** Simple but may overwrite meaningful edits.
- **Version/ETag checks:** Detect concurrent changes and request resolution.
- **Field-level merge:** Works for certain data structures.
- **CRDTs:** Useful for specialized collaborative editing, but adds complexity.

**Interview answer:** “I define which screens and actions must work offline, cache the app shell, persist appropriate data locally, and queue safe mutations. I make sync state visible, design conflict handling, and never assume browser storage is permanent or secure by default.”

---

## 10. Error & Loading Strategy

A resilient UI distinguishes loading, success, empty, partial, and error states instead of treating everything as one spinner.

### State model

```ts
type LoadState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string; retryable: boolean };
```

For many real apps, stale data and background refresh need to be represented separately from initial loading. A query library often provides these states.

### Loading strategy

- Use skeletons when the layout is known and waiting would otherwise cause layout shift.
- Use small inline indicators for local actions.
- Avoid blocking the whole page when only one widget is loading.
- Keep old data visible during background refresh if it is still safe and useful.
- Prevent duplicate submissions and communicate progress for long-running operations.

### Error strategy

- **Field-level errors:** Validation issues.
- **Component/widget errors:** One chart or panel failed.
- **Page-level errors:** Required page data cannot load.
- **Error boundaries:** Catch render/lifecycle errors in descendant React trees; they do not automatically catch every event-handler or async API error.
- **Network/API errors:** Show retry options for retryable failures.
- **Authentication/authorization errors:** Re-authenticate or show access-denied UI appropriately.
- **Unexpected errors:** Show a safe fallback and log diagnostic details without exposing secrets.

### Example async state handling

```tsx
import { useEffect, useState } from "react";

type User = { id: string; name: string };
type State =
  | { status: "loading" }
  | { status: "success"; user: User }
  | { status: "error" };

export function UserPanel({ userId }: { userId: string }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      setState({ status: "loading" });

      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Request failed");

        const user = (await response.json()) as User;
        setState({ status: "success", user });
      } catch {
        if (!controller.signal.aborted) setState({ status: "error" });
      }
    }

    void loadUser();
    return () => controller.abort();
  }, [userId]);

  if (state.status === "loading") return <p>Loading user…</p>;
  if (state.status === "error") {
    return <p role="alert">Unable to load user. Please try again.</p>;
  }

  return <h2>{state.user.name}</h2>;
}
```

For a production implementation, add an explicit retry action and ensure a request for an old `userId` cannot overwrite newer state. A query library often handles cancellation, caching, and request lifecycle more consistently.

### UX and observability

- Use actionable, plain-language messages.
- Preserve user input after recoverable failures.
- Retry only when appropriate; use exponential backoff for transient errors.
- Avoid retrying non-idempotent mutations automatically without an idempotency strategy.
- Log correlation/request IDs and error categories, not secrets or sensitive payloads.
- Measure loading latency, error rates, and retries.

**Interview answer:** “I design loading, empty, partial, and error states as part of the feature. I isolate widget failures, cancel stale requests, provide actionable retry paths, preserve user input, and log safe diagnostics. Error boundaries complement—not replace—API error handling.”

---

# Quick Revision Card

| Topic | Memory cue |
|---|---|
| Dashboard design | Requirements → modules → state ownership → independent widgets |
| Role-based UI | Permissions drive UX; backend enforces security |
| Large form builder | Typed schema, field registry, isolated rerenders, server validation |
| Component library | Tokens, accessible primitives, stable API, tests, governance |
| State strategy | Local / URL / server / shared client / form / persistent |
| Real-time updates | Polling vs SSE vs WebSockets; reconnect and reconcile |
| Pagination vs infinite scroll | Control and position vs continuous discovery |
| UI caching | Layer + key + freshness + invalidation + privacy |
| Offline-first | Local persistence + sync queue + conflict policy |
| Error/loading | Explicit states, graceful fallback, retry, safe observability |

## Strong closing answer for a senior interview

“I design React applications from user and operational requirements, then make state ownership, security boundaries, and failure behavior explicit. I use the simplest architecture that scales, isolate independent UI failures, measure performance, and define caching and synchronization policies carefully. A senior-level UI design is not just a component tree—it is a reliable, accessible, secure experience under real network, data, and user conditions.”
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

# React Tech Lead & Senior Engineer — Leadership Interview Guide

This guide focuses on senior-level behavioral and technical leadership questions for React engineers. Use the frameworks and examples to structure answers, then adapt them to your real experience. Do not claim metrics or incidents you have not personally handled.

---

## 1. Code Review Approach

### What interviewers are evaluating
Whether you protect quality without blocking delivery, distinguish important defects from preferences, and help the author learn.

### A practical review framework

Review in this order:

1. **Correctness:** Does the change satisfy the requirement? Are edge cases handled?
2. **Security and privacy:** Is authorization enforced server-side? Are secrets or sensitive data exposed?
3. **Reliability:** What happens on loading, empty, error, retry, and cancellation paths?
4. **Performance:** Are there unnecessary renders, expensive loops, large dependencies, or unbounded lists?
5. **Maintainability:** Are names, boundaries, types, and abstractions clear?
6. **Tests:** Do tests cover meaningful behavior, regression risk, and failure scenarios?
7. **Consistency:** Does it follow established project conventions?

### How to write useful comments

- Explain the risk and impact, not just “this is wrong.”
- Separate blockers from suggestions.
- Ask a question when the intent is unclear.
- Suggest a concrete alternative when practical.
- Avoid style comments that automated tools can enforce.
- Praise a good design choice when it helps others learn.

Example review comment:

> This effect can update state after the selected user changes, so a slower response for the previous user could overwrite the newer result. Could we cancel the request or guard the result using the current request identity?

### Review process

- Keep pull requests small enough to understand.
- Use CI for linting, type checks, tests, and build validation.
- Define explicit approval rules for risky areas.
- Discuss architectural disagreements synchronously when a long comment thread is not productive.
- Review the diff and relevant surrounding code, not just isolated lines.

**Interview answer:** “I review correctness, security, reliability, performance, maintainability, and tests in that order. I distinguish blocking risks from suggestions, explain the impact behind feedback, and automate repeatable checks so human review focuses on design and behavior.”

---

## 2. Mentoring Juniors

### The goal
Help engineers become increasingly independent, not merely complete their current task for them.

### A useful mentoring loop

1. Understand the person's current mental model and confidence.
2. Agree on a clear, appropriately sized goal.
3. Explain the principle, not just the code change.
4. Work through one example together.
5. Let the engineer implement the next part.
6. Review and discuss trade-offs.
7. Reflect on what they learned and what to try next.

### Practical techniques

- Use small, concrete examples before introducing abstractions.
- Ask guiding questions instead of immediately giving the solution.
- Pair on unfamiliar or high-risk work.
- Provide actionable code review feedback.
- Share debugging strategies and ways to reproduce problems.
- Give ownership of a feature with a clear support path.
- Adapt to the person's experience and preferred learning style.

### Example

Instead of saying, “Add `useMemo` here,” ask:
- What is expensive about this render?
- How often does the calculation run?
- Have we measured the cost?
- Would memoization actually avoid the work?
- What would make the cached value invalid?

This teaches reasoning rather than cargo-cult patterns.

### How to measure progress

Look for improved independence, debugging quality, estimates, test coverage, design reasoning, and ability to explain trade-offs. Avoid measuring mentoring only by the number of tasks completed.

**Interview answer:** “I mentor through progressively larger ownership, guided questions, pairing, and specific feedback. My aim is to help engineers reason independently about trade-offs and quality rather than depend on me for every implementation decision.”

---

## 3. Enforcing Best Practices

“Enforcing” should mean creating a clear, sustainable engineering system—not policing every stylistic preference.

### Establish a shared baseline

- ESLint and formatting rules.
- TypeScript strictness appropriate to the codebase.
- Automated unit/component tests and critical E2E tests.
- CI checks for lint, type checking, tests, and production build.
- Accessibility and security checks for relevant components.
- Dependency update and vulnerability processes.
- Clear conventions for state ownership, API calls, and error handling.
- Architecture decision records for important cross-team choices.

### Use automation first

If every reviewer repeats the same formatting comment, configure the formatter. If unsafe patterns recur, add a lint rule, test, or documented example when feasible.

### Avoid one-size-fits-all rules

Best practices depend on the product. For example, a small static site may not need Redux; a large shared workflow might. A rule should solve a real problem and be proportionate to its cost.

### Adoption strategy

1. Agree on the problem and expected benefit.
2. Pilot the standard in one module.
3. Provide migration examples and tooling.
4. Roll it out incrementally.
5. Measure friction and revisit rules that are not helping.

**Interview answer:** “I make best practices easy to follow through shared examples, lint rules, type checks, tests, and CI gates. I explain the reason behind standards, roll them out incrementally, and allow evidence-based exceptions instead of treating every preference as a hard rule.”

---

## 4. Handling Legacy React Code

### Start with understanding, not a rewrite

Before changing a legacy application:
- Map critical user journeys and business rules.
- Identify runtime, dependency, test, and deployment constraints.
- Capture current behavior with characterization tests.
- Measure performance and error rates.
- Identify security and reliability risks.
- Find high-change/high-defect modules and their dependencies.

### Incremental modernization

- Add tests around critical existing behavior.
- Establish linting, type checking, and build checks without requiring an immediate repository-wide cleanup.
- Introduce clear feature boundaries.
- Migrate class components or old APIs where there is a concrete benefit.
- Upgrade dependencies in small, verifiable steps.
- Replace risky patterns behind stable interfaces.
- Use feature flags or canary deployment for high-risk changes.
- Track removed compatibility code and temporary workarounds.

### Strangler approach

Build new capability in a clean module or route, route the relevant use case to it, and retire the old implementation once behavior and adoption are verified. Avoid running two implementations indefinitely without ownership or a retirement plan.

### What not to do

- Rewrite the entire app solely because the code looks old.
- Upgrade React, routing, state management, build tooling, and UI libraries in one untestable change.
- Introduce abstractions without understanding existing domain rules.
- Remove legacy behavior before identifying who depends on it.

**Interview answer:** “I first establish a behavioral baseline and identify business-critical paths. Then I modernize incrementally with tests, boundaries, and measurable outcomes. A rewrite is justified only when incremental change cannot reasonably meet the product's needs.”

---

## 5. Conflict with Product or Design

### Align on the underlying goal

Disagreement often comes from different constraints: product optimizes user value and time-to-market, design optimizes usability and consistency, and engineering considers feasibility, reliability, and maintenance.

### A constructive process

1. Clarify the user problem and desired outcome.
2. Separate requirements from proposed solutions.
3. Present feasible options and their costs.
4. Make risks and dependencies visible.
5. Use prototypes, user research, analytics, or experiments when evidence can settle the question.
6. Agree on a decision owner and deadline.
7. Document the decision and revisit it if new evidence appears.

### Example

If a design requires a complex animation that threatens performance on lower-end devices, do not simply reject it. Offer options:
- Keep the full animation for capable devices.
- Use a simpler fallback for reduced-motion or lower-capability environments.
- Load the animation lazily.
- Measure the experience with a prototype before committing.

Respect `prefers-reduced-motion` when appropriate.

### Escalation

Escalate when there is a material security, accessibility, legal, or reliability risk that cannot be resolved within the team. Keep the discussion focused on impact and evidence rather than personalities.

**Interview answer:** “I start with the shared user outcome, explain constraints and options, and use evidence to resolve disagreements. I aim for an explicit decision with known trade-offs, and I escalate only when a significant risk or decision ownership issue requires it.”

---

## 6. Production Performance Issues

### Incident response before optimization

When production is slow, first determine the scope and severity:
- Which users, routes, devices, and regions are affected?
- Did a recent release, dependency, or traffic change correlate with the issue?
- Is the bottleneck network, JavaScript execution, rendering, API latency, or backend capacity?
- Is it a performance regression or a functional failure?

### A disciplined workflow

1. Confirm the issue using real-user monitoring and available traces.
2. Check release markers, error rates, and Core Web Vitals.
3. Reproduce on representative devices and networks.
4. Use browser Performance tools and React Profiler.
5. Identify the largest contributor, not just the easiest code to change.
6. Mitigate quickly if user impact is high: roll back, disable a feature, or reduce work.
7. Implement the targeted fix and validate it against the same measurements.
8. Add a regression test, performance budget, alert, or runbook where appropriate.

### Common React causes

- Excessive re-renders or expensive render calculations.
- Large initial bundles or unnecessary dependencies.
- Unvirtualized large lists.
- Repeated network requests or waterfall fetching.
- Expensive layout/paint caused by DOM and CSS changes.
- Large images or fonts.
- Too much synchronous work on the main thread.
- Cache misses or slow APIs that appear as frontend slowness.

### Useful measurements

- LCP, INP, CLS.
- JavaScript bundle size and long tasks.
- API latency and error rate.
- Render/commit timings and rerender frequency.
- Device/network segmentation.

**Interview answer:** “I establish impact and measure first, then isolate whether the bottleneck is network, JavaScript, React rendering, or backend latency. I mitigate high-impact incidents quickly, validate the fix with the same metrics, and add monitoring or a regression guard.”

---

## 7. React Migration Strategy

Migration may involve upgrading React, changing build tools, moving from class components to Hooks, adopting TypeScript, or moving to a framework. Each has a different risk profile.

### Plan the migration

1. Define why the migration is needed and what success means.
2. Inventory dependencies, APIs, browser support, tests, and custom integrations.
3. Identify breaking changes and unsupported packages.
4. Build a small proof of concept around a representative feature.
5. Create a compatibility layer or adapter when useful.
6. Migrate one route, package, or feature at a time.
7. Run tests and compare performance/error metrics at each stage.
8. Roll out gradually and preserve a rollback path.
9. Remove obsolete compatibility code after the migration stabilizes.

### Risk controls

- Keep changes small and reviewable.
- Upgrade one major dependency dimension at a time where practical.
- Use codemods as a starting point, followed by review and tests.
- Validate SSR/hydration behavior if the rendering model changes.
- Test accessibility, analytics, routing, and third-party integrations.
- Maintain a migration log and ownership for blockers.

### When a full rewrite might be justified

A rewrite may be reasonable when architecture is fundamentally incompatible with requirements, the existing system cannot be maintained safely, or incremental migration costs more than replacement. The case should be based on delivery risk and long-term cost—not a preference for newer technology.

**Interview answer:** “I treat migration as a risk-managed program: define measurable goals, inventory compatibility, prove the approach on a representative slice, migrate incrementally, and preserve rollback. I avoid combining unrelated major changes into one release.”

---

## 8. Handling Breaking Changes

Breaking changes alter behavior or contracts in a way that existing consumers cannot safely absorb without changes.

### Examples in frontend systems

- Renaming/removing a component prop.
- Changing default behavior or CSS classes relied on by consumers.
- Changing route structure or query parameter semantics.
- Altering API response shape.
- Changing a design token or component's accessibility behavior.
- Upgrading a dependency with incompatible APIs.

### A safe process

1. Identify consumers and usage patterns.
2. Assess impact and provide a migration path.
3. Prefer additive changes before removing old behavior.
4. Deprecate the old API with warnings or documentation.
5. Provide codemods, migration notes, and examples where possible.
6. Version packages appropriately and communicate the timeline.
7. Add contract tests and compatibility checks.
8. Release to a pilot consumer before broad rollout.
9. Monitor adoption and errors, then remove the deprecated path after the agreed window.

### Example: staged prop migration

Suppose `tone` replaces `variant`:

```tsx
type ButtonProps = {
  tone?: "primary" | "secondary";
  /** @deprecated Use tone instead. */
  variant?: "primary" | "secondary";
};

function Button({ tone, variant, ...props }: ButtonProps) {
  const resolvedTone = tone ?? variant ?? "primary";
  return <button data-tone={resolvedTone} {...props} />;
}
```

This is an illustrative compatibility approach. A real library should define precedence, warnings, tests, and a removal version. Avoid indefinitely maintaining duplicate APIs.

**Interview answer:** “I identify consumers, make changes additive where possible, deprecate with a clear migration path, and use versioning, tests, and communication. I remove compatibility only after consumers have a realistic path to update.”

---

## 9. Speed vs Quality Trade-off

Speed and quality are not opposites; the goal is to minimize total delivery cost while managing risk. A rushed defect can cost more than the time saved, but over-engineering a low-risk feature can also waste time.

### Classify risk

**Usually non-negotiable**
- Security and privacy.
- Data integrity.
- Critical user journeys.
- Accessibility obligations.
- Tests for high-risk business logic.
- Observability and rollback for risky releases.

**Potentially negotiable**
- Scope of non-critical polish.
- Advanced abstractions for a one-off feature.
- Non-essential animations.
- Broad refactoring unrelated to the immediate goal.
- Some low-risk test depth, provided critical behavior remains covered and the debt is explicit.

### Make trade-offs visible

Use a short decision record:
- What must ship and why?
- What can be deferred?
- What risk is accepted?
- What is the mitigation?
- Who owns the follow-up?
- When will the debt be revisited?

Feature flags, staged rollouts, and small releases can help deliver value sooner without taking uncontrolled risks.

### Avoid false choices

- Tests can speed future changes by catching regressions.
- A small design system can prevent repeated implementation work.
- A quick patch can be correct if the scope and rollback are clear.
- A large refactor is not automatically “quality.”

**Interview answer:** “I protect security, data integrity, and critical behavior, while negotiating scope and polish based on user value and risk. If we take on technical debt, I document the impact, mitigation, owner, and follow-up rather than allowing an invisible permanent shortcut.”

---

## 10. Design-First Development Approach

“Design-first” means validating user flows and interface decisions before committing to a costly implementation. It does not mean engineering waits until every pixel is finalized.

### Workflow

1. **Discover:** Understand users, business goals, constraints, and success measures.
2. **Define:** Map primary flows, edge cases, permissions, and information architecture.
3. **Prototype:** Use wireframes or interactive prototypes to test uncertain interactions.
4. **Review feasibility:** Evaluate responsive behavior, accessibility, data requirements, API constraints, and performance.
5. **Build a thin vertical slice:** Connect one representative flow from UI to backend.
6. **Validate:** Test with users or stakeholders and compare against requirements.
7. **Iterate:** Refine based on evidence, then scale the pattern.

### Engineering involvement early

Engineers should identify:
- Missing loading, empty, error, and offline states.
- Keyboard and screen-reader behavior.
- Responsive layouts and long-content scenarios.
- API latency and data availability constraints.
- Complex interactions or expensive animations.
- Design-system reuse opportunities.

### Avoid common traps

- Treating mockups as complete specifications.
- Ignoring edge states until implementation.
- Over-polishing a prototype before validating the problem.
- Blocking delivery while waiting for perfect designs.
- Implementing visuals without defining responsive and accessible behavior.

**Interview answer:** “I involve engineering early in discovery and prototyping so we can surface technical constraints, accessibility, and failure states before they become expensive. I validate the highest-risk flow with a thin vertical slice, then iterate using feedback and measurable outcomes.”

---

# Quick Revision Card

| Topic | Memory cue |
|---|---|
| Code review | Correctness → security → reliability → performance → maintainability → tests |
| Mentoring | Guide, pair, give ownership, and build independence |
| Best practices | Automate repeatable rules; explain standards and measure value |
| Legacy code | Characterize behavior, add tests, modernize incrementally |
| Product/design conflict | Shared goal → options → evidence → explicit decision |
| Production performance | Measure, isolate, mitigate, validate, prevent recurrence |
| Migration | Inventory, prove, slice, test, roll out, rollback |
| Breaking changes | Additive path, deprecation, versioning, migration guide |
| Speed vs quality | Protect critical risks; make accepted debt visible and owned |
| Design-first | Discover, prototype, assess, build a thin slice, validate |

## Strong closing answer for a senior/Tech Lead interview

“My role is to create conditions where the team can deliver reliable user value repeatedly. I set clear quality standards and automate them, mentor engineers toward independent ownership, use evidence to resolve product and design trade-offs, and handle legacy work or migrations incrementally. Under production pressure, I prioritize user impact and measurable mitigation; when trade-offs are necessary, I document the risk and give it an owner and a follow-up plan.”
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


## Virtualization

#### Q1. What is virtualization in React?
Answer: Virtualization is a performance technique in which only the visible portion of a large list is rendered in the DOM. It reduces DOM nodes, rendering overhead, and memory used by mounted components.

#### Q2. Why did you choose react-window?
Answer: I chose react-window because it is lightweight and provides a simple API for rendering large lists efficiently. I used FixedSizeList because every employee row has a fixed height.

#### Q3. What is the difference between FixedSizeList and VariableSizeList?
Answer: FixedSizeList is suitable when all rows have the same height. VariableSizeList is used when row heights differ, such as expandable rows or descriptions of different lengths.

#### Q4. Why must we pass the style prop to each row?
Answer: The library calculates each row's position and dimensions dynamically. Applying the supplied style ensures rows appear at the correct position during scrolling.

#### Q5. What is itemData?
Answer: itemData passes shared data, such as an employee array, to each rendered row. This avoids relying on global variables and makes row components reusable.

#### Q6. Why use itemKey?
Answer: A stable uni#### Que key helps React identify records correctly when data changes. Employee IDs are safer than array indexes when searching, sorting, inserting, or deleting records.

#### Q7. Does react-window prevent unnecessary React renders?
Answer: It limits how many rows are mounted, but it does not prevent every unnecessary render. I would also use profiling, stable props, and memoization where measurements show they are beneficial.

#### Q8. How would you handle 100,000 records from an API?
Answer: I would use server-side pagination or cursor-based fetching, virtualization for visible rows, and debounced server-side search. This avoids downloading and filtering the entire dataset in the browser.

#### Q9. What is overscan?
Answer: Overscan renders a few extra rows outside the visible viewport. It reduces blank flashes during fast scrolling, at the cost of mounting some additional elements.

#### Q10. What are the limitations of virtualization?
Answer: It introduces complexity with dynamic row heights, keyboard navigation, accessibility, and component state. For example, an unmounted row cannot be found by ordinary DOM  Queries until it is rendered.

#### Q11. What is the difference between virtualization and pagination?
Answer: Pagination controls how much data is retrieved or displayed per page. Virtualization controls how many items are mounted in the DOM. They can be combined to handle large datasets efficiently.

#### Q12. How would you measure whether virtualization improved performance?
Answer: I would compare React Profiler timings, browser performance traces, DOM node counts, memory usage, and scrolling responsiveness before and after virtualization, using the same dataset and test conditions.

#### Q13 Interviewer: “Your React page displays 50,000 products. Scrolling is slow, search is lagging, and each product has an image. How would you optimize it?”
A strong answer:
“I would use virtualization to render only visible products and implement debounced, preferably server-side, search to avoid filtering the entire dataset on every keystroke. I would optimize image loading with lazy loading, use stable keys, and profile the application to identify expensive renders. If the dataset is too large to load at once, I would combine virtualization with cursor-based pagination.”