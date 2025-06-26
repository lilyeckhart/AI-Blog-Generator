// server/server.js
const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const app = express();
const port = process.env.PORT || 5000;

// === Load .env variables ===
dotenv.config();

// === CORS SETUP ===
app.use(cors({
    origin: "https://ai-blog-generator-frontend-kes5.onrender.com",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));
app.options("*", cors());

// === RATE LIMITER ===
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests. Please wait a moment before trying again."
        });
    }
});
app.use('/generate', limiter);

// === PARSE JSON REQUEST BODIES ===
app.use(express.json());

// === HEALTH CHECK ===
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// === GENERATE ENDPOINT ===
app.post('/generate', async (req, res) => {
    try {
        const { topic, count, tone } = req.body;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://ai-blog-generator-frontend-kes5.onrender.com', // 👈 Update this for production
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

        const blogPost = data.choices?.[0]?.message?.content || 'No blog post returned';
        res.json({ blogPost });

    } catch (error) {
        console.error('Error generating blog post:', error);
        res.status(500).json({ error: 'Failed to generate blog post' });
    }
});

// === START SERVER ===
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
