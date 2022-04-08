import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import database from "@react-native-firebase/database";

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin ,GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

function GoogleSignUp({navigation,props}) {

  const[token,settoken]=useState("");

  const [current_user_signIN,setcurrent_user_signIN]=useState(0);



  const fetch_user_token = async() => {
    try {
      let value = await AsyncStorage.getItem('fmctoken')
      if(value !== null) {
        settoken(value);
      }
    } catch(e) {
      // error reading value
    }  
  }

  React.useEffect(() => {
    fetch_user_token();
  });

  const updating_fmctoken_data_to_firebase = async (userInfo) => {
    firestore()
      .collection('Users')
      .doc(userInfo.user.id)
      .set({
        email: userInfo.user.email,
        name: userInfo.user.name,
        token:token,
      })
      .then(() => {
        navigation.navigate("CreateRoom")
      });
  }

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
      console.log("FirebaseUserCredential",firebaseUserCredential);
      console.log("userInfo",userInfo);
      console.log("credential",credential);
      // await AsyncStorage.setItem('email',String(firebaseUserCredential.additionalUserInfo.profile.email + ''),);
      // await AsyncStorage.setItem('name',String(firebaseUserCredential.additionalUserInfo.profile.name),);
      // await AsyncStorage.setItem('userId',String(userInfo.user.id),);
      // updating_fmctoken_data_to_firebase(userInfo);
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



  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/background.jpg")} style={{width:"100%", height:"100%", position:"absolute"}}/>
      <Image
        source={require("../assets/images/pigeon-removebg-preview.png")}
        style={styles.image1}
      ></Image>
      <Text style={styles.piratePigeon1}>PIRATE PIGEON</Text>
      <View style={styles.image2Row}>
        <Image
          source={require("../assets/images/google-logo.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
        <Text style={styles.loremIpsum}>Google Sign up Required</Text>
      </View>
      <View style={styles.buttonStack}>
        <TouchableOpacity style={styles.button} onPress={()=>_sign()}>
          <Text style={styles.buttontxt}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image1: {
    width: 200,
    height: 200,
    marginTop: 50,
    alignSelf: "center",
    borderRadius:50,
  },
  piratePigeon1: {
    fontFamily: "ZenDots",
    color: "#ffbf00",
    textAlign: "center",
    fontSize: 25,
    marginTop: 25,
    textShadowColor: "red",
    textShadowRadius:5,
  },
  image2: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    padding: 25,
    borderRadius:360,
  },
  loremIpsum: {
    fontFamily: "zen-dots-regular",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginLeft: 23,
    marginTop: 14
  },
  image2Row: {
    height: 50,
    flexDirection: "row",
    marginTop: 36,
    marginLeft: 25,
    marginRight: 22,
  },
  icon: {
    color: "rgba(23,95,197,1)",
    fontSize: 50,
    alignSelf: "flex-end",
    marginTop: -423,
    marginRight: 1
  },
  button: {
    width: Dimensions.get('window').width-50,
    height: 40,
    alignSelf:"center",
    alignItems:"center",
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    justifyContent:"center"
  },
  buttontxt: {
    position: "absolute",
    fontFamily: "ZenDots",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15,
    alignSelf:"center",
  },
  buttonStack: {
    width: 173,
    height: 49,
    marginTop: "10%",
    alignSelf:"center",
  }
});

export default GoogleSignUp;
