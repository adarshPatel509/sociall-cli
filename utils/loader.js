import React, { useState, useEffect } from 'react';
import {Text} from 'ink';
import Spinner from 'ink-spinner';
const th = require('../themes.json')

/**
    Custom Loader component
    Refer this for different 'type' values: 
    https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
 */
const Loader = ({message, type}) => {
  return (
    <Text>
        <Text color="green">
            <Spinner type={type} />
            {message}
        </Text>
      </Text>
  );
}

export default Loader;
