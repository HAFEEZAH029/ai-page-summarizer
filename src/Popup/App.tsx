import { useState, useEffect } from "react";
import Header from "./components/Header";
import DefaultView from "./components/DefaultView";
import LoadingView from "./components/LoadingView";
import ErrorView from "./components/ErrorView";
import ResultView from "./components/ResultView";
import "./styles.css";

type Status = "idle" | "loading" | "success" | "error";

function App() {
  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [readingTime, setReadingTime] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setTitle(tabs[0]?.title || "Untitled Page");
    });
  }, []);

  const handleSummarize = () => {
    setStatus("loading");

    chrome.runtime.sendMessage({ type: "SUMMARIZE_PAGE" }, (response) => {
      if (response?.error) {
        setStatus("error");
        return;
      }

      setSummary(response.summary);
      setReadingTime(response.readingTime);
      setStatus("success");
    });
  };

  return (
    <div className="container">
      <Header />

      {status === "idle" && (
        <DefaultView title={title} onSummarize={handleSummarize} />
      )}

      {status === "loading" && <LoadingView />}

      {status === "error" && <ErrorView onRetry={handleSummarize} />}

      {status === "success" && (
        <ResultView summary={summary} onReset={() => setStatus("idle")} readingTime={readingTime} />
      )}
    </div>
  );
}

export default App;