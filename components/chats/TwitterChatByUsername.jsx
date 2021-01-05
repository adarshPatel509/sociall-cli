import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
import moment from "moment"

const TwitterChatByUsername = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        twit.get('users/show', {
            screen_name: props.username
        })
            .then(res => {
                const { id, id_str } = res.data
                twit.get('direct_messages/events/list')
                    .then(res => {
                        var arr = res.data.events
                        var final_arr = []
                        for (let i = 0; i < arr.length; i++) {
                            let time = new Date(parseInt(arr[i].created_timestamp))
                            time = moment(time).calendar()
                            let { target, sender_id, message_data } = arr[i].message_create
                            let target_id = target.recipient_id
                            message_data = message_data.text
                            if (id_str === sender_id) {
                                const ans = <Box key={final_arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignItems="flex-start" >
                                    <Text>{message_data}</Text>
                                    <Text>{time}</Text>
                                </Box>
                                final_arr.push(ans)
                            }
                            else if (id_str === target_id) {
                                const ans = <Box key={final_arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="flex-end">
                                    <Text>{message_data}</Text>
                                    <Text>{time}</Text>
                                </Box>
                                final_arr.push(ans)
                            }
                        }
                        final_arr = final_arr.reverse()
                        setFeeds(final_arr)
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })

    }, []);



    if (isLoading) {
        return <Loader message=" Fetching Twitter Chats..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {feeds.map((x) => {
                        return x
                    })}
                </Box>
            </>
        );
    }
}


export default TwitterChatByUsername

