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

export function isMobileDevice() {
  const mobileDevice = [
    "Android",
    "webOS",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "Windows Phone",
  ];

  // navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  const isMobileDevice = mobileDevice.some((event) =>
    navigator.userAgent.match(event)
  );
  return isMobileDevice;
}

interface DocumentFullscreenAPI {
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
}

interface HTMLElementFullscreenAPI {
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

export function toggleFullScreen() {
  const doc = window.document as Document & DocumentFullscreenAPI;
  const docEl = doc.documentElement as HTMLElement & HTMLElementFullscreenAPI;

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullscreen ||
    docEl.msRequestFullscreen;
  const cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}
