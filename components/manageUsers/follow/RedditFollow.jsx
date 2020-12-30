import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { reddit } from "../../../utils/api-clients"

const RedditFollow = (props) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        reddit.post('/api/subscribe',{
            action:"sub",
            skip_initial_defaults:true,
            sr_name:props.username
        })
            .then(res => {
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    if (isLoading) {
        return <Loader message="Following ..." type="dots" />
    }
    else {
        return (
            <>
                <Text color="greenBright">Followed {props.username}</Text>
            </>
        );
    }
}

export default RedditFollow