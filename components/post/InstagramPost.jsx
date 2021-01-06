import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Loader from "../../utils/loader.js";
import { ig } from "../../utils/api-clients";
import { readFile } from "fs";
import { UncontrolledTextInput } from 'ink-text-input';
const config = require("../../config");
const promisify = require("util.promisify");
const fs = require("fs");
const readFileAsync = promisify(readFile);
/**
	Update Instagram Profile
	Api ref: https://github.com/jlobos/instagram-web-api#updateprofileparams
 */
const InstagramPost = (props) => {
	const [isLoading, setLoading] = useState(true);
	const [url, setUrl] = useState("")
	useEffect(() => {
		(async () => {
			try {
				const auth = await ig.account.login(
					config["instagram"]["username"],
					config["instagram"]["password"]
				);
				const path = props.data.path;
				const publishResult = await ig.publish.photo({
					file: await readFileAsync(path),
					caption: props.data.bio,
				});
				const postUrl = "https://www.instagram.com/p/" + publishResult.media.code + "/"
				setUrl(postUrl)
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	if (isLoading) {
		return <Loader message=" Posting on Instagram..." type="dots" />;
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
					<Text color="greenBright">Posted Successfully on Instagram!!!</Text>
					<Text>Link for the post : {url}</Text>
				</Box>
			</>
		);
	}
};


const InstagramPostData = (props) => {
	const [postData, setPostData] = useState({
		path: props.data.path,
		bio:props.data.text
	})

	function handlePathSubmit(newValue) {
		setPostData({
			...postData,
			path: newValue
		})
	}

	function handleBioSubmit(newValue) {
		setPostData({
			...postData,
			bio: newValue
		})
	}

	if (postData.path == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Picture Path :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handlePathSubmit} />
			</Box>
		);
	}
	else if (postData.bio == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Post Description :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleBioSubmit} />
			</Box>
		);
	}
	else {
		return <InstagramPost data={postData} />
	}
}


export { InstagramPost, InstagramPostData };
