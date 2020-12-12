import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import DateFormatter from "../../utils/date-formatter"
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"
const th = require('../../themes.json')

/**
    Fetch Latest Twitter Feeds
 */
const TwitterFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    // const [xyz,setX] = useState([])
    useEffect(() => {
        twit.get('statuses/home_timeline', { count: 10 })
            .then(res => {
                var arr = []
                for (let i = 0; i < res.data.length; i++) {
                    var {
                        created_at,
                        text,
                        truncated,
                        user,
                        retweet_count,
                        favorite_count,
                    } = res.data[i];
                    created_at = DateFormatter(created_at)
                    text = text.slice(0, text.search("https://") - 1)
                    if (truncated) {
                        text += "..."
                    }
                    const { name } = user;
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Text bold >{name}</Text> tweeted <Text underline >{created_at}</Text> </Text>
                        <Text>{text}</Text>
                        <Text>{"\uD83D\uDD01"} Retweet : {retweet_count} {"\u2764\uFE0F"}  Favorite : {favorite_count}</Text>
                    </Box>
                    arr.push(ans)
                    // if(i <2)
                    // setX(res.data[i].entities)
                }
                setFeeds(arr);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Twitter feeds..." type="dots" />;
    }
    else {
        // console.log(feeds);
        // console.log(xyz)
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

export default TwitterFeeds