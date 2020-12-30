import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { twit } from "../../../utils/api-clients"

const TwitterUnFollow = (props) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        twit.post('friendships/destroy',{
            screen_name:props.username
        })
            .then(res => {
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    if (isLoading) {
        return <Loader message="UnFollowing ..." type="dots" />
    }
    else {
        return (
            <>
                <Text color="greenBright">UnFollowed {props.username}</Text>
            </>
        );
    }
}

export default TwitterUnFollow