export const throttle = <T extends unknown[]>(
  callback: (...params: T) => void,
  delay: number
) => {
  let wait = false;
  return (...params: T) => {
    if (wait) {
      return;
    }
    callback(...params);
    wait = true;
    window.setTimeout(() => {
      wait = false;
    }, delay);
  };
};

export const debounce = <T extends unknown[]>(
  callback: (...params: T) => void,
  delay: number
) => {
  let timeout: number;
  return (...params: T) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => callback.apply(this, params), delay);
    return timeout;
  };
};
