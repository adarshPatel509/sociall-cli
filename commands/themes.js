import React from "react"
import { Text } from "ink"
import SelectInput from 'ink-select-input';
import PropTypes from 'prop-types';

const Themes = () => {
    const items = [
        { label: 'Full Name', value: 'name' },
        { label: 'UserName', value: 'username' },
        { label: 'Bio', value: 'bio' }
    ];
    return (
        <>
            <Box borderStyle="round" paddingLeft={1} width={51} borderColor="#00FFFF">
                <Text color="yellow">Select theme for the cli: </Text>
            </Box>
            <SelectInput items={items} onSelect={handleSelect} />
        </>
    );
}

Themes.prototype = {
    theme =  PropTypes.string
}

export default Themes