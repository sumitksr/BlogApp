const axios = require("axios");

exports.chatWithAI = async (req, res) => {
  const prompt = req.body.question;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "No question provided.",
    });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No answer from Gemini.";

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Gemini API Error:", {
      message: error.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });

    res.status(500).json({
      success: false,
      message: "Gemini service error.",
      error: error?.response?.data || error.message,
    });
  }
};