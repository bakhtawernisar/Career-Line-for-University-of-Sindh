import { Observer } from 'mobx-react';
import React from 'react';
import { Text, StyleSheet, View, Image, Dimensions, } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from '../components/Button';
import { COLORS } from '../constants';
import { AuthStore } from '../store/auth';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.viewWhite}>
      <Image
        style={{
          height: "18%",
          width: "100%",
        }}
        resizeMode='contain'
        source={require("../assets/logo.jpg")}
      />
      <Image
        style={{
          height: "40%",
          width: "100%",
        }}
        resizeMode='contain'
        source={require("../assets/career_guidance.png")}
      />
      <Text style={styles.main_heading}>Career Guidance</Text>
      <Text style={styles.intro_text}>
        This is the free career councelling system for the students
        who have done intermediate and want to get admission in
        different universities in Sindh
      </Text>
      <Observer>
        {() =>
          <CustomButton
            text='Next'
            onPressButton={() =>
              // if user is already sign in and taken test
              // than go to profile screen 
              // else if user is signin but not taken test
              // than go to field screen 
              // else go to sign in screen
              AuthStore.isLogin && AuthStore.testTaken && !AuthStore.isAdmin ?
                navigation.replace('Profile') :
                ((AuthStore.isLogin && !AuthStore.testTaken) || AuthStore.isAdmin) ?
                  navigation.replace('Field') :
                  navigation.navigate('SignIn')
            }
            style={{
              position: 'absolute',
              bottom: 15,
            }} />
        }
      </Observer>
    </View>
  );
};

const styles = StyleSheet.create({

  viewWhite: {
    padding: 24,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },

  zeroPoint: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: 100,
    width: 345,
    height: 150,
    position: 'absolute'


  },
  main_heading: {
    textAlign: "center",
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    color: COLORS.black
  },

  intro_text: {
    fontSize: RFPercentage(2.5),
    textAlign: 'justify',
    width: '100%',
    marginTop: 10,
    color: COLORS.black
  }
});

export default HomeScreen;
