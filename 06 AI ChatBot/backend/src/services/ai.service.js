const { GoogleGenAI } = require('@google/genai')

// create an instance of the GoogleGenAI client
const ai = new GoogleGenAI({})
// initialize the client with your API key
async function generateResponse(content) {
    // Make sure to set the API key in your environment variables
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content
    })
    return response.text
}

module.exports = {
    generateResponse
}