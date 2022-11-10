const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isObject(val: any) {
  return val !== null && is(val, 'Object');
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isArray(val: any): val is any[] {
  return val && Array.isArray(val);
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }
  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }
  if (isObject(val)) {
    return Object.keys(val as Object).length === 0;
  }
  return false;
}
