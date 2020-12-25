import React, { useState, useEffect } from 'react';
import { Text, Box, useFocus, useInput } from 'ink';
import Link from 'ink-link';
import { Tabs, Tab } from 'ink-tab';
import DateFormatter from "../../utils/date-formatter"
import Loader from '../../utils/loader';
import { twit } from "../../utils/api-clients"

/**
    Fetch Latest Twitter Feeds
 */
const TwitterFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg, setPg] = useState(1)

    useEffect(() => {
        twit.get('statuses/home_timeline')
            .then(res => {
                var arr = []
                for (let i = 0; i < res.data.length; i++) {
                    var {
                        id_str,
                        created_at,
                        text,
                        truncated,
                        user,
                        retweet_count,
                        favorite_count,
                        favorited,
                        retweeted,
                    } = res.data[i];
                    created_at = DateFormatter(created_at)
                    text = text.slice(0, text.search("https://") - 1)
                    if (truncated) {
                        text += "..."
                    }
                    const { name } = user;
                    const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                        <Text><Text bold >{name}</Text> tweeted <Text underline >{created_at}</Text> </Text>
                        <Text>{text}</Text>
                        <LikeRetweet rtc={retweet_count} fvc={favorite_count} id={id_str} fv={favorited} rt={retweeted} />
                    </Box>
                    arr.push(ans)
                }
                setFeeds(arr);
                setLoading(false)
            })
            .catch(err => {
                // console.log(err);
            });
    }, []);

    useInput((input, key) => {
        const temp = feeds.length % 5 ? parseInt(feeds.length / 5) + 1 : parseInt(feeds.length / 5)

        if (input === "q" || input === "Q") {
            process.exit()
        }
        else if (key.upArrow) {
            setPg(Math.max(1, pg - 1))
        }
        else if (key.downArrow) {
            setPg(Math.min(pg + 1, temp))
        }
    })

    if (isLoading) {
        return <Loader message=" Fetching Twitter feeds..." type="dots" />;
    }
    else {
        // console.log(feeds);
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignItems="center">
                    {feeds.slice((pg - 1) * 5, (pg * 5)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text>
                </Box>
            </>
        );
    }
}

const LikeRetweet = (props) => {
    const [activeTab, setActiveTab] = useState(null);
    const { isFocused } = useFocus();
    const [btnPressed, SetBtnPressed] = useState(false)

    const like = () => {
        twit.post("favorites/create", {
            name: "",
            id: props.id
        })
    }

    const retweet = () => {
        twit.post("statuses/retweet/:id", {
            name: "",
            id: props.id
        })
    }


    useEffect(() => {
        if (activeTab == "like" && btnPressed) {
            like()
            // console.log("Done!!");
        }
        else if (activeTab == "retweet" && btnPressed) {
            retweet()
        }
        if(btnPressed)
        {
            SetBtnPressed(false)
        }
    });

    useInput((input, key) => {
        if (input === "s" || input === "S") {
            SetBtnPressed(true)
        }
    })

    const handleTabChange = (name, activeTab) => {
        setActiveTab(name);
    }

    return (
        <>
            {   isFocused ?
                <Tabs onChange={handleTabChange}>
                    <Tab name="retweet">{"\uD83D\uDD01"} {activeTab} Retweet : {props.rtc}</Tab>
                    <Tab name="like">{"\u2764\uFE0F"}  Favorite : {props.fvc}</Tab>
                </Tabs> :
                <Text>{props.rt ? "\uD83D\uDD01" : "\u25B6\uFE0F"}  Retweet : {props.rtc} {props.fv ? "\u2764\uFE0F" : "\uD83E\uDD0D"}  Favorite : {props.fvc}</Text>
            }
        </>
    )

}

export default TwitterFeeds