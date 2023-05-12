import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { CategoryItem } from "../components/CategoryItem";
import firestore from '@react-native-firebase/firestore';
import { Globalstyles } from "../styles/GlobalStyle";
import { Observer } from "mobx-react";
import { AuthStore } from "../store/auth";
import { Add } from "../components/Add";
import { Header } from "../components/Header";

const InterestScreen = ({ navigation, route }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        // getting data from database and listening for updates
        const subscriber = firestore()
            .collection('Categories')
            .doc(route.params.Category)
            .onSnapshot((doc) => {
                setData(doc.data().SubCategories)
            })

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <View style={Globalstyles.container_2}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={Globalstyles.main_heading}>
                        What's your area of interest?
                    </Text>
                    <Observer>{() =>
                        data.map((item, index) => (

                            <CategoryItem
                                key={index}
                                name={item}
                                isSubcategory={true}
                                category={route.params.Category}
                                onPress={() => AuthStore.isAdmin ?
                                    navigation.navigate('Questions', {
                                        Category: route.params.Category,
                                        Sub_Category: item.trim()
                                    })
                                    :
                                    navigation.navigate('Quiz', {
                                        Category: route.params.Category,
                                        Sub_Category: item.trim()
                                    })} />

                        ))

                    }</Observer>
                    <Observer>
                        {() =>
                            AuthStore.isAdmin ?
                                <Add name="Add Sub Category"
                                    onPress={() =>
                                        navigation.navigate('Add',
                                            {
                                                category: route.params.Category,
                                                sub_categories: data
                                            })} /> :
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


export default InterestScreen;