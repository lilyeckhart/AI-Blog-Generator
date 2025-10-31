import { useState, useRef } from "react";

function App() {
  const [topic, setTopic] = useState(""); // const for user to write topic
  const [count, setCount] = useState(100); // const for word count
  const [tone, setTone] = useState("Informative"); // const for user to pick tone from dropdown
  const [loading, setLoading] = useState(false); // shows "loading" when AI generating post
  const [output, setOutput] = useState(""); // shows output of AI post

  const outputRef = useRef(null); // for auto-scroll

  // API URL - uses localhost in development, production URL in production
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://ai-blog-generator-backend-ghav.onrender.com/generate'
    : 'http://localhost:5000/generate';

  // handles submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from reloading
    setLoading(true); // shows loading message
    setOutput(""); // clears previous output

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          count,
          tone
        })
      });

      const data = await response.json();
      setOutput(data.blogPost);

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      setOutput("Oops! An error occurred while generating the blog post.");
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  // handles regenerating post with same inputs
  const handleRegenerate = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          count,
          tone
        })
      });

      const data = await response.json();
      setOutput(data.blogPost);

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      setOutput("Oops! An error occurred while regenerating.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // handles clear button to reset form
  const handleClear = async () => {
    setTopic("");
    setTone("Informative");
    setCount(100);
    setOutput("");
    setLoading(false);
  };

  // Copy to clipboard function
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    // Could add a toast notification here
  };


  // Blog Post Display
  return (
    <div className="min-h-screen p-5 flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl w-full mx-auto relative z-10">
        
        {/* Main Card with Glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent mb-2">
              AI Blog Generator
            </h1>
            <p className="text-purple-200/80 text-lg">Create engaging content in seconds with AI</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Topic Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-100 ml-1">
                Blog Topic
              </label>
              <div className="relative">
                <input
                  title="Enter blog topic here."
                  type="text"
                  placeholder="e.g., How to brew the perfect cup of coffee"
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-100 ml-1">
                Writing Tone
              </label>
              <div className="relative">
                <select
                  title="Select tone here."
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="Informative" className="bg-gray-900">📚 Informative</option>
                  <option value="Casual" className="bg-gray-900">💬 Casual</option>
                  <option value="Funny" className="bg-gray-900">😄 Funny</option>
                  <option value="Persuasive" className="bg-gray-900">💡 Persuasive</option>
                </select>
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Word Count Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="count" className="text-sm font-semibold text-purple-100">
                  Word Count
                </label>
                <span className="text-lg font-bold text-purple-200 bg-white/10 px-4 py-1 rounded-full">
                  {count}
                </span>
              </div>
              <input
                title="Select word count here."
                id="count"
                type="range"
                name="count"
                min="10"
                max="300"
                step="50"
                value={count}
                className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb"
                onChange={(e) => setCount(Number(e.target.value))}
                required
              />
              <div className="flex justify-between text-xs text-purple-200/60">
                <span>10</span>
                <span>300</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/50"
              } text-white`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Blog Post
                </span>
              )}
            </button>

          </form>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
                <svg className="animate-spin h-5 w-5 text-purple-300 mr-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-purple-200 font-medium">Crafting your blog post...</span>
              </div>
            </div>
          )}

          {/* Output Display */}
          {output && (
            <div ref={outputRef} className="mt-8 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-purple-100">Your Blog Post</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-purple-200 text-sm font-medium transition-all duration-300"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-gray-800 whitespace-pre-line leading-relaxed">
                {output}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {output && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? "Regenerating..." : "Regenerate"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-200/60 text-sm">
            Powered by AI • Create unlimited content
          </p>
        </div>

      </div>
    </div>

  );
}

export default App;
