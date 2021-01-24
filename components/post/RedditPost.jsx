import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Loader from "../../utils/loader";
import { reddit } from "../../utils/api-clients";
import SelectInput from "ink-select-input";
import { UncontrolledTextInput } from "ink-text-input";


const RedditPostData = (props) => {
	const [postData, setPostData] = useState({
		sr: props.data.subreddit,
        title: props.data.title,
        text: props.data.text,
        path: props.data.path,
		type: props.data.type,
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


const RedditPost = (props) => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		if (props.postdata.type === "media") {
			reddit
				.post("/api/submit", {
					kind: "image",
					sr: props.postdata.sr,
					text: props.postdata.text,
					title: props.postdata.title,
					url: props.postdata.path,
				})
				.then((res) => {
					setData(res.json.data.url);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			reddit
				.post("/api/submit", {
					kind: "self",
					sr: props.postdata.sr,
					text: props.postdata.text,
					title: props.postdata.title,
				})
				.then((res) => {
					setData(res.json.data.url);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	if (isLoading) {
		return <Loader message=" Posting Reddit Post..." type="dots" />;
	} else {
		return (
			<>
				<Box
					borderStyle="round"
					borderColor="#00FFFF"
					flexDirection="column"
					width="95%"
					alignItems="center"
				>
					<Text color="greenBright">
						Post Posted on subreddit {props.postdata.sr}
					</Text>
					<Text>Link for the post : {data}</Text>
				</Box>
			</>
		);
	}
};

export { RedditPost, RedditPostData };
