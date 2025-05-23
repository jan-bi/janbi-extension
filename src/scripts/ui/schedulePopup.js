export function showScheduleSelector(shadowRoot, onSelect) {
  const existing = shadowRoot.querySelector("#janbi-schedule-ui");
  if (existing) existing.remove();

  const schedulerStyleTag = document.createElement("style");
  schedulerStyleTag.textContent = `
    #janbi-schedule-ui {
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
    }

    #janbi-schedule-ui h3 {
      margin-bottom: 10px;
      font-weight: bold;
      color: #2536D2;
    }

    #janbi-schedule-ui label {
      margin-right: 8px;
    }

    #janbi-schedule-ui select {
      margin-left: 4px;
    }

    #janbi-schedule-ui .buttons {
      text-align: right;
      margin-top: 16px;
    }

    #janbi-schedule-ui button {
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }

    #janbi-cancel {
      background: #e5e7eb;
      color: #374151;
      margin-right: 8px;
    }

    #janbi-confirm {
      background: #2536D2;
      color: white;
    }
  `;
  shadowRoot.appendChild(schedulerStyleTag);

  const schedulePopup = document.createElement("div");
  schedulePopup.id = "janbi-schedule-ui";

  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"]
    .map((day) => `<option value="${day}">${day}</option>`)
    .join("");

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, "0");
    return `<option value="${hour}">${hour}</option>`;
  }).join("");

  schedulePopup.innerHTML = `
    <h3>알림 주기 설정</h3>
    <label>요일:
      <select id="janbi-day">${dayOptions}</select>
    </label>
    <label>시:
      <select id="janbi-hour">${hourOptions}</select>
    </label>
    <label>분:
      <select id="janbi-minute">
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
    </label>
    <div class="buttons">
      <button id="janbi-cancel">취소</button>
      <button id="janbi-confirm">확인</button>
    </div>
  `;

  shadowRoot.appendChild(schedulePopup);

  shadowRoot.querySelector("#janbi-confirm").addEventListener("click", () => {
    const day = shadowRoot.querySelector("#janbi-day").value;
    const hour = shadowRoot.querySelector("#janbi-hour").value;
    const minute = shadowRoot.querySelector("#janbi-minute").value;
    const time = `${hour}:${minute}`;
    schedulePopup.remove();

    onSelect(day, time);
  });

  shadowRoot.querySelector("#janbi-cancel").addEventListener("click", () => {
    schedulePopup.remove();
  });
}
