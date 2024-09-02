import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Bot = ({ closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    const response = await getAIResponse(input);

    setMessages([...newMessages, { text: response, sender: "ai" }]);
    setInput("");
  };
  const apiKey = process.env.REACT_APP_API_KEY;
  let genAI;
  let model;
  if (apiKey !== undefined) {
    genAI = new GoogleGenerativeAI(`${apiKey}`);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  const getAIResponse = async (prompt) => {
    try {
      const response = await fetchGeminiAI(prompt);
      return response;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, something went wrong.";
    }
  };

  const fetchGeminiAI = async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.candidates[0]?.content?.parts[0].text;
      return aiResponse;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, something went wrong.";
    }
  };

  return (
    <div className="fixed z-50 bottom-0 right-0 md:right-5 md:bottom-5 w-full  max-w-sm mx-auto  bg-white rounded-lg shadow-md">
      <div className="p-5 bg-blue-500 mb-3 rounded-lg flex gap-2 items-center w-full relative">
        <svg
          className="w-8 h-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <g data-name="message-circle">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="16" cy="12" r="1"></circle>
            <circle cx="8" cy="12" r="1"></circle>
            <path d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zm.83 8.36a8 8 0 0 1-11 6.08 3.26 3.26 0 0 0-1.25-.26 3.43 3.43 0 0 0-.56.05l-2.82.57.57-2.82a3.09 3.09 0 0 0-.21-1.81 8 8 0 0 1 6.08-11 8 8 0 0 1 9.19 9.19z"></path>
          </g>
        </svg>
        <h2 className="text-white text-lg">How May I Help You?</h2>
        <svg
          class="w-8 h-8 absolute top-[-15px] right-[-5px] text-white cursor-pointer"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={closeChat}
        >
          <path d="M10 1.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8zm4.789 11.461L13.06 14.79 10 11.729l-3.061 3.06L5.21 13.06 8.272 10 5.211 6.939 6.94 5.211 10 8.271l3.061-3.061 1.729 1.729L11.728 10l3.061 3.061z"></path>
        </svg>
      </div>
      <div className="h-80 overflow-y-auto mb-4 flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-[#B9D9EB] text-gray-900 self-end"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832c0-.654-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963c-.482.537.137 1.62 1.375 3.788"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Bot;
