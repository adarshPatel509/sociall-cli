import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';
import TwitterPost from "./TwitterPost"

const TwitterPostData = () => {
    const [postData,setPostData] = useState("")

    function handleSubmit(newValue) {
        setPostData(newValue)
    }
    

    if(postData == "")
    {
        return (
            <Box width="100%">
              <Box marginRight={1}  flexDirection="column">
                <Text>Enter Tweet Info :</Text>
              </Box>
              <UncontrolledTextInput onSubmit={handleSubmit} />
            </Box>
          );
    }
    else
    {
        return <TwitterPost status = {postData} />
    }
}

export default TwitterPostData