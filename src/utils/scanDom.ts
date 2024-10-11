import { ElementMap } from "../types/global";

const scanDom = (prefix: string) => {
  const elementsWithPrefix: {
    [key: string]: HTMLElement;
  }[] = [];

  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    for (const attr of Array.from(element.attributes)) {
      if (attr.name.includes(prefix)) {
        elementsWithPrefix.push({
          [`${attr.name}-${attr.value}`]: element as HTMLElement,
        });
        break;
      }
    }
  });

  const keys = elementsWithPrefix.map((el) => Object.keys(el)[0]);

  // Helper function to create a nested structure with arrays for the first level
  const nestElements = (
    keys: string[],
    elements: { [key: string]: HTMLElement }[]
  ): ElementMap => {
    const nestedMap: { [key: string]: ElementMap[] } = {}; // Top-level is an object with arrays for each prefix

    elements.forEach((el, idx) => {
      const key = keys[idx];
      const parts = key.split("-"); // Split the attribute name by '-'

      // The first part (after the prefix) will be the key (e.g., 'counter')
      const firstPart = parts[1];

      // The rest will be the sub-elements (e.g., 'component', 'number', etc.)
      const lastPart = parts
        .slice(2)
        .join("-")
        .replace(prefix + "-", "");

      // Initialize the array if this is the first time encountering the prefix
      if (!nestedMap[firstPart]) {
        nestedMap[firstPart] = [];
      }

      // Check if this element belongs to the last object in the array or if a new object should be created
      const currentIndex = nestedMap[firstPart].length - 1;
      let targetObject = nestedMap[firstPart][currentIndex];

      // If there is no object in the array or we need a new one, create a new object
      if (!targetObject || targetObject[lastPart]) {
        targetObject = {};
        nestedMap[firstPart].push(targetObject);
      }

      // Assign the element to the appropriate key inside the object (e.g., 'component')
      targetObject[lastPart] = el[key];
    });

    return nestedMap;
  };

  const nestedElements = nestElements(keys, elementsWithPrefix);

  return {
    keys,
    elements: nestedElements,
  };
};

export default scanDom;
