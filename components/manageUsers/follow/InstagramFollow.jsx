import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { ig } from "../../../utils/api-clients"
const config = require("../../../config.json")

const InstagramFollow = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg,setPg] = useState(1)

    useEffect( () => {
        (async () => {
            try {
                const user = await ig.user.searchExact(props.username)
                const follow = await ig.friendship.create(user.pk);
                setFeeds(follow)
                setLoading(false)
            } catch(e) {
                console.log(e)
            }
        })();
    }, []);


    
    

    if (isLoading) {
        return <Loader message=" Fetching Instagram Followers ..." type="dots" />
    }
    else {
        console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {/* {feeds.slice((pg-1)*10,(pg*10)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text> */}
                </Box>
            </>
        );
    }
}

export default InstagramFollow