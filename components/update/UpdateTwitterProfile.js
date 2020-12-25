import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader.js';
import { twit } from '../../utils/api-clients';


/** 
    Update Twitter Profile
    Api ref: https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-settings
 */
const UpdateTwitterProfile = (props) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(Object.keys(props.updateObj)[0] == "profile_photo")
    {
        twit.post('account/update_profile_image',props.updateObj.profile_photo)
        .then(res => {
          console.log(res);
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
    else
    {
      if(props.updateObj.bio) {
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
   
  if(isLoading) {
    return <Loader message=" Updating Twitter Profile..." type="dots" />;
  }
  return <Text color="greenBright">Twitter Profile Updated!!</Text>;
}

export default UpdateTwitterProfile;