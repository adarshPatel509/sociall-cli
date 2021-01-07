import React, { useState, useEffect } from 'react';
import { Text, Box, useFocus, useInput } from "ink";
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
import Link from "ink-link"

const RedditNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});
    const [pg, setPg] = useState(1);
    const [totalPageLength, setTotalPageLength] = useState(1)

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
        return <Loader message=" Fetching Reddit Notifications..." type="dots" />
    }
    else {
        // console.log(notifications);
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
            {notifications.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                return x;
            })}
            <Text>{pg != 1 && "\u25C0\uFE0F"}  Page : {pg} {pg != totalPageLength && "\u25B6\uFE0F"}</Text>
        </Box>
    }
}

export default RedditNotifications