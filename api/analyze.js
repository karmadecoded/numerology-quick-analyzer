export default async function handler(req, res) {
  try {
    const { dob } = req.body;

    // Your API key stays SAFE in Vercel environment variables
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "API key missing on server"
      });
    }

    // Call Gemini API securely from the backend
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Analyze this date of birth: ${dob}` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
