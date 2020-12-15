import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { octokit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
const th = require('../../themes.json')
const feed_reply = require("../../feed_reply.json")
const config = require("../../config.json")
const fetch = require("node-fetch");

const GithubFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        octokit.request('GET /users/{username}/received_events', {
            username: config["github"]["username"]
        })
            .then(res => {
                var arr = []
                for (let i = 0; i < Math.min(10, res.data.length); i++) {
                    var user_api_url = res.data[i].actor.url,repo_api_url = res.data[i].repo.url
                    var user_url = "https://github.com/" + user_api_url.slice(29)
                    var repo_url = "https://github.com/" + repo_api_url.slice(29)
                    var { type, actor, repo, created_at } = res.data[i]
                    var { login } = actor, { name } = repo
                    created_at = DateFormatter(created_at)
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Link url = {user_url} ><Text bold >{login}</Text></Link> {feed_reply[type]["reply"]} <Link url={repo_url} ><Text color="blue" underline>{name}</Text></Link></Text>
                        <Text>-{created_at}</Text>
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
        return <Loader message=" Fetching Github feeds..." type="dots" />
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

export default GithubFeeds