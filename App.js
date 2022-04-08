import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Linking,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';


import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
import {useSelector, useDispatch} from 'react-redux';
import Contacts from 'react-native-contacts';

import GoogleSignUpScreen from './Source/Screen/GoogleSignInScreen';
import HomeScreen from './Source/Screen/HomeScreen';
import ChatScreens from './Source/Screen/ChatScreen';
import EditProfieScreen from './Source/Screen/EditProfieScreen';
import MyContacts from './Source/Screen/MyContacts';
import UserDataAction from './Source/Redux/Action/UserDataAction';
import FirebaseServices from './Source/Services/index';
import SplashScreen from './Source/Screen/SplashScreen';
// import PDFViewer from './Source/Screen/PDFViewer';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAKLAz-wJsM4m1oZRdYbgNOoSRwkdKsex4",
  authDomain: "social-media-app-f2c66.firebaseapp.com",
  databaseURL: "https://social-media-app-f2c66-default-rtdb.firebaseio.com",
  projectId: "social-media-app-f2c66",
  storageBucket: "social-media-app-f2c66.appspot.com",
  messagingSenderId: "425917498658",
  appId: "1:425917498658:web:613372ea474796994ed17b",
  measurementId: "G-V7VDBNQCLW"
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

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
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

  const [user_exist, set_user_exist] = useState('0');

  const _check_user_exist = async () => {
    let data = await AsyncStorage.getItem('userData');
    let token = await AsyncStorage.getItem('fmctoken');
    let data_setting_rule_interval = setInterval(() => {
      if (data !== null) {
        auth().onAuthStateChanged(function (user) {
          if (user) {
            FirebaseServices._update_user_last_seen(JSON.parse(data).email,token!==null?token:'');
            dispatch(UserDataAction(JSON.parse(data)));
            setTimeout(() => {
              set_user_exist('1');
              clearInterval(data_setting_rule_interval);
            }, 750);
          } else {
            set_user_exist('2');
          }
        });
      } else {
        set_user_exist('2');
      }
    }, 2200);
  };

  const Update_last_seen = async () => {
    let data = await AsyncStorage.getItem('userData');
    let token = await AsyncStorage.getItem('fmctoken');
    if(data!==null){
      FirebaseServices._update_user_last_seen(JSON.parse(data).email,token!==null?token:'');
    }
  }
  
  React.useEffect(() => {
    setInterval(() => {
      Update_last_seen();
    }, 30000);
  }, []);


  GoogleSignin.configure({
    webClientId:'425917498658-vjp8i1jotlu271d5j7bun57j2804i8jd.apps.googleusercontent.com',
    webClientSecret: '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',
    offlineAccess: true,
    hostedDomain: '',
    loginHint: '',
    forceConsentPrompt: true,
    accountName: '',
  });

  return (
    <>
      {user_exist === '1' ? (
        <NavigationContainer>
          <StatusBar backgroundColor="black" />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'HomeScreen'}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreens} />
            <Stack.Screen name="MyContacts" component={MyContacts} />
            {/* <Stack.Screen name="PDFViewer" component={PDFViewer} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      ) : user_exist === '0' ? (
        <NavigationContainer>
          <StatusBar backgroundColor="black" />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'SplashScreen'}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : user_exist === '2' ? (
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
      ) : null}
    </>
  );
};

export default App;
