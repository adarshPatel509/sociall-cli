import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
const th = require('../../themes.json')
const feed_reply = require("../../feed_reply.json")


const RedditFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    // const [git_username, setUsername] = useState("")

    useEffect(() => {
        reddit.get('/best')
            .then(res => {
                var arr = []
                for (let i = 0; i < Math.min(10, res.data.children.length); i++) {
                    var { title,
                        subreddit_name_prefixed,
                        downs,
                        ups,
                        total_awards_received,
                        score,
                        author,
                        num_comments,
                        url } = res.data.children[i].data
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Text bold >{subreddit_name_prefixed}</Text> Posted by u/{author} </Text>
                        <Text>{title}</Text>
                        <Text>{url}</Text>
                        <Text>{"\uD83D\uDD3C"} : {ups} {"\uD83D\uDD3D"} : {downs} {"\uD83C\uDFC6"} : {total_awards_received} {"\uD83D\uDCAC"} : {num_comments}</Text>
                    </Box>
                    arr.push(ans)
                }
                // console.log(res.data.children.slice(0, 10))
                setFeeds(arr)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    if (isLoading) {
    return <Loader message=" Fetching Reddit feeds..." type="dots" />
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    {feeds.map((x, index) => {
                        return x
                    })}
                </Box>
            </>
        );
    }
}

export default RedditFeeds