import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';
import Loader from '../utils/loader';
import { Octokit } from "@octokit/core";

const config = require('../config.json');
const octokit = new Octokit({ auth: config['access-token']['github'] });


/**
    Fetch Latest Github Notifications
 */
const GithubNotifications = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect(() => {
        octokit.request('GET /notifications')
        .then(res => {
            console.log(res.data);
            setFeeds(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    });

    // if(isLoading) {
        return <Loader message=" Fetching Notifications..." type="dots" />
    // }
}

/// Get Latest Notification command
const Notifications = ({platform}) => {
    if(platform.includes('github')) {
        return <GithubNotifications />;
    }
    return <Text>Hello, {platform} </Text>;
};

Notifications.propTypes = {
	/// Name of the Platform to fetch Notifications
	platform: PropTypes.string.isRequired
};

Notifications.shortFlags = {
    platform: 'pf'
};

export default Notifications;
