/**
 * Applies default options to the given object.
 *
 * Creates a shallow copy of any first-level fields in `defaults` that is not in `options`.
 * @param options Partial options object.
 * @param defaults Default values.
 */
export function applyDefaults<T>(options: T, defaults: Required<T>) {
  for (const name of Object.keys(defaults) as (keyof T)[]) {
    if (options[name] === undefined) {
      (options[name] as T[keyof T]) = defaults[name];
    }
  }
}
