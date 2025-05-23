import { getElementFromTypedSelector } from "../utils/selectorUtil.js";
import { selectedElements } from "../viewmodels/ContentViewModel.js";

export function renderSelectorPanel(shadowRoot, onSaveClick) {
  const selectorPanel = shadowRoot.querySelector("#janbi-selector-panel");

  if (!selectorPanel) return;

  selectorPanel.innerHTML = "";

  const title = document.createElement("h2");
  title.className = "janbi-title";
  title.textContent = "JANBI";

  const subtitle = document.createElement("h3");
  subtitle.className = "janbi-subtitle";
  subtitle.textContent = `선택한 요소 목록 (${selectedElements.size})`;

  const listContainer = document.createElement("ul");
  listContainer.className = "janbi-list";

  [...selectedElements].forEach(({ type, selector, content }) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div style="flex: 1;">
        <div style="margin-top: 4px; font-size: 12px; color: #6b7280;">
          <strong>내용:</strong> ${content}
        </div>
      </div>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "삭제";

    removeBtn.addEventListener("click", () => {
      selectedElements.delete(
        [...selectedElements].find(
          (selected) =>
            selected.type === type && selected.selector === selector,
        ),
      );

      const targetElement = getElementFromTypedSelector(`${type}:${selector}`);
      if (targetElement) targetElement.classList.remove("janbi-selected");

      renderSelectorPanel(shadowRoot, onSaveClick);
    });

    li.appendChild(removeBtn);
    listContainer.appendChild(li);
  });

  const saveButton = document.createElement("button");
  saveButton.className = "save-button";
  saveButton.textContent = "저장하기";
  saveButton.style.cssText = `
    margin-top: 16px;
    background-color: #2536D2;
    color: white;
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  saveButton.onclick = null;
  saveButton.addEventListener("click", onSaveClick);

  selectorPanel.appendChild(title);
  selectorPanel.appendChild(subtitle);
  selectorPanel.appendChild(listContainer);
  selectorPanel.appendChild(saveButton);
}
