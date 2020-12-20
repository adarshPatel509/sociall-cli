import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';
import RedditPost from "./RedditPost"

const RedditPostData = () => {
    const [postData,setPostData] = useState({sr:"",title:"",text:""})

    function handleSrSubmit(newValue) {
        setPostData({
            ...postData,
            sr:newValue
        })
    }
    
    function handleTitleSubmit(newValue) {
        setPostData({
            ...postData,
            title:newValue
        })
    }
    
    function handleTextSubmit(newValue) {
        setPostData({
            ...postData,
            text:newValue
        })
    }

    if(postData.sr == "")
    {
        return (
            <Box width="100%">
              <Box marginRight={1}  flexDirection="column">
                <Text>Enter subreddit :</Text>
                <Text dimColor>Please enter the subreddit name as "r/example</Text>
              </Box>
              <UncontrolledTextInput onSubmit={handleSrSubmit} />
            </Box>
          );
    }
    else if(postData.title == "")
    {
        return (
            <Box width="100%">
              <Box marginRight={1}  flexDirection="column">
                <Text>Enter Title for the post :</Text>
              </Box>
              <UncontrolledTextInput onSubmit={handleTitleSubmit} />
            </Box>
          );
    }
    else if(postData.text == "")
    {
        return (
            <Box width="100%">
              <Box marginRight={1}  flexDirection="column">
                <Text>Enter content for the post :</Text>
              </Box>
              <UncontrolledTextInput onSubmit={handleTextSubmit} />
            </Box>
          );
    }
    else
    {
        return <RedditPost postdata = {postData} />
    }
}

export default RedditPostData