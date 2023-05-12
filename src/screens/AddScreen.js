import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { CategoryItem } from "../components/CategoryItem";
import { Globalstyles } from "../styles/GlobalStyle";
import { COLORS } from "../constants";
import { Add } from "../components/Add";
import Input from "../components/input";
import Question from "../components/Question";
import CustomButton from '../components/Button';
import { Errored } from "../utils/functions";
import { AdminStore } from "../store/admin";

const AddScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [num, setNum] = useState({ sub_categories: 1, questions: [0] })
    const [data, setData] = useState({
        category: route.params?.category,
        sub_categories: [route.params?.sub_category],
    })
    const [questions, setQuestions] = useState([{
        question: '',
        options: ['', '', ''],
        correct_option: '',
        wrong_option: '',
        neutral_option: '',
        category: data.category,
        sub_category: data.sub_categories[0]
    }])

    const onChange = (e, name, index) => {
        // for subcategories to set each subcategory at specific index
        if (index > -1) {
            let newData = { ...data }
            newData[name][index] = e
            console.log(newData, 'new')
            setData(newData)
        }
        // for category
        else
            setData({ ...data, [name]: e })

        console.log(data)
    };

    // function executed when any value in question is changed
    const onChangeQuestion = (e, name, index) => {
        let newData = [...questions]
        newData[index][name] = e
        console.log(newData, 'new')
        setQuestions(newData)
    }

    // function execueted when a new question is added
    const onChangeQuestionsNum = (value, sub_index) => {
        let newNum = { ...num }
        newNum.questions[sub_index] = value ? value + 1 : 1
        console.log(newNum, 'new num')
        setNum(newNum)

        let que_index = getIndex(sub_index, value ? value : 0)

        console.log(que_index, 'ques indexx')
        let ques = [...questions]
        ques[que_index] = {
            question: '',
            options: ['', '', ''],
            correct_option: '',
            wrong_option: '',
            neutral_option: '',
            category: data.category,
            sub_category: data.sub_categories[sub_index]
        }
        setQuestions(ques)
    }

    function getIndex(index1, index2) {
        if (index1) {
            let newArr = num.questions.slice(0, index1)
            console.log(newArr, 'newArray')
            let newIndex = newArr.reduce((a, b) => { return a + b }, 0)
            console.log(newIndex + index2, 'newIndex')
            return (newIndex + index2)
        }
        else
            return index2
    }

    const save = async () => {
        try {
            console.log(data, 'data')
            console.log(questions, 'questions')
            setLoading(true)
            // saving category and subcategories
            if (!route.params?.category && !route.params?.sub_category)
                await AdminStore.saveCategories(data, setLoading)

            // for adding new subcategory
            if (route.params?.sub_categories)
                await AdminStore.saveCategories(
                    {
                        category: data.category,
                        sub_categories: [
                            ...route.params?.sub_categories,
                            ...data.sub_categories],
                    }
                    , setLoading)

            // saving questions of each subcategory
            data.sub_categories.forEach((sub_category, index) => {
                if (sub_category) {
                    let sub_category_ques = questions
                        .filter((a => a.sub_category == sub_category))

                    AdminStore.saveQuestions(
                        data.category.trim() + "_" + sub_category.trim(),
                        route.params?.questions ?
                            [...route.params.questions, ...questions] :
                            sub_category_ques,
                        setLoading,
                        navigation,
                        index == data.sub_categories.length - 1)
                }
            })
        } catch (error) {
            Errored(error)
            setLoading(false)
        }
    }

    return (
        <View style={Globalstyles.container_2}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Input
                    name='category'
                    placeholder=' Category'
                    onChange={onChange}
                    disabled={route.params?.category}
                    value={data.category}
                />
                {
                    [...Array(num.sub_categories)].map((item, sub_index) => (
                        <View
                            key={sub_index}
                            style={{
                                padding: 5,
                                borderRadius: 20,
                                marginVertical: 10,
                                backgroundColor: COLORS.light
                            }}>
                            <Input
                                key={sub_index}
                                name='sub_categories'
                                placeholder='Sub Category'
                                onChange={onChange}
                                index={sub_index}
                                disabled={Boolean(route.params?.sub_category)}
                                value={data.sub_categories[sub_index]}
                            />
                            {
                                [...Array(num.questions[sub_index] ?
                                    num.questions[sub_index] : 0)]
                                    .map((item, q_index) => (
                                        <Question
                                            key={q_index}
                                            placeholder=' Question'
                                            onChange={onChangeQuestion}
                                            index={getIndex(sub_index, q_index)}
                                            style={{ marginLeft: 10, marginBottom: 10 }}
                                            question={questions[getIndex(sub_index, q_index)]
                                                ?.question}
                                            options={questions[getIndex(sub_index, q_index)]
                                                ?.options}
                                            correct_option={questions[getIndex(sub_index, q_index)]
                                                ?.correct_option}
                                            wrong_option={questions[getIndex(sub_index, q_index)]
                                                ?.wrong_option}
                                            neutral_option={questions[getIndex(sub_index, q_index)]
                                                ?.neutral_option}

                                        />

                                    ))
                            }
                            <Add
                                name='Add Question'
                                onPress={() =>
                                    onChangeQuestionsNum(
                                        num.questions[sub_index],
                                        sub_index)}
                                disabled={
                                    !data.sub_categories[sub_index] ||
                                    data.sub_categories[sub_index]?.length == 0}
                                style={{ marginTop: 20 }} />
                        </View>
                    ))
                }
                {console.log(num)}
                <Add name='Add Sub Category'
                    onPress={() => setNum({
                        ...num, sub_categories:
                            num.sub_categories + 1
                    })}
                    disabled={Boolean(route.params?.sub_category)}
                    style={{ marginTop: 20 }} />

                <CustomButton
                    text='Save'
                    loading={loading}
                    style={{
                        marginTop: 50
                    }}
                    onPressButton={save} />
            </ScrollView>
        </View>
    );

};



const styles = StyleSheet.create({

    main_heading: {
        fontSize: RFPercentage(3),
        alignSelf: 'center',
        marginVertical: 40,

    },

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

export default AddScreen;