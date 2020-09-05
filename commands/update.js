import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';
import Loader from '../utils/loader';
import { octokit, twit } from '../utils/api-clients';


/** 
    Update Twitter Profile
    Api ref: https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-settings
 */
const UpdateTwitterProfile = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    twit.post('account/update_profile', {name: "Adarsh Patel"})
    .then(res => {
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
  });
   
  if(isLoading) {
    return <Loader message=" Updating Twitter Profile..." type="dots" />;
  }
  return <Text> Profile Updated!! </Text>;
}

/**
    Update Github Profile
    Api Ref: https://docs.github.com/en/rest/reference/users#update-the-authenticated-user
 */
const UpdateGithubProfile = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
      octokit.request('PATCH /user', {twitter_username: '@adarshpatel509'})
      .then(res => {
          setUser(res.data);
          setLoading(false);
      })
      .catch(err => {
          console.log(err);
      });
  });
  
  if(isLoading) {
    return <Loader message=" Updating Github Profile..." type="dots" />;
  }
  return <Text> Profile Updated!! </Text>
}

/// Update Your Profile
const UpdateProfile = ({platform}) => {
  if(platform.includes('github')) {
    return <UpdateGithubProfile />;
  }
  else if(platform.includes('twitter')) {
    return <UpdateTwitterProfile />;
  }
  return <Text>Hello, {platform} </Text>;
};

UpdateProfile.propTypes = {
  ///List of platforms to Profile Update
  platform: PropTypes.string.isRequired
};

UpdateProfile.shortFlags = {
  platform: 'pf'
};

export default UpdateProfile;
