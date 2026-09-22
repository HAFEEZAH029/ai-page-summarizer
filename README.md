# AI Page Summarizer Chrome Extension

## 🚀 Overview

AI Page Summarizer is a Chrome Extension that extracts meaningful content from any webpage and generates a concise, structured summary using AI.

It helps users quickly understand long articles without reading everything.

---

## ✨ Features

* Extracts readable content from web pages
* Generates bullet-point summaries using AI
* Displays key insights in a clean popup UI
* Caches summaries to avoid repeated API calls
* Handles errors and loading states gracefully

---

## 🧱 Architecture

The extension follows a modular Chrome Extension (Manifest V3) architecture:

Popup (React UI)
→ sends message to Background Service Worker
→ Background injects Content Script
→ Content Script extracts page content
→ Background sends content to AI (Gemini)
→ Summary is returned to Popup

---

## 🤖 AI Integration

* Uses Google Gemini API for summarization
* API calls are handled in the **background service worker**
* Ensures API keys are not exposed in the UI layer

---

## 🔐 Security Considerations

* API keys are not stored in the frontend or content script
* Requests are handled in the background script
* Minimal permissions are used (`activeTab`, `storage`, `scripting`)

> Note: In production, API calls would be routed through a secure backend proxy for full protection of API keys.

---

## 💾 Caching Strategy

* Uses `chrome.storage.local`
* Stores summaries per URL
* Prevents duplicate API calls
* Improves performance and responsiveness

---

## ⚖️ Trade-offs

* Used background-based API calls instead of a backend to reduce complexity within the time constraint
* Limited content extraction heuristics (can be improved with readability libraries)

---

## 🔧 Setup Instructions

1. Clone the repository
2. Install dependencies

   ```
   npm install
   ```
3. Create a `.env` file:

   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Build the project

   ```
   npm run build
   ```
5. Open Chrome → `chrome://extensions/`
6. Enable Developer Mode
7. Click **Load Unpacked** → select the `dist` folder
---

## 🚀 Future Improvements

* Highlight key sections on the page
* Improve content extraction using readability algorithms
* Add user settings (summary length, tone)
* Backend proxy for enhanced security
