import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FiMic } from 'react-icons/fi';  // Mic icon

const SpeechToText = () => {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();
    const [timeoutId, setTimeoutId] = useState(null);

    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        
        // Automatically stop listening after 10 seconds of inactivity
        const id = setTimeout(() => {
            SpeechRecognition.stopListening();
        }, 5000); 
        setTimeoutId(id);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    // Stop listening automatically if no input after 10 sec
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="text-center text-red-500">
                Your browser does not support speech recognition.
            </div>
        );
    }

    return (
        <div className="container mx-24 p-3 bg-white shadow-lg rounded-lg max-w-2xl flex items-center">
            {/* Mic Icon Button */}
            <button
                onClick={startListening}
                className={`p-3 rounded-full text-white ${listening ? 'bg-red-500' : 'bg-indigo-500'} hover:bg-indigo-600 transition`}
            >
                <FiMic size={24} />
            </button>

            {/* TextArea to display transcript */}
            <textarea
                className="ml-4 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg h-20 text-gray-700 resize-none overflow-y-auto"
                value={transcript}
                readOnly
                placeholder="Speech will appear here..."
            />
        </div>
    );
};

export default SpeechToText;