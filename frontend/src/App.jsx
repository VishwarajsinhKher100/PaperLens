import React, { useState, useEffect } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [formData, setFormData] = useState({
    paper_name: "",
    tech_depth: "Beginner (Simple terms & analogies)",
    reading_goal: "Quick Summary",
    length: "Medium (Balanced overview)",
  });

  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    try {
      let response;
      if (isLoginMode) {
        const details = new URLSearchParams();
        details.append("username", authEmail);
        details.append("password", authPassword);

        response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: details,
        });
      } else {
        response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: authEmail, password: authPassword }),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = Array.isArray(data.detail)
          ? data.detail.map((err) => err.msg).join(", ")
          : data.detail || "Authentication failed";
        throw new Error(errorMsg);
      }

      if (isLoginMode) {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
      } else {
        alert("Registration successful! Please log in.");
        setIsLoginMode(true);
      }
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setHistory([]);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setHistory(data.history);
    } catch (err) {
      console.error("Failed to load history");
    }
  };

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setExplanation("");
    setIsBookmarked(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/explain-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.detail || "Failed to fetch explanation");

      setExplanation(data.explanation);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (!explanation) return;
    setSaving(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/save-explanation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            explanation,
            is_bookmarked: isBookmarked ? 1 : 0,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to save history.");
      alert("Saved successfully!");
      fetchHistory();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-[#121824] border border-slate-800 rounded-xl shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-2 text-center">
          {isLoginMode ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Research Paper Explainer AI
        </p>

        {authError && (
          <div className="p-3 mb-4 bg-red-950/40 border border-red-800 text-red-200 rounded-lg text-xs">
            ⚠️ {authError}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            required
            className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="Password (min 8 chars, 1 number)"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            required
            className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm shadow-lg shadow-indigo-500/30 transition-all"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="text-xs text-center text-gray-400 mt-6 cursor-pointer"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-350 mx-auto px-8 py-6 min-h-screen">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="bg-linear-to-br from-indigo-500 to-indigo-400 text-2xl p-2.5 rounded-xl text-white shadow-lg">
            📄
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Research Paper Explainer
            </h1>
            <p className="text-sm text-gray-400">
              Powered by LangChain & Groq AI
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-200 text-sm rounded-lg border border-slate-700"
          >
            {showHistory ? "New Explanation" : `History (${history.length})`}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 text-red-300 text-sm rounded-lg border border-red-800"
          >
            Logout
          </button>
        </div>
      </header>

      {showHistory ? (
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-lg font-semibold text-indigo-400 mb-4">
            Saved History & Bookmarks
          </h2>
          <div className="flex flex-col gap-4">
            {history.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No saved explanations yet.
              </p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#0b0f17] border border-slate-800 rounded-lg flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white text-sm">
                      {item.paper_name}
                    </h3>
                    {item.is_bookmarked === 1 && (
                      <span className="text-amber-400 text-xs">
                        ⭐ Bookmarked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    Goal: {item.reading_goal} | Depth: {item.tech_depth}
                  </p>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                    {item.explanation}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
          <section className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-lg">⚙️</span>
              <h2 className="text-lg font-semibold text-indigo-400">
                Configuration
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-300">
                  Research Paper Title or Topic
                </label>
                <input
                  type="text"
                  name="paper_name"
                  value={formData.paper_name}
                  onChange={handleChange}
                  placeholder="e.g., Attention Is All You Need"
                  required
                  className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-300">
                  Technical Depth
                </label>
                <select
                  name="tech_depth"
                  value={formData.tech_depth}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm"
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
                <label className="text-xs font-medium text-gray-300">
                  Reading Goal / Style
                </label>
                <select
                  name="reading_goal"
                  value={formData.reading_goal}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm"
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
                <label className="text-xs font-medium text-gray-300">
                  Explanation Length
                </label>
                <select
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 rounded-lg border border-[#2a3447] bg-[#0b0f17] text-gray-100 text-sm"
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
                className="mt-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg shadow-lg"
              >
                {loading ? "Generating Explanation..." : "Generate Explanation"}
              </button>
            </form>
          </section>

          <section className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-2xl h-150 flex flex-col">
            <div className="flex items-center gap-2.5 mb-6 shrink-0">
              <span className="text-lg">📝</span>
              <h2 className="text-lg font-semibold text-indigo-400">
                Explanation Output
              </h2>
            </div>
            <div className="flex-1 flex flex-col bg-[#0b0f17] border border-[#1a2234] rounded-lg p-6 relative overflow-hidden">
              {error && (
                <div className="p-4 mb-4 bg-red-950/40 border border-red-800 text-red-200 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 gap-4">
                  <div className="w-10 h-10 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-sm">Analyzing research paper...</p>
                </div>
              ) : explanation ? (
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                      {explanation}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 shrink-0">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isBookmarked ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-[#0b0f17] border-slate-700 text-gray-300"}`}
                    >
                      {isBookmarked ? "⭐ Bookmarked" : "☆ Bookmark Insight"}
                    </button>
                    <button
                      disabled={saving}
                      onClick={handleSaveToHistory}
                      className="ml-auto px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium"
                    >
                      {saving ? "Saving..." : "Save to History"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 gap-3">
                  <div className="text-3xl bg-[#121824] p-4 rounded-full border border-slate-800 mb-2">
                    🔭
                  </div>
                  <p className="text-sm text-gray-400">
                    Configure your preferences and click &quot;Generate
                    Explanation&quot;
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
