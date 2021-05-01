import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function SplashScreen(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pigeon-removebg-preview.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.loremIpsum}></Text>
      <TouchableOpacity style={styles.button}>
        <View style={styles.loremIpsum4Filler}></View>
        <Text style={styles.loremIpsum4}>Welcome to Pirate Pigeon</Text>
      </TouchableOpacity>
      <Text style={styles.piratePigeon}>PIRATE PIGEON</Text>
      <Icon name="info" style={styles.icon1}></Icon>
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
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 378,
    marginLeft: 141
  },
  button: {
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    width: 390,
    height: 44,
    marginTop: 52,
    marginLeft: 29
  },
  loremIpsum4Filler: {
    flex: 1
  },
  loremIpsum4: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 13,
    marginLeft: 42
  },
  piratePigeon: {
    fontFamily: "roboto-700",
    color: "#121212",
    textAlign: "center",
    fontSize: 25,
    marginTop: -434
  },
  icon1: {
    color: "rgba(23,95,197,1)",
    fontSize: 50,
    alignSelf: "flex-end",
    marginTop: -340,
    marginRight: 1
  }
});

export default SplashScreen;
