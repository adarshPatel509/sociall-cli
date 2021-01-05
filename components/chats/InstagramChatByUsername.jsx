import React, { useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import Loader from "../../utils/loader";
import { ig } from "../../utils/api-clients";
import DateFormatter from "../../utils/date-formatter";
const config = require("../../config.json");
import moment from "moment"

const InstagramChatByUsername = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [pg, setPg] = useState(1);
    const [errMsg, setErrMsg] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const auth = await ig.account.login(
                    config["instagram"]["username"],
                    config["instagram"]["password"]
                );
                const our_pk = auth.pk
                let directFeed = await ig.feed.directInbox()
                let break_statement = false, req_id
                do {
                    let temp = await directFeed.items()
                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i].users[0].username === props.username && temp[i].users.length === 1) {
                            req_id = temp[i].thread_id
                            break_statement = true
                            break
                        }
                    }
                    if (break_statement) {
                        break_statement = false
                        break
                    }
                } while (directFeed.isMoreAvailable());

                //accessing one particular chat thread 
                let threadFeed = await ig.feed.directThread({ "thread_id": req_id });
                let chatsInAThread = await threadFeed.items();
                let items = [...chatsInAThread];
                do {
                    items = items.concat(await threadFeed.items());
                } while (threadFeed.isMoreAvailable());

                let final_arr = []
                for (let i = 0; i < items.length; i++) {
                    if (items[i].item_type == "text") {
                        let { text, timestamp, user_id } = items[i], alignSelf = 'flex-start'
                        timestamp = moment(new Date(parseInt(parseInt(timestamp) / 1000))).calendar()
                        if (user_id === our_pk) {
                            alignSelf = 'flex-end'
                        }
                        const ans = <Box key={final_arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf={alignSelf} >
                            <Text>{text}</Text>
                            <Text>{timestamp}</Text>
                        </Box>
                        final_arr.push(ans)
                    }
                    else if (items[i].item_type == 'media_share') {
                        let { timestamp, user_id } = items[i], alignSelf = 'flex-start', code = items[i].media_share.code
                        if (user_id === our_pk) {
                            alignSelf = 'flex-end'
                        }
                        const url = "https://www.instagram.com/p/" + code + "/"
                        timestamp = moment(new Date(parseInt(parseInt(timestamp) / 1000))).calendar()
                        const ans = <Box key={final_arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf={alignSelf} >
                            <Text>Shared a post : {url}</Text>
                            <Text>{timestamp}</Text>
                        </Box>
                        final_arr.push(ans)
                    }

                }
                setChats(final_arr)
                setLoading(false);
            }
            catch (e) {
                if (e.message == "Cannot read property 'username' of undefined") {
                    setLoading(false);
                    setErrMsg(true)
                }
                else
                    console.log(e);
            }
        })();
    }, []);

    useInput((input, key) => {
        if (input === "q" || input === "Q") {
            process.exit();
        }
        const temp =
            chats.length % 5
                ? parseInt(chats.length / 5) + 1
                : parseInt(chats.length / 5);

        if (key.upArrow) {
            setPg(Math.max(1, pg - 1));
        } else if (key.downArrow) {
            setPg(Math.min(pg + 1, temp));
        }
    });

    if (isLoading) {
        return <Loader message=" Fetching Instagram Chats..." type="dots" />;
    } else if (errMsg) {
        return (<Box
            borderStyle="round"
            borderColor="#00FFFF"
            flexDirection="column"
            width="95%"
            alignItems="center"
        >
            <Text color="redBright">You haven't had a chat with this person or the Username is invalid!!</Text>
        </Box>)
    }
    else {
        return (
            <Box
                borderStyle="round"
                borderColor="#00FFFF"
                flexDirection="column"
                width="95%"
                alignItems="center"
            >
                {chats.slice((pg - 1) * 5, pg * 5).map((x, index) => {
                    return x;
                })}
                <Text>Page : {pg}</Text>
            </Box>
        );
    }
};

export default InstagramChatByUsername;
