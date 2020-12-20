import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
const config = require('../../config');

const InstagramFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});
    const [pg,setPg] = useState(1)

    useEffect( () => {
        (async () => {
            try {
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const timeline = ig.feed.timeline(auth.pk);
                const items = await timeline.items();
                var arr = []
                for(let i = 0;i<items.length;i++)
                {
                    var {taken_at,code,location,user,comment_count,like_count,caption} = items[i],text="",loc_name=""
                    //   const text = caption.text
                    var {username,full_name} = user
                    var user_url = "https://www.instagram.com/" + username ,post_url="https://www.instagram.com/p/" + code
                    //   const loc_name = location.name
                      if(caption )
                      {
                          text =  caption.text
                      }
                      if(location )
                      {
                          loc_name =location.name
                      }
                      const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                            <Text><Link url={user_url}><Text bold>{full_name}</Text> @{username}</Link></Text>
                            <Text>{loc_name && <Text dimColor>{loc_name}{"\n"}</Text>}
                            {text && <Text>{text}</Text>}</Text>
                            <Text>{"\n"}Post link : {post_url}</Text>
                            <Text>{"\u2764\uFE0F"} : {like_count} {"\uD83D\uDCAC"} : {comment_count}</Text>
                        </Box>
                  arr.push(ans)
                }
                setFeeds(arr)
                // setFeeds(items)
                setLoading(false)
            } catch(e) {
                console.log(e)
            }
        })();
    }, []);

    useInput((input,key) => {
        const temp = feeds.length%10 ? parseInt(feeds.length/10)+1 : parseInt(feeds.length/10)

        if(input === "q" || input === "Q")
        {
            process.exit()
        }
        else if(key.leftArrow)
        {
            setPg(Math.max(1,pg-1))
        }
        else if(key.rightArrow)
        {
            setPg(Math.min(pg+1,temp))
        }
    })

    if(isLoading) {
    return <Loader message=" Fetching Instagram feeds..." type="dots" />
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {feeds.slice((pg-1)*10,(pg*10)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text>
                </Box>
            </>
        );
    }
}

export default InstagramFeeds