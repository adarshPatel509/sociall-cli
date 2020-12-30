import React, { useState } from "react";
import { Text, Box } from "ink";
import { UncontrolledTextInput } from "ink-text-input";

/// Update Your Profile
const CommentFeed = () => {
	const [comment, setComment] = useState("");

	const handleSubmit = (newValue) => {
		setValue(newValue);
	};
	if (newValue === "") {
		return (
			<Box width="100%">
				<Box marginRight={1}>
					<Text>Enter Comment:</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleSubmit} />
			</Box>
		);
	} else {
		return comment;
	}
};

export default CommentFeed;
