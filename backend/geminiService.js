import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || null;

if (!GEMINI_API_KEY) {
  console.error("Api key not found");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper function to make a request to the Gemini API
const makeGeminiRequest = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);
    const text = response.response.text();
    return text;
  } catch (error) {
    console.error(
      "Error in Gemini API request:",
      error.response?.data || error.message
    );
  }
};

// Function to explain code chunkwise
const explainCodeChunkwise = async (htmlCode, cssCode, jsCode) => {
  // const combinedCode = `HTML CODE\n${htmlCode}\nCSS CODE\n${cssCode}\nJS CODE\n${jsCode}`;
  const prompt = `Analyze the provided HTML, CSS, and JavaScript code. Break down the explanation into blocks, explaining each section individually. Identify the purpose, logic, and important details of each code block. Use Markdown with headings, code blocks, and clear explanations.

HTML CODE:
${htmlCode}

CSS CODE:
${cssCode}

JS CODE:
${jsCode}
`;
  return await makeGeminiRequest(prompt);
};

// Function to rewrite the code for HTML, CSS, and JS files
const rewriteCodeFiles = async (htmlCode, cssCode, jsCode) => {
    const prompt = `Analyze the provided HTML, CSS, and JavaScript code and rewrite it using best practices in programming. Ensure the logic remains the same but improve the code by incorporating modern, clean, and efficient practices. This includes:

    1. Improving readability and organization.
    2. Refactoring code to follow proper semantic conventions.
    3. Optimizing CSS and JavaScript where applicable.
    4. Removing unnecessary code, redundancies, or anti-patterns.
    5. Applying modern JavaScript syntax (ES6+), if needed.
    
    Please maintain the functionality and logic of the original code.
    
    HTML CODE:
    ${htmlCode}
    
    CSS CODE:
    ${cssCode}
    
    JS CODE:
    ${jsCode}
    `;
    
  return await makeGeminiRequest(prompt);
};

// Function to optimize the code for HTML, CSS, and JS files
const optimizeCodeFiles = async (htmlCode, cssCode, jsCode) => {
    const prompt = `Rewrite the provided HTML, CSS, and JavaScript code, optimizing it for both time complexity and space complexity. Consider reducing redundant logic, minimizing DOM manipulation, improving JavaScript algorithms, and streamlining CSS. 
    Break down your improvements by explaining how each change affects performance, scalability, or maintainability, and include relevant trade-offs. Use Markdown with headings, code blocks, and clear explanations.
    Please maintain the functionality and logic of the original code.
    Provided code:
    HTML CODE:
    ${htmlCode}
    
    CSS CODE:
    ${cssCode}
    
    JS CODE:
    ${jsCode}
    `;
  return await makeGeminiRequest(prompt);
};

export { explainCodeChunkwise, rewriteCodeFiles, optimizeCodeFiles };
