# Postman Testing Guide for Santi.JR Backend

## Server Setup First
Make sure your server is running:
```bash
npm install
node server.js
```

You should see output like:
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

## Available Endpoints

### 1. Health Check (GET)
**URL:** `http://localhost:3000/health`
**Method:** GET
**No body needed**

**Expected Response:**
```json
{
    "status": "ok",
    "message": "Santi.JR Backend Server is running",
    "timestamp": "2026-02-16T..."
}
```

### 2. Ask Question (POST)
**URL:** `http://localhost:3000/ask`
**Method:** POST
**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
    "message": "Explain quantum physics in simple terms"
}
```

**Expected Response:**
```json
{
    "response": "Quantum physics is...",
    "timestamp": "2026-02-16T..."
}
```

### 3. Teach Topic (POST)
**URL:** `http://localhost:3000/teach`
**Method:** POST
**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
    "topic": "Machine Learning"
}
```

**Expected Response:**
```json
{
    "response": "As an educational assistant...",
    "topic": "Machine Learning",
    "timestamp": "2026-02-16T..."
}
```

## Common Issues & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Not found" | Wrong URL path | Check the URL is exactly `http://localhost:3000/ask` |
| Connection refused | Server not running | Run `node server.js` first |
| API key error | Missing .env file | Create `.env` file with GEMINI_API_KEY |
| Empty response | Message field missing | Add `"message"` field in body |

## Postman Pre-request Script (JavaScript)

Add this to your Postman request to validate before sending:

```javascript
// Check if server is running
console.log("Request URL:", pm.request.url.toString());
console.log("Request Method:", pm.request.method);
console.log("Request Body:", pm.request.body);

// Validate endpoint
const url = pm.request.url.toString().toLowerCase();
if (!url.includes("localhost:3000")) {
    console.warn("⚠️ Warning: Not targeting localhost:3000");
}

// Set timestamp
pm.environment.set("timestamp", new Date().toISOString());
```

## Postman Post-response Script (JavaScript)

Add this to your Postman request to validate the response:

```javascript
// Validate response
console.log("Status Code:", pm.response.code);
console.log("Response Time:", pm.response.responseTime + "ms");
console.log("Response Body:", pm.response.text());

// Parse JSON response
try {
    const jsonData = pm.response.json();
    
    // Check for errors
    if (jsonData.error) {
        console.error("❌ Error in response:", jsonData.error);
        console.error("Details:", jsonData.details);
    } else {
        console.log("✅ Success!");
        
        if (jsonData.response) {
            console.log("AI Response:", jsonData.response.substring(0, 100) + "...");
        }
    }
    
    // Store response for later use
    pm.environment.set("last_response", JSON.stringify(jsonData, null, 2));
    
} catch (e) {
    console.error("Failed to parse JSON:", e);
}
```

## Troubleshooting Steps

1. **Verify Server is Running:**
   ```bash
   # In terminal, check if port 3000 is in use
   netstat -ano | findstr :3000
   ```

2. **Test with cURL (Alternative to Postman):**
   ```bash
   curl -X POST http://localhost:3000/ask \
     -H "Content-Type: application/json" \
     -d "{\"message\": \"Hello, teach me about AI\"}"
   ```

3. **Check .env File Exists:**
   - Make sure `.env` file is in the same directory as `server.js`
   - File should contain: `GEMINI_API_KEY=AIzaSyBFr2SI0Kjy9PLn6IbNYbqgiQP8eSqGmjY`

4. **Check Server Logs:**
   - Look for any error messages in the terminal where you ran `node server.js`
   - Check for "API key" warnings

## JavaScript Fetch Examples (for HTML frontend)

```javascript
// Example 1: Basic Ask
async function testAsk() {
    const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Teach me about blockchain'
        })
    });
    
    const data = await response.json();
    console.log('Response:', data);
    return data.response;
}

// Example 2: Teach Topic
async function testTeach() {
    const response = await fetch('http://localhost:3000/teach', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic: 'Quantum Computing'
        })
    });
    
    const data = await response.json();
    console.log('Teaching Content:', data);
    return data.response;
}

// Example 3: Health Check
async function testHealth() {
    const response = await fetch('http://localhost:3000/health');
    const data = await response.json();
    console.log('Server Status:', data);
    return data.status === 'ok';
}
```

## Video Call Testing Steps

1. Make sure server is running on `http://localhost:3000`
2. Open Postman
3. Create NEW request
4. Set Method to `POST`
5. Set URL to `http://localhost:3000/ask`
6. Go to "Body" tab
7. Select "raw" and "JSON"
8. Paste: `{"message": "Teach me about space"}`
9. Click "Send"
10. Look for response from Google Gemini API
