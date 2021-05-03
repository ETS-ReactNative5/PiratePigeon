import React, { Component } from "react";
import { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, Alert, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Clipboard from "@react-native-clipboard/clipboard";

function CreateRoom({navigation}) {

  const [enter,setenter] =useState(false);
  const [roomID,setroomID]=useState("");

  const clipboard_alert_window = () =>{
    Alert.alert(
      "Room Id Copy to Clipboard",
      "Share the copy Room Id with friend and Enter room Id to Continue chatting",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const genrate_room_id = async () => {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    let temp = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    Clipboard.setString(temp);
    clipboard_alert_window()
  }

  

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/background.jpg")} style={{width:"100%", height:"100%", position:"absolute"}}/>
      <Image
        source={require("../assets/images/pigeon-removebg-preview.png")}
        resizeMode="contain"
        style={styles.image1}
      ></Image>
      <Text style={styles.piratePigeon1}>PIRATE PIGEON</Text>
      {
        enter===false?
        <>
          <TouchableOpacity style={styles.button} onPress={()=>setenter(true)}>
            <Text style={styles.enterRoomId}>Enter Room ID</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={()=>genrate_room_id()}>
            <Text style={styles.genrateRoomId}>Genrate Room ID</Text>
          </TouchableOpacity>
        </>
        :
        enter===true?
        <>
          <TextInput style={styles.textInput} placeholder="Enter Rooom ID" onChangeText={(text)=>setroomID(text)} />
          <TouchableOpacity style={styles.button1} onPress={()=>{setenter(false);navigation.navigate("ChatScreen")}}>
            <Text style={styles.genrateRoomId}>Enter</Text>
          </TouchableOpacity>
        </>
        :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image1: {
    width: 206,
    height: 200,
    marginTop: 70,
    marginLeft: 115
  },
  piratePigeon1: {
    fontFamily: "ZenDots",
    color: "#121212",
    textAlign: "center",
    fontSize: 25,
    marginTop: 38,
    marginRight: 1
  },
  button: {
    width: Dimensions.get('window').width-50,
    height: 40,
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    marginTop: 68,
    alignSelf: "center",
    justifyContent:"center"
  },
  enterRoomId: {
    fontFamily: "ZenDots",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
  },
  textInput: {
    fontFamily: "ZenDots",
    width: Dimensions.get('window').width-50,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 60,
    textAlign: "center",
    alignSelf:"center",
    padding:10,
    borderColor:"rgba(255,255,255,1)",
    borderWidth:0.8,
  },
  button1: {
    width: Dimensions.get('window').width-50,
    height: 40,
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    marginTop: 31,
    alignSelf: "center",
    justifyContent:"center"
  },
  genrateRoomId: {
    fontFamily: "ZenDots",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
  },
  icon1: {
    color: "rgba(23,95,197,1)",
    fontSize: 50,
    alignSelf: "flex-end",
    marginTop: -513,
    marginRight: 1
  }
});

export default CreateRoom;
