import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function GoogleSignUp(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pigeon-removebg-preview.png")}
        resizeMode="contain"
        style={styles.image1}
      ></Image>
      <Text style={styles.piratePigeon1}>PIRATE PIGEON</Text>
      <View style={styles.image2Row}>
        <Image
          source={require("../assets/images/google-logo.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
        <Text style={styles.loremIpsum}>Google Sign up Required</Text>
      </View>
      <Icon name="info" style={styles.icon}></Icon>
      <View style={styles.buttonStack}>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
        <Text style={styles.loremIpsum2}>CONTINUE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image1: {
    width: 197,
    height: 200,
    marginTop: 70,
    marginLeft: 110
  },
  piratePigeon1: {
    fontFamily: "zen-dots-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 25,
    marginTop: 37,
    marginRight: 1
  },
  image2: {
    width: 50,
    height: 50
  },
  loremIpsum: {
    fontFamily: "zen-dots-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 18,
    marginLeft: 23,
    marginTop: 14
  },
  image2Row: {
    height: 50,
    flexDirection: "row",
    marginTop: 36,
    marginLeft: 25,
    marginRight: 22
  },
  icon: {
    color: "rgba(23,95,197,1)",
    fontSize: 50,
    alignSelf: "flex-end",
    marginTop: -423,
    marginRight: 1
  },
  button: {
    top: 0,
    left: 0,
    width: 170,
    height: 49,
    position: "absolute",
    backgroundColor: "rgba(23,95,197,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 100
  },
  loremIpsum2: {
    top: 16,
    left: 8,
    position: "absolute",
    fontFamily: "zen-dots-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15
  },
  buttonStack: {
    width: 173,
    height: 49,
    marginTop: 425,
    marginLeft: 105
  }
});

export default GoogleSignUp;
