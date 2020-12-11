import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
const th = require('../../themes.json')

const InstagramFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState({});

    useEffect(() => {
        ig.login()
        .then(() => {
            ig.getHome()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        }) 

    }, []);

    // if(isLoading) {
    return <Loader message=" Fetching Instagram feeds..." type="dots" />
    // }
}

export default InstagramFeeds