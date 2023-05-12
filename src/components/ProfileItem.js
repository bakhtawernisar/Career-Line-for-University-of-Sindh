import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLORS, SIZES, } from '../constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const ProfileItem = ({ label, value, isArray, style }) => {

    return (
        <View style={{
            flexDirection: 'row',
            // alignItems: 'center',
            marginTop: 10,
        }}>
            <Text style={styles.label}>{label} : </Text>
            {isArray ?
                <View>{
                    value?.map((item, index) => (
                        <Text
                            key={index}
                            style={{
                                ...styles.value,
                                textTransform: 'capitalize'
                            }}>{item}{index == value.length - 1 ? '' : ','}</Text>
                    ))
                }
                </View> :
                <Text style={styles.value}>{value}</Text>
            }
        </View>

    )
}

const styles = StyleSheet.create({

    label: {
        fontSize: RFPercentage(2.5),
        color: COLORS.black,
    },

    value: {
        fontSize: RFPercentage(2.5),
        color: COLORS.primary,
        fontWeight: 'bold'
    }
})