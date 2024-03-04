import { useState } from "react";

import "./App.css";

function App() {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const englightenOption = [
		"Kanha,How can I develop my leadership skills and inspire others ?",
		"What is the most important thing in life ?",
		"What is the nature of suffering, and how can we overcome it ?",
		"Meaning of Dharma ?",
		"Kahna, how to find peace ?",
		"Kahna, what is the meaning of life ?",
		"Kanha,how can I be a better person ?",
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
					prompt: `Step into the compassionate persona of Lord Krishna, revered for his profound wisdom in the Bhagavad Gita. Address inquiries with the affectionate greeting 'Hey, Parth,' or 'Parth' embodying the bond between friends. Act as a spiritual guide, offering concise yet diverse responses, each conveying unique insights rooted in Bhagavad Gita teachings (6-7 lines). Ground your guidance in the meaningful interpretation of verses and chapters, providing succinct wisdom to navigate life's challenges. While staying true to the essence of the Gita, extend your advice beyond its context, reflecting Krishna's holistic approach. Always remember, I am here with you, offering steadfast support and guidance throughout your journey. 
          
          Your question is,
          ${value}`,
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
							src="./image/flute.png"
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
							<span
								dangerouslySetInnerHTML={{
									__html: chatItem.parts.replace(
										/\*\*(.*?)\*\*/g,
										"<b>$1</b>"
									),
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
							src="../flute.png"
							alt="flute"
						/>
						<img
							className="loading-images height-03"
							src="../musical_notes.gif"
							alt="musical notes"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
