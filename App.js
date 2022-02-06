import React, { useState } from 'react';
import {StatusBar, Linking, } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "@react-native-firebase/app"
import auth from "@react-native-firebase/auth";
import PushNotification from "react-native-push-notification";



import GoogleSignUpScreen from './Source/Screen/GoogleSignInScreen';
import HomeScreen from './Source/Screen/HomeScreen';
import ChatScreens from './Source/Screen/ChatScreen';
import EditProfieScreen from './Source/Screen/EditProfieScreen';


const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAwmI3Rkd84W2paR5db55_hf5eQWZE17bg",
  authDomain: "pirate-pigeon.firebaseapp.com",
  databaseURL: "https://pirate-pigeon-default-rtdb.firebaseio.com",
  projectId: "pirate-pigeon",
  storageBucket: "pirate-pigeon.appspot.com",
  messagingSenderId: "1968068986",
  appId: "1:1968068986:web:b8a6587b6985cc5f1d5ec3",
  measurementId: "G-P9B9YEPBDV"
};

const App = () => {
  const save_notification_token = async (token) => {
    await AsyncStorage.setItem('fmctoken',String(token),);
  }

  React.useEffect(() => {
    if (!firebase.apps.length) {
      const app =firebase.initializeApp(firebaseConfig);       // FIREBASE INITILIZE
    }
  });

  React.useEffect(() => {                       //PUSH NOTIFICATION AND TOKEN GENRATE
    PushNotification.configure({
      onRegister: function (token) {
        save_notification_token(token.token)
      },
      onNotification: function (notification) {
        // console.log("NOTIFICATION 1 : ", notification.data.link);
        Linking.openURL(notification.data.link)

      },
      onAction: function (notification) {
        // console.log("ACTION:", notification.action);
        // console.log("NOTIFICATION 2 : ", notification);
      },
      onRegistrationError: function(err) {
        // console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  },[]);

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="black" />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"GoogleSignUpScreen"}>  
          {/* <Stack.Screen name="LoadingScreen" component={LoadingScreen} /> */}
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
          {/* <Stack.Screen name="CreateRoom" component={CreateRoom} /> */}
          {/* <Stack.Screen name="GoogleSignUp" component={GoogleSignUp} /> */}
          {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
          {/* <Stack.Screen name="NeedHelpScreen" component={NeedHelpScreen} /> */}

          <Stack.Screen name="GoogleSignUpScreen" component={GoogleSignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreens} />
          <Stack.Screen name="EditProfieScreen" component={EditProfieScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
