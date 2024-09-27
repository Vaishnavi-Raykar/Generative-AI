// import React, { useState } from 'react';
// import axios from 'axios';

// const CodeFeatures = ({ htmlCode, cssCode, jsCode }) => {
//     const [explanation, setExplanation] = useState('');
//     const [rewrittenCode, setRewrittenCode] = useState('');
//     const [optimizedCode, setOptimizedCode] = useState('');

//     const combinedCode = `${htmlCode}\n${cssCode}\n${jsCode}`;

//     const handleExplainCode = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/code/explain', { code: combinedCode });
//             setExplanation(response.data.explanation);
//         } catch (error) {
//             console.error('Error explaining code:', error);
//         }
//     };

//     const handleRewriteCode = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/code/rewrite', { code: combinedCode });
//             setRewrittenCode(response.data.rewrittenCode);
//         } catch (error) {
//             console.error('Error rewriting code:', error);
//         }
//     };

//     const handleOptimizeCode = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/code/optimize', { code: combinedCode });
//             setOptimizedCode(response.data.optimizedCode);
//         } catch (error) {
//             console.error('Error optimizing code:', error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleExplainCode}>Explain</button>
//             <button onClick={handleRewriteCode}>Rewrite</button>
//             <button onClick={handleOptimizeCode}>Optimize</button>
//             <div>
//                 <h2>Explanation:</h2>
//                 <p>{explanation}</p>
//                 <h2>Rewritten Code:</h2>
//                 <p>{rewrittenCode}</p>
//                 <h2>Optimized Code:</h2>
//                 <p>{optimizedCode}</p>
//             </div>
//         </div>
//     );
// };

// export default CodeFeatures;








import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Markdown from 'markdown-to-jsx';
import remarkGfm from 'remark-gfm';


const CodeFeatures = ({ htmlCode, cssCode, jsCode }) => {
    const [explanation, setExplanation] = useState("");
    const [rewrittenCode, setRewrittenCode] = useState('');
    const [optimizedCode, setOptimizedCode] = useState('');

    const combinedCode = `${htmlCode}\n${cssCode}\n${jsCode}`;

    const handleExplainCode = async () => {
        try {
            // const response = await axios.post('http://localhost:5000/api/code/explain', { code: combinedCode });
            const response = await axios.post('http://localhost:5000/api/code/explain', 
                {
                    htmlCode, 
                    cssCode, 
                    jsCode
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
            console.log(response)
            setExplanation(response.data.explanation);
            setRewrittenCode(''); // Clear rewrittenCode
            setOptimizedCode('');
        } catch (error) {
            console.error('Error explaining code:', error);
        }
    };

    const handleRewriteCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/code/rewrite', 
                {
                    htmlCode, 
                    cssCode, 
                    jsCode
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("rewrite - "+response.response)
            setRewrittenCode(response.data.rewrittenCode);
            setExplanation(''); // Clear explanation
            setOptimizedCode('');
        } catch (error) {
            console.error('Error rewriting code:', error);
        }
    };

    const handleOptimizeCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/code/optimize', 
                {
                    htmlCode, 
                    cssCode, 
                    jsCode
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            setOptimizedCode(response.data.optimizedCode);
            setExplanation(''); // Clear explanation
            setRewrittenCode('');
        } catch (error) {
            console.error('Error optimizing code:', error);
        }
    };

    return (
        <div className="code-features p-4 bg-gray-800">
            <div className="flex gap-4">
                <button onClick={handleExplainCode} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                    Explain Code
                </button>
                <button onClick={handleRewriteCode} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                    Rewrite Code
                </button>
                <button onClick={handleOptimizeCode} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                    Optimize Code
                </button>
            </div>

            <div className="results mt-4">
            {explanation && (
                <div className="explanation bg-gray-700 p-4 rounded mb-2">
                    <h3 className="font-bold text-white">Explanation:</h3>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {explanation}
                    </ReactMarkdown>
                </div>
            )}
                {rewrittenCode && (
                    <div className="rewritten bg-gray-700 p-2 rounded mb-2">
                        <h3 className="font-bold">Rewritten Code:</h3>
                        <pre>{rewrittenCode}</pre>
                    </div>
                )}
                {optimizedCode && (
                    <div className="optimized bg-gray-700 p-2 rounded">
                        <h3 className="font-bold">Optimized Code:</h3>
                        <pre>{optimizedCode}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeFeatures;
