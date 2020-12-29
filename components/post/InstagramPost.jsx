import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader.js';
import { ig } from '../../utils/api-clients';
import { string } from 'prop-types';
import { createReadStream, readFile } from 'fs';
const config = require('../../config');
const promisify = require('util.promisify');
const fs = require('fs')
const readFileAsync = promisify(readFile);
/**
    Update Instagram Profile
    Api ref: https://github.com/jlobos/instagram-web-api#updateprofileparams
 */
const InstagramPost = (props) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                // const rStream = createReadStream('Land_of_Runes.png')
                // const items = await ig.upload.photo(rStream);
                const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
                const path = props.data.path
                const publishResult = await ig.publish.photo({
                    // read the file into a Buffer
                    file: await readFileAsync(path),
                    // optional, default ''
                    caption: props.data.bio
                });

                console.log(publishResult);

                // console.log(imageUpload);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    if (isLoading) {
        return <Loader message=" Updating Instagram Profile..." type="dots" />;
    }
    else {
        // console.log(feeds);
        return <Text color="green">Instagram Profile Updated!!</Text>

    }
}


export default InstagramPost