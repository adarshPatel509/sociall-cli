import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import { UncontrolledTextInput } from "ink-text-input";
import RedditPost from "./RedditPost";
import SelectInput from "ink-select-input";

const RedditPostData = () => {
	const [postData, setPostData] = useState({
		sr: "",
		title: "",
		text: "",
		path: "",
		type: "",
	});
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

	function handleSrSubmit(newValue) {
		setPostData({
			...postData,
			sr: newValue,
		});
	}

	function handleTitleSubmit(newValue) {
		setPostData({
			...postData,
			title: newValue,
		});
	}

	function handleTextSubmit(newValue) {
		setPostData({
			...postData,
			text: newValue,
		});
	}
	function handleImagePathSubmit(newValue) {
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
	} else if (postData.sr == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter subreddit :</Text>
					<Text dimColor>Please enter the subreddit name as "r/example</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleSrSubmit} />
			</Box>
		);
	} else if (postData.title == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Title for the post :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleTitleSubmit} />
			</Box>
		);
	} else if (postData.text == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter content for the post :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleTextSubmit} />
			</Box>
		);
	} else if (postData.path == "" && postData.type == "media") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter path for the post image :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleImagePathSubmit} />
			</Box>
		);
	} else {
		return <RedditPost postdata={postData} />;
	}
};

export default RedditPostData;
