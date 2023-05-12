import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, StatusBar, Alert, } from "react-native";
import { COLORS, SIZES, } from '../constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AuthStore } from "../store/auth";

export const Header = ({ navigation }) => {

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 5,
            backgroundColor: COLORS.primary
        }}>
            <StatusBar
                backgroundColor={COLORS.primary}
                barStyle='light-content' />
            <TouchableOpacity
                activeOpacity={0.5}
                style={{ padding: 10 }}
                onPress={() => navigation.goBack()}>
                <Image
                    source={require('../assets/arrow-back.png')}
                    resizeMode='contain'
                    style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={{ padding: 10 }}
                onPress={() => Alert
                    .alert('Alert', 'Do you want to logout',
                        [{
                            text: 'Yes',
                            onPress: () => AuthStore.logout(navigation)
                        },
                        { text: 'No' }])}>
                <Image source={require('../assets/logout.png')}
                    resizeMode='contain'
                    style={{
                        height: 30,
                        width: 30,
                        tintColor: 'white'
                    }} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({

    img: {
        height: 20,
        width: 20,
        tintColor: 'white'
    },


})