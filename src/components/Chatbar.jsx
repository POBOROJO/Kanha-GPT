import React from "react";

import feather from "../assets/images/feather.png";

const Chatbar = ({ value, setValue, getResponse, error, clear }) => {
	return (
		<div className="input-container">
			<input
				value={value}
				placeholder="How to find peace ?"
				onChange={(e) => setValue(e.target.value)}
			/>

			<button onClick={error ? clear : getResponse}>
				{error ? "Clear" : "Ask Kanha "}
				{/* <img className="flute" src={feather} alt="flute" /> */}
			</button>
		</div>
	);
};

export default Chatbar;
