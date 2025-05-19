import React, { useEffect, useState } from "react";
import UrlViewModel from "../viewmodels/UrlViewModel";
import { API_BASE_URL, CLIENT_URL } from "../constants/env";

export default function App() {
  const urlViewModel = new UrlViewModel();
  const [urls, setUrls] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndUrls = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/profile`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            setUser(data.user);
            const userUrls = urlViewModel.getUrls();
            setUrls(userUrls);
          }
        } else {
          const dashboardLoginUrl = `${CLIENT_URL}/login`;

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
              chrome.tabs.update(tabs[0].id, { url: dashboardLoginUrl });
            }
          });
        }
      } catch {
        alert("로그인에 실패하였습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadUserAndUrls();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      alert("로그아웃에 실패하였습니다.", error);
    } finally {
      alert("로그아웃되었습니다.");
    }
  };

  if (loading) {
    return (
      <div className="p-4 w-80">
        <p>Loading</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 w-80">
        <h2 className="text-lg font-semibold mb-2">로그인이 필요합니다</h2>
        <button
          onClick={() => {
            chrome.tabs.create({ url: `${CLIENT_URL}` });
          }}
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 w-80 text-sm">
      <h1 className="text-lg font-bold text-primary mb-1">JANBI</h1>
      <p className="mb-4 text-gray-600">
        모니터링할 URL을 등록하고 주기적으로 알림받아보세요.
      </p>

      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-1">현재 모니터링 중인 URL</h2>
        {urls.length === 0 ? (
          <p className="text-xs text-gray-500">등록된 URL이 없습니다.</p>
        ) : (
          <ul className="text-xs text-gray-700 list-disc pl-4 space-y-1">
            {urls.map((url, idx) => (
              <li key={idx}>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
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
      <button
        onClick={handleLogout}
        className="w-full border border-red-300 text-red-600 py-1 px-2 rounded hover:bg-red-50"
      >
        로그아웃
      </button>
    </div>
  );
}
