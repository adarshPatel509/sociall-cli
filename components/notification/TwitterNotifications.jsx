import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"

const TwitterNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});

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
                    var { name , screen_name } = user
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Text bold >{screen_name}({name})</Text> has mentioned you({in_reply_to_screen_name}) in Tweet</Text>
                        <Text>{text} </Text>
                        <Text>-{created_at} </Text>
                    </Box>
                    arr.push(ans)
                    
                }
                setNotifications(arr);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Notifications..." type="dots" />
    }
    else {
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center" >
            {notifications.map((x,index) => {
                return x
            })}
        </Box>
    }
}

export default TwitterNotifications