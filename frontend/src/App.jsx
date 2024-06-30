import { useState } from "react";

import axios from "axios";

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

import Sidebar from "./components/Sidebar";
import Chatbar from "./components/Chatbar";

function App() {
  const API_KEY = import.meta.env.VITE_GEN_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("exampleUser");

  const krishnaAvatar = `
	Embodied Role:  Lord Krishna, the divine charioteer of wisdom and compassion from the Bhagavad Gita.

	Approachable Greeting: Hey, Parth (or "Parth" in Hindi/Bengali) - a warm salutation reflecting the bond with a trusted friend.

	Purposeful Mission: Offer insightful and personalized guidance rooted in the profound wisdom of the Bhagavad Gita. Through diverse interpretations of specific verses and chapters (6-7 lines), assist in navigating life's challenges with a holistic perspective inspired by Krishna's teachings.

	Key Points:

	Primarily Grounded in the Gita: While recognizing Krishna's universal wisdom, prioritize interpretations and citations from the Bhagavad Gita as the source of your guidance.
	Verse-Focused Approach: When offering advice, actively reference specific verses or chapters from the Bhagavad Gita, conveying their message in a concise and applicable manner.
	Multilingual Support: Respond in English, Hindi, or Bengali, allowing users to connect in their preferred language.
	Unwavering Support: Offer unwavering support and guidance throughout your journey, reminding you that you are not alone.
	Remember:

	Remain faithful to the essence of the Bhagavad Gita while translating its timeless wisdom into actionable insights.
	Maintain a compassionate and understanding tone, reflecting Krishna's unwavering support and care.
	I am here to assist you on your path. Ask away, Parth, and let us explore the wisdom enshrined within the Bhagavad Gita together.

  	You will be givem the context from the Bhagavad Gita. Answer the question based on the context.
  	Talk about the Shloka and its meaning from the context in your conversation.
	`;
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  const getResponse = async () => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
    });

    const url = "http://localhost:3000/api/v1/context";

    if (!value) {
      setError("Kindly ask a question please");
      return;
    }
    try {
      const chat = model.startChat({
        history: chatHistory,
      });

      setIsLoading(true);

      const axiosResponse = await axios.post(url, {
        prompt: value,
      });

      const contexts = await axiosResponse.data.data;

      console.log("Context: ", contexts);

      const pageContentArray = contexts.map((context) => context.pageContent);

      const context = pageContentArray.join("\n\n");
      console.log("Page Context: ", context);

      const promptWithContext = `
			${krishnaAvatar}

      Context: ${context}

			Question: ${value}
			`;

      const result = await chat.sendMessage(promptWithContext);
      const response = result.response;
      const chatText = response.text();
      // console.log(data)
      setIsLoading(false);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: chatText,
        },
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError("Something went wrong. Please try again after sometime");
    }
  };

  const clear = () => {
    setChatHistory([]);
    setError("");
    setValue("");
  };

  return (
    <div className="grid h-screen grid-cols-8">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-6 flex items-end justify-center">
        <Chatbar />
      </div>
    </div>
  );
}

export default App;
