import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { octokit } from "../../utils/api-clients"


const GithubPostData = (props) => {
    const [postData, setPostData] = useState({
        name: props.data.title,
        description: props.data.text
    })

    function handleNameSubmit(newValue) {
        setPostData({
            ...postData,
            name: newValue
        })
    }

    function handleDescriptionSubmit(newValue) {
        setPostData({
            ...postData,
            description: newValue
        })
    }

    if (postData.name == "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter Repo Name :</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleNameSubmit} />
            </Box>
        );
    }
    else if (postData.description == "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter Repo Description :</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleDescriptionSubmit} />
            </Box>
        );
    }
    else {
        return <GithubPost data={postData} />
    }
}


const GithubPost = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState({});

    useEffect(() => {
        octokit.request('POST /user/repos', {
            name: props.data.name,
            description: props.data.description
        })
            .then(res => {
                setPostData(res.data.html_url)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);




    if (isLoading) {
        return <Loader message=" Creating Github Repo..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    <Text color="greenBright">Successfully Created a Repo on Github!!!</Text>
                    <Text>Link for the Repo : {postData}</Text>
                </Box>
            </>
        );
    }
}

export { GithubPost, GithubPostData }