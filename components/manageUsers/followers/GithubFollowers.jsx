import React, { useState, useEffect } from 'react';
import { Text, Box ,useInput} from 'ink';
import Link from 'ink-link';
import Loader from '../../../utils/loader';
import { octokit } from "../../../utils/api-clients"
const config = require("../../../config.json")

const GithubFollowers = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg,setPg] = useState(1)

    useEffect(() => {
        octokit.request('GET /users/{username}/followers', {
            username: config["github"]["username"]
        })
            .then(res => {
                var arr = [],user_data;
                for (let i = 0; i < res.data.length; i++) { 
                    const login = res.data[i].login,url=res.data[i].html_url,url1 = res.data[i].url  
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                            <Text><Link url={url}>{login}</Link></Text>
                        </Box>
                        arr.push(ans)
                }
                setFeeds(arr)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

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

    if (isLoading) {
        return <Loader message=" Fetching Github Followers ..." type="dots" />
    }
    else {
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

export default GithubFollowers