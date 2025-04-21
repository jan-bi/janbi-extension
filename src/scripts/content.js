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
    width: 3rem;
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

const selectorPanel = document.createElement("div");

selectorPanel.id = "janbi-selector-panel";
document.body.appendChild(selectorPanel);

document.querySelectorAll("*").forEach((targetElement) => {
  targetElement.addEventListener("mouseover", onHover);
  targetElement.addEventListener("mouseout", offHover);
  targetElement.addEventListener("click", onClick, true);
});

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

function onClick(ev) {
  if (
    ev.target.closest("#janbi-selector-panel") ||
    ev.target.closest("#janbi-schedule-ui")
  )
    return;

  ev.preventDefault();
  ev.stopPropagation();

  const targetElement = ev.target;
  const { type, selector } = getOptimalSelector(targetElement);
  const typedSelectorKey = `${type}:${selector}`;

  if (selectedElements.has(typedSelectorKey)) {
    selectedElements.delete(typedSelectorKey);
    targetElement.classList.remove("janbi-selected");
  } else {
    selectedElements.add(typedSelectorKey);
    targetElement.classList.add("janbi-selected");
  }

  updateSelectorPanel();
}

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

function updateSelectorPanel() {
  selectorPanel.innerHTML = "";

  const title = document.createElement("h2");
  title.className = "janbi-title";
  title.textContent = "JANBI";

  const subtitle = document.createElement("h3");
  subtitle.className = "janbi-subtitle";
  subtitle.textContent = `선택한 요소 목록 (${selectedElements.size})`;

  const listContainer = document.createElement("ul");
  listContainer.className = "janbi-list";

  [...selectedElements].forEach((typedSelector) => {
    const [type, selector] = typedSelector.split(":", 2);

    const li = document.createElement("li");
    li.innerHTML = `[${type.toUpperCase()}] ${selector}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "삭제";
    removeBtn.dataset.selector = typedSelector;

    removeBtn.addEventListener("click", () => {
      selectedElements.delete(typedSelector);

      const targetElement = getElementFromTypedSelector(typedSelector);

      if (targetElement) {
        targetElement.classList.remove("janbi-selected");
      }

      updateSelectorPanel();
    });

    li.appendChild(removeBtn);
    listContainer.appendChild(li);
  });

  selectorPanel.appendChild(title);
  selectorPanel.appendChild(subtitle);
  selectorPanel.appendChild(listContainer);
  selectorPanel.appendChild(saveButton);
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
saveButton.addEventListener("click", onSaveSelectors);
selectorPanel.appendChild(saveButton);

async function onSaveSelectors() {
  if (selectedElements.size === 0) {
    alert("선택한 요소가 없습니다.");

    return;
  }

  const name = prompt("이 URL의 이름을 입력해주세요:");
  if (!name) return;

  showScheduleSelector(async (dayOfWeek, scheduleTime) => {
    const urlData = {
      name,
      url: location.href,
      dayOfWeek,
      scheduleTime,
      selectors: [...selectedElements].map((typedSelector) => {
        const [type, selector] = typedSelector.split(":", 2);

        return { type, selector };
      }),
    };

    try {
      const res = await fetch("http://localhost:3000/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(urlData),
      });

      const savedResult = await res.json();

      if (savedResult?.data) {
        alert("요소가 성공적으로 저장되었습니다");

        selectedElements.clear();
        document
          .querySelectorAll(".janbi-selected")
          .forEach((el) => el.classList.remove("janbi-selected"));
        updateSelectorPanel();
      } else {
        alert("저장 실패: " + savedResult.message);
      }
    } catch {
      alert("서버에 오류가 발생했습니다.");
    }
  });
}

function showScheduleSelector(onSelect) {
  const existing = document.querySelector("#janbi-schedule-ui");
  if (existing) existing.remove();

  const schedulePopup = document.createElement("div");
  schedulePopup.id = "janbi-schedule-ui";
  schedulePopup.style.cssText = `
    position: fixed;
    bottom: 200px;
    left: 20px;
    background: white;
    border: 1px solid #ccc;
    padding: 16px;
    z-index: 999999;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    font-size: 14px;
    width: 300px;
  `;

  schedulePopup.innerHTML = `
    <h3 style="margin-bottom: 10px; font-weight: bold; color: #2536D2;">알림 주기 설정</h3>
    <label style="margin-right: 8px;">요일:
      <select id="janbi-day">
        ${["월", "화", "수", "목", "금", "토", "일"]
          .map((day) => `<option value="${day}">${day}</option>`)
          .join("")}
      </select>
    </label>
    <label style="margin-right: 8px;">시:
      <select id="janbi-hour">
        ${Array.from(
          { length: 24 },
          (_, i) =>
            `<option value="${String(i).padStart(2, "0")}">${String(i).padStart(2, "0")}</option>`,
        ).join("")}
      </select>
    </label>
    <label>분:
      <select id="janbi-minute" style="margin-left: 4px;">
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
    </label>
    <div style="text-align: right; margin-top: 16px;">
      <button id="janbi-cancel" style="
        background: #e5e7eb;
        color: #374151;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        margin-right: 8px;
        cursor: pointer;
      ">취소</button>
      <button id="janbi-confirm" style="
        background: #2536D2;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
      ">확인</button>
    </div>
  `;

  document.body.appendChild(schedulePopup);

  document.querySelector("#janbi-confirm").addEventListener("click", () => {
    const day = document.querySelector("#janbi-day").value;
    const hour = document.querySelector("#janbi-hour").value;
    const minute = document.querySelector("#janbi-minute").value;
    const time = `${hour}:${minute}`;
    schedulePopup.remove();

    onSelect(day, time);
  });

  document.querySelector("#janbi-cancel").addEventListener("click", () => {
    schedulePopup.remove();
  });
}
