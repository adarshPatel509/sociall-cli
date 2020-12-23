import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import Loader from '../../utils/loader';
import { fb } from "../../utils/api-clients"

const FacebookFeeds = () => {
    const [isLoading, setLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    
    useEffect(() => {
        fb.api('/me/feed', 'GET', (res) => {
            if(!res || res.error) {
                console.log("error!", res);
            } else {
                console.log(res);
            }
        })
    },[]);
    
    // if(isLoading) {
        return <Loader message=" Fetching Facebook feeds..." type="dots" />
    // }
}

export default FacebookFeeds