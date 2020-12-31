import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
const config = require("../../config.json")


const InstagramNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect( () => {
        (async () => {
            try {
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const following = ig.news.inbox(auth.pk);
                following.then(res => {
                    const x = res.old_stories
                    var arr = []
                    for(let i = 0;i<x.length;i++)
                    {
                        var name = x[i].args.destination, text = x[i].args.rich_text
                        if(text)
                        {
                            const nm =  name.slice(14,text.length)
                            const txt1 = text.slice(0,text.search("{")) + nm +  text.slice(text.search("}")+1,text.length)
                            const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                                <Text>{txt}</Text> 
                                </Box>
                            arr.push(ans)
                        }
                        else
                        {
                            var text = x[i].args.text
                            const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                                <Text>{text}</Text> 
                                </Box>
                            arr.push(ans)
                        }
                        
                    }
                    setNotifications(arr)
                })
                .catch(err => console.log(err))
                
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
        return <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
            {notifications.map((x, index) => {
                return x
            })}
        </Box>
    }
}

export default InstagramNotifications