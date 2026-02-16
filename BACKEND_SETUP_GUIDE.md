# 🚀 Santi.JR Backend Setup Guide

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js (v18 or higher) installed
- ✅ npm (comes with Node.js)
- ✅ Google Gemini API key

## 🔑 Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your API key (keep it secure!)

## 📦 Step 2: Install Dependencies

```bash
# Navigate to your backend folder
cd backend

# Install all dependencies
npm install
```

This will install:
- `express` - Web server framework
- `@google/generative-ai` - Google Gemini SDK
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

## ⚙️ Step 3: Configure Environment Variables

1. Create a `.env` file in the backend folder:
```bash
cp .env.example .env
```

2. Open `.env` and add your API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

⚠️ **IMPORTANT**: Never commit `.env` to Git! It's already in `.gitignore`.

## 🏃 Step 4: Start the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

You should see:
```
==================================================
🎓 Santi.JR Backend Server
==================================================
✅ Server running on port 3000
📡 Health check: http://localhost:3000/health
🤖 AI endpoint: http://localhost:3000/ask
📚 Teach endpoint: http://localhost:3000/teach
==================================================
✅ Gemini API key loaded successfully
==================================================
```

## 🧪 Step 5: Test Your Backend

### Test 1: Health Check
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Santi.JR Backend Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Test 2: Ask Endpoint
```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain photosynthesis"}'
```

Expected response:
```json
{
  "response": "Photosynthesis is the process by which...",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Test 3: Teach Endpoint
```bash
curl -X POST http://localhost:3000/teach \
  -H "Content-Type: application/json" \
  -d '{"topic": "Calculus"}'
```

## 📡 API Endpoints

### 1. Health Check
**GET** `/health`

Returns server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Santi.JR Backend Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 2. Ask AI
**POST** `/ask`

Send a message to the AI assistant.

**Request:**
```json
{
  "message": "Your question here"
}
```

**Response:**
```json
{
  "response": "AI's answer",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "details": "Error description"
}
```

---

### 3. Teach Topic
**POST** `/teach`

Get structured educational content about a topic.

**Request:**
```json
{
  "topic": "Subject name"
}
```

**Response:**
```json
{
  "response": "Educational content",
  "topic": "Subject name",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🔐 Security Features

✅ **API Key Protection** - Stored in environment variables, never exposed
✅ **CORS Enabled** - Allows frontend to communicate securely
✅ **Input Validation** - Validates all incoming requests
✅ **Rate Limiting Ready** - Prevents API abuse
✅ **Error Handling** - Graceful error messages without exposing internals
✅ **Message Length Limits** - Prevents oversized requests

## 🌐 Connecting to Frontend

Update your frontend code to use the backend:

```javascript
// In your Santi.JR web app
const API_URL = 'http://localhost:3000'; // Change this for production

async function askAI(message) {
    try {
        const response = await fetch(`${API_URL}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data.response;
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error calling AI:', error);
        throw error;
    }
}

// Usage
const answer = await askAI('Teach me about quantum physics');
console.log(answer);
```

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variable: `GEMINI_API_KEY`
6. Deploy!

**Your API will be at:** `https://your-app.railway.app`

---

### Option 2: Render
1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy

**Your API will be at:** `https://your-app.onrender.com`

---

### Option 3: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create santi-jr-backend
heroku config:set GEMINI_API_KEY=your_api_key_here
git push heroku main
```

**Your API will be at:** `https://santi-jr-backend.herokuapp.com`

---

### Option 4: VPS (DigitalOcean, AWS, etc.)
```bash
# On your server
git clone your-repo
cd backend
npm install
npm install -g pm2

# Create .env file
echo "GEMINI_API_KEY=your_key" > .env

# Start with PM2
pm2 start server.js --name santi-jr
pm2 save
pm2 startup
```

## 🔧 Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Problem: "GEMINI_API_KEY not found"
**Solution:**
1. Create `.env` file
2. Add `GEMINI_API_KEY=your_key`
3. Restart server

### Problem: "API quota exceeded"
**Solution:**
- Wait for quota reset
- Check your Google Cloud console for limits
- Consider upgrading your API plan

### Problem: CORS errors
**Solution:**
Update CORS configuration in `server.js`:
```javascript
app.use(cors({
    origin: 'https://your-frontend-domain.com'
}));
```

### Problem: "Port 3000 already in use"
**Solution:**
```bash
# Change port in .env
PORT=3001
```

## 📊 Monitoring

### Check server logs:
```bash
# If using PM2
pm2 logs santi-jr

# If using Railway/Render
Check their dashboard logs
```

### Monitor API usage:
Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to view your usage.

## 🎯 Production Checklist

Before deploying to production:

- [ ] API key is in environment variables
- [ ] `.env` file is NOT committed to Git
- [ ] CORS is configured for your domain
- [ ] Error handling is working
- [ ] Rate limiting is enabled (optional)
- [ ] HTTPS is enabled
- [ ] Monitoring is set up
- [ ] Backend URL is updated in frontend

## 📞 Support

If you encounter issues:
1. Check server logs
2. Verify API key is correct
3. Test with curl commands
4. Check Google AI Studio for API status

## 🎉 Success!

Once everything is running:
- ✅ Backend server is live
- ✅ Gemini AI is responding
- ✅ Frontend can communicate
- ✅ Secure and scalable

Your Santi.JR AI Teacher is ready to help students learn! 🚀📚
