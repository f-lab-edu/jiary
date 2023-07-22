export const isArrayEmpty = (value: unknown): boolean => {
  if (Array.isArray(value) && value.length < 1) {
    return true;
  }
  return false;
};

export const isObjectEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return true;
  }
  if (
    typeof value === 'object' &&
    value?.constructor.name === 'Object' &&
    Object.keys(value).length < 1 &&
    Object.getOwnPropertyNames(value).length < 1
  )
    return true;
  if (
    typeof value === 'object' &&
    value?.constructor.name === 'String' &&
    Object.keys(value).length < 1
  )
    return true;
  return false;
};

export const isSSR = typeof window === 'undefined';
