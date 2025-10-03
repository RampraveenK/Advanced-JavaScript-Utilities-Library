# Advanced JavaScript Utilities Library

> **Project:** Advanced JavaScript Utilities (a compact, modern utility library)
>
> **Goal:** Build a small, well-tested, open-source collection of high-value JavaScript utilities that demonstrates mastery of advanced JS concepts (closures, proxies, generators, async control, functional composition). The library acts as a "Lodash-lite" focused on quality, modern APIs, and excellent docs — ideal for a portfolio and GitHub showcase.

---

## Why this project

Recruiters and senior engineers look for developers who understand language internals and can write reusable, robust code. This repo demonstrates:

* Deep knowledge of closures, scopes, and functional patterns.
* Practical mastery of async flows (retries, backoff, cancellation).
* Familiarity with modern ES features (Proxies, Symbols, generators, async/await).
* Good API design, tests, and docs suitable for an open-source contribution.

## Core features (module list)

1. **deepClone** — deep clone objects and arrays, preserving prototypes and handling circular refs; optionally `immutable` mode using `Proxy` to create lazily-copied objects.
2. **debounce** — debouncer that returns a cancellable function, exposes `flush()` and `cancel()` methods.
3. **throttle** — leading/trailing configurable, cancellable with `flush()` and `cancel()`.
4. **retryAsync** — retries async functions with configurable attempts, exponential backoff, jitter, and optional timeout/cancellation token.
5. **EventEmitter** — tiny, typed (JS Doc) event emitter supporting once, off, wildcard, and async listeners.
6. **compose / pipe / curry** — functional composition helpers, `curry` with arity inference.
7. **once / memoize** — reliable memoize with cache eviction strategy (LRU optional).
8. **defer / timeoutPromise** — small helpers to create controllable timeouts for promises.

## Project structure (suggested)

```
advanced-js-utils/
├─ src/
│  ├─ deepClone.js
│  ├─ debounce.js
│  ├─ throttle.js
│  ├─ retryAsync.js
│  ├─ eventEmitter.js
│  ├─ functional.js
│  ├─ memoize.js
│  ├─ index.js
├─ test/
│  ├─ deepClone.test.js
│  ├─ debounce.test.js
│  └─ ...
├─ examples/
│  ├─ proxy-immutable.md
│  └─ retry-with-backoff.md
├─ README.md
├─ package.json
├─ .eslintrc.js
├─ .prettierrc
└─ LICENSE
```

## API examples (concise)

### deepClone

```js
import { deepClone } from 'advanced-js-utils';

const a = { x: 1, y: { z: 2 } };
const b = deepClone(a);
// b !== a; b.y !== a.y
```

### debounce

```js
import { debounce } from 'advanced-js-utils';

const save = debounce((payload) => api.save(payload), 300);

save({a:1});
// later
save.cancel();
// or
await save.flush(); // force immediate invocation and await result
```

### retryAsync

```js
import { retryAsync } from 'advanced-js-utils';

const res = await retryAsync(() => fetch('/api/data'), {
  attempts: 5,
  backoff: (attempt) => 200 * 2 ** attempt,
  jitter: true,
  timeout: 5000,
});
```

### EventEmitter

```js
const bus = new EventEmitter();

bus.on('user:login', async (u) => { await notify(u); });
bus.emit('user:login', {id:1});
```

## Design decisions & implementation notes

* Favor small, single-responsibility functions with clear return values.
* Provide both ESM and CommonJS builds via a tiny build step (rollup or microbundle).
* Avoid dependency bloat — keep the core zero-deps.
* Use `Proxy` for the optional immutable mode in `deepClone` to lazily trap mutations and copy-on-write.
* Expose cancellation tokens (simple objects or `AbortController`) where appropriate.

## Tests & quality

* Use **Vitest** or **Jest** for unit tests.
* Cover edge cases: circular references, non-enumerable props, getters/setters, `Map`/`Set`, typed arrays, Symbols.
* Add property-based tests (fast-check) for `deepClone` if you want an extra edge.
* Enforce linting and formatting (ESLint, Prettier).

## Example README badges (for visibility)

* Build / Test CI — GitHub Actions badge
* npm version (if published)
* License — MIT

## Roadmap & timeline (suggested, 2–3 week plan)

**Week 1 — Foundation (Days 1–7)**

* Day 1: Project bootstrap, tooling (ESLint, Prettier, bundler), create repo skeleton.
* Day 2–3: Implement `debounce`, `throttle`, `compose`, `pipe`, `curry` + tests.
* Day 4: Implement `EventEmitter` + tests.
* Day 5–7: Implement `retryAsync` and `timeoutPromise` + tests.

**Week 2 — Advanced features & polish (Days 8–14)**

* Day 8–9: Implement `deepClone` core with circular refs + tests.
* Day 10: Add Proxy-based immutable option and examples.
* Day 11: Implement `memoize` with LRU option + tests.
* Day 12–13: Write examples, usage docs, and publish-ready files.
* Day 14: CI, README polish, license, and release v0.1.0.

**Optional Week 3 — Extras (Days 15–21)**

* Add TypeScript types (declaration files) or fully convert to TS.
* Add benchmarks vs Lodash (small bench script).
* Add property-based tests.

## Difficulty & learning outcomes

* **Difficulty:** Intermediate → Advanced (depends on `deepClone` and Proxy work).
* **What you’ll learn:** closures, advanced function composition, Proxy internals, cancellation patterns, backoff strategies, evented async design, testing advanced edge cases.

## README / GitHub-first checklist

* Clear project description and motivation
* Badges & screenshots (examples output)
* Short, copyable installation & usage snippets
* CONTRIBUTING.md with PR and issue templates
* CODE_OF_CONDUCT.md and LICENSE (MIT recommended)

## Example `package.json` scripts

```json
{
  "scripts": {
    "build": "microbundle",
    "test": "vitest",
    "lint": "eslint . --ext .js",
    "prepublishOnly": "npm run build && npm test"
  }
}
```

## How to showcase in your portfolio

* Add a short walkthrough video (2–3 minutes) showing the API and a deep clone demo.
* Add a benchmark comparison snippet vs Lodash for a couple functions.
* Link to issues you solved and tests you wrote — recruiters appreciate test coverage.

## License

Use MIT for easy adoption and clarity.

---

If you'd like, I can also:

* Provide ready-to-copy source code for 2–3 of the core utilities (e.g., `debounce`, `retryAsync`, `deepClone` starter).
* Generate complete `README.md` in the repository root (different from this doc) or a `CONTRIBUTING.md` template.
