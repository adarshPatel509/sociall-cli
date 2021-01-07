import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { reddit } from "../../../utils/api-clients"

const GithubFollowers = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
	const [pgl, setPgl] = useState(1)

    useEffect(() => {
        reddit.get('/api/v1/me/friends')
            .then(res => {
                // var arr = [],user_data;
                // for (let i = 0; i < res.data.children.length; i++) { 
                //     const {
                //         display_name,
                //         title,
                //         display_name_prefixed,
                //         subscribers,
                //         public_description
                //       } = res.data.children[i].data
                //     const url = "https://www.reddit.com/"+display_name_prefixed
                //     const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                //             <Text bold ><Link url={url}>{display_name}</Link></Text>
                //             <Text dim ><Link url={url}>@{display_name_prefixed}</Link></Text>
                //             <Text>{"\n"}{subscribers} People have Subscribed!!!</Text>
                //             <Text>{"\n"}{public_description}</Text>
                //         </Box>
                //         arr.push(ans)
                // }
                // setFeeds(arr)
                setFeeds(res.data.children)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);


    if (isLoading) {
        return <Loader message=" Fetching Reddit Followers ..." type="dots" />
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

export default GithubFollowers