import React from "react";

export default function App() {
  const urls = ["https://www.naver.com", "https://www.instagram.com/"];

  const handleOpenDashboard = () => {
    chrome.tabs.create({ url: "http://localhost:5173/dashboard" });
  };

  const handleAddUrl = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const useCurrentPage = confirm(
      "현재 보고 있는 페이지에서 요소를 선택할까요?",
    );

    if (!useCurrentPage) {
      const url = prompt("추적할 URL을 입력하거나 해당 페이지로 이동하세요.");
      if (url) {
        return chrome.tabs.update(tab.id, { url });
      } else {
        return;
      }
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"],
    });
  };

  return (
    <div className="p-4 w-80 text-sm">
      <h1 className="text-lg font-bold text-primary mb-1">JANBI</h1>
      <p className="mb-4 text-gray-600">
        모니터링할 URL을 등록하고 주기적으로 알림받아보세요.
      </p>
      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-1">현재 모니터링 중인 URL</h2>
        <ul className="text-xs text-gray-700 list-disc pl-4 space-y-1">
          {urls.map((url, idx) => (
            <li key={idx}>
              <a href={url} target="_blank">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleAddUrl}
        className="w-full bg-primary text-white py-1 px-2 rounded mb-2 hover:bg-accent"
      >
        모니터링 URL 추가
      </button>
      <button
        onClick={handleOpenDashboard}
        className="w-full border border-gray-300 text-gray-800 py-1 px-2 rounded hover:bg-gray-100"
      >
        대시보드 열기
      </button>
    </div>
  );
}
