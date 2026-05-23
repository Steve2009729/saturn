// backend/routes/signal.js
// RUNS ON: Railway (Backend)
// PURPOSE: AI signal generation endpoint
// CRITICAL: Claude API key is HERE in backend, NEVER in frontend
// Receives token info, analyzes with Claude, returns trading signal

const express = require('express')
const Anthropic = require('@anthropic-ai/sdk')
const router = express.Router()

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

router.post('/signal', async (req, res) => {
  try {
    const { tokenName, tokenSymbol, tokenAddress } = req.body

    if (!tokenSymbol || !tokenAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: tokenSymbol, tokenAddress',
      })
    }

    // Call Claude API
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Analyze the Solana token "${tokenSymbol}" (address: ${tokenAddress}) and provide a trading signal.

Respond in this exact JSON format:
{
  "signal": "BUY" | "SELL" | "HOLD",
  "confidence": 0-100,
  "reasoning": "Brief analysis explaining the signal",
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "timeframe": "Time period for this signal (e.g. '24h', '1week')",
  "targetPrice": number or null,
  "stopLoss": number or null
}

Consider factors like: market conditions, token age, liquidity, holder distribution, use case. Be realistic and conservative.`,
        },
      ],
    })

    // Parse Claude response
    const content = message.content[0].text
    const jsonMatch = content.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      throw new Error('Invalid Claude response format')
    }

    const signal = JSON.parse(jsonMatch[0])

    res.json({
      success: true,
      data: {
        signal: signal.signal,
        confidence: signal.confidence,
        reasoning: signal.reasoning,
        riskLevel: signal.riskLevel,
        timeframe: signal.timeframe,
        targetPrice: signal.targetPrice,
        stopLoss: signal.stopLoss,
        tokenSymbol,
        timestamp: Date.now(),
      },
    })
  } catch (error) {
    console.error('[Signal Route] Error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate signal',
    })
  }
})

module.exports = router
