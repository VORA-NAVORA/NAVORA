
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Missing message input' })
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are VORA, the intelligent AI co-founder of NAVORA. You know everything about the NAVORA platform including its patented identity-as-movement system, Concierge, SWARM, CONNECT, and NAVORA CORE. Speak clearly, use confident language, and showcase the system with charisma and clarity.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I had trouble responding. Try again.'
    res.status(200).json({ reply })
  } catch (error) {
    console.error('VORA backend error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
