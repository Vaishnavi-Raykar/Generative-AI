import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { FaPlay, FaStop, FaJs, FaDownload, FaRedo } from "react-icons/fa";
import CodeFeatures from "./CodeFeatures"; // Import the new CodeFeatures component
import { CodeProvider } from "./CodeContext";
import ResultsComponent from "./Codeoutput";
import CodeFeaturesJS from "./CodeFeaturesJs";
import CodeFeaturesJSQuiz from "./CodeFeaturesJsquiz";
const backend_url = process.env.REACT_APP_Backend;

function Jsquiz() {
  const runCode = () => {
    if (editorlang == "javascript") {
      try {
        // Use Function constructor to run the code and capture console logs
        const consoleLog = [];
        const originalLog = console.log;

        console.log = (...args) => {
          consoleLog.push(args.join(" "));
        };

        // Create a new function and run the code
        const run = new Function(jsCode);
        run();
        setOutput(consoleLog.join("\n"));
      } catch (error) {
        setOutput(error.toString());
      }
    } else {
      axios
        .post(`${backend_url}/cpp/compile`, {
          code: jsCode,
          language: "cpp",
          input: userInput,
        })
        .then((res) => {
          setOutput(res.data.stdout || res.data.stderr);
        })
        .catch((err) => {
          console.error(err);
          setOutput(
            "Error: " + (err.response ? err.response.data.error : err.message)
          );
        });
    }
  };

  const [activeTab, setActiveTab] = useState("js");

  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [jsCode, setJsCode] = useState("loading");
  const [editorlang, seteditorlang] = useState("javascript");
  const [difficulty, setDifficulty] = useState("easy");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const questions = [
    // Easy Questions
    {
      question: "// Write a function to find the factorial of a number.",
      difficulty: "easy",
    },
    {
      question:
        "// Write a function to generate the Fibonacci sequence up to a given number.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to check if a number is prime.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to check if a string is a palindrome.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to reverse a string.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to find the largest number in an array.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to count the vowels in a string.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to remove duplicates from an array.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to convert Celsius to Fahrenheit.",
      difficulty: "easy",
    },
    {
      question: "// Write a function to sum all numbers in an array.",
      difficulty: "easy",
    },
    // Medium Questions
    {
      question: "// Write a function to sort an array using quicksort.",
      difficulty: "medium",
    },
    {
      question: "// Write a function to check if a string is a palindrome.",
      difficulty: "medium",
    },
    {
      question:
        "// Write a function to find the first non-repeating character in a string.",
      difficulty: "medium",
    },
    {
      question:
        "// Write a function to merge two sorted arrays into one sorted array.",
      difficulty: "medium",
    },
    {
      question:
        "// Write a function to implement a simple calculator (add, subtract, multiply, divide).",
      difficulty: "medium",
    },
    {
      question:
        "// Write a function to determine if two strings are anagrams of each other.",
      difficulty: "medium",
    },
    {
      question: "// Write a function to rotate an array by k positions.",
      difficulty: "medium",
    },
    {
      question: "// Write a function to find the intersection of two arrays.",
      difficulty: "medium",
    },
    {
      question: "// Write a function to generate all permutations of a string.",
      difficulty: "medium",
    },
    {
      question: "// Write a function to validate a Sudoku board.",
      difficulty: "medium",
    },
    // Hard Questions
    {
      question:
        "// Write a function to find the longest common subsequence between two strings.",
      difficulty: "hard",
    },
    {
      question: "// Write a function to solve the Tower of Hanoi problem.",
      difficulty: "hard",
    },
    {
      question: "// Write a function to find the shortest path in a maze.",
      difficulty: "hard",
    },
    {
      question:
        "// Write a function to implement Dijkstra’s algorithm for finding the shortest path in a graph.",
      difficulty: "hard",
    },
    {
      question: "// Write a function to solve the N-Queens problem.",
      difficulty: "hard",
    },
  ];

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

  const getRandomQuestion = (difficulty, questions) => {
    const filteredQuestions = questions.filter(
      (q) => q.difficulty === difficulty
    );
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  };

  // UseEffect to set the random question when the component loads
  // useEffect(() => {
  //   const selectedQuestion = getRandomQuestion();
  //   setJsCode(selectedQuestion.question);
  //   setDifficulty(selectedQuestion.difficulty);

  //   // Set time based on difficulty
  //   let timeInSeconds;
  //   if (selectedQuestion.difficulty === "easy") {
  //     timeInSeconds = 5 * 60; // 5 minutes for easy
  //   } else if (selectedQuestion.difficulty === "medium") {
  //     timeInSeconds = 10 * 60; // 10 minutes for medium
  //   } else if (selectedQuestion.difficulty === "hard") {
  //     timeInSeconds = 20 * 60; // 20 minutes for hard
  //   }
  //   setRemainingTime(timeInSeconds);
  // }, []);

  useEffect(() => {
    const selectedQuestion = getRandomQuestion(difficulty, questions);
    setJsCode(selectedQuestion.question);

    // Set time based on difficulty
    let timeInSeconds;
    if (selectedQuestion.difficulty === "easy") {
      timeInSeconds = 5 * 60; // 5 minutes for easy
    } else if (selectedQuestion.difficulty === "medium") {
      timeInSeconds = 10 * 60; // 10 minutes for medium
    } else if (selectedQuestion.difficulty === "hard") {
      timeInSeconds = 20 * 60; // 20 minutes for hard
    }
    setRemainingTime(timeInSeconds);
  }, [difficulty]);

  const startTimer = () => {
    if(isTimerRunning==true){
      return
    }
    setIsTimerRunning(true);
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          setIsTimerRunning(false);
          alert("Time's up!");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const Shufflequestion = () => {
    const selectedQuestion = getRandomQuestion(difficulty, questions);
    setJsCode(selectedQuestion.question);
    setDifficulty(selectedQuestion.difficulty);

    let timeInSeconds;
    if (selectedQuestion.difficulty === "easy") {
      timeInSeconds = 5 * 60; // 5 minutes for easy
    } else if (selectedQuestion.difficulty === "medium") {
      timeInSeconds = 10 * 60; // 10 minutes for medium
    } else if (selectedQuestion.difficulty === "hard") {
      timeInSeconds = 20 * 60; // 20 minutes for hard
    }
    setRemainingTime(timeInSeconds);
    setIsTimerRunning(false); // Reset the timer state
  };

  useEffect(() => {
    if (isRunning) {
      runCode();
    } else {
      console.log("Conditions not met for running code");
    }
  }, [jsCode, isRunning]);

  const updateOutput = () => {
    runCode();
  };

  const resetEditor = () => {
    setJsCode("");
    if (isRunning) {
      updateOutput();
    }
  };

  const downloadCode = () => {
    const code = jsCode;

    const blob = new Blob([code], { type: "text/js" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "code.js";
    a.click();
  };

  const handleEditorChangejs = (value) => {
    if (value !== undefined) {
      setJsCode(value); // Update state with the new HTML code
    }
  };

 

  // Function to handle running code
  const handleRunButtonClick = () => {
    if (isRunning) {
      setIsRunning(false); // Stop running if already running
    } else {
      setIsRunning(true); // Start running
      runCode(); // Run the code
      setIsRunning(false); // Stop running after executing
    }
  };
  return (
    <CodeProvider>
      <div className="App flex flex-col h-screen bg-gray-900 text-white">
        <div className="top-tabs w-full flex justify-between space-x-2 p-2 bg-gray-800 shadow-lg rounded-lg">
          <div className="flex items-center gap-4 p-2">
            <select
              value={editorlang}
              onChange={(e) => seteditorlang(e.target.value)}
              className="p-2 bg-gray-800 rounded-lg shadow-md text-white"
            >
              <option value="javascript">Javascript</option>
              <option value="cpp">C++</option>
            </select>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-2 bg-gray-800 rounded-lg shadow-md text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={startTimer}
              className={`flex items-center px-4 py-2 rounded font-semibold ${
                activeTab === "js"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition duration-200`}
            >
              <FaPlay className="mr-2 " /> Start
            </button>

            <div className="flex gap-4">
              <p className="text-lg font-semibold text-red-400">
                Time Left : {formatTime(remainingTime)}
              </p>
            </div>
          </div>

          {/* <div className="run-btn-container p-2">
            <button
              onClick={handleRunButtonClick}
              className={`px-4 py-2 rounded font-semibold shadow-md flex items-center ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition duration-200`}
            >
              {isRunning ? (
                <FaStop className="mr-2" />
              ) : (
                <FaPlay className="mr-2" />
              )}
              {isRunning ? "Stop" : "Run Code"}
            </button>
          </div> */}

          <div className="run-btn-container p-2">
            <button
              onClick={handleRunButtonClick}
              className={`px-4 py-2 rounded font-semibold shadow-md flex items-center ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition duration-200`}
            >
              {isRunning ? (
                <FaStop className="mr-2" />
              ) : (
                <FaPlay className="mr-2" />
              )}
              {isRunning ? "Stop" : "Run Code"}
            </button>
          </div>

          <div className="toolbar flex gap-4 p-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center text-white font-semibold transition duration-200 shadow-md"
              onClick={resetEditor}
            >
              <FaRedo className="mr-1" /> Reset
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center text-white font-semibold transition duration-200 shadow-md"
              onClick={downloadCode}
            >
              <FaDownload className="mr-1" /> Download Code
            </button>
          </div>
        </div>

        <div className="editor flex flex-grow ">
          <div className="code-container  w-1/2 p-2">
            {activeTab === "js" && (
              <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
                <Editor
                  className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
                  language={editorlang}
                  value={jsCode}
                  defaultValue=""
                  theme="vs-dark"
                  onChange={handleEditorChangejs} // Correct onChange handler
                />
              </div>
            )}
          </div>
          {editorlang == "cpp" && (
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
          )}
        </div>
        <CodeFeaturesJSQuiz
          jsCode={jsCode}
          setJsCode={setJsCode}
          Shufflequestion={Shufflequestion}
          output={output}
        />
      </div>
      <ResultsComponent />
      <div id="output-container"></div>
    </CodeProvider>
  );
}

export default Jsquiz;
