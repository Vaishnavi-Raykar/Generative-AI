import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AiFillAudio } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa"; // New icon for image upload
import { BsSend } from "react-icons/bs"; // Send button icon

const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [inputText, setInputText] = useState("");
  const [imageText, setImageText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [savedTranscript, setSavedTranscript] = useState(""); // New state to save the transcript

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleStartListening = () => {
    setSavedTranscript((prev) => prev + " " + transcript);
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null); // Remove the uploaded image
    setImageText(""); // Clear the extracted text
  };

  const handleSendData = () => {
    // This is where you'd handle sending the text and image to further processing
    const finalText = inputText || savedTranscript + " " + transcript + " " + imageText;
    const finalImage = uploadedImage;

    console.log("Sending data for further processing:", { finalText, finalImage });

    // Clear the textarea and transcript after sending the data
    setInputText("");
    setSavedTranscript("");
    resetTranscript(); // Reset SpeechRecognition transcript
    setImageText("");
    setUploadedImage(null);
  };

  return (
    <div className="p-5 flex justify-center items-center w-full max-w-2xl mx-auto gap-4  rounded-lg shadow-md">
      {/* Microphone and Status */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={handleStartListening}
          className={`bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 flex items-center justify-center transition-all duration-300 ${
            listening ? "bg-green-500" : ""
          }`}
          style={{ width: "56px", height: "56px" }}
        >
          <AiFillAudio size={32} />
        </button>
      </div>

      {/* Text Area and Uploaded Image */}
      <div className="relative w-full flex-1">
        <textarea
          className="w-full h-20 p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
          rows="6"
          value={inputText || savedTranscript + " " + transcript + " " + imageText}
          onChange={handleInputChange}
          placeholder="Type here or speak to fill this area..."
          style={{ paddingLeft: uploadedImage ? "80px" : "16px" }}
        />

        {/* Uploaded Image Inside Text Area (Top Left) */}
        {uploadedImage && (
          <div className="absolute top-2 left-2 w-16 h-16 bg-gray-200 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-0 right-0 bg-white text-black rounded-full p-1 hover:bg-white"
              onClick={handleRemoveImage}
            >
              <MdCancel size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Image Upload Button */}
      <div className="flex flex-col items-center gap-2">
        <label
          htmlFor="imageUpload"
          className="flex items-center space-x-2 bg-blue-600 p-2 rounded-md cursor-pointer hover:bg-blue-700"
        >
          <FaFileUpload size={24} />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Send Button */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleSendData}
          className="flex items-center space-x-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          <BsSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;