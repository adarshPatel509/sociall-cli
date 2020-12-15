import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { twit } from "../../../utils/api-clients"
const th = require('../../../../themes.json')
// const feed_reply = require("../../feed_reply.json")
const config = require("../../../config.json")
const fetch = require("node-fetch");

const TwitterFollowing = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        twit.get('friends/list')
            .then(res => {
                var arr = [],user_data;
                for (let i = 0; i < res.data.users.length; i++) {                    
                    const name = res.data.users[i].name,screen_name = res.data.users[i].screen_name
                    const description = res.data.users[i].description
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text bold>{name}</Text>
                        <Text dim>@{screen_name}</Text>
                        <Text>{description}</Text>
                    </Box>
                    arr.push(ans)
                }
                setFeeds(arr)
                // console.log(res);
                // setFeeds(res.data.users)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Twitter Following ..." type="dots" />
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

export default TwitterFollowing