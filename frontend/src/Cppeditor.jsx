import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import Editor from "@monaco-editor/react";
import {
  FaPlay,
  FaStop,
  FaHtml5,
  Facpp3Alt,
  FaJs,
  FaDownload,
  FaRedo,
} from "react-icons/fa";
import CodeFeatures from "./CodeFeatures"; // Import the new CodeFeatures component
import { CodeProvider } from "./CodeContext";
import ResultsComponent from "./Codeoutput";
import CodeFeaturesJS from "./CodeFeaturesJs";
import CodeFeaturesCpp from "./CodeFeaturesCpp";
const backend_url = process.env.REACT_APP_Backend;

function Cppeditor() {

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState("");

 

  const cppDefault = `#include <iostream>

int main() {
    std::string input;

    std::cout << "Enter a value: ";
    
    std::getline(std::cin, input);

    std::cout << "You entered: " << input << std::endl;

    return 0;
}`;

  const [Cppcode, setCppCode] = useState(cppDefault);


  function compile() {
    axios.post(`${backend_url}/cpp/compile`, {
      code: Cppcode,
      language: 'cpp',
      input: userInput
    }).then((res) => {
      setOutput(res.data.stdout || res.data.stderr);
    }).catch((err) => {
      console.error(err);
      setOutput("Error: " + (err.response ? err.response.data.error : err.message));
    });
  }


  const extractcppSnippets = (markdown) => {
    const cppMatch = markdown.match(/```cpp\s*([\s\S]*?)```/);

    // Store the extracted code in variables
    const cppCode = cppMatch ? cppMatch[1].trim() : "";

    return cppCode;
  };


  useEffect(() => {
    function hideError(e) {
      if (
        e.message ===
        "ResizeObserver loop completed with undelivered notifications."
      ) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    }

    window.addEventListener("error", hideError);
    return () => {
      window.addEventListener("error", hideError);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      compile();
    } else {
      console.log("Conditions not met for running code");
    }
  }, [Cppcode, isRunning]);

  const updateOutput = () => {
    compile();
  };

  const resetEditor = () => {
    setCppCode("");
    if (isRunning) {
      updateOutput();
    }
  };

  const downloadCode = () => {
    const code = Cppcode;

    const blob = new Blob([code], { type: "text/cpp" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "code.cpp";
    a.click();
  };

  const handleEditorChangecpp = (value) => {
    // Ensure value exists and is not undefined
    if (value !== undefined) {
      setCppCode(value); // Update state with the new HTML code
    }
  };

  const handleRunButtonClick = () => {
      compile();
  };

  return (
    <CodeProvider>
      <div className="App flex flex-col h-screen w-full bg-gray-900 text-white">
        <div className="top-tabs w-full flex justify-between space-x-2 p-2 bg-gray-800">


          <div className="run-btn-container p-2">
            <button
              onClick={handleRunButtonClick}
              className={`px-4 py-2 rounded flex items-center ${isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {isRunning ? (
                <FaStop className="mr-2" />
              ) : (
                <FaPlay className="mr-2" />
              )}{" "}
              {isRunning ? "Stop" : "Run Code"}
            </button>
          </div>

          <div className="toolbar flex justify-between p-4 bg-gray-800">
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center"
                onClick={resetEditor}
              >
                <FaRedo className="mr-1" /> Reset
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center"
                onClick={downloadCode}
              >
                <FaDownload className="mr-1" /> Download Code
              </button>
            </div>
          </div>
        </div>

        <div className="editor flex flex-grow ">
          <div className="code-container  w-1/2 p-2">
            {
              <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
                <Editor
                  className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
                  language="cpp"
                  value={Cppcode}
                  defaultValue=""
                  theme="vs-dark"
                  onChange={handleEditorChangecpp} // Correct onChange handler
                />
              </div>
            }
          </div>

          <div
  id="output-container"
  className="output-container flex-grow border-none p-8 flex flex-col relative h-full"
  title="Output"
>
  {/* Scrollable Output Display */}
  <div className="output-display bg-gray-900 text-white p-4 rounded overflow-auto flex-grow">
    <h3 className="font-bold">Output</h3>
    <pre>{output}</pre>
  </div>

  {/* Fixed User Input Section */}
  <div className="user-input bg-gray-800 text-white p-4 rounded w-full absolute bottom-0 left-0">
    <h3 className="font-bold">User Input</h3>
    <textarea
      className="w-full h-20 p-2 bg-gray-700 text-white rounded"
      value={userInput} // Make sure to define 'userInput' in your state
      onChange={(e) => setUserInput(e.target.value)} // Update state on input
      placeholder="Enter your input here"
    />
  </div>
</div>


        </div>
        <CodeFeaturesCpp Cppcode={Cppcode} setCppCode={setCppCode} />
      </div>
      <ResultsComponent />
      <div id="output-container"></div>
    </CodeProvider>
  );
}

export default Cppeditor;