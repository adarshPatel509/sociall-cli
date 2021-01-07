import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text } from "ink";
import Loader from "../../utils/loader";
import { fb } from "../../utils/api-clients";

const FacebookFeeds = () => {
	const [isLoading, setLoading] = useState(true);
	const [feeds, setFeeds] = useState([]);

	useEffect(() => {
		fb.api(
			"/me/accounts",
			'GET',
			function (response) {
				if (response && !response.error) {
					/* handle the result */
					console.log(response);
				}
			}
		);
	}, []);

	return <Loader message=" Fetching Facebook feeds..." type="dots" />;
};

export default FacebookFeeds;
