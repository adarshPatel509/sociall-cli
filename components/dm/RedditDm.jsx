import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
const config = require("../../config.json");

const RedditMessage = (props) => {
    const [message, setMessage] = useState("");

    function handleSubmit(newValue) {
        setMessage(newValue)
    }

    if (message === "") {
        return (
            <Box width="100%">
                <Box marginRight={1} flexDirection="column">
                    <Text>Enter Message :</Text>
                </Box>
                <UncontrolledTextInput onSubmit={handleSubmit} />
            </Box>
        );
    }
    else {
        const data = {
            username: props.username,
            message: message
        }
        return <RedditDm data={data} />
    }
}

const RedditDm = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [url, setUrl] = useState("")
    useEffect(() => {
        reddit.post("api/compose", {
            subject:"texc",
            text: "text",
            to: "RushWhoop"
        }).then(res => {
            console.log(res);
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })

    }, []);



    if (isLoading) {
        return <Loader message=" Sending Message..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    <Text color="greenBright">Message sent Successfully to <Text bold>{props.data.username}</Text></Text>
                    <Text>Link to chat : {url}</Text>
                </Box>
            </>
        );
    }
}


export { RedditDm, RedditMessage }

