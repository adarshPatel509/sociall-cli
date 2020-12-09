import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Text ,Box} from 'ink';
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"

/**
    Fetch Latest Twitter Feeds
 */
const TwitterFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        twit.get('statuses/home_timeline', { count: 10 })
            .then(res => {
                var arr = []
                for (let i = 0; i < res.data.length; i++) {
                    const {
                        created_at,
                        text,
                        user,
                        retweet_count,
                        favorite_count,
                    } = res.data[i];
                    const { name } = user;
                    const ans = <Box borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column">
                        <Text>{name} tweeted on {created_at} </Text>
                        <Text>{text}</Text>
                        <Text>Retweet Count : {retweet_count} Favorite Count : {favorite_count}</Text>
                    </Box>
                    arr.push(ans)
                }
                setFeeds(arr);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    });

    if (isLoading) {
        return <Loader message=" Fetching Twitter feeds..." type="dots" />;
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width ={125}>
                    {feeds.map(x => x)}
                </Box>
            </>
        );
    }
}

export default TwitterFeeds