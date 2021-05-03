import React, { Component, useState } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Image} from "react-native";
import MaterialHeader1 from "../components/MaterialHeader1";
import ChatBox from "../components/ChatBox";
import Icon from "react-native-vector-icons/Feather";

import CryptoJS from "react-native-crypto-js";

function ChatScreen(props) {

  const [textMessage,set_textMessage]=useState("");

  const text_enc_dec_test = async () => {
    alert(textMessage);
    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(textMessage, '123456').toString();
    console.log("Encripted Text : - ", ciphertext)
    // Decrypt
    let bytes  = CryptoJS.AES.decrypt(ciphertext, '123456');
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
 
    console.log("Decripted Text : - ", originalText) // 'my message'
    set_textMessage("");
  }


  return (
    <View style={styles.container}>
      <MaterialHeader1 style={styles.materialHeader1}/>
      <ScrollView/>

      <View style={styles.msginput}>
          <TextInput style={styles.input} value={textMessage} multiline={true} onChangeText={(text) => { set_textMessage(text);}} placeholder="Type Message Here..." maxLength={300}/>
          <TouchableOpacity onPress={()=>{text_enc_dec_test()}} style={{paddingBottom: 10, marginLeft: 5}}>
            <Image source={require('../assets/images/send-button.png')} style={{width: 32, height: 32, marginRight: 5, marginLeft: 15,alignSelf:"center"}} />
          </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(244,237,237,1)"
  },
  materialHeader1: {
    height: 50,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#cccc',
    width: '75%',
    marginBottom:0,
    borderRadius: 5,
    color: '#000000',
    alignSelf:"center",
    flexDirection:"row",
    fontFamily: "ZenDots",
  },
  msginput:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom:10,
    alignSelf:"center",
    backgroundColor:"#f0f0f0",
    margin:10,
  },
});

export default ChatScreen;
