import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import GithubFollowers from "../../components/manageUsers/followers/GithubFollowers"
import TwitterFollowers from "../../components/manageUsers/followers/TwitterFollowers"
import RedditFollowers from "../../components/manageUsers/followers/RedditFollowers"
import InstagramFollowers from "../../components/manageUsers/followers/InstagramFollowers"


/// Get Latest Feeds command
const Followers = ({ platform = "" }) => {


    if (platform.includes('github')) {
        return <GithubFollowers />;
    }
    else if (platform.includes('twitter')) {
        return <TwitterFollowers />;
    }
    else if (platform.includes('instagram')) {
        return <InstagramFollowers />;
    }
    else if (platform.includes('reddit')) {
        return <RedditFollowers />;
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
                return <GithubFollowers />;
            }
            else if (updateField == 'instagram') {
                return <InstagramFollowers />;
            }
            else if (updateField == 'twitter') {
                return <TwitterFollowers />
            }
            else if (updateField == 'reddit') {
                return <RedditFollowers />
            }
        }

    }
    return <Text>Hello, {platform} </Text>;
};

Followers.propTypes = {
    /// Name of the Platform to fetch Feeds
    platform: PropTypes.string
};

Followers.shortFlags = {
    platform: 'p'
};


export default Followers;
