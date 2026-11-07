import React, { useState } from "react";
import "./App.css";

function App() {
  const [paperName, setPaperName] = useState("");
  const [techDepth, setTechDepth] = useState("Beginner");
  const [readingGoal, setReadingGoal] = useState("Quick Summary");
  const [length, setLength] = useState("Medium");

  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setExplanation("");
    setCopied(false);

    try {
      const response = await fetch("http://localhost:8000/explain-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paper_name: paperName,
          tech_depth: techDepth,
          reading_goal: readingGoal,
          length: length,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (err) {
      setError(
        err.message ||
          "Failed to connect to the backend. Make sure FastAPI is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-icon">📄</div>
          <div>
            <h1 className="header-title">Research Paper Explainer</h1>
            <p className="header-subtitle">Powered by LangChain & Groq AI</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="app-main">
        {/* Left Column: Form Controls */}
        <section className="card form-section">
          <h2 className="section-title">⚙️ Configuration</h2>

          <form onSubmit={handleSubmit}>
            {/* Paper Name Input */}
            <div className="form-group">
              <label className="form-label">
                Research Paper Title or Topic
              </label>
              <input
                type="text"
                required
                value={paperName}
                onChange={(e) => setPaperName(e.target.value)}
                placeholder="e.g., Attention Is All You Need"
                className="form-input"
              />
            </div>

            {/* Technical Depth */}
            <div className="form-group">
              <label className="form-label">Technical Depth</label>
              <select
                value={techDepth}
                onChange={(e) => setTechDepth(e.target.value)}
                className="form-select"
              >
                <option value="Beginner">
                  Beginner (Simple terms & analogies)
                </option>
                <option value="Intermediate">
                  Intermediate (Balanced concepts)
                </option>
                <option value="Expert">
                  Expert (In-depth architecture & math)
                </option>
              </select>
            </div>

            {/* Reading Goal */}
            <div className="form-group">
              <label className="form-label">Reading Goal / Style</label>
              <select
                value={readingGoal}
                onChange={(e) => setReadingGoal(e.target.value)}
                className="form-select"
              >
                <option value="Quick Summary">Quick Summary</option>
                <option value="Detailed Literature Review">
                  Detailed Literature Review
                </option>
                <option value="Step-by-step Architecture Breakdown">
                  Step-by-step Architecture Breakdown
                </option>
              </select>
            </div>

            {/* Length */}
            <div className="form-group">
              <label className="form-label">Explanation Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="form-select"
              >
                <option value="Short">Short (Concise)</option>
                <option value="Medium">Medium (Balanced overview)</option>
                <option value="Long & Comprehensive">
                  Long & Comprehensive
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Analyzing Paper...
                </>
              ) : (
                "Generate Explanation"
              )}
            </button>
          </form>
        </section>

        {/* Right Column: Results Display */}
        <section className="card output-section">
          <div className="output-header">
            <h2 className="section-title" style={{ margin: 0 }}>
              📝 Explanation Output
            </h2>
            {explanation && (
              <button onClick={handleCopy} className="copy-btn">
                {copied ? "Copied! ✨" : "Copy Output"}
              </button>
            )}
          </div>

          <div className="output-box">
            {error && (
              <div className="error-banner">
                <span style={{ fontWeight: 600 }}>Error:</span> {error}
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p style={{ fontSize: "0.875rem" }}>
                  Synthesizing mathematical formulas & analogies...
                </p>
              </div>
            )}

            {!loading && !error && !explanation && (
              <div className="empty-state">
                <div style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>
                  🔭
                </div>
                <p style={{ fontSize: "0.875rem" }}>
                  Configure your preferences on the left and click <br />
                  "Generate Explanation" to get started.
                </p>
              </div>
            )}

            {!loading && explanation && (
              <div className="explanation-content">{explanation}</div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        Research Paper Explainer • Built with FastAPI, React, & LangChain
      </footer>
    </div>
  );
}

export default App;
