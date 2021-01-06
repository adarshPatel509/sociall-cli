import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Loader from "../../utils/loader";
import { twit } from "../../utils/api-clients";
import { UncontrolledTextInput } from "ink-text-input";
import SelectInput from "ink-select-input";

const fs = require("fs");


const TwitterPostData = (props) => {
	const [postData, setPostData] = useState({
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

const TwitterPost = (props) => {
	const [isLoading, setLoading] = useState(true);
	const [postData, setPostData] = useState({});

	useEffect(() => {
		if (props.status.type === "media") {
			const b64content = fs.readFileSync(props.status.path, {
				encoding: "base64",
			});
			twit
				.post("media/upload", {
					media_data: b64content,
				})
				.then((resp) => {
					const { media_id_string } = resp.data;
					twit
						.post("statuses/update", {
							status: props.status.text,
							media_ids: media_id_string,
						})
						.then((res) => {
							const url =
								"https://twitter.com/" +
								res.data.user.screen_name +
								"/status/" +
								res.data.id_str;
							setPostData(url);
							setLoading(false);
						})
						.catch((err) => {
							console.log(err);
						});
				});
		} else {
			twit
				.post("statuses/update", {
					status: props.status.text,
				})
				.then((res) => {
					const url =
						"https://twitter.com/" +
						res.data.user.screen_name +
						"/status/" +
						res.data.id_str;
					setPostData(url);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	if (isLoading) {
		return <Loader message=" Posting Twitter Post..." type="dots" />;
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
					<Text color="greenBright">Posted Successfully on Twitter!!!</Text>
					<Text>Link for the post : {postData}</Text>
				</Box>
			</>
		);
	}
};

export { TwitterPost, TwitterPostData };
