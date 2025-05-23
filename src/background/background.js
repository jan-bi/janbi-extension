import ENV from "../constants/env.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "POST_URL") {
    (async () => {
      try {
        const urlResponse = await fetch(`${ENV.API_BASE_URL}/urls`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(message.payload),
        });

        const registeredUrl = await urlResponse.json();
        sendResponse(registeredUrl);
      } catch (err) {
        sendResponse({ error: err.message });
      }
    })();

    return true;
  }
});
