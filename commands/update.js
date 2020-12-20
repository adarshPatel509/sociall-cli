import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { UncontrolledTextInput } from 'ink-text-input';
import UpdateGithubProfile from '../components/update/UpdateGithubProfile';
import UpdateInstagramProfile from '../components/update/UpdateInstagramProfile';
import UpdateTwitterProfile from '../components/update/UpdateTwitterProfile';

/// Update Your Profile
const UpdateProfile = ({ platform }) => {
  const [updateField, setField] = useState('');
  const [newValue, setValue] = useState('');

  const items = [
    { label: 'Full Name', value: 'name' },
    { label: 'UserName', value: 'username' },
    { label: 'Bio', value: 'bio' },
    { label : "Profile Photo" , value : 'profile_photo'}
  ];

  const handleSelect = (item) => {
    setField(item.value);
  };

  const handleSubmit = (newValue) => {
    const updateObj = { [updateField]: newValue };
    setValue(updateObj);
  }

  if (updateField === '') {
    return (
      <>
        <Box borderStyle="round" paddingLeft={1} width={51} borderColor="#00FFFF">
          <Text color="yellow">Select the profile section to Update: </Text>
        </Box>
        <SelectInput items={items} onSelect={handleSelect} />
      </>
    );
  }
  else if (newValue === '') {
    return (
      <Box width="100%">
        <Box marginRight={1}>
          <Text>Enter new {updateField}:</Text>
        </Box>
        <UncontrolledTextInput onSubmit={handleSubmit} />
      </Box>
    );
  }
  else {
    if (platform.includes('all')) {
      return (
        <>
          <UpdateGithubProfile updateObj={newValue} />
          <UpdateTwitterProfile updateObj={newValue} />
          <UpdateInstagramProfile updateObj={newValue} />
        </>
      );
    }
    if (platform.includes('github')) {
      return <UpdateGithubProfile updateObj={newValue} />;
    }
    else if (platform.includes('twitter')) {
      return <UpdateTwitterProfile updateObj={newValue} />;
    }
    else if (platform.includes('instagram')) {
      return <UpdateInstagramProfile updateObj={newValue} />
    }
    return <Text color='red'>Please enter valid platform name!!</Text>;
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
