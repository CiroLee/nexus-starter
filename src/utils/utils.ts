export function delay(ms: number): Promise<void>;
export function delay<T>(ms: number, fn: () => T): Promise<T>;
export function delay<T>(ms: number, fn?: () => T): Promise<T | void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fn) {
        resolve(fn());
      } else {
        resolve();
      }
    }, ms);
  });
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}
