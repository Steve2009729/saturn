// backend/routes/auth.js
// RUNS ON: Railway (Backend)
// PURPOSE: Placeholder for future auth helpers
// Currently just provides health check

const express = require('express')
const router = express.Router()

// Auth status endpoint
router.get('/auth/status', (req, res) => {
  res.json({
    success: true,
    message: 'Auth service operational',
  })
})

module.exports = router
