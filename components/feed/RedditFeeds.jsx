import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"


const RedditFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg,setPg] = useState(1)

    useEffect(() => {
        reddit.get('/best')
            .then(res => {
                var arr = []
                for (let i = 0; i < res.data.children.length; i++) {
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

    useInput((input,key) => {
        const temp = feeds.length%10 ? parseInt(feeds.length/10)+1 : parseInt(feeds.length/10)

        if(input === "q" || input === "Q")
        {
            process.exit()
        }
        else if(key.leftArrow)
        {
            setPg(Math.max(1,pg-1))
        }
        else if(key.rightArrow)
        {
            setPg(Math.min(pg+1,temp))
        }
    })

    if (isLoading) {
    return <Loader message=" Fetching Reddit feeds..." type="dots" />
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    {feeds.slice((pg-1)*10,(pg*10)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text>
                </Box>
            </>
        );
    }
}

export default RedditFeeds