import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import ThemeAction from '../Redux/Action/ThemeAction';
import GoogleServices from '../Services/GoogleServices';

export default function GoogleSignInScreen({navigation}) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const changeTheme = async theme => {
    dispatch(ThemeAction(String(theme)));
  };

  const styles = StyleSheet.create({
    mainframe: {
      flex: 1,
      backgroundColor: theme === 'light' ? Color.light : Color.dark,
    },
    imageLogo: {
      alignSelf: 'center',
      width: Dimensions.get('window').width / 1.5,
      height: Dimensions.get('window').width / 1.5,
    },
    welcometxt: {
      alignSelf: 'center',
      marginTop: 25,
      marginBottom: 15,
      fontSize: 20,
      color: theme === 'light' ? Color.dark : Color.light,
    },
    btn: {
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: Color.primary,
      borderRadius: 7.5,
      marginTop: '28%',
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
    GoogleLogo: {
      height: 20,
      width: 20,
      alignSelf: 'center',
      padding: 10,
    },
    themebtncontainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    themebtn: {
      backgroundColor: Color.secondary,
      borderRadius: 7.5,
      margin: 10,
    },
    themebtntxt: {
      textAlign: 'center',
      color: Color.light,
      padding: 10,
      paddingHorizontal: 50,
    },
    selecttxt: {
      marginTop: 15,
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 16,
      color: theme === 'light' ? Color.dark : Color.light,
    },
  });


  const _google_sign_in = () => {
    GoogleServices._sign();
  }

  return (
    <SafeAreaView style={styles.mainframe}>
      <Text style={styles.welcometxt}>{`Welcome to`}</Text>
      <Image
        source={Constant.ImageLogo}
        style={styles.imageLogo}
        resizeMode="cover"
      />
      <Text style={styles.selecttxt}>Select theme</Text>
      <View style={styles.themebtncontainer}>
        <TouchableOpacity
          style={styles.themebtn}
          onPress={() => changeTheme('light')}>
          <Text style={styles.themebtntxt}>Light</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.themebtn}
          onPress={() => changeTheme('dark')}>
          <Text style={styles.themebtntxt}>Dark</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>_google_sign_in()}>
      {/* <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('EditProfieScreen')}> */}
        <Text style={styles.btntxt}>Continue with </Text>
        <Image source={Constant.GoogleLogo} style={styles.GoogleLogo} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
