import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
const feed_reply = require("../../feed_reply.json")


const RedditPost = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState({});

    useEffect(() => {
        reddit.post('/api/submit',{
            kind:"self",
            sr:props.postdata.sr,
            text:props.postdata.text,
            title:props.postdata.title
        })
            .then(res => {
                setPostData(res.json.data.url)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    if (isLoading) {
    return <Loader message=" Posting Reddit Post..." type="dots" />
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    <Text color="greenBright">Post Posted on subreddit {props.postdata.sr}</Text>
                    <Text>Link for the post : {postData}</Text>
                </Box>
            </>
        );
    }
}

export default RedditPost