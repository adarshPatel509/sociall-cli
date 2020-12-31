import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import TwitterSearch from "../components/search/TwitterSearch";
import GithubSearch from "../components/search/GithubSearch";
import InstagramSearch from "../components/search/InstagramSearch";
import RedditSearch from "../components/search/RedditSearch";

/// Get Latest Feeds command
const Search = ({ platform = "", searchField }) => {
	if (platform.includes("github")) {
		return <GithubSearch searchField={searchField} />;
	} else if (platform.includes("twitter")) {
		return <TwitterSearch searchField={searchField} />;
	} else if (platform.includes("instagram")) {
		return <InstagramSearch searchField={searchField} />;
	} else if (platform.includes("reddit")) {
		return <RedditSearch searchField={searchField} />;
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
				return <GithubSearch searchField={searchField} />;
			} else if (updateField == "instagram") {
				return <InstagramSearch searchField={searchField} />;
			} else if (updateField == "twitter") {
				return <TwitterSearch searchField={searchField} />;
			}
			else if (updateField == "reddit") {
				return <RedditSearch searchField={searchField} />;
			}
		}
	}
	return <Text>Hello, {platform} </Text>;
};

Search.propTypes = {
	/// Name of the Platform to fetch Feeds
	platform: PropTypes.string,
	searchField: PropTypes.string.isRequired,
};

Search.shortFlags = {
	platform: "p",
	searchField: "s",
};

export default Search;
