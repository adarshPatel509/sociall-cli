import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';

/// Greet command
const Hello = ({ name }) => {
	// shell.exec("sociall-cli notifications -p=github | at -m now ");
	return <Text>Hello , {name}</Text>
};

Hello.propTypes = {
	/// Name of the person to greet
	name: PropTypes.string
};

export default Hello;
