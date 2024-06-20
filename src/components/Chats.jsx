import React from "react";

import Loading from "./Loading";

import feather from "../assets/images/feather.png";

const Chats = ({ chatHistory, isLoading }) => {
	return (
		<div className="search-result">
			{chatHistory.map((chatItem, _index) => (
				<div key={_index}>
					<aside>
						{chatItem.role === "model" ? (
							<div>
								<img src={feather} alt="feather" />
							</div>
						) : (
							<div>Y</div>
						)}
					</aside>
					<pre
						dangerouslySetInnerHTML={{
							__html: chatItem.parts
								.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
								.replace(/\*(.*?)\*/g, "<i>$1</i>"),
						}}
					/>
				</div>
			))}
			{isLoading && <Loading />}
		</div>
	);
};

export default Chats;
