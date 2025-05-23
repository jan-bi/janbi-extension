import { getElementFromTypedSelector } from "../utils/selectorUtil.js";
import { selectedElements } from "../viewmodels/ContentViewModel.js";

let selectorPanel = document.querySelector("#janbi-selector-panel");

if (!selectorPanel) {
  selectorPanel = document.createElement("div");
  selectorPanel.id = "janbi-selector-panel";
  document.body.appendChild(selectorPanel);
}

const saveButton = document.createElement("button");
saveButton.textContent = "저장하기";
saveButton.style.cssText = `
  position: absolute;
  top: 14px;
  right: 20px;
  padding: 6px 12px;
  background-color: #2536D2;
  color: white;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export function renderSelectorPanel() {
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
          (el) => el.type === type && el.selector === selector,
        ),
      );

      const targetElement = getElementFromTypedSelector(`${type}:${selector}`);
      if (targetElement) targetElement.classList.remove("janbi-selected");

      renderSelectorPanel();
    });

    li.appendChild(removeBtn);
    listContainer.appendChild(li);
  });

  selectorPanel.appendChild(title);
  selectorPanel.appendChild(subtitle);
  selectorPanel.appendChild(listContainer);
  selectorPanel.appendChild(saveButton);
}

export { selectorPanel, saveButton };
