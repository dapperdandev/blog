/**
 * Builder Pattern — sandbox
 *
 * Goal: build an HTTP request builder with a fluent API.
 *
 * Run it:   npx tsx blog/sandbox/builder-pattern.ts
 *
 * Work through the TASKs one at a time. Tests for later tasks stay
 * commented out until you get there.
 */

// ---------------------------------------------------------------------------
// PRODUCT — the thing the builder produces
// ---------------------------------------------------------------------------

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * TASK 1
 *
 * Define the Product: the finished, immutable value the builder hands back.
 *
 * Requirements:
 *   - `method`   : HttpMethod
 *   - `url`      : string — the full URL *including* the query string
 *   - `headers`  : a read-only map of header name -> value
 *   - `body`     : an optional string (already serialized)
 *
 * Make every field readonly. The Product should be a dumb, finished value:
 * no methods, no mutation, no knowledge of how it was assembled.
 */
export interface HttpRequest {
  readonly method: HttpMethod;
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body?: string;
}

// ---------------------------------------------------------------------------
// BUILDER — assembles the product step by step
// ---------------------------------------------------------------------------

/**
 * TASK 2
 *
 * The Concrete Builder skeleton. No fluent API yet — just state + `build()`.
 *
 * Requirements:
 *   - `constructor(baseUrl: string)` — the one thing a request can't do without.
 *   - Private, MUTABLE fields holding work-in-progress state:
 *       method (default 'GET'), baseUrl, headers (default {}), body (undefined).
 *   - `build(): HttpRequest` — snapshots the current state into a Product.
 *
 * The point of this task is the boundary: inside the builder everything is
 * mutable and half-finished; what comes out of `build()` is finished and frozen.
 * Two calls to `build()` must not hand back objects that share mutable state.
 */
export class HttpRequestBuilder {
  private method: HttpMethod = 'GET';
  private headers: Record<string, string> = {};
  private body?: string;

  constructor(private baseUrl: string) {}

  public setMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }

  public header(name: string, value: string): this {
    this.headers[name.toLowerCase()] = value;
    return this;
  }

  public json(payload: unknown): this {
    this.body = JSON.stringify(payload);
    this.headers['content-type'] = 'application/json';
    return this;
  }

  public build(): HttpRequest {
    return {
      method: this.method,
      url: this.baseUrl,
      headers: { ...this.headers },
      body: this.body,
    };
  }
}

/**
 * TASK 3 — add these methods to HttpRequestBuilder above.
 *
 * The Fluent API. Each step method mutates internal state and returns the
 * builder itself, so calls chain:
 *
 *   new HttpRequestBuilder(url).post().header('Accept', 'json').build()
 *
 * Implement:
 *   - `setMethod(method: HttpMethod): this`
 *   - `header(name: string, value: string): this`  — later calls overwrite earlier
 *       ones for the same name, case-insensitively ('Accept' and 'accept' are the
 *       same header). Store names lowercased.
 *   - `json(payload: unknown): this` — serializes payload to the body AND sets the
 *       content-type header to 'application/json'. A step may set more than one
 *       field; that convenience is a large part of why builders exist.
 *
 * Return type `this`, not `HttpRequestBuilder` — you'll see why in a later task.
 */

/**
 * TASK 4 — query parameters.
 *
 * Add `query(name: string, value: string | number | boolean): this`.
 *
 * Unlike headers, query params ALLOW REPEATS — `?tag=ts&tag=design` is a list,
 * not a mistake. So this step appends; it never overwrites. That means your
 * internal state can no longer be a Record<string, string>; pick a structure
 * that preserves both duplicates and insertion order.
 *
 * `build()` then assembles the final URL:
 *   - no params            -> the base URL untouched, with NO trailing '?'
 *   - one or more params   -> baseUrl + '?' + 'k=v&k=v' in insertion order
 *   - names AND values are percent-encoded with encodeURIComponent
 *     (so a space becomes %20 — note URLSearchParams would give '+' instead;
 *      both are valid on the wire, we're pinning one for testability)
 *   - non-string values are stringified ('2', 'true')
 *
 * build() must stay a pure snapshot: calling it twice must not double-append.
 */

