import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import GithubFollow from "../../components/manageUsers/follow/GithubFollow"
import TwitterFollow from "../../components/manageUsers/follow/TwitterFollow"
const th = require('../../themes.json')


/// Get Latest Feeds command
const Follow = ({ platform = "" ,username}) => {


    if (platform.includes('github')) {
        return <GithubFollow username = {username}/>;
    }
    else if (platform.includes('twitter')) {
        return <TwitterFollow username = {username}/>;
    }
    // else if (platform.includes('instagram')) {
    //     return <InstagramFeeds />;
    // }
    // else if (platform.includes('facebook')) {
    //     return <FacebookFeeds />;
    // }
    // else if (platform.includes('reddit')) {
    //     return <RedditFeeds />;
    // }
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
                        <Text color="yellow" >Select the Social Media to see followers : </Text>
                    </Box>
                    <SelectInput items={items} onSelect={handleSelect} />
                </>
            );
        }
        else {
            if (updateField == 'github') {
                return <GithubFollow username = {username}/>;
            }
            // else if (updateField == 'instagram') {
            //     return <InstagramFeeds />;
            // }
            else if (updateField == 'twitter') {
                return <TwitterFollow username = {username}/>
            }
            // else if (updateField == 'facebook') {
            //     return <FacebookFeeds />
            // }
            // else if (updateField == 'reddit') {
            //     return <RedditFeeds />
            // }
        }

    }
    return <Text>Hello, {platform} </Text>;
};

Follow.propTypes = {
    /// Name of the Platform to fetch Feeds
    platform: PropTypes.string,
    username:PropTypes.string.isRequired
};

Follow.shortFlags = {
    platform: 'pf',
    username:'u'
};


export default Follow;
