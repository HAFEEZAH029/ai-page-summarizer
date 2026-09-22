console.log("✅ Content script loaded");
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  
    console.log("📥 Content script got message:", message);

    if (message.type === "GET_PAGE_CONTENT") {
    const content = extractContent();
    sendResponse({ content });
  }
});

function extractContent(): string {
  // Try main article first
  const article = document.querySelector("article");

  if (article) {
    return article.innerText.slice(0, 5000); // limit size
  }

  // fallback
  return document.body.innerText.slice(0, 5000);
}