import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';

/// Greet command
const Hello = ({name}) => {
  return <Text>Hello, {name} </Text>;
};

Hello.propTypes = {
	/// Name of the person to greet
	name: PropTypes.string
};

export default Hello;
