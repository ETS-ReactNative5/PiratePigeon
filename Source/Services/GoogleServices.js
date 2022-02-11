import React from 'react';
import {BackHandler} from 'react-native';

import auth from '@react-native-firebase/auth';
import { GoogleSignin ,GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';


const _sign = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '1968068986-pa0bn3us3e0r8o9du93th7k7f8ehl2vm.apps.googleusercontent.com',
        webClientSecret:
          'GltiEqPh_P__67SlNUyBR9kB',
        offlineAccess: true,
        hostedDomain: '',
        loginHint: '',
        forceConsentPrompt: true,
        accountName: '',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
        userInfo.user,
        userInfo.serverAuthCode,
      );
      const firebaseUserCredential = await auth().signInWithCredential(credential);
      // await AsyncStorage.setItem('email',String(firebaseUserCredential.additionalUserInfo.profile.email + ''),);
      // await AsyncStorage.setItem('name',String(firebaseUserCredential.additionalUserInfo.profile.name),);
        console.log("SignInDone");
        alert("Done");
    } catch (error) {
      // alert(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Please Sign-In to Continue', '', [
          {
            text: 'Sign-in',
            onPress: () => {
              _sign();
            },
          },
          {
            text: 'Exit',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        // alert('success')
        // this.props.navigation.navigate('Main');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // alert('Play service')
      } else {
        // some other error happened
        alert(error);
      }
    }
  };


  export default {_sign};