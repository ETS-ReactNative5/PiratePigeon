import React, {useEffect, useState} from 'react';
import {StatusBar, Linking, BackHandler} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
import {useSelector, useDispatch} from 'react-redux';

import GoogleSignUpScreen from './Source/Screen/GoogleSignInScreen';
import HomeScreen from './Source/Screen/HomeScreen';
import ChatScreens from './Source/Screen/ChatScreen';
import EditProfieScreen from './Source/Screen/EditProfieScreen';
import MyContacts from './Source/Screen/MyContacts';
import UserDataAction from './Source/Redux/Action/UserDataAction';
import FirebaseServices from "./Source/Services/index";

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyAwmI3Rkd84W2paR5db55_hf5eQWZE17bg',
  authDomain: 'pirate-pigeon.firebaseapp.com',
  databaseURL: 'https://pirate-pigeon-default-rtdb.firebaseio.com',
  projectId: 'pirate-pigeon',
  storageBucket: 'pirate-pigeon.appspot.com',
  messagingSenderId: '1968068986',
  appId: '1:1968068986:web:b8a6587b6985cc5f1d5ec3',
  measurementId: 'G-P9B9YEPBDV',
};

const App = () => {
  const dispatch = useDispatch();

  const save_notification_token = async token => {
    await AsyncStorage.setItem('fmctoken', String(token));
  };

  React.useEffect(() => {
    if (!firebase.apps.length) {
      const app = firebase.initializeApp(firebaseConfig); // FIREBASE INITILIZE
    }
  });

  React.useEffect(() => {
    //PUSH NOTIFICATION AND TOKEN GENRATE
    PushNotification.configure({
      onRegister: function (token) {
        FirebaseServices._update_fmc_token(token.token);
        save_notification_token(token.token);
      },
      onNotification: function (notification) {
        // console.log("NOTIFICATION 1 : ", notification.data.link);
        // Linking.openURL(notification.data.link)
      },
      onAction: function (notification) {
        // console.log("ACTION:", notification.action);
        // console.log("NOTIFICATION 2 : ", notification);
      },
      onRegistrationError: function (err) {
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
  }, []);

  React.useEffect(() => {
    get_device_info();
    _check_user_exist();
  }, []);

  const get_device_info = async () => {
    DeviceInfo.getIpAddress().then(ip => {
      let uniqueId = DeviceInfo.getUniqueId();
      save_ipas(ip, uniqueId);
    });
    DeviceInfo.isEmulator().then(isEmulator => {
      if (isEmulator) {
        alert('Emulators not supported !');
        BackHandler.exitApp();
      }
    });
  };

  const save_ipas = async (ip, uniqueId) => {
    await AsyncStorage.setItem('ip', String(ip));
    await AsyncStorage.setItem('uniqueId', String(uniqueId));
  };

  const [user_exist, set_user_exist] = useState(false);

  const _check_user_exist = async () => {
    let data = await AsyncStorage.getItem('userData');
    auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(UserDataAction(JSON.parse(data)));
        setTimeout(() => {
          set_user_exist(true);
        }, 1000);
      } else {
        set_user_exist(false);
      }
    });
  };

  return (
    <>
      {user_exist ? (
        <NavigationContainer>
          <StatusBar backgroundColor="black" />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'HomeScreen'}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreens} />
            <Stack.Screen name="MyContacts" component={MyContacts} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <StatusBar backgroundColor="black" />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'GoogleSignUpScreen'}>
            <Stack.Screen
              name="GoogleSignUpScreen"
              component={GoogleSignUpScreen}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreens} />
            <Stack.Screen
              name="EditProfieScreen"
              component={EditProfieScreen}
            />
            <Stack.Screen name="MyContacts" component={MyContacts} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