// TASK 5 (locked) — validation in build()
// TASK 6 (locked) — a Director

// ---------------------------------------------------------------------------
// Test harness — don't edit below this line
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;

function check(name: string, actual: unknown, expected: unknown): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name}\n        expected: ${e}\n        actual:   ${a}`);
  }
}

function suite(name: string, fn: () => void): void {
  console.log(`\n${name}`);
  try {
    fn();
  } catch (err) {
    failed++;
    console.log(`  ERROR ${(err as Error).message}`);
  }
}

// --- TASK 1 tests -----------------------------------------------------------

suite('TASK 1 — Product shape', () => {
  const req: HttpRequest = {
    method: 'GET',
    url: 'https://api.example.com/users?page=2',
    headers: { accept: 'application/json' },
  } as HttpRequest;

  check('method', req.method, 'GET');
  check('url', req.url, 'https://api.example.com/users?page=2');
  check('headers', req.headers, { accept: 'application/json' });
  check('body is optional', req.body, undefined);
});

// --- TASK 2 tests -----------------------------------------------------------

suite('TASK 2 — Builder skeleton', () => {
  const builder = new HttpRequestBuilder('https://api.example.com/users');
  const req = builder.build();

  check('defaults to GET', req.method, 'GET');
  check('url comes from the constructor', req.url, 'https://api.example.com/users');
  check('headers default to empty', req.headers, {});
  check('no body by default', req.body, undefined);

  const a = builder.build();
  const b = builder.build();
  check('build() returns a fresh Product each call', a === b, false);
  check('Products do not share a headers object', a.headers === b.headers, false);
});

// --- TASK 3 tests -----------------------------------------------------------

suite('TASK 3 — Fluent API', () => {
  const b = new HttpRequestBuilder('https://api.example.com/users');

  check('setMethod returns the builder', b.setMethod('POST') === b, true);
  check('header returns the builder', b.header('Accept', 'application/json') === b, true);

  const req = b.build();
  check('method was set', req.method, 'POST');
  check('header was recorded lowercased', req.headers, { accept: 'application/json' });

  const chained = new HttpRequestBuilder('https://api.example.com/users')
    .setMethod('PUT')
    .header('X-Trace', 'abc')
    .header('x-trace', 'def')
    .build();
  check('chaining works', chained.method, 'PUT');
  check('same header set twice keeps the last value', chained.headers, { 'x-trace': 'def' });

  const posted = new HttpRequestBuilder('https://api.example.com/users')
    .setMethod('POST')
    .json({ name: 'Ada', admin: true })
    .build();
  check('json() serializes the body', posted.body, '{"name":"Ada","admin":true}');
  check('json() sets content-type', posted.headers['content-type'], 'application/json');
});

// --- TASK 4 tests -----------------------------------------------------------

suite('TASK 4 — Query params', () => {
  const base = 'https://api.example.com/users';

  check('no params, no question mark', new HttpRequestBuilder(base).build().url, base);

  check(
    'single param',
    new HttpRequestBuilder(base).query('page', 2).build().url,
    `${base}?page=2`,
  );

  check(
    'repeated names are kept, in order',
    new HttpRequestBuilder(base).query('tag', 'ts').query('tag', 'design').build().url,
    `${base}?tag=ts&tag=design`,
  );

  check(
    'booleans and numbers stringify',
    new HttpRequestBuilder(base).query('admin', true).query('limit', 10).build().url,
    `${base}?admin=true&limit=10`,
  );

  check(
    'names and values are encoded',
    new HttpRequestBuilder(base).query('q', 'a&b=c d').query('a b', 'x').build().url,
    `${base}?q=a%26b%3Dc%20d&a%20b=x`,
  );

  const reused = new HttpRequestBuilder(base).query('page', 1);
  reused.build();
  check('build() does not mutate builder state', reused.build().url, `${base}?page=1`);

  check(
    'query params do not leak into headers',
    new HttpRequestBuilder(base).query('page', 1).build().headers,
    {},
  );
});

// --- later tasks unlock here ------------------------------------------------

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exitCode = 1;
