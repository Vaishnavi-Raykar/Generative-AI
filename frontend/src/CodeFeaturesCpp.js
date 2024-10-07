import React, { useContext, useState } from "react";
import axios from "axios";
import { CodeContext } from "./CodeContext";
const backend_url = process.env.REACT_APP_Backend

const CodeFeaturesCpp = ({ Cppcode, setCppCode }) => {
  const {
    explanation,
    setExplanation,
    rewrittenCode,
    setRewrittenCode,
    optimizedCode,
    setOptimizedCode,
  } = useContext(CodeContext);

  const handlecppChange = (newCppCode) => {
    setCppCode(newCppCode);
  };

  const handleExplainCode = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/code/cpp/explain`,
        {
          Cppcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setExplanation(response.data.explanation);
      setRewrittenCode(""); // Clear rewrittenCode
      setOptimizedCode("");
    } catch (error) {
      console.error("Error explaining code:", error);
    }
  };

  const extractCodeSnippets = (markdown) => {
    const cppMatch = markdown.match(/```cpp\s*([\s\S]*?)```/);

    const cppCode = cppMatch ? cppMatch[1].trim() : "";

    return cppCode;
  };

  const handleRewriteCode = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/code/cpp/rewrite`,
        {
          Cppcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data");
      setRewrittenCode(response.data.rewrittenCode);
      setExplanation(""); // Clear explanation
      setOptimizedCode("");
      const data = extractCodeSnippets(response.data.rewrittenCode);
      // console.log(data.htmlCode)
      handlecppChange(data);
    } catch (error) {
      console.error("Error rewriting code:", error);
    }
  };

  const handleOptimizeCode = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/code/cpp/optimize`,
        {
          Cppcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOptimizedCode(response.data.optimizedCode);
      setExplanation(""); // Clear explanation
      setRewrittenCode("");
      const data = extractCodeSnippets(response.data.optimizedCode);
      // console.log(data.htmlCode)
      handlecppChange(data);
    } catch (error) {
      console.error("Error optimizing code:", error);
    }
  };

  return (
    <div className="code-features p-4 bg-gray-800 mt-1">
      <div className="flex gap-4">
        <button
          onClick={handleExplainCode}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Explain
        </button>
        <button
          onClick={handleRewriteCode}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Rewrite
        </button>
        <button
          onClick={handleOptimizeCode}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Optimize
        </button>
      </div>
    </div>
  );
};

export default CodeFeaturesCpp;
