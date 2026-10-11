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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold shadow-lg shadow-indigo-600/30">
            📄
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Research Paper Explainer
            </h1>
            <p className="text-xs text-slate-400">
              Powered by LangChain & Groq AI
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <section className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur h-fit">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400 flex items-center gap-2">
            ⚙️ Configuration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Paper Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Research Paper Title or Topic
              </label>
              <input
                type="text"
                required
                value={paperName}
                onChange={(e) => setPaperName(e.target.value)}
                placeholder="e.g., Attention Is All You Need"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Technical Depth */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Technical Depth
              </label>
              <select
                value={techDepth}
                onChange={(e) => setTechDepth(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Reading Goal / Style
              </label>
              <select
                value={readingGoal}
                onChange={(e) => setReadingGoal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Explanation Length
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="Short">Short (Concise)</option>
                <option value="Medium">Medium (Balanced overview)</option>
                <option value="Long & Comprehensive">
                  Long & Comprehensive
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing Paper...
                </>
              ) : (
                "Generate Explanation"
              )}
            </button>
          </form>
        </section>

        {/* Right Column: Results Display */}
        <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
              📝 Explanation Output
            </h2>
            {explanation && (
              <button
                onClick={handleCopy}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition border border-slate-700 cursor-pointer"
              >
                {copied ? "Copied! ✨" : "Copy Output"}
              </button>
            )}
          </div>

          <div className="flex-1 min-h-[400px] max-h-[600px] overflow-y-auto rounded-xl bg-slate-950 p-5 border border-slate-800/80">
            {error && (
              <div className="bg-red-950/50 border border-red-800 text-red-200 p-4 rounded-xl text-sm">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-3 text-slate-400 py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
                <p className="text-sm">
                  Synthesizing mathematical formulas & analogies...
                </p>
              </div>
            )}

            {!loading && !error && !explanation && (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-20">
                <div className="text-4xl mb-2">🔭</div>
                <p className="text-sm">
                  Configure your preferences on the left and click <br />
                  "Generate Explanation" to get started.
                </p>
              </div>
            )}

            {!loading && explanation && (
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {explanation}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Research Paper Explainer • Built with FastAPI, React, & LangChain
      </footer>
    </div>
  );
}

export default App;
