# AI Blog Generator

Generate engaging blog posts instantly with AI! This beautiful, modern web application uses AI to create SEO-friendly blog content in various tones and word counts.

## ✨ Features

- 🎨 Beautiful glassmorphism UI with gradient backgrounds
- 🤖 AI-powered blog post generation
- 📝 Multiple writing tones (Informative, Casual, Funny, Persuasive)
- 📊 Adjustable word count (10-300 words)
- 🔄 Regenerate posts with one click
- 📋 Copy to clipboard functionality
- 💫 Smooth animations and transitions
- 📱 Fully responsive design

## 🚀 Quick Start

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```

Server will run on [http://localhost:5000](http://localhost:5000)

## 🌐 Deployment

### Deploy Frontend to Netlify

See the detailed [DEPLOYMENT.md](DEPLOYMENT.md) guide for step-by-step instructions.

**Quick steps:**
1. Push your code to GitHub
2. Connect repository to Netlify
3. Deploy with build command: `npm run build`
4. Update backend CORS with your Netlify URL

### Deploy Backend to Render

Your backend is already deployed! Just make sure to update the CORS settings to include your Netlify URL.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** OpenRouter API
- **Deployment:** Netlify (Frontend), Render (Backend)

## 📝 How It Works

1. Enter your blog topic
2. Select the writing tone
3. Choose word count with the slider
4. Click "Generate Blog Post"
5. AI creates your content instantly!
6. Copy, regenerate, or start fresh

## 🎨 Design Features

- Animated gradient backgrounds with floating orbs
- Glassmorphism card design
- Custom styled form elements
- Smooth hover effects and transitions
- Beautiful gradient buttons
- Professional typography

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ using React and AI

An AI-powered blog writing assistant built to demonstrate fullstack development, API integration, and production deployment skills. Built using React, Node.js, Tailwind CSS, and OpenRouter AI.

## Live Demo

- **Frontend**: [ai-blog-generator-frontend-kes5.onrender.com](https://ai-blog-generator-frontend-kes5.onrender.com)
- **Backend**: [ai-blog-generator-backend-ghav.onrender.com](https://ai-blog-generator-backend-ghav.onrender.com)

## Purpose

This project was built as part of my web development portfolio to showcase the ability to:

- Build fullstack applications using React and Express
- Securely integrate with third-party APIs (OpenRouter AI)
- Handle deployment and CORS in production
- Apply responsive UI/UX design principles

## Features

- Topic-based blog generation
- Adjustable tone: Informative, Casual, Funny, Persuasive
- Adjustable word count (100–300 words)
- Regenerate content or clear form with one click
- Rate limiting on backend to prevent spam
- API key securely hidden using Express.js proxy

## Tech Stack

**Frontend**
- React (Create React App)
- Tailwind CSS v3

**Backend**
- Express.js
- Node.js
- OpenRouter AI (OpenAI compatible)

**Deployment**
- Render (for both frontend and backend)

## Running Locally

```bash
# Frontend setup
cd client
npm install
npm start

# Backend setup
cd server
npm install
npm start
```

### Environment Variables (Backend)
Create a `.env` file in the `server/` folder:
```
OPENROUTER_API_KEY=your_api_key_here
```

## Highlights for Employers

- Clean project structure and modular code
- Demonstrates API integration with security best practices
- Full deployment pipeline using free tier tools
- Custom UI using Tailwind for responsive design
- Uses AI responsibly within token limits and rate limits

## Future Plans

- Convert to a simple mobile app using React Native
- Add blog post download or save feature
- Add support for custom blog formatting (e.g. headers, lists)
- Increase word count limit (e.g. purchase higher tier)

## Author

**Lily Eckhart**  
[GitHub](https://github.com/lilyeckhart) — Fullstack Web Developer

---

_This project is part of my developer portfolio. I'm actively seeking front-end or fullstack roles where I can grow, build, and contribute to impactful applications._
