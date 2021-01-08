import React, { useState, useEffect } from "react";
import { Text, Box, useFocus, useInput } from "ink";
import { Tabs, Tab } from "ink-tab";
import Link from "ink-link";
import Loader from "../../utils/loader";
import { octokit } from "../../utils/api-clients";
import DateFormatter from "../../utils/date-formatter";
const feed_reply = require("../../utils/feed_reply.json");
const config = require("../../config.json");

const GithubFeeds = () => {
	const [isLoading, setLoading] = useState(true);
	const [feeds, setFeeds] = useState([]);
	const [pg, setPg] = useState(1);
	const [totalPageLength, setTotalPageLength] = useState(1)

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
							<StarFork data={{ name }} />
							<Text></Text>
							<Text>-{created_at}</Text>
						</Box>
					);
					arr.push(ans);
				}
				setFeeds(arr);
                const totalPages = arr.length % 5 ? parseInt(arr.length / 5) + 1 : parseInt(arr.length / 5)
				setTotalPageLength(totalPages);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useInput((input, key) => {
		if (input === "q" || input === "Q") {
			process.exit();
		} else if (key.upArrow) {
			setPg(Math.max(1, pg - 1));
		} else if (key.downArrow) {
			setPg(Math.min(pg + 1, totalPageLength));
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
					<Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
				</Box>
			</>
		);
	}
};


const StarFork = (props) => {
	const [activeTab, setActiveTab] = useState(null);
	const { isFocused } = useFocus();
	const [btnPressed, SetBtnPressed] = useState(false);

	const star = () => {
		const put_req = 'PUT /user/starred/' + props.data.name
		octokit.request(put_req)
			.catch(err => {
				console.log(err);
			})
	}

	const watch = () => {
		const put_req = 'PUT /repos/' + props.data.name + '/subscription'
		octokit.request(put_req, {
			subscribed: true
		}).catch(err => {
			console.log(err);
		})
	}

	const fork = () => {
		const post_req = 'POST /repos/' + props.data.name + '/forks'
		octokit.request(post_req)
			.catch(err => {
				console.log(err);
			})
	}

	useEffect(() => {
		if (activeTab == "star" && btnPressed) {
			star();
		} else if (activeTab == "watch" && btnPressed) {
			watch();
		} else if (activeTab == "fork" && btnPressed) {
			fork();
		}
		if (btnPressed) {
			SetBtnPressed(false);
		}
	});

	useInput((input, key) => {
		if (input === "s" || input === "S") {
			SetBtnPressed(true);
		}
	});

	const handleTabChange = (name, activeTab) => {
		setActiveTab(name);
	};

	return (
		<>
			{isFocused ? (
				<Tabs onChange={handleTabChange}>
					<Tab name="star">
						{"\u2B50"} star
					</Tab>
					<Tab name="watch">
						{"\uD83D\uDC41\uFE0F"} watch
					</Tab>
					<Tab name="fork">
						{"\uD83D\uDCCC"}  fork
					</Tab>
				</Tabs>
			) : (
					<Text>
						{"\u2B50"} star  {"\uD83D\uDC41\uFE0F"}  watch  {"\uD83D\uDCCC"} fork
					</Text>
				)}
		</>
	);

}

export default GithubFeeds;
