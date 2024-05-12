import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from '../../context/userContext';
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import './css/Chatx.css';

const Chatx = () => {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishCount, setWishCount] = useState(0); // State to hold wish count
  const textareaRef = useRef(null);
  const ws = useRef(null); // WebSocket reference

  // Function to fetch wish count from the backend
  const fetchWishCount = async () => {
    try {
      if (!user || !user._id) {
        throw new Error("User ID not available");
      }
      const response = await fetch(`http://localhost:8000/wishcount/${user._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch wish count");
      }
      const data = await response.json();
      setWishCount(data.wishCount);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch wish count.");
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchWishCount(); // Fetch wish count when the component mounts
    }
  }, [user]); // Add user to the dependency array

  function autoResizeInput() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }

  const getResponse = async () => {
    if (!value.trim()) {
      setError("Please enter a question");
      return;
    }
    try {
      setIsLoading(true);
  
      // Decrease wish count by 1 in the UI
      setWishCount(prevCount => prevCount - 1);
  
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
  
      let formattedResponse = data.startsWith("**") ? data : `**Bot:** ${data}`;
  
      const formattedUserMessage = `**You:** ${value}`;
  
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{ text: formattedUserMessage }],
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
      setIsLoading(false);
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
        setIsLoading(true);
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
        setIsLoading(false);
        
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
        <h3>Wish Count: {wishCount}</h3>
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
          {!isLoading && !error && wishCount > 0 && <button onClick={getResponse}>Ask me</button>}
          {!isLoading && error && <button onClick={clear}>Clear</button>}
          {isLoading && <div className="loading-indicator">Loading...</div>}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Chatx;