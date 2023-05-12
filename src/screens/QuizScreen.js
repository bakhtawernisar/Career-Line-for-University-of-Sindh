import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Animated, ScrollView, } from 'react-native'
import { COLORS, SIZES } from '../constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/Button';
import { Errored } from '../utils/functions';
import { UserStore } from '../store/user';
import { Header } from '../components/Header';
import { Globalstyles } from '../styles/GlobalStyle';

const QuizScreen = ({ navigation, route }) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [negOption, setWrongOption] = useState(null);
    const [neutOption, setNeutOption] = useState(null);

    useEffect(() => {
        const { Category, Sub_Category } = route.params

        // getting data from database and listening for updates
        const subscriber = firestore()
            .collection('Questions')
            .doc(Category + "_" + Sub_Category)
            .onSnapshot(docSnapshot => {
                if (docSnapshot.exists) {
                    setAllQuestions([...allQuestions,
                    ...Object.values(docSnapshot.data())])
                }
            });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        let wrong_option = allQuestions[currentQuestionIndex]['wrong_option'];
        let neutral_option = allQuestions[currentQuestionIndex]['neutral_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setWrongOption(wrong_option);
        setNeutOption(neutral_option);
        setIsOptionsDisabled(true);

        // Set Score
        if (selectedOption == correct_option) {
            setScore(score + 1)
        } else if (selectedOption == wrong_option) {
            setScore(score + 0)
        } else {
            setScore(score + 0.5)
        }
        // Show Next Button
        setShowNextButton(true)
    }

    const save = async () => {
        try {
            setLoading(true)
            const percentage = (score / allQuestions.length) * 100
            const recommendedDept = await UserStore.getRecommendedDept(route.params.Category, route.params.Sub_Category, percentage, setLoading)

            console.log(recommendedDept, 'recommended')

            await UserStore.saveScore(
                {
                    score: `${score}/${allQuestions.length}`,
                    percentage: `${percentage}%`,
                    recommendedDept: recommendedDept,
                    intermediate: route.params.Category,
                    interest: route.params.Sub_Category
                },
                navigation,
                setLoading)

        } catch (error) {
            Errored(error)
            setLoading(false)
        }
    }

    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            save()

        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setWrongOption(null);
            setNeutOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 30
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        color: COLORS.black,
                        fontSize: 20,
                        opacity: 0.6,
                        marginRight: 2
                    }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{
                        color: COLORS.black,
                        fontSize: 18,
                        opacity: 0.6
                    }}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={Globalstyles.main_heading}>
                    {allQuestions[currentQuestionIndex]?.question}
                </Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]
                        ?.options.map((option, index) => (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => validateAnswer(option)}
                                disabled={isOptionsDisabled}
                                key={index}
                                style={{
                                    borderWidth: 3,
                                    borderColor:
                                        option == currentOptionSelected ?
                                            COLORS.light_blue :
                                            COLORS.secondary + '60',
                                    backgroundColor: COLORS.secondary + '30',
                                    height: 55,
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    marginVertical: 10
                                }}>
                                <Text style={{
                                    fontSize: RFPercentage(2),
                                    color: COLORS.black
                                }}>{option}</Text>

                            </TouchableOpacity>
                        ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <CustomButton
                    text='Next'
                    loading={loading}
                    style={{
                        marginTop: 40,

                    }}
                    onPressButton={handleNext} />
            )
        } else {
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })

    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',
            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                }, { width: progressAnim }]}>
                </Animated.View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={{
                    paddingTop: 40,
                    height: SIZES.height - 50,
                }}>
                    <View style={{ paddingHorizontal: 16, }}>
                        {/* ProgressBar */}
                        {renderProgressBar()}

                        {/* Question */}
                        {renderQuestion()}

                        {/* Options */}
                        {renderOptions()}

                        {/* Next Button */}
                        {renderNextButton()}

                    </View>

                    {/*Background Image*/}
                    <Image
                        source={require('../assets/DottedBG.png')}
                        style={{
                            width: SIZES.width,
                            height: 100,

                        }}
                        resizeMode={'cover'}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default QuizScreen;
