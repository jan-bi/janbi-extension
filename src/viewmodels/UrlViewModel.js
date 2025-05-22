import ENV from "../constants/env.js";
export default class UrlViewModel {
  constructor() {
    this.urls = ["https://www.naver.com", "https://www.instagram.com/"];
  }

  getUrls() {
    return this.urls;
  }

  openDashboard() {
    chrome.tabs.create({ url: `${ENV.CLIENT_URL}` });
  }

  async addUrl() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    confirm("현재 보고 있는 페이지에서 모니터링할 요소 선택을 시작합니다.");

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"],
    });

    window.close();
  }
}
