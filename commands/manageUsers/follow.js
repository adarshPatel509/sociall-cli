import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import GithubFollow from "../../components/manageUsers/follow/GithubFollow"
import TwitterFollow from "../../components/manageUsers/follow/TwitterFollow"
import RedditFollow from "../../components/manageUsers/follow/RedditFollow"
import InstagramFollow from "../../components/manageUsers/follow/InstagramFollow"


/// Get Latest Feeds command
const Follow = ({ platform = "" ,username}) => {


    if (platform.includes('github')) {
        return <GithubFollow username = {username}/>;
    }
    else if (platform.includes('twitter')) {
        return <TwitterFollow username = {username}/>;
    }
    else if (platform.includes('instagram')) {
        return <InstagramFollow username = {username}/>;
    }
    else if (platform.includes('reddit')) {
        return <RedditFollow username = {username}/>;
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
            else if (updateField == 'instagram') {
                return <InstagramFollow username = {username}/>;
            }
            else if (updateField == 'twitter') {
                return <TwitterFollow username = {username}/>
            }

            else if (updateField == 'reddit') {
                return <RedditFollow username = {username} />
            }
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
    platform: 'p',
    username:'u'
};


export default Follow;
