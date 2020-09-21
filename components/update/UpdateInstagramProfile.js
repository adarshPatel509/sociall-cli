import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader.js';
import { ig } from '../../utils/api-clients';


/**
    Update Instagram Profile
    Api ref: https://github.com/jlobos/instagram-web-api#updateprofileparams
 */
const UpdateInstagramProfile = (props) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ig.login()
    .then(() => {
      ig.getProfile()
      .then(res => {
        const profile = res;
        ig.updateProfile({
          'name': 'Mr. X',
          'email': profile.email,
          'username': profile.username,
          'phone_number': profile.phone_number,
          'gender': profile.gender,
        })
        .then(res => {
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  });

  if(isLoading) {
    return <Loader message=" Updating Instagram Profile..." type="dots" />;
  }
  return <Text>Instagram Profile Updated!!</Text>
}

export default UpdateInstagramProfile;