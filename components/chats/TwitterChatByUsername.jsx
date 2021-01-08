import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from "ink";
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"
import moment from "moment"

const TwitterChatByUsername = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)

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
                                const ans = <Box key={final_arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="flex-start" >
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
                        setChats(final_arr)
                        const totalPages = Math.ceil(final_arr.length / 5);
                        setTotalPageLength(totalPages);
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

    useInput((input, key) => {
        if (input === "q" || input === "Q") {
            process.exit();
        } else if (key.upArrow) {
            setPg(Math.max(1, pg - 1));
        } else if (key.downArrow) {
            setPg(Math.min(pg + 1, totalPageLength));
        }
    });

    if (isLoading) {
        return <Loader message=" Fetching Twitter Chats..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%"  alignItems="center">
                    {chats.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                        return x;
                    })}
                    <Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
                </Box>
            </>
        );
    }
}


export default TwitterChatByUsername

