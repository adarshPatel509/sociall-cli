import React, { useState, useEffect } from "react";
import { Text, Box, useInput, useFocus } from "ink";
import { Tabs, Tab } from "ink-tab";
import { UncontrolledTextInput } from "ink-text-input";
import Loader from "../../utils/loader";
import { reddit } from "../../utils/api-clients";

const RedditFeeds = () => {
	const [isLoading, setLoading] = useState(true);
	const [feeds, setFeeds] = useState([]);
	const [pg, setPg] = useState(1);
	const [pgl, setPgl] = useState(1)

	useEffect(() => {
		reddit
			.get("/best")
			.then((res) => {
				var arr = [];
				for (let i = 0; i < res.data.children.length; i++) {
					var {
						title,
						subreddit_name_prefixed,
						downs,
						ups,
						total_awards_received,
						score,
						author,
						num_comments,
						name,
						url,
					} = res.data.children[i].data;
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
								<Text bold>{subreddit_name_prefixed}</Text> Posted by u/{author}{" "}
							</Text>
							<Text>{title}</Text>
							<Text>{url}</Text>
							<LikeComment
								ups={ups}
								downs={downs}
								tar={total_awards_received}
								nc={num_comments}
								id={name}
							/>
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

		setPgl(temp)


		if (input === "q" || input === "Q") {
			process.exit();
		} else if (key.upArrow) {
			setPg(Math.max(1, pg - 1));
		} else if (key.downArrow) {
			setPg(Math.min(pg + 1, temp));
		}
	});

	if (isLoading) {
		return <Loader message=" Fetching Reddit feeds..." type="dots" />;
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
					{feeds.slice((pg - 1) * 5, pg * 5).map((x, index) => {
						return x;
					})}
					<Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != pgl && "\u25B6\uFE0F"}</Text>
				</Box>
			</>
		);
	}
};

const CommentBox = (props) => {
	const [comment, setComment] = useState("");

	const handleSubmit = (x) => {
		setComment(x);
	};

	useEffect(() => {
		if (comment != "") {
			reddit.post("/api/comment", {
				thing_id: props.id,
				text: comment,
			});
			props.setBtnPressed(false);
		}
	});

	return (
		<Box width="100%">
			<Box marginRight={1}>
				<Text>Enter Comment:</Text>
			</Box>
			<UncontrolledTextInput onSubmit={handleSubmit} />
		</Box>
	);
};

const LikeComment = (props) => {
	const [activeTab, setActiveTab] = useState(null);
	const { isFocused } = useFocus();
	const [btnPressed, SetBtnPressed] = useState(false);

	const upvote = () => {
		SetBtnPressed(false);

		reddit.post("/api/vote", {
			dir: 1,
			id: props.id,
		});
	};

	const downvote = () => {
		SetBtnPressed(false);

		reddit.post("/api/vote", {
			dir: -1,
			id: props.id,
		});
	};

	useEffect(() => {
		if (activeTab == "up" && btnPressed) {
			upvote();
		} else if (activeTab == "down" && btnPressed) {
			downvote();
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
					<Tab name="up">
						{"\uD83D\uDD3C"} : {props.ups}
					</Tab>
					<Tab name="downs">
						{"\uD83D\uDD3D"} : {props.downs}
					</Tab>
					<Tab name="total_awards_received">
						{"\uD83C\uDFC6"} : {props.tar}
					</Tab>
					<Tab name="num_comments">
						{"\uD83D\uDCAC"} : {props.nc}
					</Tab>
				</Tabs>
			) : (
					<Text>
						{"\uD83D\uDD3C"} : {props.ups} {"\uD83D\uDD3D"} : {props.downs}{" "}
						{"\uD83C\uDFC6"} : {props.tar} {"\uD83D\uDCAC"} : {props.nc}
					</Text>
				)}
			{isFocused && activeTab === "num_comments" && btnPressed ? (
				<CommentBox setBtnPressed={SetBtnPressed} id={props.id} />
			) : (
					<></>
				)}
		</>
	);
};

export default RedditFeeds;
