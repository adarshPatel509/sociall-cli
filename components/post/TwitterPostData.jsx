import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import { UncontrolledTextInput } from "ink-text-input";
import TwitterPost from "./TwitterPost";

const TwitterPostData = () => {
	const [postData, setPostData] = useState({ text: "", path: "" });

	function handleTextSubmit(newValue) {
		setPostData({
      ...postData,
      text:newValue
    });
  }
  
  function handlePathSubmit(newValue) {
		setPostData({
      ...postData,
      path:newValue
    });
	}

	if (postData.text == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Tweet Text :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handleTextSubmit} />
			</Box>
		);
	} else if (postData.path == "") {
		return (
			<Box width="100%">
				<Box marginRight={1} flexDirection="column">
					<Text>Enter Tweet path :</Text>
				</Box>
				<UncontrolledTextInput onSubmit={handlePathSubmit} />
			</Box>
		);
	} else {
		return <TwitterPost status={postData} />;
	}
};

export default TwitterPostData;
