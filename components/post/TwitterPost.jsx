import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Loader from "../../utils/loader";
import { twit } from "../../utils/api-clients";
const fs = require("fs");

const RedditPost = (props) => {
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

export default RedditPost;
