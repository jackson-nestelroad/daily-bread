/**
 * A map type that allows case-insensitive key lookup.
 */
export class CaseInsensitiveMap<V> extends Map<string, V> {
  public constructor(iterable?: Iterable<[string, V]>) {
    super();
    if (iterable) {
      for (const [key, value] of iterable) {
        this.set(key, value);
      }
    }
  }

  public set(key: string, value: V) {
    const newKey = this.transformKey(key);
    this.internalKeys.set(newKey, key);
    return super.set(newKey, value);
  }

  public get(key: string) {
    return super.get(this.transformKey(key));
  }

  public has(key: string) {
    return super.has(this.transformKey(key));
  }

  public delete(key: string) {
    const newKey = this.transformKey(key);
    this.internalKeys.delete(newKey);
    return super.delete(newKey);
  }

  public clear() {
    this.internalKeys.clear();
    return super.clear();
  }

  public keys() {
    return this.internalKeys.values();
  }

  public *entries(): IterableIterator<[string, V]> {
    const keys = this.internalKeys.values();
    const values = super.values();

    for (let result = values.next(); !result.done; result = values.next()) {
      yield [keys.next().value, result.value];
    }
  }

  public forEach(fn: (value: V, key: string, map: Map<string, V>) => void) {
    const entries = this.entries();
    for (let result = entries.next(); !result.done; result = entries.next()) {
      fn(result.value[1], result.value[0], this);
    }
  }

  public [Symbol.iterator]() {
    return this.entries();
  }

  private transformKey(key: string): string {
    return key.toLocaleLowerCase();
  }

  /**
   * Maps lowercase key to the key used at insertion time.
   */
  private internalKeys = new Map<string, string>();
}
