import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';
import Loader from '../utils/loader';
import { Octokit } from "@octokit/core";

const config = require('../config.json');
const octokit = new Octokit({ auth: config['access-token']['github'] });


/// Update Your Profile
const UpdateProfile = ({platform}) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
      octokit.request('GET /user')
      .then(res => {
          setUser(res.data);
          setLoading(false);
      })
      .catch(err => {
          console.log(err);
      });
  });
  
  if(isLoading) 
  {
    return <Loader message=" Loading..." type="point" />
  }
  else 
  {
    return (
      <Text> 
        {user.name} - {user.company} || {user.bio}
      </Text>
    );
  }
};

UpdateProfile.propTypes = {
  ///List of platforms to Profile Update
  platform: PropTypes.string.isRequired
};

UpdateProfile.shortFlags = {
  platform: 'pf'
};

export default UpdateProfile;
