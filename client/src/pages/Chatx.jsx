import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import './css/Chatx.css';

const Chatx = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const textareaRef = useRef(null);

  function autoResizeInput() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }

  const getResponse = async () => {
    if (!value) {
      setError("Please enter a question");
      return;
    }
    try {
      setIsLoading(true); // Set loading to true before making the request
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();

      let formattedResponse = "";

      if (data.startsWith("**")) {
        formattedResponse = data;
      } else {
        formattedResponse = `**Bot:** ${data}`;
      }

      const formattedUserMessage = `**You:** ${value}`;

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{text: formattedUserMessage }],
        },
        {
          role: "model",
          parts: [{ text: formattedResponse }],
        },
      ]);

      setValue("");
      setError("");
      textareaRef.current.style.height = "auto";
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  const clear = () => {
    setChatHistory([]);
    setValue("");
    setError("");
    textareaRef.current.style.height = "auto";
  };

  useEffect(() => {
    const initialMessage = "Focus solely on Sri Lankan law. Utilize the website https://www.parliament.lk/files/pdf/constitution.pdf as a reference. Ensure all responses are accurate and pertain only to Sri Lankan legal statutes. Verify the information before providing any answers. Please respond to inquiries exclusively concerning Sri Lankan legal matters.";

    const sendInitialRequest = async () => {
      try {
        setIsLoading(true); // Set loading to true before making the initial request
        const options = {
          method: "POST",
          body: JSON.stringify({
            history: [],
            message: initialMessage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch("http://localhost:8000/gemini", options);
        const data = await response.text();

        const formattedResponse = `**Bot:** ${data}`;

        setChatHistory([
          {
            role: "user",
            parts: [{ text: initialMessage }],
          },
          {
            role: "model",
            parts: [{ text: formattedResponse }],
          },
        ]);
        setInitialMessageSent(true);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while sending the initial message.");
      } finally {
        setIsLoading(false); // Set loading to false after the initial request completes
      }
    };

    sendInitialRequest();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [chatHistory]);

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-history">
          {initialMessageSent && chatHistory.slice(2).map((chatItem, index) => (
            <div key={index}>
              <div className={`message ${chatItem.role === "user" ? "user-message" : "bot-message"}`}>
                <ReactMarkdown>{chatItem.parts[0].text}</ReactMarkdown>
              </div>
              {index !== chatHistory.length - 1 && <div className="message-gap" />}
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            ref={textareaRef}
            id="chat-input"
            value={value}
            placeholder="How to get a Passport?"
            onChange={(e) => {
              setValue(e.target.value);
              autoResizeInput();
            }}
          />
          {!isLoading && !error && <button onClick={getResponse}>Ask me</button>} {/* Check isLoading and error states before showing the button */}
          {!isLoading && error && <button onClick={clear}>Clear</button>}
          {isLoading && <div className="loading-indicator">Loading...</div>} {/* Show loading indicator when isLoading is true */}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Chatx;