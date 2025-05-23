import {
  getOptimalSelector,
  extractElementValue,
} from "../utils/selectorUtil.js";
import { renderSelectorPanel } from "../ui/renderSelectorPanel.js";

export const selectedElements = new Set();

export function initializeElementListeners(shadowRoot, onSaveClick) {
  document.querySelectorAll("*").forEach((targetElement) => {
    targetElement.addEventListener("mouseover", onHover);
    targetElement.addEventListener("mouseout", offHover);
    targetElement.addEventListener(
      "click",
      (ev) => onClick(ev, shadowRoot, onSaveClick),
      true,
    );
  });
}

function onHover(ev) {
  if (
    ev.target.closest("#janbi-selector-panel") ||
    ev.target.closest("#janbi-schedule-ui")
  )
    return;

  ev.target.classList.add("janbi-hover");
}

function offHover(ev) {
  ev.target.classList.remove("janbi-hover");
}

function onClick(ev, shadowRoot, onSaveClick) {
  if (
    ev.target.closest("#janbi-selector-panel") ||
    ev.target.closest("#janbi-schedule-ui")
  )
    return;

  ev.preventDefault();
  ev.stopPropagation();

  const targetElement = ev.target;
  const { type, selector } = getOptimalSelector(targetElement);
  const content = extractElementValue(targetElement);

  const typedSelectorKey = `${type}:${selector}`;
  const alreadySelected = [...selectedElements].find(
    (selected) => `${selected.type}:${selected.selector}` === typedSelectorKey,
  );

  if (alreadySelected) {
    selectedElements.delete(alreadySelected);
    targetElement.classList.remove("janbi-selected");
  } else {
    selectedElements.add({ type, selector, content });
    targetElement.classList.add("janbi-selected");
  }

  renderSelectorPanel(shadowRoot, onSaveClick);
}
