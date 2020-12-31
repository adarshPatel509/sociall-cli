import React, { useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import Link from "ink-link";
import Loader from "../../utils/loader";
import { octokit } from "../../utils/api-clients";
import DateFormatter from "../../utils/date-formatter";
const feed_reply = require("./feed_reply.json");
const config = require("../../config.json");

const GithubFeeds = () => {
	const [isLoading, setLoading] = useState(true);
	const [feeds, setFeeds] = useState([]);
	const [pg, setPg] = useState(1);

	useEffect(() => {
		octokit
			.request("GET /users/{username}/received_events", {
				username: config["github"]["username"],
			})
			.then((res) => {
				var arr = [];
				for (let i = 0; i < res.data.length; i++) {
					var user_api_url = res.data[i].actor.url,
						repo_api_url = res.data[i].repo.url;
					var user_url = "https://github.com/" + user_api_url.slice(29);
					var repo_url = "https://github.com/" + repo_api_url.slice(29);
					var { type, actor, repo, created_at } = res.data[i];
					var { login } = actor,
						{ name } = repo;
					created_at = DateFormatter(created_at);
					const ans = (
						<Box
							key={arr.length}
							borderStyle="round"
							borderColor="red"
							paddingLeft={2}
							flexDirection="column"
							width="90%"
							alignSelf="center"
						>
							<Text>
								<Link url={user_url}>
									<Text bold>{login}</Text>
								</Link>{" "}
								{feed_reply[type]["reply"]}{" "}
								<Link url={repo_url}>
									<Text color="blue" underline>
										{name}
									</Text>
								</Link>
							</Text>
							<Text>-{created_at}</Text>
						</Box>
					);
					arr.push(ans);
				}
				setFeeds(arr);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useInput((input, key) => {
		const temp =
			feeds.length % 5
				? parseInt(feeds.length / 5) + 1
				: parseInt(feeds.length / 5);

		if (input === "q" || input === "Q") {
			process.exit();
		} else if (key.leftArrow) {
			setPg(Math.max(1, pg - 1));
		} else if (key.rightArrow) {
			setPg(Math.min(pg + 1, temp));
		}
	});

	if (isLoading) {
		return <Loader message=" Fetching Github feeds..." type="dots" />;
	} else {
		return (
			<>
				<Box
					borderStyle="round"
					borderColor="#00FFFF"
					flexDirection="column"
					width="95%"
					alignSelf="center"
					alignItems="center"
				>
					{feeds.slice((pg - 1) * 5, pg * 5).map((x, index) => {
						return x;
					})}
					<Text>Page : {pg}</Text>
				</Box>
			</>
		);
	}
};

export default GithubFeeds;
