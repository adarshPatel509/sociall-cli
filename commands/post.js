import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import TwitterPostData from "../components/post/TwitterPostData"
import GithubPostData from "../components/post/GithubPostData"
// import FacebookFeeds from "../components/feed/FacebookFeeds"
// import InstagramFeeds from "../components/feed/InstagramFeeds"
import RedditPostData from "../components/post/RedditPostData"
// const th = require('../themes.json')


/// Get Latest Feeds command
const Post = ({ platform = "" }) => {


    if (platform.includes('github')) {
        return <GithubPostData />;
    }
    else if (platform.includes('twitter')) {
        return <TwitterPostData />;
    }
    // else if (platform.includes('instagram')) {
    //     return <InstagramFeeds />;
    // }
    // else if (platform.includes('facebook')) {
    //     return <FacebookFeeds />;
    // }
    else if (platform.includes('reddit')) {
        return <RedditPostData />;
    }
    else {
        const [updateField, setField] = useState('');
        const items = [
            { label: 'Github', value: 'github' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Reddit', value: 'reddit' }
        ];

        const handleSelect = (item) => {
            setField(item.value);
        };

        if (updateField === '') {
            return (
                <>
                    <Box borderStyle="round" paddingLeft={1} width={51} borderColor="#00FFFF">
                        <Text color="yellow" >Select the Social Media to see feed : </Text>
                    </Box>
                    <SelectInput items={items} onSelect={handleSelect} />
                </>
            );
        }
        else {
            if (updateField == 'github') {
                return <GithubPostData />;
            }
            // else if (updateField == 'instagram') {
            //     return <InstagramFeeds />;
            // }
            else if (updateField == 'twitter') {
                return <TwitterPostData />
            }
            // else if (updateField == 'facebook') {
            //     return <FacebookFeeds />
            // }
            else if (updateField == 'reddit') {
                return <RedditPostData />
            }
        }

    }
    // return <Text>Hello, {platform} </Text>;
};

Post.propTypes = {
    /// Name of the Platform to fetch Feeds
    platform: PropTypes.string
};

Post.shortFlags = {
    platform: 'pf'
};


export default Post;
