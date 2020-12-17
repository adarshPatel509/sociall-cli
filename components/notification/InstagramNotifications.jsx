import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
const th = require('../../themes.json')
const config = require("../../config.json")
const feed_reply = require("../../feed_reply.json")

const InstagramNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});

    useEffect( () => {
        (async () => {
            try {
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const following = ig.news.inbox(auth.pk);
                following.then(res => {
                    console.log(res.aymf.items)
                })
                .catch(err => console.log(err))
                // var arr = []
                // for(let i = 0;i<items.length;i++)
                // {
                //     const username = items[i].username,full_name=items[i].full_name
                //     const url="https://www.instagram.com/"+username+"/"

                //       const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                //             <Text bold><Link url={url} >{username}</Link></Text>
                //             <Text>{full_name}</Text>
                //         </Box>
                //   arr.push(ans)
                // }
                // setFeeds(arr)
                setNotifications(following)
                setLoading(false)
            } catch(e) {
                console.log(e)
            }
        })();
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

export default InstagramNotifications