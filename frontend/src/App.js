// import React, { useState, useEffect } from 'react';
// import { FaPlay, FaStop, FaHtml5, FaCss3Alt, FaJs, FaDownload, FaRedo } from 'react-icons/fa';

// function App() {
//   const [activeTab, setActiveTab] = useState('html');
//   const [htmlCode, setHtmlCode] = useState('');
//   const [cssCode, setCssCode] = useState('');
//   const [jsCode, setJsCode] = useState('');
//   const [livePreview, setLivePreview] = useState(false); // Changed to false for starting with no live preview
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     if (isRunning && livePreview) {
//       updateOutput();
//     }
//   }, [htmlCode, cssCode, jsCode, livePreview, isRunning]);

//   const updateOutput = () => {
//     const output = document.getElementById('output');
//     const html = htmlCode || '';
//     const css = `<style>${cssCode || ''}</style>`;
//     const js = `<script>${jsCode || ''}<\/script>`;
//     output.srcdoc = `${html}${css}${js}`;
//   };

//   const resetEditor = () => {
//     setHtmlCode('');
//     setCssCode('');
//     setJsCode('');
//     if (isRunning) {
//       updateOutput();
//     }
//   };

//   const downloadCode = () => {
//     const code = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Downloaded Code</title>
//         <style>${cssCode}</style>
//       </head>
//       <body>
//         ${htmlCode}
//         <script>${jsCode}<\/script>
//       </body>
//       </html>`;

//     const blob = new Blob([code], { type: 'text/html' });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'code.html';
//     a.click();
//   };

//   const handleInputChange = (e, lang) => {
//     const value = e.target.value;
//     if (lang === 'html') setHtmlCode(value);
//     if (lang === 'css') setCssCode(value);
//     if (lang === 'js') setJsCode(value);
//   };

//   const handleRunButtonClick = () => {
//     if (isRunning) {
//       setIsRunning(false);
//       setLivePreview(false); // Stop live preview when stopping
//     } else {
//       setIsRunning(true);
//       setLivePreview(true); // Start live preview when running
//       updateOutput(); // Ensure output is updated when running
//     }
//   };

//   return (
//     <div className="App flex flex-col h-screen bg-gray-900 text-white">

//       <div className="top-tabs w-full flex justify-between space-x-2 p-2 bg-gray-800">
//         <div className='flex gap-4  p-2'>
//         <button onClick={() => setActiveTab('html')} className={`flex items-center ${activeTab === 'html' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-gray-600 px-3  rounded`}>
//           <FaHtml5 className="mr-2" /> HTML
//         </button>
//         <button onClick={() => setActiveTab('css')} className={`flex items-center ${activeTab === 'css' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-gray-600 px-3  rounded`}>
//           <FaCss3Alt className="mr-2" /> CSS
//         </button>
//         <button onClick={() => setActiveTab('js')} className={`flex items-center ${activeTab === 'js' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-gray-600 px-3 rounded`}>
//           <FaJs className="mr-2" /> JavaScript
//         </button>
//         </div>

//         <div className="run-btn-container p-2">
//           <button onClick={handleRunButtonClick} className={`px-4 py-2 rounded flex items-center ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
//             {isRunning ? <FaStop className="mr-2" /> : <FaPlay className="mr-2" />} {isRunning ? 'Stop' : 'Run Code'}
//           </button>
//         </div>

//         <div className="toolbar flex justify-between  p-4 bg-gray-800">
//         <div className='flex gap-4'>
//           <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center" onClick={resetEditor}>
//             <FaRedo className="mr-1" /> Reset
//           </button>
//           <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center" onClick={downloadCode}>
//             <FaDownload className="mr-1" /> Download Code
//           </button>
//         </div>

//       </div>

//       </div>

//       <div className="editor flex flex-grow">
//         <div className="code-container flex-grow p-2">
//           {activeTab === 'html' && (
//             <textarea
//               placeholder="HTML Code"
//               value={htmlCode}
//               onChange={(e) => handleInputChange(e, 'html')}
//               className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
//             />
//           )}
//           {activeTab === 'css' && (
//             <textarea
//               placeholder="CSS Code"
//               value={cssCode}
//               onChange={(e) => handleInputChange(e, 'css')}
//               className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
//             />
//           )}
//           {activeTab === 'js' && (
//             <textarea
//               placeholder="JavaScript Code"
//               value={jsCode}
//               onChange={(e) => handleInputChange(e, 'js')}
//               className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
//             />
//           )}
//         </div>

//         <iframe id="output" className="output flex-grow border-none" title="Output"></iframe>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaStop,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDownload,
  FaRedo,
} from "react-icons/fa";
import axios from "axios"; // Import axios for making requests
import CodeFeatures from "./CodeFeatures"; // Import the new CodeFeatures component
import { Controlled as CodeMirror } from "react-codemirror2";

