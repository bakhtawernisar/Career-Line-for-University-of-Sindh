import React from "react";
import { Text, StyleSheet, TouchableOpacity, } from "react-native";
import { COLORS, SIZES, } from '../constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Add = ({ name, onPress, style, disabled }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            disabled={disabled}
            style={{
                ...styles.button,
                backgroundColor: disabled ? COLORS.dark_gray : COLORS.accent,
                ...style
            }}>
            <Text style={styles.button_text}>{name}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

    button: {
        width: "100%",
        padding: 15,
        marginTop: 50,
        alignSelf: 'center',
        backgroundColor: COLORS.accent,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button_text: {
        fontSize: RFPercentage(2.5),
        color: 'white',
        textAlign: 'center',
    }
})