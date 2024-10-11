import scanDom from "./utils/scanDom";

window.Webflow ||= [];
window.Webflow.push(async () => {
  const pxmEls = scanDom("pxm");

  console.log(pxmEls);

  if (pxmEls.keys.includes("pxm-all-total-number") && pxmEls.elements.all) {
    const module = () =>
      import(
        /* webpackChunkName: "component_all_counter" */ "./components/AllCountersTotal"
      );
    const Total = (await module()).default;

    if (Array.isArray(pxmEls.elements.all) && pxmEls.elements.all.length) {
      Total(pxmEls.elements.all[0]["total-number"] as HTMLElement);
    }
  }

  if (
    pxmEls.keys.includes("pxm-counter-component") &&
    pxmEls.elements.counter
  ) {
    const module = () =>
      import(
        /* webpackChunkName: "component_counter" */ "./components/Counter"
      );
    const Counter = (await module()).default;

    if (
      Array.isArray(pxmEls.elements.counter) &&
      pxmEls.elements.counter.length > 1
    ) {
      for (const el of pxmEls.elements.counter) {
        Counter(el);
      }
    }
  }
});
