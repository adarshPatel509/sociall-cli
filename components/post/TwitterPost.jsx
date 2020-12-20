import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"


const RedditPost = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState({});

    useEffect(() => {
        twit.post('statuses/update',{
            status:props.status
        })
            .then(res => {
                const url = "https://twitter.com/"+res.data.user.screen_name + "/status/"+res.data.id_str
                setPostData(url);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    if (isLoading) {
    return <Loader message=" Posting Reddit Post..." type="dots" />
    }
    else {
        console.log(postData);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    <Text color="greenBright">Posted Successfully on Twitter!!!</Text>
                    <Text>Link for the post : {postData}</Text>
                </Box>
            </>
        );
    }
}

export default RedditPost