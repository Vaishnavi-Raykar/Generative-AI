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








import React, { useContext,useState } from 'react';
import axios from 'axios';
import { CodeContext } from './CodeContext';


const CodeFeatures = ({ htmlCode, cssCode, jsCode ,setCssCode,setHtmlCode,setJsCode}) => {
    
    // const [explanation, setExplanation] = useState("");
    // const [rewrittenCode, setRewrittenCode] = useState('');
    // const [optimizedCode, setOptimizedCode] = useState('');
    const {
        explanation,
        setExplanation,
        rewrittenCode,
        setRewrittenCode,
        optimizedCode,
        setOptimizedCode,
      } = useContext(CodeContext);
    const combinedCode = `${htmlCode}\n${cssCode}\n${jsCode}`;

    const handleHtmlChange = (newHtmlCode) => {
        setHtmlCode(newHtmlCode);
      };
    
      const handleCssChange = (newCssCode) => {
        setCssCode(newCssCode);
      };
    
      const handleJsChange = (newJsCode) => {
        setJsCode(newJsCode);
      };

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

    const extractCodeSnippets = (markdown) => {
        const htmlMatch = markdown.match(/```html\s*([\s\S]*?)```/);
        const cssMatch = markdown.match(/```css\s*([\s\S]*?)```/);
        const jsMatch = markdown.match(/```javascript\s*([\s\S]*?)```/);
    
        // Store the extracted code in variables
        const htmlCode = htmlMatch ? htmlMatch[1].trim() : '';
        const cssCode = cssMatch ? cssMatch[1].trim() : '';
        const jsCode = jsMatch ? jsMatch[1].trim() : '';
    
        return { htmlCode, cssCode, jsCode };
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
                console.log("response.data")
            setRewrittenCode(response.data.rewrittenCode);
            setExplanation(''); // Clear explanation
            setOptimizedCode('');
            const data = extractCodeSnippets(response.data.rewrittenCode)
            // console.log(data.htmlCode)
            handleHtmlChange(data.htmlCode)
            handleCssChange(data.cssCode)
            handleJsChange(data.jsCode)
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
            const data = extractCodeSnippets(response.data.optimizedCode)
            // console.log(data.htmlCode)
            handleHtmlChange(data.htmlCode)
            handleCssChange(data.cssCode)
            handleJsChange(data.jsCode)
        } catch (error) {
            console.error('Error optimizing code:', error);
        }
    };

    return (
        <div className="code-features p-4 bg-gray-800 mt-1">
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



        </div>
    );
};

export default CodeFeatures;
