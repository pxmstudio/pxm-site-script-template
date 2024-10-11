type Subscriber<T> = (value: T) => void;

export class Store<T> {
  private value: T;
  private subscribers: Subscriber<T>[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  // Subscribe to changes
  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.push(subscriber);
    // Call the subscriber immediately with the current value
    subscriber(this.value);

    // Return an unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    };
  }

  // Update the store's value and notify subscribers
  set(value: T) {
    this.value = value;
    this.notify();
  }

  // Get the current value
  get() {
    return this.value;
  }

  // Notify all subscribers of the new value
  private notify() {
    this.subscribers.forEach((subscriber) => subscriber(this.value));
  }
}
