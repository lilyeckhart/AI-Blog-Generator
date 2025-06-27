import { useState, useRef } from "react";

function App() {
  const [topic, setTopic] = useState(""); // const for user to write topic
  const [count, setCount] = useState(100); // const for word count
  const [tone, setTone] = useState("Informative"); // const for user to pick tone from dropdown
  const [loading, setLoading] = useState(false); // shows "loading" when AI generating post
  const [output, setOutput] = useState(""); // shows output of AI post

  const outputRef = useRef(null); // for auto-scroll

  // handles submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from reloading
    setLoading(true); // shows loading message
    setOutput(""); // clears previous output

    try {
      const response = await fetch("https://ai-blog-generator-backend-ghav.onrender.com/generate", {
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
      const response = await fetch("https://ai-blog-generator-backend-ghav.onrender.com/generate", {
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


  // Blog Post Display
  return (
    <div className="min-h-screen p-5 flex justify-center items-center bg-gray-100">
      <div className="max-w-2xl w-full mx-auto p-10 bg-blue-200 shadow-md rounded-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800">AI Blog Generator</h1>

        <form onSubmit={handleSubmit} className="pt-8 space-y-4">

          {/* Input area for topic of blog to be generate */}
          <input
            title="Enter blog topic here."
            type="text"
            placeholder="Enter a blog topic. Ex: How to brew the best coffee."
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          {/* Selection drop-down for tone of blog */}
          <select
            title="Select tone here."
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="informative">Informative</option>
            <option value="casual">Casual</option>
            <option value="funny">Funny</option>
            <option value="persuasive">Persuasive</option>
          </select>

          {/* Slider function to set word count */}
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">Select Word Count: {count} </label>
          <input
            title="Select word count here."
            id="count"
            type="range"
            name="count"
            min="10"
            max="300"
            step="50"
            value={count}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => setCount(Number(e.target.value))}
            required
          />

          {/* Generate Blog submission button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800"
              } text-white`}
          >
            {loading ? "Generating..." : "Generate Blog Post"}
          </button>

        </form>

        {/* Output area for generate blog post */}
        {loading && (
          <div className="mt-6 text-gray-600 italic">Generating blog post...</div>
        )}

        {output && (
          <div ref={outputRef} className="mt-6 bg-white p-4 rounded-lg shadow text-gray-800 whitespace-pre-line">
            {output}
          </div>
        )}

        {output && (
          <div className="flex justify-between gap-4 pt-8">
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
            >
              {loading ? "Regenerating..." : "Regenerate"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-800"
            >
              Clear
            </button>
          </div>
        )}

      </div>
    </div>

  );
}

export default App;
