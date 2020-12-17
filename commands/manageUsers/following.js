import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import GithubFollowing from "../../components/manageUsers/following/GithubFollowing"
import TwitterFollowing from "../../components/manageUsers/following/TwitterFollowing"
import RedditFollowing from "../../components/manageUsers/following/RedditFollowing"
import InstagramFollowing from "../../components/manageUsers/following/InstagramFollowing"
const th = require('../../themes.json')


/// Get Latest Feeds command
const Following = ({ platform = "" }) => {


    if (platform.includes('github')) {
        return <GithubFollowing />;
    }
    else if (platform.includes('twitter')) {
        return <TwitterFollowing />;
    }
    else if (platform.includes('instagram')) {
        return <InstagramFollowing />;
    }
    // else if (platform.includes('facebook')) {
    //     return <FacebookFeeds />;
    // }
    else if (platform.includes('reddit')) {
        return <RedditFollowing />;
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
                        <Text color="yellow" >Select the Social Media to see following : </Text>
                    </Box>
                    <SelectInput items={items} onSelect={handleSelect} />
                </>
            );
        }
        else {
            if (updateField == 'github') {
                return <GithubFollowing />;
            }
            else if (updateField == 'instagram') {
                return <InstagramFollowing />;
            }
            else if (updateField == 'twitter') {
                return <TwitterFollowing />
            }
            // else if (updateField == 'facebook') {
            //     return <FacebookFeeds />
            // }
            else if (updateField == 'reddit') {
                return <RedditFollowing />
            }
        }

    }
    return <Text>Hello, {platform} </Text>;
};

Following.propTypes = {
    /// Name of the Platform to fetch Feeds
    platform: PropTypes.string
};

Following.shortFlags = {
    platform: 'pf'
};


export default Following;
