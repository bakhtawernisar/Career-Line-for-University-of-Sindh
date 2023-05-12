import React from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { COLORS, SIZES, } from '../constants';

const CustomButton = ({ text, onPressButton, loading, disabled, style }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                ...styles.button,
                ...style,
                backgroundColor: disabled ? COLORS.dark_gray : COLORS.primary
            }}
            disabled={disabled}
            onPress={onPressButton} >
            {
                loading ?
                    <ActivityIndicator size={24} color={COLORS.white} /> :
                    <Text style={styles.button_text}>{text}</Text>
            }
        </TouchableOpacity>

    )
}

export default CustomButton;

const styles = StyleSheet.create({

    button: {
        width: '100%',
        padding: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius
    },

    button_text: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1.5
    }
})