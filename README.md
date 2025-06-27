# AI Blog Generator

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
