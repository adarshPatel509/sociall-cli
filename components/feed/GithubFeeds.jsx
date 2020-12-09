import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { octokit } from "../../utils/api-clients"

const GithubFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [git_username, setUsername] = useState("")

    useEffect(() => {
        octokit.request('/user')
            .then(res => {
                setUsername(res.data.login)
            })
            .catch(err => {
                console.log(err)
            })

        octokit.request('GET /users/{username}/received_events', {
            username: 'utsavk28'
        })
            .then(res => {
                var arr = []
                for (let i = 0; i < Math.min(10, res.data.length); i++) {
                    const { type, actor, repo, created_at } = res.data[i]
                    const { login } = actor, { name } = repo
                    const data = { type: type, login: login, name: name, created_at: created_at }
                    const ans = <Box borderStyle="round" borderColor="red" paddingLeft={2}>
                        <Text>{login} <Text color="blue" >{type} {name}</Text> {created_at} </Text>
                    </Box>
                    arr.push(ans)
                }
                setFeeds(arr)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    });

    if (isLoading) {
        return <Loader message=" Fetching Github feeds..." type="dots" />
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

export default GithubFeeds