/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Chooses and evaluates a template function from a list based on matching
 * the given `value` to a case.
 *
 * Cases are structured as `[caseValue, func]`. `value` is matched to
 * `caseValue` by strict equality. The first match is selected. Case values
 * can be of any type including primitives, objects, and symbols.
 *
 * This is similar to a switch statement, but as an expression and without
 * fallthrough.
 *
 * @example
 *
 * ```ts
 * render() {
 *   return html`
 *     ${choose(this.section, [
 *       ['home', () => <h1>Home</h1>]
 *       ['about', () => <h1>About</h1>]
 *     ],
 *     () => html`<h1>Error</h1>)}
 *   `;
 * }
 * ```
 */
export const choose = <T, V>(
  value: T,
  cases: Array<[T, () => V]>,
  defaultCase?: () => V
) => {
  for (const c of cases) {
    const caseValue = c[0];
    if (caseValue === value) {
      const fn = c[1];
      return fn();
    }
  }
  return defaultCase?.();
};
