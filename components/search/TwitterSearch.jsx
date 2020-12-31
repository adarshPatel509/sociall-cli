import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
const feed_reply = require("../../feed_reply.json")
const config = require("../../config.json")

const TwitterSearch = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg, setPg] = useState(1)

    useEffect(() => {
        twit.get('search/tweets', { q: props.searchField })
            .then(res => {
                var arr = []
                for (let i = 0; i < res.data.statuses.length; i++) {
                    var {
                        created_at,
                        text,
                        user,
                        truncated,
                        id,
                        retweet_count,
                        favorite_count
                    } = res.data.statuses[i];
                    var {name,screen_name} = user
                    created_at = DateFormatter(created_at)
                    text = text.slice(0, text.search("https://") - 1)
                    if (truncated) {
                        text += "..."
                    }
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Text bold >{name}</Text> @{screen_name} tweeted <Text underline >{created_at}</Text></Text>
                        <Text>{text}</Text>
                        <Text>{"\uD83D\uDD01"} Retweet : {retweet_count} {"\u2764\uFE0F"}  Favorite : {favorite_count}</Text>
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


    useInput((input, key) => {
        const temp = feeds.length % 10 ? parseInt(feeds.length / 10) + 1 : parseInt(feeds.length / 10)

        if (input === "q" || input === "Q") {
            process.exit()
        }
        else if (key.leftArrow) {
            setPg(Math.max(1, pg - 1))
        }
        else if (key.rightArrow) {
            setPg(Math.min(pg + 1, temp))
        }
    })

    if (isLoading) {
        return <Loader message=" Fetching Twitter feeds..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {feeds.slice((pg - 1) * 10, (pg * 10)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text>
                </Box>
            </>
        );
    }
}


export default TwitterSearch

