export class EventStore {
  private _listeners: (() => void)[] = [];

  add(
    target: EventTarget,
    type: Event["type"],
    listener: EventListener,
    options: AddEventListenerOptions = { passive: true }
  ) {
    target.addEventListener(type, listener, options);
    this._listeners.push(
      removeEventListener.bind(target, type, listener, options)
    );
  }

  clean() {
    this._listeners.forEach((remove) => remove());
    this._listeners.length = 0;
  }
}
