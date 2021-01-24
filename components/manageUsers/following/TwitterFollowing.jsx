import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { twit } from "../../../utils/api-clients"
const config = require("../../../config.json")
const fetch = require("node-fetch");

const TwitterFollowing = () => {
    const [isLoading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)

    useEffect(() => {
        (async () => {
            try {
                let arr = [], cursor = -1
                do {
                    const res = await twit.get('friends/list', {
                        cursor:cursor
                    })
                    console.log(res.data.users.length);
                    for (let i = 0; i < res.data.users.length; i++) {
                        const name = res.data.users[i].name, screen_name = res.data.users[i].screen_name
                        const description = res.data.users[i].description
                        const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                            <Text bold>{arr.length + 1}. {name}</Text>
                            <Text dim>@{screen_name}</Text>
                            <Text>{description}</Text>
                        </Box>
                        arr.push(ans)
                    }
                    cursor = res.data.next_cursor
                } while (cursor != 0);
                setFollowing(arr)
                const totalPages = Math.ceil(arr.length / 5);
                setTotalPageLength(totalPages);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        })()

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
        return <Loader message=" Fetching Twitter Following ..." type="dots" />
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

export default TwitterFollowing