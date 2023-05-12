import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { RFPercentage, } from "react-native-responsive-fontsize";
import { CategoryItem } from "../components/CategoryItem";
import firestore from '@react-native-firebase/firestore';
import { Globalstyles } from "../styles/GlobalStyle";
import { AdminStore } from "../store/admin";
import { Header } from "../components/Header";
import { Add } from "../components/Add";

const QuestionsScreen = ({ navigation, route }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const { Category, Sub_Category } = route.params

        // getting data from database and listening for updates
        const subscriber = firestore()
            .collection('Questions')
            .doc(Category + "_" + Sub_Category)
            .onSnapshot(docSnapshot => {
                if (docSnapshot.exists) {
                    setData([...data,
                    ...Object.values(docSnapshot.data())])
                }
            });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    function deleteQues(question) {
        const newData = data.filter(a => a.question != question)
        let id = route.params.Category.trim() + "_" + route.params.Sub_Category.trim()
        AdminStore.deleteQuestion(id, newData)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <View style={Globalstyles.container_2}>
                <Text style={Globalstyles.main_heading}>Questions</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        data.map((item, index) => (
                            <CategoryItem
                                key={index}
                                name={item.question}
                                isQuestion={true}
                                deleteQues={deleteQues}
                            />
                        ))
                    }
                    <Add name='Add Question'
                        onPress={() =>
                            navigation.navigate('Add',
                                {
                                    category: route.params.Category,
                                    sub_category: route.params.Sub_Category,
                                    questions: data
                                })} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );

};


export default QuestionsScreen;