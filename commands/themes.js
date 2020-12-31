import React, { useState } from "react"
import { Text, Box } from "ink"
import SelectInput from 'ink-select-input';
import PropTypes from 'prop-types';
const fs = require("fs")
const th = require('../themes.json')

const Themes = () => {
    const [updateField, setField] = useState("");

    const items = [
        { label: 'Default', value: 'default' },
        { label: 'Solarized Dark', value: 'sol_dark' },
        { label: 'Solarized Light', value: 'sol_light' },
        { label: 'Papercolor', value: 'papercolor' },
        { label: 'Molokai', value: 'molokai' },
    ];

    const handleSelect = (item) => {
        setField(item.value);
    };

    if (updateField === '') {
        return (
            <>
                <Box borderStyle="round" paddingLeft={1} width={51} borderColor="#00FFFF">
                    <Text color="yellow">Select theme for the cli: </Text>
                </Box>
                <SelectInput items={items} onSelect={handleSelect} />
            </>
        );
    }
    else {
        th.current = updateField
        fs.writeFile('themes.json',JSON.stringify(th), function writeJSON(err) {
            if (err) return console.log(err);
          })
        return <Text color='red'>Theme Updated to <Text>{updateField}</Text> !!</Text>;

    }

}


export default Themes