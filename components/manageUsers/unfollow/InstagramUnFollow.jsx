import React, { useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import Link from "ink-link";
import Loader from "../../../utils/loader";
import { ig } from "../../../utils/api-clients";
const config = require("../../../config.json");

const InstagramUnFollow = (props) => {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const auth = await ig.account.login(
					config["instagram"]["username"],
					config["instagram"]["password"]
				);
				const user = await ig.user.searchExact(props.username);
				const follow = await ig.friendship.destroy(user.pk);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	if (isLoading) {
		return <Loader message=" UnFollowing ..." type="dots" />;
	} else {
		return (
			<>
				<Text color="greenBright">UnFollowed {props.username}</Text>
			</>
		);
	}
};

export default InstagramUnFollow;
