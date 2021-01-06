import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { TwitterPostData } from "../components/post/TwitterPost"
import { GithubPostData } from "../components/post/GithubPost"
import { InstagramPostData } from "../components/post/InstagramPost"
import { RedditPostData } from "../components/post/RedditPost"
import { AllPostData } from "../components/post/AllPost"

/// All Post Commands
const Post = ({ platform = "", subreddit="", title="", text="", path="", type="" }) => {

    const data = { subreddit, title, text, path, type }

    if (platform.includes('all')) {
        return <AllPostData data={data} />
    } else if (platform.includes('github')) {
        return <GithubPostData data={data} />;
    }
    else if (platform.includes('twitter')) {
        return <TwitterPostData data={data} />;
    }
    else if (platform.includes('instagram')) {
        return <InstagramPostData data={data} />;
    }
    else if (platform.includes('reddit')) {
        return <RedditPostData data={data} />;
    }
    else {
        const [updateField, setField] = useState('');
        const items = [
            { label: 'All', value: 'all' },
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
                        <Text color="yellow" >Select the Social Media to post on : </Text>
                    </Box>
                    <SelectInput items={items} onSelect={handleSelect} />
                </>
            );
        }
        else {
            if (updateField == 'all') {
                return <AllPostData data={data} />
            } else if (updateField == 'github') {
                return <GithubPostData data={data} />;
            }
            else if (updateField == 'instagram') {
                return <InstagramPostData data={data} />;
            }
            else if (updateField == 'twitter') {
                return <TwitterPostData data={data} />
            }
            else if (updateField == 'reddit') {
                return <RedditPostData data={data} />
            }
        }

    }
    return <Text>Hello, {platform} </Text>;
};

Post.propTypes = {
    /// Name of the Platform to post a Post
    platform: PropTypes.string,
    subreddit: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    path: PropTypes.string,
    type: PropTypes.string

};

Post.shortFlags = {
    platform: 'pf',
    subreddit: 's',
    title: 'ti',
    text: 'te',
    path: 'p',
    type: 't'
};


export default Post;
