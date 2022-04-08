import React from 'react';
import {BackHandler} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const _sign = async (navigation) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
      userInfo.accessToken,
      userInfo.user,
      userInfo.serverAuthCode,
    );
    const firebaseUserCredential = await auth().signInWithCredential(
      credential,
    );
    let userData = {
      full_Name: firebaseUserCredential.user.displayName,
      email: firebaseUserCredential.user.email,
      pphoto: firebaseUserCredential.user.photoURL,
      user_id: firebaseUserCredential.user.uid,
    };
    navigation.navigate('EditProfieScreen',{userData});
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
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }
};

export default {_sign};
