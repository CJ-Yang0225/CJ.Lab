export enum LayerUsage {
  Background,
  Content,
  Navigation,
  Cursor,
}

export function debounce(
  callback: Function,
  wait: number,
  immediate: boolean = false
) {
  let timer: ReturnType<typeof setTimeout> | null;

  return () => {
    if (!timer && immediate) callback();

    clearTimeout(timer!);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) callback();
    }, wait);
  };
}

export function throttle(callback: Function, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null;
  let last: number;

  return () => {
    const now = new Date().getTime();

    if (last && last + wait > now) {
      clearTimeout(timer!);
      timer = setTimeout(() => {
        last = now;
        callback();
      }, wait);
    } else {
      last = now;
      callback();
    }
  };
}
