import React, { useState } from "react";

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
    <div className="max-w-350 mx-auto px-8 py-6 min-h-screen">
      {/* Top Header */}
      <header className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-800">
        <div className="bg-linear-to-br from-indigo-500 to-indigo-400 text-2xl p-2.5 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          📄
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Research Paper Explainer
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Powered by LangChain & Groq AI
          </p>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
        {/* Left Column: Configuration */}
        <section className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-lg">⚙️</span>
            <h2 className="text-lg font-semibold text-indigo-400">
              Configuration
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="paper_name"
                className="text-xs font-medium text-gray-300"
              >
                Research Paper Title or Topic
              </label>
              <input
                type="text"
                id="paper_name"
                name="paper_name"
                value={formData.paper_name}
                onChange={handleChange}
                placeholder="e.g., Attention Is All You Need"
                maxLength={200}
                required
                className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-gray-600 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="tech_depth"
                className="text-xs font-medium text-gray-300"
              >
                Technical Depth
              </label>
              <select
                id="tech_depth"
                name="tech_depth"
                value={formData.tech_depth}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="reading_goal"
                className="text-xs font-medium text-gray-300"
              >
                Reading Goal / Style
              </label>
              <select
                id="reading_goal"
                name="reading_goal"
                value={formData.reading_goal}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="length"
                className="text-xs font-medium text-gray-300"
              >
                Explanation Length
              </label>
              <select
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
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

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 px-4 bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-lg shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Explanation..." : "Generate Explanation"}
            </button>
          </form>
        </section>

        {/* Right Column: Explanation Output */}
        <section className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-2xl min-h-130 flex flex-col">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-lg">📝</span>
            <h2 className="text-lg font-semibold text-indigo-400">
              Explanation Output
            </h2>
          </div>

          <div className="flex-1 flex flex-col bg-[#0b0f17] border border-[#1a2234] rounded-lg p-8 relative">
            {error && (
              <div className="p-4 mb-4 bg-red-950/40 border border-red-800 text-red-200 rounded-lg text-sm">
                ⚠️ {error}
              </div>
            )}

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 gap-4">
                <div className="w-10 h-10 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-sm">
                  Analyzing research paper and generating insights...
                </p>
              </div>
            ) : explanation ? (
              <div className="flex-1 overflow-y-auto">
                <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {explanation}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 gap-3">
                <div className="text-3xl bg-[#121824] p-4 rounded-full border border-slate-800 mb-2">
                  🔭
                </div>
                <p className="text-sm leading-relaxed text-gray-400">
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
