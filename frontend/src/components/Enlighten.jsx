import React from "react";

const Enlighten = ({ setValue, chatHistory }) => {
	const englightenOption = [
		"Kanha, How can I develop my leadership skills and inspire others?",
		"What is the most important thing in life?",
		"What is the nature of suffering, and how can we overcome it?",
		"Meaning of Dharma?",
		"Kanha, how to find peace?",
		"Kanha, what is the meaning of life?",
		"Kanha, how can I be a better person?",
		"Kanha, how can I achieve true happiness?",
		"What is the essence of love and how can we cultivate it?",
		"Kanha, how can I balance my material and spiritual pursuits?",
		"Kanha, what is the path to self-realization?",
		"How can we live in harmony with nature?",
		"Kanha, what is the role of forgiveness in personal growth?",
		"Kanha, how can I let go of fear and embrace courage?",
		"What is the importance of self-discipline in achieving our goals?",
		"Kanha, how can I cultivate compassion and empathy?",
		"What is the significance of meditation in daily life?",
		"Kanha, how can I deal with negative emotions effectively?",
		"What is the true nature of success?",
		"Kanha, how can I stay focused on my life's purpose?",
		"Kanha, what is the power of gratitude and how can I practice it?",
		"How can we create a life of meaning and fulfillment?",
		"Kanha, what is the importance of honesty and integrity?",
		"Kanha, how can I improve my relationships with others?",
		"What is the role of karma in our lives?",
		"Kanha, how can I overcome obstacles and challenges in life?",
	];
	
	

	const englighten = () => {
		const randomValue = Math.floor(Math.random() * englightenOption.length);
		setValue(englightenOption[randomValue]);
	};

	return (
		<div className="enlighten">
			<p>Hey Parth, what bothers you ?</p>
			<button onClick={englighten} disabled={!chatHistory}>
				Enlighten Me !
			</button>
		</div>
	);
};

export default Enlighten;
