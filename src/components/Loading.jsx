import React from "react";

import flute from "../assets/images/flute.png";
import musicalNotes from "../assets/images/musical_notes.gif";

const Loading = () => {
	return (
		<div
			className="loading"
			style={{ display: "flex", alignItems: "center" }}
		>
			<img className="loading-images" src={flute} alt="flute" />
			<img
				className="loading-images"
				src={musicalNotes}
				alt="musical notes"
			/>
		</div>
	);
};

export default Loading;
