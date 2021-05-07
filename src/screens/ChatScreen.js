import React, { Component, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Image, Dimensions, FlatList} from "react-native";
import MaterialHeader1 from "../components/MaterialHeader1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageBox from "../components/MessageBox";
import Icon from "react-native-vector-icons/Feather";

import database from "@react-native-firebase/database"

import CryptoJS from "react-native-crypto-js";


interface ChatScreenProp {
  route: RouteProp<RootStackParamList, "ChatScreen">;
  navigation: StackNavigationProp<RootStackParamList, "ChatScreen">;
}

function ChatScreen({navigation,route}) {

  let roomId = route.params.roomID;
  const flatlistRef = useRef();
  const [textMessage,set_textMessage]=useState("");
  const [messageList,setmessageList]=useState("");
  const [userEmail,setuserEmail]=useState("");
  const [userName,setuserName]=useState("");

  const getUserEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('email')
      if(email !== null) {
        setuserEmail(email);
      }
      const name = await AsyncStorage.getItem('name')
      if(name !== null && name !== undefined) {
        setuserName(name);
      }
    } catch(e) {
      // error reading value
    }
  }

  const sendtext = async (ciphertext) => {
    const chatRef = database()
      .ref("Chat")
      .child(`${roomId}`);
    const chat = {
      message: ciphertext,
      time: Date.now(),
      from: userEmail,
      name:userName,
    };
    chatRef.push(chat);
    set_textMessage("");
  }

  const encrypting_text_messages = async () => {
    if(textMessage!=""){
      let ciphertext = CryptoJS.AES.encrypt(textMessage, '%$Ab#is#ek28132317$%^').toString();
      sendtext(ciphertext);
    }
  }

  React.useEffect(() => {
    getUserEmail();
    database()
      .ref("Chat")
      .child(`${roomId}`)
      .on("value", (snapshot) => {
        let messageList = [];
        snapshot.forEach((snap) => {
          messageList.push(snap.val());
        });
        setmessageList(messageList);
      });
  },[]);



  return (
    <View style={styles.container}>
      <MaterialHeader1 style={styles.materialHeader1} navigation={navigation} roomID={route.params.roomID}/>
      <FlatList 
        ref={flatlistRef}
        style={styles.chatbox}
        data={messageList}
        keyExtractor={({item}) => console.log()}
        onContentSizeChange={()=> flatlistRef.current.scrollToEnd({animating: true})}
        renderItem={({item})=><MessageBox item={item} userEmail={userEmail}/>}
      />

      <View style={styles.msginput}>
          <TextInput style={styles.input} value={textMessage} multiline={true} onChangeText={(text) => { set_textMessage(text);}} placeholder="Type Message Here..." maxLength={300}/>
          <TouchableOpacity onPress={()=>{encrypting_text_messages()}} style={{paddingBottom: 10, marginLeft: 5}}>
            <Image source={require('../assets/images/send-button.png')} style={{width: 32, height: 32, marginRight: 5, marginLeft: 15,alignSelf:"center"}} />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey"
  },
  materialHeader1: {
    height: 50,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#cccc',
    width: '75%',
    borderRadius: 5,
    color: '#000000',
    alignSelf:"center",
    flexDirection:"row",
    fontFamily: "ZenDots",
    margin:10,
  },
  msginput:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"center",
    backgroundColor:"white",
    width:"100%",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },
  chatbox:{
    backgroundColor:"white",
    margin:5,
    borderRadius:15,
  },
});

export default ChatScreen;
