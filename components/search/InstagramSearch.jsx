import React, { useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import Link from "ink-link";
import Loader from "../../utils/loader";
import { ig } from "../../utils/api-clients";
const config = require("../../config");

const InstagramSearch = (props) => {
	const [isLoading, setLoading] = useState(true);
	const [searchResult, setFeeds] = useState({});
	const [pg, setPg] = useState(1);
	const [totalPageLength, setTotalPageLength] = useState(1)

	useEffect(() => {
		(async () => {
			try {
				const auth = await ig.account.login(
					config["instagram"]["username"],
					config["instagram"]["password"]
				);
				const search_result = ig.user.search(props.searchField);
				const items = await search_result;
				var arr = [];
				for (let i = 0; i < items.users.length; i++) {
					var { username, full_name, social_context } = items.users[i];
					if (social_context === null) {
						social_context = "";
					}
					var user_url = "https://www.instagram.com/" + username;
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
									<Text bold>{username}</Text>
								</Link>
							</Text>
							<Text>{full_name}</Text>
							<Text>{social_context}</Text>
						</Box>
					);

					arr.push(ans);
				}
				setFeeds(arr);
				const totalPages = Math.ceil(arr.length / 5);
				setTotalPageLength(totalPages);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		})();
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
		return <Loader message=" Fetching Instagram Search Result..." type="dots" />;
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
					{searchResult.slice((pg - 1) * 5, pg * 5).map((x, index) => {
						return x;
					})}
					<Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
				</Box>
			</>
		);
	}
};

export default InstagramSearch;
