const express = require('express');
const bodyParser = require('body-parser');
const { explainCodeChunkwise, rewriteCodeFiles, optimizeCodeFiles } = require('./geminiService'); // Import Gemini service methods

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors())
// Middleware to parse JSON requests
app.use(bodyParser.json());

// API route to explain code chunkwise
app.post('/api/code/explain', async (req, res) => {
    const { htmlCode, cssCode, jsCode } = req.body;

    try {
        const explanation = await explainCodeChunkwise(htmlCode, cssCode, jsCode);
        res.json({ explanation });
    } catch (error) {
        console.error('Error explaining code:', error.message);
        res.status(500).json({ message: 'Failed to explain code' });
    }
});

// API route to rewrite the code for all three files
app.post('/api/code/rewrite', async (req, res) => {
    const { htmlCode, cssCode, jsCode } = req.body;

    try {
        const rewrittenCode = await rewriteCodeFiles(htmlCode, cssCode, jsCode);
        res.json({ rewrittenCode });
    } catch (error) {
        console.error('Error rewriting code:', error.message);
        res.status(500).json({ message: 'Failed to rewrite code' });
    }
});

// API route to optimize the code for all three files
app.post('/api/code/optimize', async (req, res) => {
    const { htmlCode, cssCode, jsCode } = req.body;

    try {
        const optimizedCode = await optimizeCodeFiles(htmlCode, cssCode, jsCode);
        res.json({ optimizedCode });
    } catch (error) {
        console.error('Error optimizing code:', error.message);
        res.status(500).json({ message: 'Failed to optimize code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
