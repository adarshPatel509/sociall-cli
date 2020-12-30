import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import { UncontrolledTextInput } from "ink-text-input";
import SelectInput from "ink-select-input";

import TwitterPost from "./TwitterPost";

const TwitterPostData = () => {
	const [postData, setPostData] = useState({ text: "", path: "", type: "" });
	const items = [
		{ label: "Media", value: "media" },
		{ label: "Text", value: "text" },
	];
	function handleTypeSubmit(newValue) {
		setPostData({
			...postData,
			type: newValue.value,
		});
	}

	function handleTextSubmit(newValue) {
		setPostData({
			...postData,
			text: newValue,
		});
	}

	

	function handlePathSubmit(newValue) {
		setPostData({
			...postData,
			path: newValue,
		});
	}

	if (postData.type == "") {
		return (
			<>
				<Box
					borderStyle="round"
					paddingLeft={1}
					width={51}
					borderColor="#00FFFF"
				>
					<Text color="yellow">Select the type of Post : </Text>
				</Box>
				<SelectInput items={items} onSelect={handleTypeSubmit} />
			</>
		);
	} else if (postData.text == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Tweet Text :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleTextSubmit} />
			</Box>
		);
	} else if (postData.path == "" && postData.type === "media") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Tweet Picture path :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handlePathSubmit} />
			</Box>
		);
	} else {
		return <TwitterPost status={postData} />;
	}
};

export default TwitterPostData;
