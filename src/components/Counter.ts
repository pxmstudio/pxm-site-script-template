import { ElementMap } from "../types/global";
import { store } from "../utils/countStore";

const Counter = (component: ElementMap) => {
  console.log("Counter component initialized");

  const number = component.number as HTMLElement;
  if (!number) {
    console.warn("Number element is missing");
    return;
  }

  const btnPlus = component.plus as HTMLElement;
  const btnMinus = component.minus as HTMLElement;

  // Subscribe to store changes to update the number element's text content
  const unsubscribe = store.subscribe((value) => {
    console.log("Store updated, new value:", value);
    number.textContent = value.toString();
  });

  // Increment button logic
  if (btnPlus) {
    btnPlus.addEventListener("click", () => {
      store.set(store.get() + 1); // Increment the store's value
    });
  }

  // Decrement button logic
  if (btnMinus) {
    btnMinus.addEventListener("click", () => {
      store.set(store.get() - 1); // Decrement the store's value
    });
  }

  // Optional: Unsubscribe when the component is no longer needed
  return unsubscribe;
};

export default Counter;