function App() {
  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [livePreview, setLivePreview] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && livePreview) {
      updateOutput();
    }
  }, [htmlCode, cssCode, jsCode, livePreview, isRunning]);

  const updateOutput = () => {
    const output = document.getElementById("output");
    const html = htmlCode || "";
    const css = `<style>${cssCode || ""}</style>`;
    const js = `<script>${jsCode || ""}<\/script>`;
    output.srcdoc = `${html}${css}${js}`;
  };

  const resetEditor = () => {
    setHtmlCode("");
    setCssCode("");
    setJsCode("");
    if (isRunning) {
      updateOutput();
    }
  };

  const downloadCode = () => {
    const code = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Downloaded Code</title>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}<\/script>
      </body>
      </html>`;

    const blob = new Blob([code], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "code.html";
    a.click();
  };

  const handleInputChange = (e, lang) => {
    const value = e.target.value;
    if (lang === "html") setHtmlCode(value);
    if (lang === "css") setCssCode(value);
    if (lang === "js") setJsCode(value);
  };

  const handleRunButtonClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setLivePreview(false);
    } else {
      setIsRunning(true);
      setLivePreview(true);
      updateOutput();
    }
  };

  return (
    <div className="App flex flex-col h-screen bg-gray-900 text-white">
      <div className="top-tabs w-full flex justify-between space-x-2 p-2 bg-gray-800">
        <div className="flex gap-4 p-2">
          <button
            onClick={() => setActiveTab("html")}
            className={`flex items-center ${
              activeTab === "html" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-gray-600 px-3 rounded`}
          >
            <FaHtml5 className="mr-2" /> HTML
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`flex items-center ${
              activeTab === "css" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-gray-600 px-3 rounded`}
          >
            <FaCss3Alt className="mr-2" /> CSS
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`flex items-center ${
              activeTab === "js" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-gray-600 px-3 rounded`}
          >
            <FaJs className="mr-2" /> JavaScript
          </button>
        </div>

        <div className="run-btn-container p-2">
          <button
            onClick={handleRunButtonClick}
            className={`px-4 py-2 rounded flex items-center ${
              isRunning
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

      <div className="editor flex flex-grow">
        <div className="code-container flex-grow p-2">
          {activeTab === "html" && (
            <textarea
              placeholder="HTML Code"
              value={htmlCode}
              onChange={(e) => handleInputChange(e, 'html')}
              className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
            />

          )}
          {activeTab === "css" && (
            <textarea
              placeholder="CSS Code"
              value={cssCode}
              onChange={(e) => handleInputChange(e, "css")}
              className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
            />
          )}
          {activeTab === "js" && (
            <textarea
              placeholder="JavaScript Code"
              value={jsCode}
              onChange={(e) => handleInputChange(e, "js")}
              className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
            />
          )}
        </div>

        <iframe
          id="output"
          className="output flex-grow border-none"
          title="Output"
        ></iframe>
      </div>

      {/* Import the CodeFeatures component */}
      <CodeFeatures htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
    </div>
  );
}

export default App;
