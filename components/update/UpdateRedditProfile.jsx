import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader.js';
import { reddit } from '../../utils/api-clients';
const fs = require("fs")
const config = require("../../config.json")
/** 
    Update Twitter Profile
    Api ref: https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-settings
 */
const UpdateRedditProfile = (props) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (Object.keys(props.updateObj)[0] == "profile_photo") {
            const post_path = "u_" + config['reddit']['username'] + "/api/upload_sr_img"
            const b64content = fs.readFileSync(props.updateObj.profile_photo, { encoding: 'base64' });
            reddit.post(post_path, {header:0, upload_type: "img", img_type: "jpg", "file": b64content,name:config.github.username })
                .then(() => {
                    console.log("Safe");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            if (props.updateObj.bio) {
                props.updateObj['description'] = props.updateObj.bio;
                delete props.updateObj.bio;
            }
            twit.post('account/update_profile', props.updateObj)
                .then(res => {
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    if (isLoading) {
        return <Loader message=" Updating Reddit Profile..." type="dots" />;
    }
    return <Text color="greenBright">Twitter Profile Updated!!</Text>;
}

export default UpdateRedditProfile;