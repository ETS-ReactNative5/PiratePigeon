import React, { Component } from "react";
import { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, Alert, TextInput, Share} from "react-native";

import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth"
import Clipboard from "@react-native-clipboard/clipboard";

function CreateRoom({navigation}) {

  const [enter,setenter] =useState(false);
  const [roomID,setroomID]=useState("");
  const [appLink,setappLink]=useState("")

  const get_share_data = async () => {
    database()
      .ref("AppShareData")
      .on("value", (snapshot) => {
        setappLink(snapshot.val());
      });
  }


  React.useEffect(() => {
    get_share_data();
  }, []);


  const onShare = async (temp) => {
    try {
      const result = await Share.share({
        message:
        "Hey Friend, \t I found this really amazing private messanging app. \t You can download it from below link on Google Play Store."+"\n"+"App Link :- "+appLink+"\n"+"Step 1 :- Download and Open\n Step 2 :- SignIn using Google\n Step 3 :- Copy the below Room ID and enter Room Id \n Step 4 :- Start Chatting with me !"+"\n"+"All the chat in this app is encrypted and no permission required ."+"\n"+"Room ID : -  "+temp,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const clipboard_alert_window = (temp) =>{
    Alert.alert(
      "Room Id Copy to Clipboard",
      "Share the copy Room Id with friend and Enter room Id to Continue chatting",
      [
        { text: "OK", onPress: () => {} },
        { text: "Share", onPress: () => onShare(temp) }
      ]
    );
  }

  const genrate_room_id = async () => {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    let temp = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    Clipboard.setString(temp);
    clipboard_alert_window(temp);
  }

  const checkroomID = async => {
    if(roomID.length===120){
      navigation.navigate("ChatScreen",{roomID:roomID})
    }
    else{
      alert("Invalid Room Id")
    }
  }

  const _logout = async () => {
    auth()
      .signOut()
      .then(() => {});
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
          <TouchableOpacity style={[styles.button,{marginTop:20}]} onPress={()=>setenter(true)}>
            <Text style={styles.enterRoomId}>Enter Room ID</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={()=>genrate_room_id()}>
            <Text style={styles.genrateRoomId}>Genrate Room ID</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{margin:30}]} onPress={()=>_logout()}>
            <Text style={styles.buttontxt}>LOGOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("NeedHelpScreen")}>
            <Text style={styles.needhelp}>Need Help ?</Text>
          </TouchableOpacity>
        </>
        :
        enter===true?
        <>
          <TextInput style={styles.textInput} placeholder="Enter Rooom ID" onChangeText={(text)=>setroomID(text)} />
          <TouchableOpacity style={styles.button1} onPress={()=>{setenter(false);checkroomID()}}>
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
    width: 200,
    height: 200,
    marginTop: 50,
    alignSelf: "center",
    borderRadius:50,
  },
  piratePigeon1: {
    fontFamily: "ZenDots",
    color: "#ffbf00",
    textAlign: "center",
    fontSize: 25,
    marginTop: 25,
    textShadowColor: "red",
    textShadowRadius:5,
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
  button: {
    width: Dimensions.get('window').width-50,
    height: 40,
    alignSelf:"center",
    alignItems:"center",
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    justifyContent:"center"
  },
  buttontxt: {
    position: "absolute",
    fontFamily: "ZenDots",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15,
    alignSelf:"center",
  },
  needhelp:{
    alignSelf:"center",
    fontFamily: "ZenDots",
  },
});

export default CreateRoom;
