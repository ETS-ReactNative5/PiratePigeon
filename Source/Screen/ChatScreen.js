import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import CryptoJS from 'react-native-crypto-js';
import database from '@react-native-firebase/database';
import moment from 'moment';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import ChatManager from '../Component/ChatManager';
import AddSheet from '../Component/AddSheet';
import FirebaseServices from '../Services/index';

export default function ChatScreen({navigation, route}) {
  const theme = useSelector(state => state.theme.theme);
  const userData = useSelector(state => state.UserDataReducer.userData);
  const refRBSheet = useRef();
  const flatlistRef = useRef();

  const [textMessage, set_textMessage] = useState('');
  const [messageList, setmessageList] = useState([]);
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  console.log(route.params.friend_details);
  // console.log(route.params.querySnapshot.key);

  const send_buttonPressed = async () => {
    if (textMessage != '') {
      let ciphertext = CryptoJS.AES.encrypt(
        textMessage,
        route.params.querySnapshot.key,
      ).toString();
      sendtext_firebase(ciphertext);
    }
  };

  const sendtext_firebase = async ciphertext => {
    const chatRef = database()
      .ref('Chat')
      .child(`${route.params.querySnapshot.room_id}`);
    const chat = {
      message: ciphertext,
      time: moment().format('DD-MM-YYYY HH:MM:SS A').toString(),
      from: userData.user_id,
      type: 'message',
    };
    FirebaseServices.update_last_msg(
      userData.user_id,
      route.params.querySnapshot.friend_id,
      'message',
      textMessage,
    );
    chatRef.push(chat);
    set_textMessage('');
  };

  React.useEffect(() => {
    database()
      .ref('Chat')
      .child(`${route.params.querySnapshot.room_id}`)
      .on('value', snapshot => {
        snapshot.forEach(snap => {
          let messageList = [];
          snapshot.forEach(snap => {
            messageList.push(snap.val());
          });
          setmessageList(messageList);
        });
      });
  }, []);

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
        <AntDesign name="arrowleft" style={styles.backicon} onPress={()=>navigation.goBack(null)} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.username}>
            {route.params.friend_details.full_Name}
          </Text>
          <Text style={styles.lastseen}>Last Seen at {route?.params?.friend_details?.user_last_seen}</Text>
        </View>

        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <Image
                source={
                  route.params.friend_details.pphoto
                    ? {uri: route.params.friend_details.pphoto}
                    : Constant.User
                }
                style={styles.listProfileImage}
              />
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}>
          <MenuItem onPress={hideMenu}>View Profile</MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Block User</MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Close</MenuItem>
        </Menu>
      </View>
      <View style={styles.msgbody}>
        <FlatList
          ref={flatlistRef}
          style={{flex: 1}}
          data={messageList}
          keyExtractor={({item}) => {}}
          onContentSizeChange={() =>
            flatlistRef.current.scrollToEnd({animating: true})
          }
          renderItem={({item}) => (
            <ChatManager
              id={userData.user_id === item.from ? '2' : 1}
              type={item.type}
              item={item}
              en_key={route.params.querySnapshot.key}
              navigation={navigation}
            />
          )}
        />
      </View>
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
            style={{
              width: '78%',
              color: theme === 'light' ? Color.dark : Color.light,
            }}
            placeholderTextColor={theme === 'light' ? Color.dark : Color.light}
            value={textMessage}
            onChangeText={t => set_textMessage(t)}
          />
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => send_buttonPressed()}>
            <FontAwesome name="send" style={styles.backicon} />
          </TouchableOpacity>
        </View>
      </View>
      <AddSheet
        refRBSheet={refRBSheet}
        current_room_id={route.params.querySnapshot.room_id}
        friend_id={route.params.querySnapshot.friend_id}
        userData={userData}
      />
    </SafeAreaView>
  );
}
