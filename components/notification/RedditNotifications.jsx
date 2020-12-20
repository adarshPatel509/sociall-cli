import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { reddit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"

const RedditNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        reddit.get('/best')
            .then(res => {
                const arr = []
                // for (let i = 0; i < res.data.length; i++) {
                //     const {
                //         reason,
                //         subject,
                //         repository
                //     } = res.data[i];
                //     const {
                //         title,
                //         type
                //     } = subject
                //     const {
                //         name,
                //         owner,
                //     } = repository
                //     const { login } = owner
                //     const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                //         <Text><Text bold >{login}</Text> generated <Text color={"blue"}>{feed_reply[type]["emoji"]}  {type}</Text> in {name} repo of title <Text underline>"{title}"</Text> </Text>
                //         <Text>You got the Notifications because you have <Text underline>{reason}</Text></Text>
                //     </Box>
                //     arr.push(ans)
                // }
                setNotifications(res);
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
        console.log(notifications);
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
            {/* {notifications.map((x, index) => {
                return x
            })} */}
        </Box>
    }
}

export default RedditNotifications