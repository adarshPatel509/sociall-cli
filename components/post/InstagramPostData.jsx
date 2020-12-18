import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import Link from 'ink-link';
import { UncontrolledTextInput } from 'ink-text-input';
import Loader from '../../utils/loader';
import { ig } from "../../utils/api-clients"
import InstagramPost from "./InstagramPost"

const InstagramPostData = () => {
    const [postData,setPostData] = useState({
        name:"",
        description:""
    })

    function handleNameSubmit(newValue) {
        setPostData({
            ...postData,
            name:newValue
        })
    }

    function handleDescriptionSubmit(newValue) {
        setPostData({
            ...postData,
            description:newValue
        })
    }

    if(postData.name == "")
    {
        return (
            <Box width="100%">
              <Box marginRight={1}  flexDirection="column">
                <Text>Enter Repo Name :</Text>
              </Box>
              <UncontrolledTextInput onSubmit={handleNameSubmit} />
            </Box>
          );
    }
    else if(postData.description == "")
    {
        return (
            <Box width="100%">
              <Box marginRight={1}  flexDirection="column">
                <Text>Enter Repo Description :</Text>
              </Box>
              <UncontrolledTextInput onSubmit={handleDescriptionSubmit} />
            </Box>
          );
    }
    else
    {
        return <GithubPost data = {postData} />
    }
}

export default InstagramPostData