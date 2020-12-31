import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import Link from 'ink-link';
import Loader from '../../utils/loader';
import { octokit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"
const feed_reply = require("../../feed_reply.json")
const config = require("../../config.json")

const GithubSearch = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg, setPg] = useState(1)

    useEffect(() => {
        octokit.request('GET /search/repositories', {
            q: props.searchField
        })
            .then(res => {
                var arr = []
                for (let i = 0; i < res.data.items.length; i++) {
                    var { full_name, owner, html_url, description, updated_at, stargazers_count, license,language, watchers } = res.data.items[i]
                    var {login} = owner,name=""
                    if(license)
                    {
                        name = license.name
                    }
                    updated_at = DateFormatter(updated_at)
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text bold><Link url = {html_url} >{full_name}</Link></Text>
                        <Text>{description}</Text>
                        <Text>{"\uD83C\uDF1F"} {stargazers_count} {"\uD83D\uDD35"} {language} {name} Updated {updated_at}</Text>
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
        return <Loader message=" Fetching Github feeds..." type="dots" />
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

export default GithubSearch