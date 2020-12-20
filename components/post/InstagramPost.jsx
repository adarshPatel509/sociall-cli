import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
const config = require("../../config.json")

const InstagramPost = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState({});

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



    if (isLoading) {
    return <Loader message=" Creating Github Repo..." type="dots" />
    }
    else {
        // console.log(postData);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    <Text color="greenBright">Successfully Created a Repo on Github!!!</Text>
                    <Text>Link for the Repo : {postData}</Text>
                </Box>
            </>
        );
    }
}

export default InstagramPost