# 🚀 Quick Start Guide - Connecting Backend to Frontend

## 📋 What You Have

1. ✅ **Backend Server** (`server.js`) - Node.js + Express + Gemini AI
2. ✅ **Frontend App** (`santi_jr_voice_assistant.html`) - Voice interface
3. ✅ **Integration Code** (`frontend-integration.js`) - Connects them together

## ⚡ Quick Setup (5 minutes)

### Step 1: Setup Backend (2 minutes)

```bash
# Create backend folder
mkdir backend
cd backend

# Copy the files
# - server.js
# - package.json
# - .env.example

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here

# Start the server
npm start
```

You should see:
```
🎓 Santi.JR Backend Server
✅ Server running on port 3000
✅ Gemini API key loaded successfully
```

---

### Step 2: Get Your Gemini API Key (1 minute)

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Paste it in your `.env` file

---

### Step 3: Update Frontend (2 minutes)

Open `santi_jr_voice_assistant.html` and add this before the closing `</script>` tag:

```javascript
// Backend Configuration
const API_CONFIG = {
    baseURL: 'http://localhost:3000', // Your backend URL
    endpoints: {
        ask: '/ask',
        teach: '/teach'
    }
};

// Replace the existing processQuery function with the one from frontend-integration.js
```

Or simply include the integration file:

```html
<script src="frontend-integration.js"></script>
```

---

## 🧪 Test It

### Test 1: Backend is running
```bash
curl http://localhost:3000/health
```

Should return:
```json
{"status":"ok","message":"Santi.JR Backend Server is running"}
```

### Test 2: AI is responding
```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"message":"What is photosynthesis?"}'
```

Should return AI explanation.

### Test 3: Frontend connects to backend
1. Open `santi_jr_voice_assistant.html` in browser
2. Open browser console (F12)
3. Should see: `✅ Backend connected successfully`

---

## 🎤 How It Works Now

### Before (Without Backend):
```
User speaks → App searches platforms → Shows links
```

### After (With Backend):
```
User speaks → Backend AI explains → Shows AI answer + platform links
```

### Example:

**User:** "Teach me quantum physics"

**Santi.JR (AI Response):**
```
"Quantum physics is the study of matter and energy at the 
smallest scales. Key concepts include:

1. Wave-particle duality
2. Quantum superposition
3. Uncertainty principle
4. Quantum entanglement

[Full AI explanation with examples]"
```

**Then shows:**
```
📚 Additional Resources:
- Wikipedia: Quantum Physics
- Khan Academy: Quantum Mechanics
- YouTube: Quantum Physics Lectures
... (all 10 platforms)
```

---

## 🌐 Deployment

### Local Development
```
Backend: http://localhost:3000
Frontend: Open HTML file in browser
```

### Production

**Backend Options:**
1. Railway: https://railway.app (easiest)
2. Render: https://render.com
3. Heroku: https://heroku.com

**Frontend Options:**
1. GitHub Pages: Free HTTPS
2. Netlify: Free with custom domain
3. Vercel: Free deployment

**Update Frontend with Production URL:**
```javascript
const API_CONFIG = {
    baseURL: 'https://your-backend.railway.app',
    // ...
};
```

---

## 🔐 Security Checklist

- [ ] API key is in `.env` file (never in code)
- [ ] `.env` is in `.gitignore`
- [ ] CORS is configured for your domain
- [ ] HTTPS is enabled in production
- [ ] Backend URL is updated in frontend

---

## 🎯 Features You Get

✅ **AI-Powered Explanations** - Gemini AI teaches any topic
✅ **Voice Interface** - Speak to ask questions
✅ **Multi-Platform Resources** - Links to 10 educational sites
✅ **Real-time Responses** - Fast AI processing
✅ **Secure Backend** - API key protected
✅ **Error Handling** - Graceful fallbacks

---

## 🆘 Troubleshooting

### "Cannot connect to backend"
**Solution:**
1. Make sure backend is running: `npm start`
2. Check the URL in API_CONFIG matches your backend
3. Look for CORS errors in browser console

### "API key not found"
**Solution:**
1. Check `.env` file exists
2. Verify `GEMINI_API_KEY` is set
3. Restart the server

### "Frontend shows links but no AI"
**Solution:**
1. Open browser console (F12)
2. Check for connection errors
3. Verify backend URL is correct

---

## 📞 Testing Commands

### Test backend health:
```bash
curl http://localhost:3000/health
```

### Test AI ask:
```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"message":"Explain DNA"}'
```

### Test AI teach:
```bash
curl -X POST http://localhost:3000/teach \
  -H "Content-Type: application/json" \
  -d '{"topic":"Calculus"}'
```

---

## 🎉 You're Ready!

Now you have:
- ✅ Secure backend with Gemini AI
- ✅ Voice-enabled frontend
- ✅ AI-powered teaching
- ✅ Multi-platform resource fetching

**Your API Key → Backend → Frontend → User gets AI teaching + resources!**

Questions? Check the BACKEND_SETUP_GUIDE.md for detailed instructions! 🚀
