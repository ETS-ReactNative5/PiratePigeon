import React, { Component } from "react";
import { StyleSheet, View, Text} from "react-native";

import CryptoJS from "react-native-crypto-js";

import moment from "moment"

function MessageBox({item,userEmail}) {

  const decrypt_msg = (msg) => {
    let bytes  = CryptoJS.AES.decrypt(msg, '%$Ab#is#ek28132317$%^');
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  const convertTime = time => {
    let result=moment(time).format("HH:MM A"+"   "+ "DD/MM/YYYY")
    return result;
  };

  return (
    <View style={{flexDirection: 'column',width: '75%',alignSelf: item.from === userEmail ? 'flex-end' : 'flex-start',backgroundColor: item.from === userEmail ? '#007aff' : '#e5e5ea',marginBottom: 10,borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomRightRadius:item.from === userEmail ? 0 : 20,borderBottomLeftRadius:item.from === userEmail ? 20 : 0,margin:10}}>
      <View style={{flexDirection:"column",flex:1,margin:5,left:"2%",}}>
        <Text style={{color:item.from == userEmail ? "white" : "#131313",fontFamily: "ZenDots",}} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={{flexDirection:"column",padding:2,flex:1}}>
        <Text style={{color:item.from == userEmail ? "white" : "#131313", padding: 2,marginLeft:10,fontFamily: "ZenDots",}}>{decrypt_msg(item.message)}</Text>
        <Text style={{color:item.from == userEmail ? "white" : "#131313", fontSize: 12,alignSelf:"flex-end",marginRight:10,fontFamily: "ZenDots",}}>{convertTime(item.time)}</Text>
      </View>         
    </View>
  );
}
export default MessageBox;
