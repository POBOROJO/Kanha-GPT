import React from "react";

import Loading from "./Loading";

const Chats = ({ chatHistory, isLoading }) => {
	return (
		<>
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
				{isLoading && <Loading />}
			</div>
		</>
	);
};

export default Chats;
