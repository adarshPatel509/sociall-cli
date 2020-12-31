import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import GithubUnFollow from "../../components/manageUsers/unfollow/GithubUnFollow"
import TwitterUnFollow from "../../components/manageUsers/unfollow/TwitterUnFollow"
import RedditUnFollow from "../../components/manageUsers/unfollow/RedditUnFollow"


/// Get Latest Feeds command
const UnFollow = ({ platform = "" ,username}) => {


    if (platform.includes('github')) {
        return <GithubUnFollow username = {username}/>;
    }
    else if (platform.includes('twitter')) {
        return <TwitterUnFollow username = {username}/>;
    }
    else if (platform.includes('reddit')) {
        return <RedditUnFollow username = {username} />;
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
                return <GithubUnFollow username = {username}/>;
            }
            else if (updateField == 'twitter') {
                return <TwitterUnFollow username = {username}/>
            }
            else if (updateField == 'reddit') {
                return <RedditUnFollow username = {username} />
            }
        }

    }
    return <Text>Hello, {platform} </Text>;
};

UnFollow.propTypes = {
    /// Name of the Platform to fetch Feeds
    platform: PropTypes.string,
    username:PropTypes.string.isRequired
};

UnFollow.shortFlags = {
    platform: 'p',
    username:'u'
};


export default UnFollow;
