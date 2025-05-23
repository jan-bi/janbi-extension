import injectStyle from "./ui/injectStyle.js";
import {
  initializeElementListeners,
  selectedElements,
} from "./viewmodels/ContentViewModel.js";
import { showScheduleSelector } from "./ui/schedulePopup.js";
import { saveButton } from "./ui/renderSelectorPanel.js";

const SLACK_CLIENT_ID = "8781626901141.8768958611191";
const REDIRECT_URI =
  "https://janbi-server-production.up.railway.app/auth/slack/oauth/callback";

injectStyle();
initializeElementListeners();

saveButton.addEventListener("click", async () => {
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
      selectors: [...selectedElements],
    };

    chrome.runtime.sendMessage(
      {
        type: "POST_URL",
        payload: urlData,
      },
      (response) => {
        if (response?.data?._id) {
          const urlId = response.data._id;

          alert(
            "모니터링 할 요소가 성공적으로 저장되었습니다. 슬랙 채널을 설정해주세요.",
          );

          const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=chat:write,incoming-webhook&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${urlId}`;
          window.open(slackAuthUrl, "_blank", "width=600,height=800");

          selectedElements.clear();
          document
            .querySelectorAll(".janbi-selected")
            .forEach((selectedElement) =>
              selectedElement.classList.remove("janbi-selected"),
            );
        } else {
          alert("모니터링 요소 저장에 실패했습니다." + response?.message);
        }
      },
    );
  });
});
