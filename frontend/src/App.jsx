import React, { useState, useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { CopyToClipboard } from "react-copy-to-clipboard";

const App = () => {
  const [code, setCode] = useState(
    `Hello my Name is Ritik Paste Your Code Here 👋👋`
  );
  const [review, setReview] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    try {
      setLoading(true);
      setError(""); // Reset error state
      const response = await axios.post(import.meta.env.VITE_APP_API_URL, {
        code,
      });
      setReview(response.data);
    } catch (err) {
      setError("Error fetching review. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      {/* Left Section (Code Editor) */}
      <div className="left">
        <div className="editor-container">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              borderRadius: "5px",
              height: "100%",
              width: "100%",

              color: "#ccc",
            }}
          />
        </div>
        <button onClick={reviewCode} className="review-btn" disabled={loading}>
          {loading ? "Generating..." : "Get Code Review"}
        </button>
      </div>

      {/* Right Section (Code Review Output) */}
      <div className="right">
        <h3>🔍 Code Review</h3>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
};

export default App;
