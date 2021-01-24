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
const UpdateInstagramProfile = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const auth = await ig.account.login(config['instagram']['username'], config['instagram']['password']);
        const user = await ig.account.currentUser()
        const { external_url, gender, phone_number, username, first_name, email, biography } = user
        var key = Object.keys(props.updateObj)[0];
        var fkey = key
        if (key == "profile_photo") {
          const path = props.updateObj[fkey]
          const imageUpload = await ig.account.changeProfilePicture(await readFileAsync(path))
        }
        else {
          if (key == "name") {
            key = "first_name"
          }
          else if (key == "bio") {
            key = "biography"
          }
          const items = await ig.account.editProfile({
            external_url: external_url,
            gender: gender,
            phone_number: phone_number,
            username: username,
            first_name: first_name,
            biography: biography,
            email: email,
            [key]: props.updateObj[fkey]
          });
        }
        setLoading(false)
      } catch (e) {
        setErr(false);
        console.log(e);
      }
    })();
  }, []);

  if (isErr) {
    return <Text color="red">Please update your Profile later!!</Text>
  }
  else if (isLoading) {
    return <Loader message=" Updating Instagram Profile..." type="dots" />;
  }
  else {
    return <Text color="green">Instagram Profile Updated!!</Text>

  }
}

export default UpdateInstagramProfile;