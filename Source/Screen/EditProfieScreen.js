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

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';

export default function EditProfieScreen({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const [text, setText] = React.useState('');

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
        <Image source={Constant.User} style={styles.userProfile} />
        <AntDesign name="camerao" style={styles.cameraLogo} />
      </View>
      <View style={styles.body}>
        <TextInput
          label="User Name"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
          style={[styles.inputFields, {marginTop: 25}]}
          placeholderTextColor={Color.light}
        />
        <TextInput
          label="Email Address"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
          style={styles.inputFields}
          placeholderTextColor={Color.light}
        />
        <TextInput
          label="Phone Number"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
          placeholderTextColor={Color.light}
          style={styles.inputFields}
        />
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('HomeScreen')}>
          <Text style={styles.btntxt}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
