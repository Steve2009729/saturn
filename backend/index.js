// backend/index.js
// RUNS ON: Railway (Backend)
// Fixed version — uses CommonJS require syntax throughout

const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
  ],
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))

const signalRoute = require('./routes/signal')
const authRoute = require('./routes/auth')

app.use('/api/signal', signalRoute)
app.use('/api/auth', authRoute)

app.get('/health', (req, res) => {
  res.json({
    status: 'Saturn backend running',
    timestamp: new Date().toISOString(),
  })
})

app.listen(PORT, () => {
  console.log(`Saturn backend running on port ${PORT}`)
})
