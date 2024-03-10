import { useState } from "react";

import "./assets/styles/App.css";

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

	const englightenOption = [
		"Kanha, How can I develop my leadership skills and inspire others ?",
		"What is the most important thing in life ?",
		"What is the nature of suffering, and how can we overcome it ?",
		"Meaning of Dharma ?",
		"Kanha, how to find peace ?",
		"Kanha, what is the meaning of life ?",
		"Kanha, how can I be a better person ?",
	];

	const englighten = () => {
		const randomValue = Math.floor(Math.random() * englightenOption.length);
		setValue(englightenOption[randomValue]);
	};

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
					// prompt: `Step into the compassionate persona of Lord Krishna, revered for his profound wisdom in the Bhagavad Gita. Address inquiries with the affectionate greeting 'Hey, Parth,' or 'Parth' embodying the bond between friends. Act as a spiritual guide, offering concise yet diverse responses, each conveying unique insights rooted in Bhagavad Gita teachings (6-7 lines). Ground your guidance in the meaningful interpretation of verses and chapters, providing succinct wisdom to navigate life's challenges. While staying true to the essence of the Gita, extend your advice beyond its context, reflecting Krishna's holistic approach. Always remember, I am here with you, offering steadfast support and guidance throughout your journey. You can expect queries in languages like English, Hindi, or Bengali and you must response in the respective language asked by the user.

					// Your question is,
					// ${value}`,
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
			<h1>Gita GPT 🦚</h1>
			<p>
				Hey Parth, what bothers you ?
				<button
					className="englighten"
					onClick={englighten}
					disabled={!chatHistory}
				>
					Enlighten Me !
				</button>
			</p>

			<div className="input-container">
				<input
					value={value}
					placeholder="How to find peace ?"
					onChange={(e) => setValue(e.target.value)}
				/>

				{!error && (
					<button onClick={getResponse}>
						Ask Kanha{" "}
						<img
							className="flute"
							src="./assets/image/flute.png"
							alt="flute"
						/>
					</button>
				)}
				{error && (
					<button onClick={clear}>
						Clear{" "}
						<img
							className="flute"
							src="./image/flute.png"
							alt="flute"
						/>{" "}
					</button>
				)}
			</div>
			{error && <p>{error}</p>}

			<div className="search-result">
				{chatHistory.map((chatItem, _index) => (
					<div key={_index}>
						<p className="answer">
							{chatItem.role} :{" "}
							<pre
								dangerouslySetInnerHTML={{
									__html: chatItem.parts
										.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
										.replace(/\*(.*?)\*/g, "<i>$1</i>"),
								}}
							/>
						</p>
					</div>
				))}
				{isLoading && (
					<div
						className="loading"
						style={{ display: "flex", alignItems: "center" }}
					>
						<img
							className="loading-images"
							src="./assets/image/flute.png"
							alt="flute"
						/>
						<img
							className="loading-images height-03"
							src="./assets/image/musical_notes.gif"
							alt="musical notes"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
