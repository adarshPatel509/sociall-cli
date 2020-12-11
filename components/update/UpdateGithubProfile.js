import React, { useState, useEffect } from 'react';
import { Text } from 'ink';
import Loader from '../../utils/loader.js';
import { octokit } from '../../utils/api-clients';
const th = require('../../themes.json')


/**
    Update Github Profile
    Api Ref: https://docs.github.com/en/rest/reference/users#update-the-authenticated-user
 */
const UpdateGithubProfile = (props) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      octokit.request('PATCH /user', props.updateObj)
      .then(res => {
          setLoading(false);
      })
      .catch(err => {
          console.log(err);
      });
  }, []);
  
  if(isLoading) {
    return <Loader message=" Updating Github Profile..." type="dots" />;
  }
  return <Text>Github Profile Updated!!</Text>
}

export default UpdateGithubProfile;