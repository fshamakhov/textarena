export type MediaEvent = {
  name: string,
  target?: HTMLElement,
};

type Handler = (event?: string | MediaEvent) => void;

type Handlers = {
  [key: string]: Handler[];
};

export default class EventManager {
  handlers: Handlers = {};

  fire(event: string | MediaEvent): void {
    const eventName = typeof event === 'string' ? event : event.name;
    if (this.handlers[eventName]) {
      this.handlers[eventName].map((handler) => handler(event));
    }
  }

  subscribe(event: string, handler: Handler): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }
}
