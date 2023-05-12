import firestore, { firebase } from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import { Errored } from "../utils/functions";

class Admin {

    saveCategories = async (data, setLoading) => {
        try {
            firestore()
                .collection('Categories')
                .doc(data.category.trim())
                .set({
                    Category: data.category.trim(),
                    SubCategories: data.sub_categories
                }, { merge: true })
                .then(() => setLoading(false))
        } catch (e) {
            Errored(e)
            setLoading(false)
        }
    }

    saveQuestions = async (id, data, setLoading, navigation, isLast) => {
        console.log(id, data, 'ques')
        try {
            firestore()
                .collection('Questions')
                .doc(id)
                .set({ ...data })
                .then(() => isLast ?
                    (setLoading(false),
                        navigation.goBack())
                    : {})
        } catch (e) {
            Errored(e)
            setLoading(false)
        }
    }

    deleteCategory = async (name, category, isSubcategory) => {
        try {
            // for deleting specific subcategory
            if (isSubcategory) {
                firestore()
                    .collection('Categories')
                    .doc(category)
                    .update({
                        SubCategories:
                            firebase.firestore.FieldValue.arrayRemove(name)
                    })
                    .then(() => {
                        ToastAndroid.show('Deleted', ToastAndroid.SHORT)
                    });
            }
            // for deleting specific category
            else {
                firestore()
                    .collection('Categories')
                    .doc(name)
                    .delete()
                    .then(() => ToastAndroid.show('Deleted', ToastAndroid.SHORT));
            }
        } catch (e) {
            Errored(e)
        }
    }

    deleteQuestion = async (id, data) => {
        try {
            // for deleting specific subcategory
            firestore()
                .collection('Questions')
                .doc(id)
                .set({ ...data })
                .then(() => ToastAndroid.show('Deleted', ToastAndroid.SHORT))
        } catch (e) {
            Errored(e)
        }
    }

}

export const AdminStore = new Admin();