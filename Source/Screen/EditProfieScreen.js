import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import UserDataAction from '../Redux/Action/UserDataAction';

export default function EditProfieScreen({navigation, route}) {
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState(
    route?.params?.userData?.full_Name,
  );
  const [email, setEmail] = React.useState(route?.params?.userData?.email);
  const [pphoto, setPphoto] = React.useState(
    route.params.userData.pphoto === null
      ? Constant.User
      : route.params.userData.pphoto,
  );

  const navigate_user_data_handle = async () => {
    let userData = {
      full_Name: userName,
      email: email,
      pphoto: pphoto,
      user_id: route.params.userData.user_id,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    find_user_exist(userData);
  };

  const find_user_exist = async userData => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 1) {
          querySnapshot.forEach(documentSnapshot => {
            update_user_data_firebase(userData,documentSnapshot.id);
          });
        } else {
          save_data_underfirebase(userData);
        }
      });
  };
  const save_data_underfirebase = async userData => {
    firestore()
      .collection('Users')
      .add(userData)
      .then(() => {
        console.log('User data saved!');
        dispatch(UserDataAction(userData));
        navigation.navigate('HomeScreen');
      });
  };
  const update_user_data_firebase = async (userData,doc_id) => {
    firestore()
      .collection('Users')
      .doc(doc_id)
      .update(userData)
      .then(() => {
        console.log('User updated!');
        dispatch(UserDataAction(userData));
        navigation.navigate('HomeScreen');
      });
  };

  const styles = StyleSheet.create({
    mainFrame: {
      flex: 1,
      backgroundColor: '#0c1b32',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 10,
    },
    headingtxt: {
      fontSize: 20,
      alignSelf: 'center',
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      color: Color.light,
    },
    savetxt: {
      color: Color.light,
      fontSize: 18,
    },
    arrowicon: {
      fontSize: 30,
      color: Color.light,
    },
    userProfile: {
      height: Dimensions.get('window').width / 2.8,
      width: Dimensions.get('window').width / 2.8,
      borderRadius: 360,
      alignSelf: 'center',
    },
    cameraLogo: {
      color: Color.light,
      fontSize: 25,
      backgroundColor: Color.primary,
      borderRadius: 360,
      alignSelf: 'center',
      padding: 7.5,
      left: 30,
      bottom: 30,
    },
    body: {
      backgroundColor: theme === 'light' ? Color.light : Color.secondary,
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    inputFields: {
      width: Dimensions.get('window').width - 40,
      alignSelf: 'center',
      margin: 10,
      borderRadius: 0,
    },
    btn: {
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: Color.primary,
      borderRadius: 7.5,
      marginTop: 45,
      flexDirection: 'row',
      width: Dimensions.get('window').width - 40,
      justifyContent: 'center',
    },
    btntxt: {
      textAlign: 'center',
      color: Color.light,
      padding: 10,
      fontSize: 18,
    },
  });

  return (
    <SafeAreaView style={styles.mainFrame}>
      <View style={styles.header}>
        <AntDesign name="left" style={styles.arrowicon} />
        <Text style={styles.headingtxt}>Edit Details</Text>
        <Text style={styles.savetxt}>Save</Text>
      </View>
      <View>
        <Image source={{uri: pphoto}} style={styles.userProfile} />
        {/* <AntDesign name="camerao" style={styles.cameraLogo} /> */}
      </View>
      <View style={styles.body}>
        <TextInput
          label="User Name"
          mode="outlined"
          value={userName}
          onChangeText={text => setUserName(text)}
          style={[styles.inputFields, {marginTop: 25}]}
          placeholderTextColor={Color.light}
          outlineColor="red"
          activeOutlineColor="red"
        />
        <TextInput
          label="Email Address"
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.inputFields}
          placeholderTextColor={Color.light}
          outlineColor="red"
          activeOutlineColor="red"
          disabled={true}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigate_user_data_handle()}>
          <Text style={styles.btntxt}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
