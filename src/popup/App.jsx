import React, { useEffect, useState } from "react";
import UrlViewModel from "../viewmodels/UrlViewModel";

export default function App() {
  const urlViewModel = new UrlViewModel();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(urlViewModel.getUrls());
  }, []);

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
        onClick={() => urlViewModel.addUrl()}
        className="w-full bg-primary text-white py-1 px-2 rounded mb-2 hover:bg-accent"
      >
        모니터링 URL 추가
      </button>
      <button
        onClick={() => urlViewModel.openDashboard()}
        className="w-full border border-gray-300 text-gray-800 py-1 px-2 rounded hover:bg-gray-100"
      >
        대시보드 열기
      </button>
    </div>
  );
}
