import { useEffect } from "react";
import ENV from "../constants/env.js";

export default function Options() {
  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch(`${ENV.API_BASE_URL}/user/profile`, {
        credentials: "include",
      });

      if (response.ok) {
        const { user } = await response.json();

        chrome.runtime.sendMessage({ type: "LOGIN_SUCCESS", user });
      }
    };

    checkLogin();
  }, []);

  const startLogin = () => {
    window.location.href = `${ENV.API_BASE_URL}/auth/google`;
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">JANBI 로그인</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={startLogin}
      >
        Google 로그인
      </button>
    </div>
  );
}
