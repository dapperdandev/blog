---
title: The Long Road to Modern Angular - An AngularJS Upgrade Story
description: How we migrated a large AngularJS app to modern Angular over 5+ years using the Shell Strategy
tags:
  - angularjs
  - angular
  - migration
  - webdev
---

## The Challenge

Migrating a large AngularJS application to modern Angular isn't a rewrite — it's a years-long
coexistence. This is the story of how we did it using the **Shell Strategy**, a variant of Martin
Fowler's [Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html), where
Angular wraps AngularJS and gradually consumes it route by route.

The [Shell Strategy](https://www.codurance.com/publications/migrating-angularjs-to-angular) works by
making Angular the parent application. Both frameworks run side-by-side with their own routers —
AngularJS's ui-router and Angular's @angular/router — and the URL determines which app renders.
Routes and components are migrated bottom-up (leaf nodes first) until AngularJS can be removed
entirely.

---

## Prehistory (2020)

### May 2020 — Hybrid Proof of Concept

It started with an `ExampleComponent`. We set up Angular/AngularJS hybrid bootstrapping via
`@angular/upgrade/static` as part of a PDF Viewer upgrade. This wasn't a migration attempt — just a
demonstration that the two frameworks could coexist.

### Jun 2020 — First TypeScript in AngularJS

We converted an AngularJS filter to TypeScript, marking the first use of TypeScript within the
legacy codebase. A small but symbolic step.

### Nov 2020 — AngularJS Upgraded to Latest 1.x

Brought AngularJS to its final major version, ensuring the legacy side was as current as possible.

Then... silence. For over three years.

---

## False Starts (2024)

### Jan 2024 — Reviving the Hybrid

We dusted off the hybrid setup and jumped Angular from `^8.2.14` to `^14.3.0`, then quickly
leapfrogged to Angular 17. Modern features like the new control flow syntax and signals were now
available — but still no actual feature migration.

---

## The Real Upgrade Begins (Jun 2024)

### Jun 2024 — Implementing the Shell Strategy

This was the official start. Angular became the parent application that bootstraps AngularJS via
`UpgradeModule`. Both app roots lived side-by-side in `index.html`:

```html
<div id="wrap">
  <app-root></app-root>
  <ui-view></ui-view>
</div>
```

Angular bootstrapped first via `platformBrowserDynamic()`, then used an `APP_INITIALIZER` to load
AngularJS config and bootstrap AngularJS from within Angular:

```typescript
@NgModule({
  imports: [BrowserModule, HttpClientModule, UpgradeModule, RouterModule.forRoot(routes)],
  providers: [
    { provide: UrlHandlingStrategy, useClass: NgxUrlHandlingStrategy },
    { deps: ['$injector'], provide: 'Auth0Service', useFactory: (i) => i.get('Auth0Service') },
  ],
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}
```

A custom `UrlHandlingStrategy` was the routing gatekeeper — Angular only processed routes it knew
about, letting AngularJS handle everything else:

```typescript
export class NgxUrlHandlingStrategy implements UrlHandlingStrategy {
  private routeRegistry = inject(RouteRegistryService);

  public shouldProcessUrl(url: UrlTree): boolean {
    return this.routeRegistry.hasRoute(url.toString());
  }

  public extract(url: UrlTree): UrlTree {
    return url;
  }
  public merge(url: UrlTree, whole: UrlTree): UrlTree {
    return url;
  }
}
```

### Jul 2024 — First Pages Ported

Policy and EULA pages were chosen as low-risk, low-complexity starting points to validate the shell
strategy in production.

### Jul 2024 — Going Standalone

We dropped NgModules in favor of Angular's standalone component architecture almost immediately. A
forward-thinking decision that aligned with Angular's direction and dramatically simplified the
migration path for every component that followed.

---

## Building Momentum (Sep–Nov 2024)

### Sep 2024 — Angular 17 → 18

Staying on the latest version ensured access to new APIs and avoided accumulating upgrade debt
during active migration.

### Oct 2024 — The Auth0 Pivot

Porting the authentication layer from AngularJS to Angular was the critical unlock. Many pages
couldn't migrate until auth was handled on the Angular side. This single change opened the
floodgates for the next wave of page migrations.

### Nov 2024 — PrimeNG Added

Adopted PrimeNG as the UI component library, giving the team a rich, modern toolkit instead of
recreating AngularJS UI patterns from scratch.

---

## Modernizing Patterns (Jan–Mar 2025)

### Jan 2025 — Signals Adoption

We upgraded from observables to Angular signals for reactive state management. This marked the shift
from just "porting" AngularJS code to writing idiomatic modern Angular.

### Jan 2025 — Angular 18 → 19

Another framework version bump during active migration, taking advantage of signal improvements and
other Angular 19 features.

### Mar 2025 — Strict Compiler Options

Turned on `strictTemplates` and other compiler checks — a quality gate that enforced type safety
across all Angular templates. The codebase was mature enough to handle strict mode.

---

## The Long Grind (Apr–Nov 2025)

Months of page-by-page migration: SysAdmin pages, Organizations, Users, Network, Dashboard,
Integrations, Add-Ons, Request Records, Carequality, Identity Providers, IP Whitelists, and more.
Dozens of PRs. The unsexy but essential bulk of the work.

### Nov 2025 — ui-router Removed

The AngularJS router was finally ripped out. All routes now handled by `@angular/router`. A point of
no return.

---

## The Finish Line

### Dec 2025 — "The Moment We've All Been Waiting For"

**246 files changed. 16,238 lines deleted.**

AngularJS removed entirely from the application. The shell had fully consumed its host. Five and a
half years after the first `ExampleComponent`.

### Dec 2025 — AppNgx Renamed to src

Eliminated the dual-directory structure that had existed since the hybrid setup. The Angular app was
no longer "the new app" — it was just _the_ app.

### Feb 2026 — Webpack → esbuild

Final build tool modernization. With AngularJS gone, Webpack was no longer needed. Migrating to
Angular's native esbuild toolchain completed the full stack modernization.

---

## Lessons Learned

1. **The Shell Strategy works.** Running both frameworks side-by-side with a custom
   `UrlHandlingStrategy` let us migrate incrementally without ever doing a big-bang rewrite.

2. **Start with the lowest-risk pages.** Policy and EULA pages first. Build confidence in the
   pattern before tackling complex features.

3. **Unblock dependencies early.** Auth0 was the critical blocker — porting it unlocked everything
   else.

4. **Stay current during migration.** We upgraded Angular 14 → 17 → 18 → 19 _while_ migrating. It
   sounds risky, but falling behind would have been worse.

5. **Go standalone immediately.** Dropping NgModules early simplified every component that came
   after.

6. **The grind is the work.** The exciting milestones are the bookends. The real migration is dozens
   of PRs, page by page, month after month.

7. **Delete with confidence.** The most satisfying commit was 16,238 lines deleted. Don't carry dead
   code.

---

## Resources

- [Migrating AngularJS to Angular with a Hybrid Application — Codurance](https://www.codurance.com/publications/migrating-angularjs-to-angular)
- [Martin Fowler — Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Angular Migration and the Strangler Fig — Ten Mile Square](https://tenmilesquare.com/resources/software-development/angular-migration-and-the-strangler-fig/)
- [Strangler Fig Pattern — Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
