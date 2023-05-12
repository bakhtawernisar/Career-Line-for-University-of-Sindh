import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { COLORS, SIZES, } from '../constants';
import { AuthStore } from "../store/auth";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { observer } from "mobx-react";
import { AdminStore } from "../store/admin";

export const CategoryItem = observer(({ name, onPress, category,
    isQuestion, isSubcategory, deleteQues }) => {

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
        }}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPress}
                style={styles.button}>
                <Text style={styles.button_text}>{name}</Text>
            </TouchableOpacity>
            {
                AuthStore.isAdmin &&
                // delete icon
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => isQuestion ?
                        deleteQues(name) :
                        AdminStore.deleteCategory(name, category, isSubcategory)}
                    style={{
                        padding: 5,
                        marginLeft: 10,
                    }}>
                    <Image
                        source={require('../assets/delete.png')}
                        resizeMode='contain'
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: 'red'

                        }} />
                </TouchableOpacity>

            }
        </View>

    )
})

const styles = StyleSheet.create({

    button: {
        flex: 1,
        padding: 15,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: COLORS.secondary + '60',
        backgroundColor: COLORS.secondary + '30',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    button_text: {
        fontSize: RFPercentage(2),
        color: 'black',
        textAlign: 'center'
    }
})