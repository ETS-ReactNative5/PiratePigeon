import React, {useRef} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import ChatManager from '../Component/ChatManager';
import AddSheet from '../Component/AddSheet';

export default function ChatScreen() {
  const theme = useSelector(state => state.theme.theme);
  const refRBSheet = useRef();

  const styles = StyleSheet.create({
    mainframe: {
      flex: 1,
      backgroundColor: theme === 'light' ? Color.light : '#1d1b25',
    },
    header: {
      flexDirection: 'row',
      height: 60,
      paddingHorizontal: 10,
    },
    backicon: {
      fontSize: 30,
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
    },
    username: {
      fontSize: 16,
      fontWeight: '700',
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    lastseen: {
      fontSize: 13,
      marginTop: 5,
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    listProfileImage: {
      height: 55,
      width: 55,
      borderRadius: 360,
      alignSelf: 'center',
    },
    msgbody: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#e6e6e6' : '#272336',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    inputfieldcontainer: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: theme === 'light' ? Color.light : '#312b46',
      alignSelf: 'center',
      bottom: 10,
      borderRadius: 10,
      flexDirection: 'row',
      paddingHorizontal: 6,
    },
  });
  return (
    <SafeAreaView style={styles.mainframe}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" style={styles.backicon} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.username}>Abhishek Tripathi</Text>
          <Text style={styles.lastseen}>Last Seen at 09:52 AM</Text>
        </View>
        <Image source={Constant.User} style={styles.listProfileImage} />
      </View>
      <ScrollView style={styles.msgbody}>
        <ChatManager id={1} type='image'/>
        <ChatManager id={2} type='image'/>
        <ChatManager id={1} type='video'/>
        <ChatManager id={2} type='video'/>
        {/* <ChatManager id={1} type='pdf'/>
        <ChatManager id={2} type='pdf'/>
        <ChatManager id={1} type='txt'/>
        <ChatManager id={2} type='txt'/> */}
        <ChatManager id={1} type='audio'/>
        <ChatManager id={2} type='audio'/>
        <ChatManager id={1} type='location'/>
        <ChatManager id={2} type='location'/>
        <ChatManager id={7} type='message'/>
        <ChatManager id={8} type='contact'/>
        <ChatManager id={9} type='contact'/>
        <ChatManager id={9} type='message'/>
        <ChatManager id={10} type='message'/>
      </ScrollView>
      <View
        style={{backgroundColor: theme === 'light' ? '#e6e6e6' : '#272336'}}>
        <View style={styles.inputfieldcontainer}>
          <AntDesign
            name="plus"
            style={styles.backicon}
            onPress={() => refRBSheet.current.open()}
          />
          <TextInput
            placeholder="Messages...."
            style={{width: '78%'}}
            placeholderTextColor={theme === 'light' ? Color.dark : Color.light}
          />
          <FontAwesome name="send" style={styles.backicon} />
        </View>
      </View>
      <AddSheet refRBSheet={refRBSheet} />
    </SafeAreaView>
  );
}
