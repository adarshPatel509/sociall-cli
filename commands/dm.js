import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import { TwitterMessage } from "../components/dm/TwitterDm";
// import GithubSearch from "../components/search/GithubSearch";
import { InstagramMessage } from "../components/dm/InstagramDm";
import { RedditMessage } from "../components/dm/RedditDm";

/// Get Chats by Username
const Dm = ({ platform = "", username }) => {

    if (platform.includes("twitter")) {
        return <TwitterMessage username={username} />;
    } else if (platform.includes("instagram")) {
        return <InstagramMessage username={username} />
    } else if (platform.includes("reddit")) {
        return <RedditMessage username={username} />;
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
                return <TwitterMessage username={username} />;
                // } else if (updateField == "facebook") {
                // 	return <FacebookFeeds />;
            } else if (updateField == "reddit") {
                return <RedditMessage username={username} />;
            }
            else if (updateField == "instagram") {
                return <InstagramMessage username={username} />
            }
        }
    }
    return <Text>Hello, {platform} </Text>;
};

Dm.propTypes = {
    /// Name of the Platform to fetch Chats
    platform: PropTypes.string,
    /// Username of the one to fetch Chats of
    username: PropTypes.string.isRequired,
};

Dm.shortFlags = {
    platform: "p",
    username: "u"
};

export default Dm;

