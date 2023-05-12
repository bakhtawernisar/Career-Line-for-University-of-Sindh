import { firebase } from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Errored } from "../utils/functions";

class User {

    getRecommendedDept = async (category, sub_category, percentage, setLoading) => {
        let recommended = '';

        console.log(category, sub_category, percentage, 'cat')
        try {
            const querySnapshot = await firestore()
                .collection('Departments')
                .get();

            querySnapshot.docs.forEach((doc) => {
                if (doc.data()?.category?.toLowerCase() == category?.toLowerCase() &&
                    doc.data()?.sub_category?.toLowerCase() == sub_category?.toLowerCase()) {
                    console.log(doc.data())
                    if (percentage >= 50) {
                        console.log(doc.data().high, 'high')
                        recommended = doc.data().high
                    }
                    else {
                        console.log(doc.data().low, 'low')
                        recommended = doc.data().low
                    }
                }

            })


        } catch (e) {
            Errored(e)
            setLoading(false)
        }

        console.log(recommended, 'func recommended')
        return recommended
    }

    saveScore = async (data, navigation, setLoading) => {
        let uid = firebase.auth().currentUser.uid;
        try {
            firestore()
                .collection('Users')
                .doc(uid)
                .set(data, { merge: true })
                .then(() => {
                    setLoading(false)
                    AsyncStorage.setItem('testTaken', JSON.stringify(true))
                    navigation.replace('Profile')
                })
                .catch((e) => {
                    Errored(e)
                    setLoading(false)
                })
        } catch (e) {
            Errored(e)
            setLoading(false)
        }
    }

}

export const UserStore = new User();