import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Loader from '../../utils/loader';
import { UncontrolledTextInput } from 'ink-text-input';
import InstagramPost from "./InstagramPost"

const InstagramPostData = () => {
  const [postData, setPostData] = useState({
    path: "",
    bio: ""
  })

  function handlePathSubmit(newValue) {
    setPostData({
      ...postData,
      path: newValue
    })
  }

  function handleBioSubmit(newValue) {
    setPostData({
      ...postData,
      bio: newValue
    })
  }

  if (postData.path == "") {
    return (
      <Box width="100%">
        <Box marginRight={1} flexDirection="column">
          <Text>Enter Picture Path :</Text>
        </Box>
        <UncontrolledTextInput onSubmit={handlePathSubmit} />
      </Box>
    );
  }
  else if (postData.bio == "") {
    return (
      <Box width="100%">
        <Box marginRight={1} flexDirection="column">
          <Text>Enter Post Description :</Text>
        </Box>
        <UncontrolledTextInput onSubmit={handleBioSubmit} />
      </Box>
    );
  }
  else {
    return <InstagramPost data={postData} />
  }
}

export default InstagramPostData