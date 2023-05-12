import { action, makeObservable, observable, runInAction, } from "mobx";
import auth, { firebase } from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Errored } from "../utils/functions"

class Auth {
    isAdmin = false
    isLogin = false
    testTaken = false
    constructor() {
        makeObservable(this, {
            isAdmin: observable,
            isLogin: observable,
            testTaken: observable,
            signIn: action,
            signUp: action,
            getStatus: action
        })
    }

    signIn = async (values, navigation, setLoading) => {

        // for admin
        if (values.email === 'admin@gmail.com' && values.password === 'admin123') {
            runInAction(() => this.isAdmin = true)
            AsyncStorage.setItem('isAdmin', JSON.stringify(true))
        }

        try {
            let response = await auth()
                .signInWithEmailAndPassword(values.email, values.password)

            if (response && response.user) {
                const documentSnapshot = await firestore()
                    .collection('Users')
                    .doc(firebase.auth().currentUser.uid)
                    .get();
                // if user has already taken test
                // navigate to profile screen
                if (documentSnapshot.data().recommendedDept &&
                    documentSnapshot.data().score) {
                    setLoading(false)
                    runInAction(() => this.isLogin = true)
                    AsyncStorage.setItem('isLogin', JSON.stringify(true))
                    AsyncStorage.setItem('testTaken', JSON.stringify(true))
                    navigation.replace('Profile')
                }
                else {
                    setLoading(false)
                    runInAction(() => this.isLogin = true)
                    AsyncStorage.setItem('isLogin', JSON.stringify(true))
                    navigation.replace('Field')
                }
            }
        } catch (e) {
            Errored(e)
            setLoading(false)
        }
    }

    signUp = async (values, navigation, setLoading) => {

        try {
            let response = await auth()
                .createUserWithEmailAndPassword(values.email, values.password)

            if (response) {
                // get user id after sign up
                let uid = firebase.auth().currentUser.uid;
                // save user information in database with that id
                if (uid) {
                    firestore()
                        .collection('Users')
                        .doc(uid)
                        .set({
                            id: uid,
                            name: values.name,
                            email: values.email,
                        })
                        .then(() => {
                            setLoading(false)
                            navigation.navigate('SignIn')
                        })
                        .catch((e) => {
                            Errored(e)
                            setLoading(false)
                        })
                }
            }
        } catch (e) {
            Errored(e)
            setLoading(false)
        }
    }

    logout = async (navigation) => {
        try {
            await firebase.auth().signOut();
            AsyncStorage.clear()
            navigation.replace('SignIn')
        } catch (e) {
            Errored(e)
        }
    }

    getStatus = async () => {
        let admin = await AsyncStorage.getItem('isAdmin');
        let login = await AsyncStorage.getItem('isLogin');
        let test = await AsyncStorage.getItem('testTaken');
        runInAction(() => {
            this.isAdmin = JSON.parse(admin)
            this.isLogin = JSON.parse(login)
            this.testTaken = JSON.parse(test)
        })
    }
}

export const AuthStore = new Auth();