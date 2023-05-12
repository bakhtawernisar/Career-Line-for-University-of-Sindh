import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { COLORS } from './src/constants';
import { PrimaryNavigatory } from './src/navigation/primaryNavigatory';
import { AuthStore } from './src/store/auth';
import RNBootSplash from "react-native-bootsplash";

LogBox.ignoreAllLogs(true)

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
    // checking if user is sign in
    AuthStore.getStatus()
  }, [])

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle='dark-content' />
      <PrimaryNavigatory />
    </>
  );
};

export default App;
