// server.js - Node.js Express Backend with Google Gemini AI Integration

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files (optional)

// Initialize Google Gemini AI with API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Santi.JR Backend Server is running',
        timestamp: new Date().toISOString()
    });
});

// Main AI endpoint
app.post('/ask', async (req, res) => {
    try {
        // Validate request
        const { message } = req.body;
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ 
                error: 'Invalid request',
                details: 'Message is required and must be a non-empty string'
            });
        }

        // Security: Limit message length
        if (message.length > 10000) {
            return res.status(400).json({ 
                error: 'Message too long',
                details: 'Message must be less than 10,000 characters'
            });
        }

        console.log('Received message:', message.substring(0, 100) + '...');

        // Get the Gemini model (using Gemini 2.0 Flash)
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.0-flash',
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 2048,
            }
        });

        // System instruction for educational assistant
        const systemInstruction = `You are Santi.JR, an AI educational assistant. Your role is to:
1. Provide clear, concise, and accurate educational explanations
2. Break down complex topics into understandable parts
3. Suggest learning resources when appropriate
4. Encourage further learning
5. Be patient and supportive

Keep responses focused and educational. If asked about a topic, provide a brief overview and key learning points.`;

        // Generate content with system instruction
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemInstruction }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'I understand. I am Santi.JR, your educational assistant. I will provide clear, helpful explanations and guide your learning journey.' }]
                }
            ]
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        console.log('AI Response generated successfully');

        // Return only the text response
        res.json({ 
            response: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing request:', error);

        // Handle specific errors
        if (error.message?.includes('API key')) {
            return res.status(500).json({ 
                error: 'Configuration error',
                details: 'API key is not configured properly'
            });
        }

        if (error.message?.includes('quota')) {
            return res.status(429).json({ 
                error: 'Rate limit exceeded',
                details: 'Please try again later'
            });
        }

        // Generic error response
        res.status(500).json({ 
            error: 'Internal server error',
            details: 'Failed to process your request. Please try again.'
        });
    }
});

// Teach endpoint - specialized for educational queries
app.post('/teach', async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
            return res.status(400).json({ 
                error: 'Invalid request',
                details: 'Topic is required and must be a non-empty string'
            });
        }

        console.log('Teaching request for topic:', topic);

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `As an educational assistant, provide a comprehensive but concise learning guide for "${topic}". Include:
1. Brief overview (2-3 sentences)
2. Key concepts (3-5 main points)
3. Practical applications or examples
4. Recommended learning resources (Wikipedia, Khan Academy, YouTube channels, online courses)

Keep the response structured, clear, and under 500 words.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Teaching content generated successfully');

        res.json({ 
            response: text,
            topic: topic,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in teach endpoint:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: 'Failed to generate teaching content'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Server error',
        details: 'An unexpected error occurred'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not found',
        details: 'The requested endpoint does not exist'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🎓 Santi.JR Backend Server');
    console.log('='.repeat(50));
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`🤖 AI endpoint: http://localhost:${PORT}/ask`);
    console.log(`📚 Teach endpoint: http://localhost:${PORT}/teach`);
    console.log('='.repeat(50));
    
    // Verify API key is set
    if (!process.env.GEMINI_API_KEY) {
        console.error('⚠️  WARNING: GEMINI_API_KEY not found in environment variables!');
        console.error('Please create a .env file with your API key.');
    } else {
        console.log('✅ Gemini API key loaded successfully');
    }
    console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT received, shutting down gracefully...');
    process.exit(0);
});
