import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Globalstyles } from '../styles/GlobalStyle';
import CustomButton from '../components/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthStore } from '../store/auth';


// validation schema for signup form
const signUpSchema = yup.object({
    name: yup.string()
        .label('Name')
        .required()
        .min(3),

    email: yup.string()
        .label('Email')
        .required()
        .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email address is not valid"),

    password: yup.string()
        .label('Password')
        .required()
        .min(6),
});

const SignUp = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
            <View style={Globalstyles.container_2}>
                {/* Logo */}
                <Image
                    source={require('../assets/logo.jpg')}
                    resizeMode='contain'
                    style={Globalstyles.logo} />
                <ScrollView >
                    {/* signup form */}
                    <Formik
                        initialValues={{ name: '', email: '', password: '', }}
                        validationSchema={signUpSchema}
                        onSubmit={(values) => {
                            setLoading(true)
                            AuthStore.signUp(values, navigation, setLoading)
                        }}>
                        {(props) => (
                            <View>
                                {/* name field */}
                                <TextInput
                                    style={Globalstyles.input}
                                    placeholder=' Name'
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                    onBlur={props.handleBlur('name')} />
                                {props.touched.name && props.errors.name && (
                                    <Text style={Globalstyles.errorText}>
                                        {props.errors.name}
                                    </Text>
                                )}

                                {/* email field */}
                                <TextInput
                                    style={Globalstyles.input}
                                    placeholder=' Email'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    onBlur={props.handleBlur('email')} />
                                {props.touched.email && props.errors.email && (
                                    <Text style={Globalstyles.errorText}>
                                        {props.errors.email}
                                    </Text>
                                )}

                                {/* password field */}
                                <TextInput
                                    style={Globalstyles.input}
                                    placeholder=' Password'
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    secureTextEntry
                                    onBlur={props.handleBlur('password')} />
                                {props.touched.password && props.errors.password && (
                                    <Text style={Globalstyles.errorText}>
                                        {props.errors.password}
                                    </Text>
                                )}

                                {/* signup button */}
                                <CustomButton
                                    text='Sign Up'
                                    loading={loading}
                                    style={{
                                        marginTop: 50
                                    }}
                                    onPressButton={props.handleSubmit} />


                            </View>
                        )}
                    </Formik>

                    {/* signin hyperlink */}
                    <View style={Globalstyles.hyperlink_container}>
                        <Text style={Globalstyles.account_text}>
                            Already have a account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}>
                            <Text style={Globalstyles.hyperlink_text}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        </TouchableWithoutFeedback >


    )
}

export default SignUp;
