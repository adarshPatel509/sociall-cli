import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
const th = require('../../themes.json')
const config = require('../../config');

const InstagramFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect( () => {
        (async () => {
            try {
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const timeline = ig.feed.timeline(auth.pk);
                const items = await timeline.items();
                console.log(items);
            } catch {
                console.log("error")
            }
        })();
    }, []);

    // if(isLoading) {
    return <Loader message=" Fetching Instagram feeds..." type="dots" />
    // }
}

export default InstagramFeeds