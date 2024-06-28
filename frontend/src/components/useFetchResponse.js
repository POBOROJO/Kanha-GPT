import { useRef, useState } from "react";

const useFetchResponse = async (value) => {
	const [error, setError] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
		const response = await fetch("http://localhost:4000/krishna", options);
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

	return { error, chatHistory, isLoading };
};

export default useFetchResponse;
