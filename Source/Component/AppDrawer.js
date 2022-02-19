import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Switch,
} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import ThemeAction from "../Redux/Action/ThemeAction";

function AppDrawer({modalVisible, onDrawerToggle}) {
  const theme = useSelector(state => state.theme.theme);
  const userData = useSelector(state => state.UserDataReducer.userData);
    const dispatch = useDispatch();
  const toggleSwitch = () => {
    dispatch(ThemeAction(theme==='light'?'dark':'light'));
  };

  const styles = StyleSheet.create({
    mainFrame: {
      flex: 1,
      flexDirection: 'row',
    },
    drawerframe: {
      flex: 3.5,
      backgroundColor: theme === 'light' ? Color.light : Color.dark,
      flexDirection: 'column',
    },
    icon: {
      fontSize: 30,
      color: theme === 'light' ? Color.dark : Color.light,
    },
    userprofileimage: {
      height: Dimensions.get('screen').width / 2.5,
      width: Dimensions.get('screen').width / 2.5,
      alignSelf: 'center',
      borderRadius: 360,
    },
    headingtxt: {
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: theme === 'light' ? Color.dark : Color.light,
      fontSize: 20,
      fontWeight: 'bold',
      margin: 5,
      marginTop: 10,
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.mainFrame}>
        <View style={styles.drawerframe}>
          <AntDesign
            name="closecircle"
            style={[styles.icon, {margin: 10, alignSelf: 'flex-end'}]}
            onPress={onDrawerToggle}
          />
          <Image
            source={
              userData.pphoto === null ? Constant.User : {uri: userData.pphoto}
            }
            style={styles.userprofileimage}
          />
          <Text style={styles.headingtxt}>{userData.full_Name}</Text>
          <Text style={[styles.headingtxt, {fontSize: 12}]}>
            {userData.email}
          </Text>
          <Text style={[styles.headingtxt, {fontSize: 16, marginTop: 25}]}>
            Privacy Policies
          </Text>
          <Text style={[styles.headingtxt, {fontSize: 16, marginTop: 25}]}>
            Invite Friends
          </Text>
          <Text style={[styles.headingtxt, {fontSize: 16, marginTop: 25}]}>
            Suggestion & Complaints
          </Text>
          <View style={{marginTop: 25, flexDirection: 'row',alignSelf:'center'}}>
            <Text style={[styles.headingtxt, {fontSize: 16, marginTop: 25}]}>
              Night Mode
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#767577'}}
              thumbColor={theme ? Color.light : Color.primary}
              onValueChange={toggleSwitch}
              value={theme==='light'?false:true}
              style={{marginHorizontal:10, alignSelf: 'flex-end'}}
            />
          </View>
        </View>
        <BlurView
          style={{flex: 1.5}}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        />
      </View>
    </Modal>
  );
}
export default AppDrawer;
