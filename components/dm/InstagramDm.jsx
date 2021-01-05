import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
const config = require("../../config.json");

const InstagramMessage = (props) => {
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
        return <InstagramDm data={data} />
    }
}

const InstagramDm = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [url, setUrl] = useState("")
    useEffect(() => {
        try {
            ig.account.login(
                config["instagram"]["username"],
                config["instagram"]["password"]
            ).then(res => {
                ig.user.getIdByUsername(props.data.username)
                    .then(res => {
                        ig.entity.directThread([res.toString()]).broadcastText(props.data.message)
                            .then(resp => {
                                const url = "https://www.instagram.com/direct/t/" + resp.thread_id
                                setUrl(url)
                                setLoading(false)
                            })
                    })
            })
        } catch (error) {
            console.error(error);
        }

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


export { InstagramDm, InstagramMessage }

