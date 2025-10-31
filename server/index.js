const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const app = express();
const port = process.env.PORT || 5000;

// Enable trust for Render's proxy
app.set('trust proxy', 1);

// Load env vars
dotenv.config();

// CORS - Allow both production and localhost
const allowedOrigins = [
    "https://ai-blog-generator-frontend-kes5.onrender.com",
    "http://localhost:3000",
    "http://localhost:3001"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

// Rate Limiter
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests. Please wait a moment before trying again."
        });
    }
});
app.use('/generate', limiter);

// Parse JSON
app.use(express.json());

// Check if server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Blog Post Generator
app.post('/generate', async (req, res) => {
    try {
        const { topic, count, tone } = req.body;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://ai-blog-generator-frontend-kes5.onrender.com',
                'X-Title': 'AI Blog Generator'
            },
            body: JSON.stringify({
                model: 'openrouter/auto',
                max_tokens: Math.min(250, Math.floor(count * 1.5)),
                messages: [
                    { role: 'system', content: 'You are a helpful assistant who writes SEO-friendly blog posts.' },
                    { role: 'user', content: `Write a ${tone} blog post about ${topic} in ${count} words.` }
                ]
            })
        });

        const data = await response.json();
        // console.log("OpenRouter response:", data); // use to check log errors

        const blogPost = data.choices?.[0]?.message?.content || 'Too many requests, please try again later!';
        res.json({ blogPost });

    } catch (error) {
        console.error('Error generating blog post:', error);
        res.status(500).json({ error: 'Failed to generate blog post' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
