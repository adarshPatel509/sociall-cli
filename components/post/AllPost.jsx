import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Loader from "../../utils/loader";
import { UncontrolledTextInput } from "ink-text-input";
import { GithubPost } from "./GithubPost"
import { InstagramPost } from "./InstagramPost"
import { RedditPost } from "./RedditPost"
import { TwitterPost } from "./TwitterPost"

const AllPostData = (props) => {
    const [postData, setPostData] = useState({
        sr: props.data.subreddit,
        title: props.data.title,
        text: props.data.text,
        path: props.data.path,
    });


    function handleSrSubmit(newValue) {
        setPostData({
            ...postData,
            sr: newValue,
        });
    }

    function handleTitleSubmit(newValue) {
        setPostData({
            ...postData,
            title: newValue,
        });
    }

    function handleTextSubmit(newValue) {
        setPostData({
            ...postData,
            text: newValue,
        });
    }
    function handleImagePathSubmit(newValue) {
        setPostData({
            ...postData,
            path: newValue,
        });
    }

    if (postData.sr == "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter subreddit :</Text>
                    <Text dimColor>Please enter the subreddit name as "r/example</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleSrSubmit} />
            </Box>
        );
    } else if (postData.title == "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter Title for the post :</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleTitleSubmit} />
            </Box>
        );
    } else if (postData.text == "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter content for the post :</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleTextSubmit} />
            </Box>
        );
    } else if (postData.path == "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter path for the post image :</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleImagePathSubmit} />
            </Box>
        );
    } else {
        return <AllPost data={postData} />;
    }
};

const AllPost = (props) => {
    const data = props.data
    const TwitterData = { path: data.path, bio: data.text, type: 'media' }
    const RedditData = { ...data, type: 'media' }
    const InstaData = { path: data.path, bio: data.text }
    return <>
        <InstagramPost data={InstaData} />
        <RedditPost postdata={RedditData} />
        <TwitterPost status={TwitterData} />
    </>
}

export { AllPost, AllPostData };
