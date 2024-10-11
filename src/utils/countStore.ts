import { Store } from "./store";

export const store = new Store(0);

store.subscribe((value) => {
  window.count = value;
});
