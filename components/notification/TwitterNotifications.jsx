import React, { useState, useEffect } from 'react';
import { Text, Box, useFocus, useInput } from "ink";
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"

const TwitterNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)

    useEffect(() => {
        twit.get('statuses/mentions_timeline', { count: 10 })
            .then(res => {
                const arr = []
                for (let i = 0; i < res.data.length; i++) {
                    var {
                        created_at,
                        text,
                        in_reply_to_screen_name,
                        user
                    } = res.data[i]
                    created_at = DateFormatter(created_at)
                    var { name, screen_name } = user
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Text bold >{screen_name}({name})</Text> has mentioned you({in_reply_to_screen_name}) in Tweet</Text>
                        <Text>{text} </Text>
                        <Text>-{created_at} </Text>
                    </Box>
                    arr.push(ans)

                }
                setNotifications(arr);
                const totalPages = Math.ceil(arr.length / 5);
                setTotalPageLength(totalPages);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
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
        return <Loader message=" Fetching Notifications..." type="dots" />
    }
    else {
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center" >
            {notifications.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                return x;
            })}
            <Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
        </Box>
    }
}

export default TwitterNotifications