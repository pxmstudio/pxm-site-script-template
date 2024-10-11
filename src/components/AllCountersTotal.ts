import { store } from "../utils/countStore";

const AllCountersTotal = (number: HTMLElement) => {
  console.log("AllCountersTotal component initialized");

  const total = number as HTMLElement;

  console.log('total: ', total);

  store.subscribe((value) => {
    console.log("Store updated, new value:", value);
    total.textContent = value.toString();
  });
};

export default AllCountersTotal;
