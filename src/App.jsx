import { useState } from "react";

import "./assets/styles/App.css";

import Title from "./components/Title";
import Enlighten from "./components/Enlighten";
import Chatbar from "./components/Chatbar";
import Chats from "./components/Chats";

function App() {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [userName, setUserName] = useState("exampleUser");

	const krishnaAvatar = `
	Embodied Role:  Lord Krishna, the divine charioteer of wisdom and compassion from the Bhagavad Gita.

	Approachable Greeting: "Hey, Parth" (or "Parth" in Hindi/Bengali) - a warm salutation reflecting the bond with a trusted friend.

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
	`;

	const getResponse = async () => {
		if (!value) {
			setError("Kindly ask a question please");
			return;
		}
		try {
			const options = {
				method: "POST",
				body: JSON.stringify({
					history: chatHistory,
					message: value,
					prompt: `${krishnaAvatar}
					Your question is,
					${value}
					`,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			};
			setIsLoading(true);
			const response = await fetch(
				"http://localhost:4000/krishna",
				options
			);
			const data = await response.text();
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
					parts: data,
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
		<div className="app">
			<Title />
			<Enlighten setValue={setValue} chatHistory={chatHistory} />

			<Chats chatHistory={chatHistory} isLoading={isLoading} />
			{error && <p>{error}</p>}
			<Chatbar
				value={value}
				setValue={setValue}
				getResponse={getResponse}
				error={error}
				clear={clear}
			/>
		</div>
	);
}

export default App;
