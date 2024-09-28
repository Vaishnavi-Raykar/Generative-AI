import React, { useContext } from 'react';
import { CodeContext } from './CodeContext'; 
import MarkdownPreviewer from "./MarkdownPreviewer";

const ResultsComponent = () => {
  // Consume the context to get explanation, rewrittenCode, and optimizedCode
  const { explanation, rewrittenCode, optimizedCode } = useContext(CodeContext);

  return (
    <div className="results mt-4 relative">
      {/* Explanation Section */}
      {explanation && (
        <div className="explanation bg-gray-700 p-4 rounded mb-2">
          <h3 className="font-bold text-white">Explanation:</h3>
          <MarkdownPreviewer markdown={explanation}/>
        </div>
      )}

      {/* Rewritten Code Section */}
      {rewrittenCode && (
        <div className="rewritten bg-gray-700 p-2 rounded mb-2">
          <h3 className="font-bold text-white">Rewritten Code:</h3>
          <MarkdownPreviewer markdown={rewrittenCode}/>
        </div>
      )}

      {/* Optimized Code Section */}
      {optimizedCode && (
        <div className="optimized bg-gray-700 p-2 rounded">
          <h3 className="font-bold text-white">Optimized Code:</h3>
          <MarkdownPreviewer markdown={optimizedCode}/>
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
