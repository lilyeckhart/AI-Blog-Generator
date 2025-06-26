// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // Loads variables from .env
const app = express();
const port = 5000;
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute window
	max: 5, // Limit 5 requests per `window` (here, per 1 minute).
	handler: (req, res) => {
		res.status(429).json({
			error: "Too many requests. Please wait a moment before trying again."
		});
	}
});

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or from allowed frontend
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use('/generate', limiter);

// Middleware setup
dotenv.config(); // Load .env variables
const allowedOrigins = ["https://ai-blog-generator-frontend-kes5.onrender.com"];

app.use(express.json()); // Parse incoming JSON request bodies

// Test route to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// === POST /generate ===
// This is the API endpoint your React app will call
app.post('/generate', async (req, res) => {
    try {
        const { topic, count, tone } = req.body; // Get input from the frontend

        // Make a POST request to OpenRouter AI API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Use your hidden API key from .env
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'AI Blog Generator'
            },
            body: JSON.stringify({
                model: 'openrouter/auto',
                max_tokens: Math.floor(count * 1.5),
                messages: [
                    { role: 'system', content: 'You are a helpful assistant who writes SEO-friendly blog posts.' },
                    { role: 'user', content: `Write a ${tone} blog post about ${topic} in ${count} words.` }
                ]
            })
        });

        const data = await response.json();
        console.log("OpenRouter response:", data); 

        // Extract the blog post content from the API response
        const blogPost = data.choices?.[0]?.message?.content || 'No blog post returned';

        // Send it back to the React frontend
        res.json({ blogPost });

    } catch (error) {
        console.error('Error generating blog post:', error);
        res.status(500).json({ error: 'Failed to generate blog post' });
    }
});

// Start the backend server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
