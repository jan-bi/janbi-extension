export function showScheduleSelector(onSelect) {
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

  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"]
    .map((day) => `<option value="${day}">${day}</option>`)
    .join("");

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, "0");
    return `<option value="${hour}">${hour}</option>`;
  }).join("");

  schedulePopup.innerHTML = `
  <h3 style="margin-bottom: 10px; font-weight: bold; color: #2536D2;">알림 주기 설정</h3>
  <label style="margin-right: 8px;">요일:
    <select id="janbi-day">
      ${dayOptions}
    </select>
  </label>
  <label style="margin-right: 8px;">시:
    <select id="janbi-hour">
      ${hourOptions}
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
