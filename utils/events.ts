export class EventStore {
  private _listeners: (() => void)[] = [];

  constructor() {
    this.add = this.add.bind(this);
    this.clean = this.clean.bind(this);
  }

  add<E extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: E,
    listener: (this: HTMLElement, event: HTMLElementEventMap[E]) => void,
    options: AddEventListenerOptions = { passive: true }
  ) {
    target.addEventListener(type, listener as EventListener, options);
    this._listeners.push(
      removeEventListener.bind(target, type, listener as EventListener, options)
    );
  }

  clean() {
    this._listeners.forEach((remove) => remove());
    this._listeners.length = 0;
  }
}
