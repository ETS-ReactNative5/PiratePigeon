import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/background.jpg")} style={{width:"100%", height:"100%", position:"absolute"}}/>
      <Icon name="info" style={styles.icon1}></Icon>
      <Image
        source={require("../assets/images/pigeon-removebg-preview.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.piratePigeon}>PIRATE PIGEON</Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("GoogleSignUp")}>
        <Text style={styles.buttomtxt}>Welcome to Pirate Pigeon</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 70,
    marginLeft: 124
  },
  button: {
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    width:Dimensions.get('window').width-50,
    height:40,
    alignSelf:"center",
    justifyContent:"center",
    top:"45%",
  },
  buttomtxt: {
    fontFamily: "ZenDots",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15,
    alignSelf:"center",
  },
  piratePigeon: {
    fontFamily: "ZenDots",
    color: "#121212",
    textAlign: "center",
    fontSize:25,
  },
  icon1: {
    color: "rgba(23,95,197,1)",
    fontSize: 50,
    alignSelf: "flex-end",
  }
});

export default SplashScreen;
