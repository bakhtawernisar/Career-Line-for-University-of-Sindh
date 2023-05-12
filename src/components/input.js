import React from 'react'
import { TextInput } from 'react-native'
import { FONTS, COLORS, SIZES } from '../theme'
import { Globalstyles } from "../styles/GlobalStyle";

const Input = ({ placeholder, value, name, disabled, onChange, index, style, }) => {
    return (
        <TextInput
            style={{
                ...style,
                ...Globalstyles.input
            }}
            placeholder={placeholder}
            value={value}
            editable={!disabled}
            onChangeText={e => onChange(e, name, index)}
        />
    )
}

export default Input