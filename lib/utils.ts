export enum LayerUsage {
  Background,
  Content,
  Navigation,
  Cursor,
}

export function debounce<F extends (...args: any) => any>(
  this: any,
  callback: F,
  wait: number,
  immediate: boolean = false
) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: any[]) => {
    if (!timer && immediate) callback.apply(this, args);

    clearTimeout(timer!);
    timer = setTimeout(() => {
      timer = undefined;
      if (!immediate) callback.apply(this, args);
    }, wait);
  };
}

export function throttle<F extends (...args: any[]) => any>(
  this: any,
  callback: F,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let last: number;

  return (...args: any[]) => {
    const now = new Date().getTime();

    if (last && last + wait > now) {
      clearTimeout(timer!);
      timer = setTimeout(() => {
        last = now;
        callback.apply(this, args);
      }, wait);
    } else {
      last = now;
      callback.apply(this, args);
    }
  };
}
