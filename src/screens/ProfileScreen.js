import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Globalstyles } from '../styles/GlobalStyle';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ProfileItem } from '../components/ProfileItem';
import { COLORS, SIZES } from '../constants';
import { Header } from '../components/Header';

const ProfileScreen = ({ navigation }) => {

    const [data, setData] = useState({})

    useEffect(() => {
        // getting data from database and listening for updates
        const subscriber = firestore()
            .collection('Users')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(doc => {
                setData(doc.data())
            });
        // Stop listening for updates when no longer required
        return () => subscriber();

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <View style={Globalstyles.container_2}>
                {/*logo */}
                <Image
                    source={require('../assets/logo.jpg')}
                    resizeMode='contain'
                    style={Globalstyles.logo} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <ProfileItem
                        label={"Username"}
                        value={data.name} />
                    <ProfileItem
                        label={"Email"}
                        value={data.email} />
                    <ProfileItem
                        label={"Intermediate"}
                        value={data.intermediate} />
                    <ProfileItem
                        label={"Interest Area"}
                        value={data.interest} />
                    <ProfileItem
                        label={"Score"}
                        value={data.score} />
                    <ProfileItem
                        label={"Percentage"}
                        value={data.percentage} />
                    <ProfileItem
                        label={
                            data.recommendedDept?.length == 1 ?
                                "Recommended Dept" :
                                "Recommended Depts"}
                        isArray={true}
                        value={data.recommendedDept} />

                    <Image
                        source={require('../assets/bottom-gif.gif')}
                        resizeMode='cover'
                        style={{
                            height: 200,
                            width: SIZES.width,
                            marginTop: 10,
                            alignSelf: 'center'
                        }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen;

