import React from "react";

const Enlighten = ({ setValue, chatHistory }) => {
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
