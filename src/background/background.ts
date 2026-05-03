chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("📩 Received message:", message);

  if (message.type === "SUMMARIZE_PAGE") {
    handleSummarize(sendResponse);
    return true;
  }
});


async function generateSummary(text: string): Promise<string[]> {
  const trimmed = text.slice(0, 3000);

  const response = await fetch(
   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${__GEMINI_API_KEY__}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Summarize this webpage into 5 clear bullet points.
                       - Each bullet must be a complete sentence
                       - Avoid headings like "In this article"
                       - Focus on meaningful insights

                Content:
                      ${trimmed}`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  console.log("🧠 GEMINI RAW:", data);

  const output =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return output
    .split("\n")
    .map((line: string) => line.replace(/^[-•]\s*/, "").trim())
    .filter((line: string) => line.length > 0);
}


async function handleSummarize(sendResponse: any) {
  try {
    console.log("🚀 Starting summarize flow");

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    console.log("🧭 Active tab:", tab);

    if (!tab?.id || !tab?.url) {
      sendResponse({ error: "No active tab found" });
      return;
    }

    const cacheKey = `summary_${tab.url}`;

    const cached = await chrome.storage.local.get(cacheKey);

    if (cached[cacheKey]) {
      console.log("⚡ Using cached summary");
      sendResponse({ summary: cached[cacheKey] });
      return;
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
    } catch (e) {
      console.warn("⚠️ Script injection skipped:", e);
    }

    let response;

    try {
      response = await chrome.tabs.sendMessage(tab.id, {
        type: "GET_PAGE_CONTENT"
      });
    } catch (err) {
      console.error("❌ Messaging failed:", err);
      sendResponse({ error: "Failed to connect to page" });
      return;
    }

    console.log("📄 Content received:", response);

    const pageText = response?.content;

    if (!pageText) {
      sendResponse({ error: "No readable content found" });
      return;
    }

    console.log("📄 Extracted text preview:", pageText.slice(0, 200));

    const summary = await generateSummary(pageText);

    if (!summary || summary.length === 0) {
      sendResponse({ error: "Could not generate summary" });
      return;
    }

    await chrome.storage.local.set({
      [cacheKey]: summary
    });

    sendResponse({ summary });

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    sendResponse({ error: "Failed to summarize" });
  }
}