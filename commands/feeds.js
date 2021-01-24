import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import TwitterFeeds from "../components/feed/TwitterFeeds";
import GithubFeeds from "../components/feed/GithubFeeds";
import FacebookFeeds from "../components/feed/FacebookFeeds";
import InstagramFeeds from "../components/feed/InstagramFeeds";
import RedditFeeds from "../components/feed/RedditFeeds";

/// Get Latest Feeds command
const Feeds = ({ platform = "" }) => {
	if (platform.includes("github")) {
		return <GithubFeeds />;
	} else if (platform.includes("twitter")) {
		return <TwitterFeeds />;
	} else if (platform.includes("instagram")) {
		return <InstagramFeeds />;
	} else if (platform.includes("facebook")) {
		return <FacebookFeeds />;
	} else if (platform.includes("reddit")) {
		return <RedditFeeds />;
	} else {
		const [updateField, setField] = useState("");
		const items = [
			{ label: "Github", value: "github" },
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
			if (updateField == "github") {
				return <GithubFeeds />;
			} else if (updateField == "instagram") {
				return <InstagramFeeds />;
			} else if (updateField == "twitter") {
				return <TwitterFeeds />;
			} else if (updateField == "facebook") {
				return <FacebookFeeds />;
			} else if (updateField == "reddit") {
				return <RedditFeeds />;
			}
		}
	}
	return <Text>Hello, {platform} </Text>;
};

Feeds.propTypes = {
	/// Name of the Platform to fetch Feeds
	platform: PropTypes.string,
};

Feeds.shortFlags = {
	platform: "p",
};

export default Feeds;
