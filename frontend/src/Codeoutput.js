import React, { useContext } from "react";
import { CodeContext } from "./CodeContext";
import MarkdownPreviewer from "./MarkdownPreviewer";

const ResultsComponent = () => {
  // Consume the context to get explanation, rewrittenCode, and optimizedCode
  const { explanation, rewrittenCode, optimizedCode } = useContext(CodeContext);

  return (
    <div className="results w-full  flex justify-center items-center">
      {/* Explanation Section */}
      {explanation && (
        <div className="explanation bg-gray-900 w-full pb-6">
          <h3 className="font-semibold text-3xl pb-4 pt-2 flex justify-center items-center text-white">
            Explanation of code
          </h3>
          <MarkdownPreviewer markdown={explanation} />
        </div>
      )}

      {/* Rewritten Code Section */}
      {rewrittenCode && (
        <div className="rewritten bg-gray-900 w-full pb-6">
          <h3 className="font-semibold text-3xl pb-4 pt-2 flex justify-center items-center text-white w-full">
            Rewritten Code
          </h3>
          <MarkdownPreviewer markdown={rewrittenCode} />
        </div>
      )}

      {/* Optimized Code Section */}
      {optimizedCode && (
        <div className="optimized bg-gray-900 w-full pb-6">
          <h3 className="font-semibold text-3xl pb-4 pt-2 flex justify-center items-center text-white">
            Optimized Code
          </h3>
          <MarkdownPreviewer markdown={optimizedCode} />
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
