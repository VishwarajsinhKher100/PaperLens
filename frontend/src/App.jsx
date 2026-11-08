import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    paper_name: "",
    tech_depth: "Beginner (Simple terms & analogies)",
    reading_goal: "Quick Summary",
    length: "Medium (Balanced overview)",
  });

  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const response = await fetch("http://127.0.0.1:8000/explain-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to fetch explanation from server.",
        );
      }

      setExplanation(data.explanation);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="logo-icon">📄</div>
        <div className="header-text">
          <h1>Research Paper Explainer</h1>
          <p>Powered by LangChain & Groq AI</p>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="main-layout">
        {/* Left Column: Configuration */}
        <section className="card config-card">
          <div className="card-header">
            <span className="icon">⚙️</span>
            <h2>Configuration</h2>
          </div>

          <form onSubmit={handleSubmit} className="paper-form">
            <div className="form-group">
              <label htmlFor="paper_name">Research Paper Title or Topic</label>
              <input
                type="text"
                id="paper_name"
                name="paper_name"
                value={formData.paper_name}
                onChange={handleChange}
                placeholder="e.g., Attention Is All You Need"
                maxLength={200}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tech_depth">Technical Depth</label>
              <select
                id="tech_depth"
                name="tech_depth"
                value={formData.tech_depth}
                onChange={handleChange}
              >
                <option value="Beginner (Simple terms & analogies)">
                  Beginner (Simple terms & analogies)
                </option>
                <option value="Intermediate">
                  Intermediate (Core concepts & logic)
                </option>
                <option value="Advanced / Expert">
                  Advanced (Equations & implementation details)
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reading_goal">Reading Goal / Style</label>
              <select
                id="reading_goal"
                name="reading_goal"
                value={formData.reading_goal}
                onChange={handleChange}
              >
                <option value="Quick Summary">Quick Summary</option>
                <option value="General Overview & Key Takeaways">
                  General Overview & Key Takeaways
                </option>
                <option value="Deep Dive into Math & Code Snippets">
                  Deep Dive into Math & Code Snippets
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="length">Explanation Length</label>
              <select
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
              >
                <option value="Short (1 min read)">Short (1 min read)</option>
                <option value="Medium (Balanced overview)">
                  Medium (Balanced overview)
                </option>
                <option value="Comprehensive Detailed Breakdown">
                  Comprehensive Detailed Breakdown
                </option>
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Generating Explanation..." : "Generate Explanation"}
            </button>
          </form>
        </section>

        {/* Right Column: Explanation Output */}
        <section className="card output-card">
          <div className="card-header">
            <span className="icon">📝</span>
            <h2>Explanation Output</h2>
          </div>

          <div className="output-body">
            {error && <div className="error-box">⚠️ {error}</div>}

            {loading ? (
              <div className="placeholder-content">
                <div className="spinner"></div>
                <p>Analyzing research paper and generating insights...</p>
              </div>
            ) : explanation ? (
              <div className="explanation-content">
                <div className="explanation-text">{explanation}</div>
              </div>
            ) : (
              <div className="placeholder-content">
                <div className="telescope-icon">🔭</div>
                <p>
                  Configure your preferences on the left and click <br />
                  &quot;Generate Explanation&quot; to get started.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
