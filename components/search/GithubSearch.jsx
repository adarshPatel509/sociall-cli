import React, { useState, useEffect } from 'react';
import { Text, Box, useFocus, useInput } from 'ink';
import { Tabs, Tab } from "ink-tab";
import Link from 'ink-link';
import SelectInput from "ink-select-input";

import Loader from '../../utils/loader';
import { octokit } from "../../utils/api-clients"
import DateFormatter from "../../utils/date-formatter"

const GithubSelect = (props) => {
    const [field, setField] = useState("");
    const items = [
        { label: "Repository ", value: "repository" },
        { label: "User", value: "user" }
    ];

    const handleSelect = (item) => {
        setField(item.value);
    };

    if (field === "") {
        return (
            <>
                <Box
                    borderStyle="round"
                    paddingLeft={1}
                    width={51}
                    borderColor="#00FFFF"
                >
                    <Text color="yellow">Select the one of the following : </Text>
                </Box>
                <SelectInput items={items} onSelect={handleSelect} />
            </>
        );
    } else {
        return <GithubSearch data={{ field, searchField: props.searchField }} />
    }

}

const GithubSearch = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [pg, setPg] = useState(1)

    useEffect(() => {
        if (props.data.field === "repository") {
            octokit.request('GET /search/repositories', {
                q: props.data.searchField
            })
                .then(res => {
                    var arr = []
                    for (let i = 0; i < res.data.items.length; i++) {
                        var { full_name, owner, html_url, description, updated_at, stargazers_count, license, language, watchers } = res.data.items[i]
                        var { login } = owner, name = ""
                        if (license) {
                            name = license.name
                        }
                        updated_at = DateFormatter(updated_at)
                        const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                            <Text bold><Link url={html_url} >{full_name}</Link></Text>
                            <Text>{description}</Text>
                            <Text>{"\uD83C\uDF1F"} {stargazers_count} {"\uD83D\uDD35"} {language} {name} Updated {updated_at} {"\n"}</Text>
                            <StarFork data={{ name: full_name }} />
                        </Box>
                        arr.push(ans)
                    }
                    setFeeds(arr)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            octokit.request('GET /search/users', {
                q: props.data.searchField
            })
                .then(res => {
                    var arr = [];
                    for (let i = 0; i < res.data.items.length; i++) {
                        const login = res.data.items[i].login, url = res.data.items[i].html_url, url1 = res.data.items[i].url
                        const ans = <Box key={arr.length} borderStyle="round" borderColor="red" paddingLeft={2} flexDirection="column" width="90%" alignSelf="center">
                            <Text><Link url={url}>{login} </Link></Text>
                            <Text></Text>
                            <FollowUser username={login} />
                        </Box>
                        arr.push(ans)
                    }
                    setFeeds(arr)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        }

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
        return <Loader message=" Fetching Github feeds..." type="dots" />
    }
    else {
        return (
            <>
                <Box borderStyle="round" borderColor="#00FFFF" flexDirection="column" width="95%" alignSelf="center" alignItems="center">
                    {feeds.slice((pg - 1) * 5, (pg * 5)).map((x, index) => {
                        return x
                    })}
                    <Text>Page : {pg}</Text>
                </Box>
            </>
        );
    }
}

const FollowUser = (props) => {
    const [activeTab, setActiveTab] = useState(null);
    const { isFocused } = useFocus();
    const [btnPressed, SetBtnPressed] = useState(false);

    const follow = () => {
        octokit.request('PUT /user/following/{username}', {
            username: props.username
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

    }


    useEffect(() => {
        if (activeTab == "follow" && btnPressed) {
            follow();
        }
        if (btnPressed) {
            SetBtnPressed(false);
        }
    });

    useInput((input, key) => {
        if (input === "s" || input === "S") {
            SetBtnPressed(true);
        }
    });

    const handleTabChange = (name, activeTab) => {
        setActiveTab(name);
    };

    return (
        <>
            {isFocused ? (<Tabs onChange={handleTabChange}>
                <Tab name="follow">
                    Follow
					</Tab>
                <Tab name="fosllow"></Tab>

            </Tabs>) : (<Text> Follow</Text>)}
        </>
    );
}


const StarFork = (props) => {
    const [activeTab, setActiveTab] = useState(null);
    const { isFocused } = useFocus();
    const [btnPressed, SetBtnPressed] = useState(false);

    const star = () => {
        const put_req = 'PUT /user/starred/' + props.data.name
        octokit.request(put_req).then(res => {
            // console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const watch = () => {
        const put_req = 'PUT /repos/' + props.data.name + '/subscription'
        octokit.request(put_req, {
            subscribed: true
        }).then(res => {
            // console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const fork = () => {
        const post_req = 'POST /repos/' + props.data.name + '/forks'
        console.log(post_req);
        octokit.request(post_req).then(res => {
            // console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (activeTab == "star" && btnPressed) {
            star();
        } else if (activeTab == "watch" && btnPressed) {
            watch();
        } else if (activeTab == "fork" && btnPressed) {
            fork();
        }
        if (btnPressed) {
            SetBtnPressed(false);
        }
    });

    useInput((input, key) => {
        if (input === "s" || input === "S") {
            SetBtnPressed(true);
        }
    });

    const handleTabChange = (name, activeTab) => {
        setActiveTab(name);
    };

    return (
        <>
            {isFocused ? (
                <Tabs onChange={handleTabChange}>
                    <Tab name="star">
                        {"\u2B50"} star
					</Tab>
                    <Tab name="watch">
                        {"\uD83D\uDC41\uFE0F"} watch
					</Tab>
                    <Tab name="fork">
                        {"\uD83D\uDCCC"}  fork
					</Tab>
                </Tabs>
            ) : (
                    <Text>
                        {"\u2B50"} star  {"\uD83D\uDC41\uFE0F"}  watch  {"\uD83D\uDCCC"} fork
                    </Text>
                )}
        </>
    );
}


export { GithubSearch, GithubSelect }