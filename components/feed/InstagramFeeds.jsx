import React, { useState, useEffect } from "react";
import { Text, Box, useInput, useFocus } from "ink";
import { Tabs, Tab } from "ink-tab";
import { UncontrolledTextInput } from "ink-text-input";
import Link from "ink-link";
import Loader from "../../utils/loader";
import { ig } from "../../utils/api-clients";
const config = require("../../config");

const InstagramFeeds = () => {
	const [isLoading, setLoading] = useState(true);
	const [feeds, setFeeds] = useState({});
	const [pg, setPg] = useState(1);

	useEffect(() => {
		(async () => {
			try {
				const auth = await ig.account.login(
					config["instagram"]["username"],
					config["instagram"]["password"]
				);
				const timeline = ig.feed.timeline(auth.pk);
				const items = await timeline.items();
				var arr = [];
				for (let i = 0; i < items.length; i++) {
					var {
							id,
							taken_at,
							code,
							location,
							user,
							comment_count,
							like_count,
							caption,
						} = items[i],
						text = "",
						loc_name = "";
					//   const text = caption.text
					var { username, full_name } = user;
					var user_url = "https://www.instagram.com/" + username,
						post_url = "https://www.instagram.com/p/" + code;
					//   const loc_name = location.name
					if (caption) {
						text = caption.text;
					}
					if (location) {
						loc_name = location.name;
					}
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
									<Text bold>{full_name}</Text> @{username}
								</Link>
							</Text>
							<Text>
								{loc_name && (
									<Text dimColor>
										{loc_name}
										{"\n"}
									</Text>
								)}
								{text && <Text>{text}</Text>}
							</Text>
							<Text>
								{"\n"}Post link : {post_url}
							</Text>
							<LikeComment lc={like_count} cc={comment_count} id={id} />
							{/* <Text>{"\u2764\uFE0F"} : {like_count} {"\uD83D\uDCAC"} : {comment_count}</Text> */}
						</Box>
					);
					arr.push(ans);
				}
				setFeeds(arr);
				// setFeeds(items)
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	useInput((input, key) => {
		const temp =
			feeds.length % 5
				? parseInt(feeds.length / 5) + 1
				: parseInt(feeds.length / 5);

		if (input === "q" || input === "Q") {
			process.exit();
		} else if (key.upArrow) {
			setPg(Math.max(1, pg - 1));
		} else if (key.downArrow) {
			setPg(Math.min(pg + 1, temp));
		}
	});

	if (isLoading) {
		return <Loader message=" Fetching Instagram feeds..." type="dots" />;
	} else {
		// console.log(feeds);
		return (
			<>
				{
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
				}
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
			console.log("comment", comment);
			//make comment api calls
			ig.media.comment({
				mediaId: props.id,
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

	const like = () => {
		ig.media.like({
			mediaId: props.id,
			d: 1,
			moduleInfo: { module_name: "profile" },
		});
	};

	useEffect(() => {
		if (activeTab == "like_count" && btnPressed) {
			like();
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
					<Tab name="like_count">
						{"\u2764\uFE0F"} : {props.lc}
					</Tab>
					<Tab name="comment_count">
						{"\uD83D\uDCAC"} : {props.cc}
					</Tab>
				</Tabs>
			) : (
				<Text>
					{"\u2764\uFE0F"} : {props.lc} {"\uD83D\uDCAC"} : {props.cc}
				</Text>
			)}
			{isFocused && activeTab === "comment_count" && btnPressed ? (
				<CommentBox setBtnPressed={SetBtnPressed} id={props.id} />
			) : (
				<></>
			)}
		</>
	);
};

export default InstagramFeeds;
