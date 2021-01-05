import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
import Link from "ink-link"

const RedditNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        reddit.get('/message/inbox')
            .then(res => {
                const arr = [], data = res.data.children
                for (let i = 0; i < data.length; i++) {
                    const { kind } = data[i]
                    let { link_title, subject, body, context } = data[i].data
                    const url = "https://www.reddit.com" + context
                    const ans = (
                        <Box
                            key={arr.length}
                            borderStyle="round"
                            borderColor="red"
                            paddingLeft={2}
                            flexDirection="column"
                            width="90%"
                            alignSelf="center"
                        >
                            <Text bold>{subject} : {link_title}</Text>
                            <Text>{body}</Text>
                            {context.length > 0 && <Link url={url} >Link</Link>}
                        </Box>
                    );
                    arr.push(ans);
                }
                setNotifications(arr);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (isLoading) {
        return <Loader message=" Fetching Reddit Notifications..." type="dots" />
    }
    else {
        // console.log(notifications);
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
            {notifications.map((x, index) => {
                return x
            })}
        </Box>
    }
}

export default RedditNotifications