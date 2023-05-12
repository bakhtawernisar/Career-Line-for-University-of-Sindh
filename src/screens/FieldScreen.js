import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { CategoryItem } from "../components/CategoryItem";
import { Globalstyles } from "../styles/GlobalStyle";
import firestore from '@react-native-firebase/firestore';
import { Observer } from "mobx-react";
import { AuthStore } from "../store/auth";
import { COLORS } from "../constants";
import { Add } from "../components/Add";
import { Header } from "../components/Header";


const FieldScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        // getting data from database and listening for updates
        const subscriber = firestore()
            .collection('Categories')
            .onSnapshot(querySnapshot => {
                let data = []
                querySnapshot.docs.forEach((doc) => {
                    data.push(doc.data())
                })
                setData(data)
                data = []
            });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <View style={Globalstyles.container_2}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={Globalstyles.main_heading}>
                        What's your intermediate status?
                    </Text>
                    {
                        data.map((item, index) => (
                            <CategoryItem
                                key={index}
                                name={item.Category}
                                onPress={() => navigation.navigate('Interest',
                                    { Category: item.Category })} />
                        ))
                    }
                    <Observer>
                        {() =>
                            AuthStore.isAdmin ?
                                <Add name="Add Category"
                                    onPress={() => navigation.navigate('Add')} /> :
                                <Image
                                    source={require('../assets/book.gif')}
                                    style={{
                                        width: "100%",
                                        height: 190,
                                        marginTop: 60
                                    }}
                                    resizeMode={'contain'}
                                />
                        }
                    </Observer>
                </ScrollView>
            </View>
        </SafeAreaView>
    );

};



const styles = StyleSheet.create({


    button: {
        width: "100%",
        padding: 15,
        marginTop: 50,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: COLORS.primary + '60',
        backgroundColor: COLORS.primary + '30',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button_text: {
        fontSize: RFPercentage(2.5),
        color: 'black',
        textAlign: 'center',
    }

});

export default FieldScreen;