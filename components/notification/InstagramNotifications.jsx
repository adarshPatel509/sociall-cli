import React, { useState, useEffect } from "react";
import { Text, Box, useFocus, useInput } from "ink";
import Loader from "../../utils/loader";
import { ig } from "../../utils/api-clients";
import DateFormatter from "../../utils/date-formatter";
const config = require("../../config.json");

const InstagramNotifications = () => {
	const [isLoading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);
	const [pg, setPg] = useState(1);
	const [totalPageLength, setTotalPageLength] = useState(1)

	useEffect(() => {
		(async () => {
			try {
				const auth = await ig.account.login(
					config["instagram"]["username"],
					config["instagram"]["password"]
				);
				const following = ig.news.inbox(auth.pk);
				following
					.then((res) => {
						const x = res.old_stories;
						var arr = [];
						for (let i = 0; i < x.length; i++) {
							var name = x[i].args.destination,
								text = x[i].args.rich_text;
							if (text) {
								const nm = name.slice(14, text.length);
								const txt1 =
									text.slice(0, text.search("{")) +
									nm +
									text.slice(text.search("}") + 1, text.length);
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
										<Text>{txt1}</Text>
									</Box>
								);
								arr.push(ans);
							} else {
								var text = x[i].args.text;
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
										<Text>{text}</Text>
									</Box>
								);
								arr.push(ans);
							}
						}
						setNotifications(arr);
						const totalPages = Math.ceil(arr.length / 5);
						setTotalPageLength(totalPages);
						setLoading(false);
					})
					.catch((err) => console.log(err));

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
		return <Loader message=" Fetching Instagram Notifications..." type="dots" />;
	} else {
		return (
			<Box
				borderStyle="round"
				borderColor="#00FFFF"
				flexDirection="column"
				width="95%"
				alignItems="center"
			>
				{notifications.slice((pg - 1) * 5, pg * 5).map((x, index) => {
					return x;
				})}
				<Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
			</Box>
		);
	}
};

export default InstagramNotifications;
