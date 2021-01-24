import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { reddit } from "../../../utils/api-clients"

const GithubFollowing = () => {
    const [isLoading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)

    useEffect(() => {
        reddit.get('/subreddits/mine/subscriber')
            .then(res => {
                var arr = [], user_data;
                for (let i = 0; i < res.data.children.length; i++) {
                    const {
                        display_name,
                        title,
                        display_name_prefixed,
                        subscribers,
                        public_description
                    } = res.data.children[i].data
                    const url = "https://www.reddit.com/" + display_name_prefixed
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text bold >{arr.length + 1}. <Link url={url}>{display_name}</Link></Text>
                        <Text dim ><Link url={url}>@{display_name_prefixed}</Link></Text>
                        <Text>{"\n"}{subscribers} People have Subscribed!!!</Text>
                        <Text>{"\n"}{public_description}</Text>
                    </Box>
                    arr.push(ans)
                }
                setFollowing(arr)
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
        return <Loader message=" Fetching Reddit Following ..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {following.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                        return x;
                    })}
                    <Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
                </Box>
            </>
        );
    }
}

export default GithubFollowing