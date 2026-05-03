chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("📩 Received message:", message);

  if (message.type === "SUMMARIZE_PAGE") {
    handleSummarize(sendResponse);
    return true;
  }
});

async function generateSummary(text: string): Promise<string[]> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes articles into clear bullet points."
        },
        {
          role: "user",
          content: `Summarize this article into 5 concise bullet points. Each bullet must be a complete sentence:\n\n${text}`
        }
      ]
    })
  });

  const data = await response.json();

  const output = data.choices[0].message.content;

  return output
    .split("\n")
    .map((line: string) => line.replace(/^[-•]\s*/, "").trim())
    .filter((line: string) => line.length > 0);
}

async function handleSummarize(sendResponse: any) {
  try {
    // Step 1: Get active tab
    console.log("🚀 Starting summarize flow");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("🧭 Active tab:", tab);

    // Step 2: Ask content script for page content
    const response = await chrome.tabs.sendMessage(tab.id!, {
      type: "GET_PAGE_CONTENT"
    });

    console.log("📄 Content received:", response);

    const pageText = response.content;

    const summary = await generateSummary(pageText);

    sendResponse({ summary });

  } catch (error) {
    console.error(error);
    sendResponse({ error: "Failed to summarize" });
  }
}