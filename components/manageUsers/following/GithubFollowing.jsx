import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { octokit } from "../../../utils/api-clients"
const th = require('../../../themes.json')
// const feed_reply = require("../../feed_reply.json")
const config = require("../../../config.json")
const fetch = require("node-fetch");

const GithubFollowing = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        octokit.request('GET /users/{username}/following', {
            username: config["github"]["username"]
        })
            .then(res => {
                var arr = [],user_data;
                for (let i = 0; i < res.data.length; i++) { 
                    const login = res.data[i].login,url=res.data[i].html_url,url1 = res.data[i].url  
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                            <Text><Link url={url}>{login}</Link></Text>
                        </Box>
                        arr.push(ans)
                }
                setFeeds(arr)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Github Following ..." type="dots" />
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {feeds.map((x, index) => {
                        return x
                    })}
                </Box>
            </>
        );
    }
}

export default GithubFollowing