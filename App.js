import React, { useState } from 'react';
import {StatusBar, Image, } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "./src/screens/SplashScreen";
import GoogleSignUp from "./src/screens/GoogleSignUp";
import CreateRoom from "./src/screens/CreateRoom";
import ChatScreen from "./src/screens/ChatScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import NeedHelpScreen from "./src/screens/NeedHelpScreen";

import firebase from "@react-native-firebase/app"
import auth from "@react-native-firebase/auth";

import PushNotification from "react-native-push-notification";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
        console.log("TOKEN:", token);
        save_notification_token(token.token)
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
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
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"LoadingScreen"}>  
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="CreateRoom" component={CreateRoom} />
          <Stack.Screen name="GoogleSignUp" component={GoogleSignUp} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="NeedHelpScreen" component={NeedHelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
