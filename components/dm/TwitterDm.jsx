import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"

const TwitterMessage = (props) => {
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
        return <TwitterDm data={data} />
    }
}

const TwitterDm = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [url, setUrl] = useState("")
    useEffect(() => {
        twit.get('users/show', {
            screen_name: props.data.username
        })
            .then(res => {
                const { id_str } = res.data
                twit.post('direct_messages/events/new',
                    {
                        event: {
                            type: "message_create",
                            message_create: {
                                target: { recipient_id: id_str },
                                message_data: { text: props.data.message }
                            }
                        }
                    }
                ).then(resp => {
                    const { recipient_id } = resp.data.event.message_create.target, { sender_id } = resp.data.event.message_create
                    let url
                    console.log(parseInt(recipient_id) < parseInt(sender_id));
                    if (parseInt(recipient_id) < parseInt(sender_id))
                        url = "https://twitter.com/messages/" + recipient_id + "-" + sender_id
                    else
                        url = "https://twitter.com/messages/" + sender_id + "-" + recipient_id

                    setUrl(url)
                    setLoading(false)
                }).catch(err => {
                    console.log(err);
                })

            })
            .catch(err => {
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


export { TwitterDm, TwitterMessage }

