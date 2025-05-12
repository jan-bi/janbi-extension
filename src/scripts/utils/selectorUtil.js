function getCssSelector(targetElement) {
  if (!targetElement || !targetElement.nodeType === Node.ELEMENT_NODE)
    return null;

  if (targetElement.id && !targetElement.id.startsWith("janbi-")) {
    return `#${CSS.escape(targetElement.id)}`;
  }

  const path = [];

  while (targetElement && targetElement.nodeType === Node.ELEMENT_NODE) {
    if (targetElement.id && !targetElement.id.startsWith("janbi-")) {
      path.unshift(`#${CSS.escape(targetElement.id)}`);

      break;
    }

    let selector = targetElement.nodeName.toLowerCase();

    const filteredClassName = [...targetElement.classList].filter(
      (className) => !className.startsWith("janbi-"),
    );

    if (filteredClassName.length > 0) {
      selector +=
        "." +
        filteredClassName.map((className) => CSS.escape(className)).join(".");
    }

    path.unshift(selector);
    targetElement = targetElement.parentElement;
  }

  return path.join(" > ");
}

function getXPath(targetElement) {
  if (!targetElement || targetElement.nodeType !== Node.ELEMENT_NODE) return "";

  if (targetElement.id && !targetElement.id.startsWith("janbi-")) {
    return `//*[@id="${targetElement.id}"]`;
  }

  const nodePath = [];

  while (targetElement && targetElement.nodeType === Node.ELEMENT_NODE) {
    if (targetElement.id && !targetElement.id.startsWith("janbi-")) {
      nodePath.unshift(`*[@id="${targetElement.id}"]`);

      break;
    }

    const tag = targetElement.nodeName.toLowerCase();
    let index = 1;
    let sibling = targetElement.previousElementSibling;

    while (sibling) {
      if (sibling.nodeName === targetElement.nodeName) {
        index++;
      }

      sibling = sibling.previousElementSibling;
    }

    nodePath.unshift(`${tag}[${index}]`);
    targetElement = targetElement.parentElement;
  }

  return "/" + nodePath.join("/");
}

function getOptimalSelector(targetElement) {
  const rootNode = targetElement.getRootNode();
  const isShadowDom = rootNode && rootNode instanceof ShadowRoot;

  if (isShadowDom) {
    return {
      type: "css",
      selector: getCssSelector(targetElement),
    };
  } else {
    return {
      type: "xpath",
      selector: getXPath(targetElement),
    };
  }
}

function getElementFromTypedSelector(typedSelector) {
  const [type, selector] = typedSelector.split(":", 2);

  if (type === "css") {
    return document.querySelector(selector);
  }

  if (type === "xpath") {
    const element = document.evaluate(
      selector,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;

    return element;
  }

  return null;
}

function extractElementValue(targetElement) {
  if (!targetElement) return "<비어있음>";
  if (targetElement.tagName?.toUpperCase() === "IMG") return targetElement.src;

  return targetElement.textContent?.trim() || "<비어있음>";
}

export {
  getCssSelector,
  getXPath,
  getOptimalSelector,
  getElementFromTypedSelector,
  extractElementValue,
};
