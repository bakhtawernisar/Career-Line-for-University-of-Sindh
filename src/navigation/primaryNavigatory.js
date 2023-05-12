import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import ComponentsScreen from '../screens/ComponentsScreen';
import ImageScreen from '../screens/ImageScreen';
import InterestScreen from '../screens/InterestScreen';
import QuizScreen from '../screens/QuizScreen';
import FieldScreen from '../screens/FieldScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuestionsScreen from '../screens/QuestionsScreen';

const Stack = createStackNavigator();


export const PrimaryNavigatory = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators
                        .forScaleFromCenterAndroid
                }}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='Components' component={ComponentsScreen} />
                <Stack.Screen name='Image' component={ImageScreen} />
                <Stack.Screen name='Interest' component={InterestScreen} />
                <Stack.Screen name='Quiz' component={QuizScreen} />
                <Stack.Screen name='Field' component={FieldScreen} />
                <Stack.Screen name='Add' component={AddScreen} />
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='Questions' component={QuestionsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

