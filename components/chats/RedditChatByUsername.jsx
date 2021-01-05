import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"

const RedditNotifications = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        reddit.get('/message/inbox')
            .then(res => {
                setNotifications(res.data.children);
                setLoading(false);
                // // const user = await ig.user.searchExact("avnishraut");
                // // let x = await ig.entity.profile(user.pk)
                // // // let threadFeed = await ig.feed.directThread({"thread_id": x.thread_id});
                // // // let chatsInAThread = await threadFeed.items();
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Notifications..." type="dots" />
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

export default RedditNotifications