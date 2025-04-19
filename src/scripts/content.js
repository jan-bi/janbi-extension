const selectedElements = new Set();

const styleTag = document.createElement("style");

styleTag.textContent = `
  .janbi-hover {
    outline: 2px dashed #2536D2 !important;
    cursor: crosshair !important;
  }

  .janbi-selected {
    outline: 2px solid rgba(61, 61, 60, 0.35) !important;
    background-color: rgba(255, 250, 200, 0.55) !important;
  }

  #janbi-selector-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
    padding: 14px 20px;
    font-size: 14px;
    z-index: 999999;
    max-height: 180px;
    overflow-y: auto;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
  }

  #janbi-selector-panel .janbi-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: bold;
    color: #2536D2;
  }

  #janbi-selector-panel .janbi-subtitle {
    margin: 8px 0 10px;
    font-size: 13px;
    color: #4b5563;
  }

  #janbi-selector-panel .janbi-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #janbi-selector-panel li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 13px;
    background: #fff;
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    word-break: break-all;
  }

  #janbi-selector-panel button.remove {
    margin-left: 12px;
    color: #ef4444;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }

  #janbi-selector-panel button.remove:hover {
    color: #dc2626;
  }
`;

document.head.appendChild(styleTag);

const panel = document.createElement("div");

panel.id = "janbi-selector-panel";
document.body.appendChild(panel);

document.querySelectorAll("*").forEach((targetElement) => {
  targetElement.addEventListener("mouseover", onHover);
  targetElement.addEventListener("mouseout", offHover);
  targetElement.addEventListener("click", onClick, true);
});

function onHover(ev) {
  if (ev.target.closest("#janbi-selector-panel")) return;

  ev.target.classList.add("janbi-hover");
}

function offHover(ev) {
  ev.target.classList.remove("janbi-hover");
}

function onClick(ev) {
  if (ev.target.closest("#janbi-selector-panel")) return;

  ev.preventDefault();
  ev.stopPropagation();

  const targetElement = ev.target;
  const selector = getSelector(targetElement);

  if (selectedElements.has(selector)) {
    selectedElements.delete(selector);
    targetElement.classList.remove("janbi-selected");
  } else {
    selectedElements.add(selector);
    targetElement.classList.add("janbi-selected");
  }

  updateSelectorPanel();
}

function getSelector(targetElement) {
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
      (className) => !className.startsWith("janbi-")
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


function updateSelectorPanel() {
  let selectorPanel = document.querySelector("#janbi-selector-panel");

  if (!selectorPanel) {
    selectorPanel = document.createElement("div");
    selectorPanel.id = "janbi-selector-panel";

    document.body.appendChild(selectorPanel);
  }

  const selectorList = [...selectedElements].map(
    (selector) =>
      `<li>${selector}<button class="remove" title="삭제" data-selector="${selector}">삭제</button></li>`,
  );

  selectorPanel.innerHTML = `
    <h2 class="janbi-title">JANBI</h2>
    <h3 class="janbi-subtitle">선택한 요소 목록 (${selectedElements.size})</h3>
    <ul class="janbi-list">${selectorList.join("")}</ul>
  `;

  selectorPanel.querySelectorAll("button.remove").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const selector = ev.target.dataset.selector;

      selectedElements.delete(selector);

      const targetElement = document.querySelector(selector);

      if (targetElement) {
        targetElement.classList.remove("janbi-selected");
      }

      updateSelectorPanel();
    });
  });
}
