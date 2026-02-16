# Voice Button Not Working - GitHub Pages Fix

## The Problem

Your website is deployed on GitHub Pages (HTTPS), but the backend API is pointing to `http://localhost:3000`. This causes:

1. **Mixed Content Error**: HTTPS frontend can't call HTTP backend
2. **CORS Issues**: Cross-origin requests are blocked
3. **Silent Failure**: Voice button appears to do nothing

## Solution: Deploy Backend to Cloud

You have 3 options:

### Option 1: Deploy to Heroku (Easiest for Node.js)
1. Create free Heroku account at https://heroku.com
2. Install Heroku CLI
3. Run these commands in your project directory:
```bash
npm install
heroku create your-app-name
heroku config:set GEMINI_API_KEY=AIzaSyBFr2SI0Kjy9PLn6IbNYbqgiQP8eSqGmjY
git push heroku main
```
4. Update your HTML file with: `https://your-app-name.herokuapp.com`

### Option 2: Deploy to Railway.app
1. Go to https://railway.app
2. Connect your GitHub repo
3. Set `GEMINI_API_KEY` environment variable
4. Railway will automatically deploy and give you a URL
5. Update your HTML with that URL

### Option 3: Deploy to Render
1. Go to https://render.com
2. Create new Web Service from GitHub
3. Set environment variables
4. Render will give you `https://your-service.onrender.com`
5. Update HTML file

## Quick Fix for Testing (Localhost Only)

If you're testing locally, use this setup:

### Terminal 1: Start Backend
```bash
cd "c:\Users\santi\Downloads\Santi.JR Voice Assistnt"
npm install
node server.js
```
You should see:
```
✅ Server running on port 3000
```

### Terminal 2: Serve Frontend on HTTPS (localhost)
```bash
# Install http-server globally (one time)
npm install -g http-server

# Serve with HTTPS on localhost
http-server -p 8080 --cors
```

Then open: `https://localhost:8080`

## How to Update HTML File

1. Find this line in your HTML:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://your-backend-domain.com'; // Change this!
```

2. Replace `https://your-backend-domain.com` with your deployed backend URL

Example (for Heroku):
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://my-santi-jr-backend.herokuapp.com';
```

## Testing the API Connection

Use this JavaScript in the browser console:

```javascript
// Test 1: Health Check
fetch('https://your-backend-url/health')
    .then(r => r.json())
    .then(d => console.log('✅ Backend OK:', d))
    .catch(e => console.log('❌ Error:', e));

// Test 2: Ask AI
fetch('https://your-backend-url/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Teach me Python' })
})
    .then(r => r.json())
    .then(d => console.log('✅ Response:', d))
    .catch(e => console.log('❌ Error:', e));
```

## Troubleshooting

**Error: "Not found"**
- Backend URL is wrong or server not running
- Check the URL in console: `console.log(API_URL)`

**Error: "CORS error"**
- Backend not properly configured with CORS
- Check server.js has `app.use(cors())`

**Error: "GEMINI_API_KEY not set"**
- Check `.env` file exists with your API key
- Restart backend after creating .env

## Step-by-Step: Get It Working Today

1. ✅ Choose deployment platform (Heroku, Railway, or Render)
2. ✅ Deploy your backend server
3. ✅ Get the deployed URL (e.g., `https://my-backend.herokuapp.com`)
4. ✅ Update the API_URL in index.html with the deployed URL
5. ✅ Test in browser console with the fetch commands above
6. ✅ Click voice button and it should work!

## For GitHub Pages Users

If the URL is: `https://tazj6086-cpu.github.io/Santi.JR-AI-Teacher-Voice-Assistant.mw/`

Then update index.html to:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://YOUR-DEPLOYED-BACKEND-URL.com';
```

Your GitHub Pages domain needs a separate backend because GitHub Pages only serves static files.
