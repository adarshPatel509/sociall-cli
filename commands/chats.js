import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import TwitterChatByUsername from "../components/chats/TwitterChatByUsername";
// import GithubSearch from "../components/search/GithubSearch";
import InstagramChatByUsername from "../components/chats/InstagramChatByUsername";
import RedditChatByUsername from "../components/chats/RedditChatByUsername";

/// Get Chats by Username
const Chats = ({ platform = "", username }) => {


	if (platform.includes("twitter")) {
		return <TwitterChatByUsername username={username} />;
	} else if (platform.includes("instagram")) {
		return <InstagramChatByUsername username={username} />
	} else if (platform.includes("reddit")) {
		return <RedditChatByUsername username={username} />;
	} else {
		const [updateField, setField] = useState("");
		const items = [
			{ label: "Twitter", value: "twitter" },
			{ label: "Facebook", value: "facebook" },
			{ label: "Instagram", value: "instagram" },
			{ label: "Reddit", value: "reddit" },
		];

		const handleSelect = (item) => {
			setField(item.value);
		};

		if (updateField === "") {
			return (
				<>
					<Box
						borderStyle="round"
						paddingLeft={1}
						width={51}
						borderColor="#00FFFF"
					>
						<Text color="yellow">Select the Social Media to see feed : </Text>
					</Box>
					<SelectInput items={items} onSelect={handleSelect} />
				</>
			);
		} else {
			if (updateField == "twitter") {
				return <TwitterChatByUsername username={username} />;
				// } else if (updateField == "facebook") {
				// 	return <FacebookFeeds />;
			} else if (updateField == "reddit") {
				return <RedditChatByUsername username={username} />;
			}
			else if (updateField == "instagram") {
				return <InstagramChatByUsername username={username} />
			}
		}
	}
	return <Text>Hello, {platform} </Text>;
};

Chats.propTypes = {
	/// Name of the Platform to fetch Chats
	platform: PropTypes.string,
	/// Username of the one to fetch Chats of
	username: PropTypes.string.isRequired,
};

Chats.shortFlags = {
	platform: "p",
	username: "u"
};

export default Chats;

