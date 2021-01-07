import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"

const RedditChatByUsername = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        reddit.get('/api/read_all_messages')
            .then(res => {
                setNotifications(res);
                setLoading(false);

            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Reddit Chats..." type="dots" />
    }
    else {
        console.log(notifications);
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
            {/* {notifications.map((x, index) => {
                return x
            })} */}
        </Box>
    }
}

export default RedditChatByUsername