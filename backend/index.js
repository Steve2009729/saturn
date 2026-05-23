// backend/index.js
// RUNS ON: Railway (Backend)
// PURPOSE: Express server for protected API routes
// CRITICAL: Anthropic API key NEVER exposed to frontend
// Only this backend server calls Claude — frontend only makes requests here

const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  })
)

// Routes
app.use('/api', require('./routes/signal'))
app.use('/api', require('./routes/auth'))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err)
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[Saturn Backend] Server running on port ${PORT}`)
  console.log(`[Saturn Backend] Frontend URL: ${process.env.FRONTEND_URL}`)
})
