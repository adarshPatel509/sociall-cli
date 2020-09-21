import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';
import Loader from '../utils/loader';
import { octokit, twit, ig, fb } from '../utils/api-clients';

/**
    Fetch Latest Twitter Feeds
 */
const TwitterFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect(() => {
        twit.get('statuses/home_timeline', {count: 20})
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
        return <Loader message=" Fetching Twitter feeds..." type="dots" />;
    // }
}

/**
    Fetch Latest Github Feeds
 */
const GithubFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect(() => {
        octokit.request('GET /events')  /* GET /feeds --> to get feeds */
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
        return <Loader message=" Fetching Github feeds..." type="dots" />
    // }
}

/**
    Fetch Latest Instagram Feeds
 */
const InstagramFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});
    
    useEffect(() => {
        ig.login()
        .then(() => {
            ig.getHome()
            .then(res => {
                console.log(JSON.stringify(res));
                setFeeds(res);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        }) 
    });
    
    // if(isLoading) {
        return <Loader message=" Fetching Instagram feeds..." type="dots" />
    // }
}

/**
    Fetch Latest Facebook Feeds
 */
const FacebookFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});
    
    useEffect(() => {
        fb.api('/me/feed', 'POST', {'message': "YEyy!!"}, (res) => {
            if(!res || res.error) {
                console.log("error!", res);
            } else {
                console.log(res);
            }
        })
    });
    
    // if(isLoading) {
        return <Loader message=" Fetching Facebook feeds..." type="dots" />
    // }
}

/// Get Latest Feeds command
const Feeds = ({platform}) => {
    if(platform.includes('github')) {
        return <GithubFeeds />;
    }
    else if(platform.includes('twitter')) {
        return <TwitterFeeds />;
    }
    else if(platform.includes('instagram')) {
        return <InstagramFeeds />;
    }
    else if(platform.includes('facebook')) {
        return <FacebookFeeds />;
    }
    return <Text>Hello, {platform} </Text>;
};

Feeds.propTypes = {
	/// Name of the Platform to fetch Feeds
	platform: PropTypes.string.isRequired
};

Feeds.shortFlags = {
    platform: 'pf'
};

export default Feeds;
