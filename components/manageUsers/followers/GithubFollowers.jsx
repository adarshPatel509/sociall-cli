import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { octokit } from "../../../utils/api-clients"
const config = require("../../../config.json")

const GithubFollowers = () => {
    const [isLoading, setLoading] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)

    useEffect(() => {
        octokit.request('GET /users/{username}/followers', {
            username: config["github"]["username"]
        })
            .then(res => {
                var arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    const login = res.data[i].login, url = res.data[i].html_url, url1 = res.data[i].url
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text>{arr.length + 1}. <Link url={url}>{login}</Link></Text>
                    </Box>
                    arr.push(ans)
                }
                setFollowers(arr)
                const totalPages = Math.ceil(arr.length / 5);
                setTotalPageLength(totalPages);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

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
        return <Loader message=" Fetching Github Followers ..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {followers.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                        return x;
                    })}
                    <Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
                </Box>
            </>
        );
    }
}

export default GithubFollowers