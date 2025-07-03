const axios = require('axios');

exports.chatWithAI = async (req, res) => {
  const prompt = req.body.question;
  if (!prompt) {
    return res.status(400).json({ success: false, message: 'No question provided.' });
  }
  try {
    const result = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );
    const answer = result.data.choices?.[0]?.message?.content || 'No answer from AI.';
    res.json({ success: true, answer });
  } catch (error) {
    // Enhanced error logging for debugging
    console.error('AI error:', {
      message: error.message,
      status: error?.response?.status,
      headers: error?.response?.headers,
      data: error?.response?.data,
    });
    res.status(500).json({
      success: false,
      message: 'AI service error.',
      error: {
        message: error.message,
        status: error?.response?.status,
        headers: error?.response?.headers,
        data: error?.response?.data,
      }
    });
  }
}; 