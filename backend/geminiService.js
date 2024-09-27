const axios = require('axios');

// Your Gemini API Key (Replace with your actual key)
const GEMINI_API_KEY = "AIzaSyDZoSOBs-aQWV-wU9ZLn7NsCW2uo46qQPQ" ;

// Gemini API URL
const GEMINI_API_URL = 'https://gemini.google.com/app';

// Helper function to make a request to the Gemini API
const makeGeminiRequest = async (endpoint, data) => {
    try {
        const response = await axios.post(`${GEMINI_API_URL}${endpoint}`, data, {
            headers: {
                'Authorization': `Bearer ${GEMINI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in Gemini API request:', error.response?.data || error.message);
        throw new Error('Gemini API request failed');
    }
};

// Function to explain code chunkwise
const explainCodeChunkwise = async (htmlCode, cssCode, jsCode) => {
    const combinedCode = `${htmlCode}\n${cssCode}\n${jsCode}`;
    const requestBody = {
        code: combinedCode,
        chunkSize: 20, // Define chunk size to explain in parts
    };

    const endpoint = '/explain'; // Gemini endpoint for explanation (modify if needed)
    return await makeGeminiRequest(endpoint, requestBody);
};

// Function to rewrite the code for HTML, CSS, and JS files
const rewriteCodeFiles = async (htmlCode, cssCode, jsCode) => {
    const requestBody = {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
    };

    const endpoint = '/rewrite'; // Gemini endpoint for rewriting code (modify if needed)
    return await makeGeminiRequest(endpoint, requestBody);
};

// Function to optimize the code for HTML, CSS, and JS files
const optimizeCodeFiles = async (htmlCode, cssCode, jsCode) => {
    const requestBody = {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
    };

    const endpoint = '/optimize'; // Gemini endpoint for code optimization (modify if needed)
    return await makeGeminiRequest(endpoint, requestBody);
};

module.exports = {
    explainCodeChunkwise,
    rewriteCodeFiles,
    optimizeCodeFiles,
};
