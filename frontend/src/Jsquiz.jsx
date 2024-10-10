import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay, FaStop, FaRedo } from "react-icons/fa";
import { CodeProvider } from "./CodeContext";
import CodeFeaturesJSQuiz from "./CodeFeaturesJsquiz";
import ResultsComponent from "./Codeoutput";

function Jsquiz() {
  const [activeTab, setActiveTab] = useState("js");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [jsCode, setJsCode] = useState("loading");
  const [difficulty, setDifficulty] = useState("easy"); // Default is easy
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const questions = [
    // Easy Questions
    { question: "// Write a function to find the factorial of a number.", difficulty: "easy" },
    { question: "// Write a function to generate the Fibonacci sequence.", difficulty: "easy" },
    { question: "// Write a function to check if a number is prime.", difficulty: "easy" },
    { question: "// Write a function to reverse a string.", difficulty: "easy" },
    { question: "// Write a function to convert Celsius to Fahrenheit.", difficulty: "easy" },
    { question: "// Write a function to find the largest number in an array.", difficulty: "easy" },
    { question: "// Write a function to count the vowels in a string.", difficulty: "easy" },
    { question: "// Write a function to remove duplicates from an array.", difficulty: "easy" },
    { question: "// Write a function to find the sum of all numbers in an array.", difficulty: "easy" },
    { question: "// Write a function to check if a string is a palindrome.", difficulty: "easy" },
  
    // Medium Questions
    { question: "// Write a function to sort an array using quicksort.", difficulty: "medium" },
    { question: "// Write a function to merge two sorted arrays.", difficulty: "medium" },
    { question: "// Write a function to implement binary search on a sorted array.", difficulty: "medium" },
    { question: "// Write a function to rotate an array by 'k' positions.", difficulty: "medium" },
    { question: "// Write a function to find the first non-repeating character in a string.", difficulty: "medium" },
    { question: "// Write a function to flatten a nested array.", difficulty: "medium" },
    { question: "// Write a function to implement a simple calculator (add, subtract, multiply, divide).", difficulty: "medium" },
    { question: "// Write a function to find the intersection of two arrays.", difficulty: "medium" },
    { question: "// Write a function to determine if two strings are anagrams.", difficulty: "medium" },
    { question: "// Write a function to generate all permutations of a string.", difficulty: "medium" },
  
    // Hard Questions
    { question: "// Write a function to solve the Tower of Hanoi problem.", difficulty: "hard" },
    { question: "// Write a function to find the longest common subsequence between two strings.", difficulty: "hard" },
    { question: "// Write a function to find the shortest path in a maze.", difficulty: "hard" },
    { question: "// Write a function to solve the N-Queens problem.", difficulty: "hard" },
    { question: "// Write a function to implement Dijkstra's algorithm for shortest path in a graph.", difficulty: "hard" },
    { question: "// Write a function to find the maximum subarray sum (Kadane’s Algorithm).", difficulty: "hard" },
    { question: "// Write a function to solve the knapsack problem (0-1 knapsack).", difficulty: "hard" },
    { question: "// Write a function to find all possible combinations of a given set of numbers.", difficulty: "hard" },
    { question: "// Write a function to implement a trie data structure.", difficulty: "hard" },
    { question: "// Write a function to calculate the edit distance between two strings.", difficulty: "hard" }
  ];
  

  // Filter questions based on selected difficulty
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  };

  // Set a random question and difficulty when the component loads
  useEffect(() => {
    const selectedQuestion = getRandomQuestion();
    setJsCode(selectedQuestion.question);
    setDifficulty(selectedQuestion.difficulty);

    let timeInSeconds;
    if (selectedQuestion.difficulty === "easy") {
      timeInSeconds = 5 * 60;
    } else if (selectedQuestion.difficulty === "medium") {
      timeInSeconds = 10 * 60;
    } else if (selectedQuestion.difficulty === "hard") {
      timeInSeconds = 20 * 60;
    }
    setRemainingTime(timeInSeconds);
  }, [difficulty]); // Triggered when difficulty changes

  const startTimer = () => {
    setIsTimerRunning(true);
    const timerInterval = setInterval(() => {
      setRemainingTime(prevTime => {
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

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const Shufflequestion = () => {
    const selectedQuestion = getRandomQuestion();
    setJsCode(selectedQuestion.question);
    setDifficulty(selectedQuestion.difficulty);

    let timeInSeconds;
    if (selectedQuestion.difficulty === "easy") {
      timeInSeconds = 5 * 60;
    } else if (selectedQuestion.difficulty === "medium") {
      timeInSeconds = 10 * 60;
    } else if (selectedQuestion.difficulty === "hard") {
      timeInSeconds = 20 * 60;
    }
    setRemainingTime(timeInSeconds);
    setIsTimerRunning(false); // Reset the timer state
  };

  // Define the runCode function
  const runCode = () => {
    try {
      const consoleLog = [];
      const originalLog = console.log;

      // Override console.log to capture the output
      console.log = (...args) => {
        consoleLog.push(args.join(" "));
      };

      // Run the JavaScript code entered in the editor
      const run = new Function(jsCode);
      run();

      // Restore the original console.log
      console.log = originalLog;
      setOutput(consoleLog.join("\n"));
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value); // Update the difficulty
  };

  const handleRunButtonClick = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      runCode();
    }
  };

  return (
    <CodeProvider>
      <div className="App flex flex-col h-screen bg-gray-900 text-white">

        <div className="top-tabs w-full flex justify-between space-x-2 p-2 bg-gray-800 shadow-lg rounded-lg">
          <div className="flex items-center gap-4 p-2">
            <button
              onClick={startTimer}
              className={`flex items-center px-4 py-2 rounded font-semibold ${
                activeTab === "js"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition duration-200`}
            >
              <FaPlay className="mr-2 " /> JS Quiz
            </button>

            <select
              className="bg-gray-700 text-white px-3 py-2 rounded"
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div className="flex gap-4">
              {/* <p className="text-lg font-semibold text-yellow-400">
                Level: {difficulty}
              </p> */}
              <p className="text-lg font-semibold text-red-400">
                Time Left: {formatTime(remainingTime)}
              </p>
            </div>
          </div>

          <div className="run-btn-container p-2">
            <button
              onClick={handleRunButtonClick}
              className={`px-4 py-2 rounded font-semibold shadow-md flex items-center ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition duration-200`}
            >
              {isRunning ? <FaStop className="mr-2" /> : <FaPlay className="mr-2" />}
              {isRunning ? "Stop" : "Run Code"}
            </button>
          </div>
        </div>

        <div className="editor flex flex-grow ">
          <div className="code-container  w-1/2 p-2">
            {activeTab === "js" && (
              <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
                <Editor
                  className="w-full h-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
                  language="javascript"
                  value={jsCode}
                  defaultValue=""
                  theme="vs-dark"
                  onChange={(value) => setJsCode(value)}
                />
              </div>
            )}
          </div>

          <div id="output" className="output flex-grow border-none p-8" title="Output">
            {output}
          </div>
        </div>

        <CodeFeaturesJSQuiz jsCode={jsCode} setJsCode={setJsCode} Shufflequestion={Shufflequestion} output={output} />
      </div>
      <ResultsComponent />
      <div id="output-container"></div>
    </CodeProvider>
  );
}

export default Jsquiz;
