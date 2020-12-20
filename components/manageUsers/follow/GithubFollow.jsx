import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { octokit } from "../../../utils/api-clients"


const GithubFollow = (props) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        octokit.request('PUT /user/following/{username}', {
            username: props.username
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

export default GithubFollow