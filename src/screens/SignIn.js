import React, { useState, useEffect } from 'react';
import {
    Alert,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { Globalstyles } from '../styles/GlobalStyle';
import CustomButton from '../components/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthStore } from '../store/auth';


//validation schema for signin form
const signInSchema = yup.object({

    email: yup.string()
        .label('Email')
        .required()
        .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "email address is not valid"
        ),
    password: yup.string()
        .label('Password')
        .required()
        .min(6),

});


const SignIn = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
            <View style={Globalstyles.container_2}>
                {/*logo */}
                <Image
                    source={require('../assets/logo.jpg')}
                    resizeMode='contain'
                    style={Globalstyles.logo} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* signin form */}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={signInSchema}
                        onSubmit={(values) => {
                            setLoading(true)
                            AuthStore.signIn(values, navigation, setLoading)
                        }}>
                        {(props) => (
                            <View>
                                {/* email field */}
                                <TextInput
                                    style={Globalstyles.input}
                                    placeholder=' Email'
                                    autoCapitalize='none'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    keyboardType='email-address'
                                    onBlur={props.handleBlur('email')} />
                                {props.touched.email && props.errors.email && (
                                    <Text style={Globalstyles.errorText}>
                                        {props.errors.email}
                                    </Text>
                                )}

                                {/* password field*/}
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

                                {/* signin button */}
                                <CustomButton
                                    text='Sign In'
                                    loading={loading}
                                    style={{
                                        marginTop: 50
                                    }}
                                    onPressButton={props.handleSubmit} />
                            </View>
                        )}
                    </Formik>

                    {/* hyperlink signup */}
                    <View style={Globalstyles.hyperlink_container}>
                        <Text style={Globalstyles.account_text}>
                            Don't have a account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}>
                            <Text style={Globalstyles.hyperlink_text}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        </TouchableWithoutFeedback >
    )
}

export default SignIn;
