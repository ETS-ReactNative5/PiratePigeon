import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function CreateRoom(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pigeon-removebg-preview.png")}
        resizeMode="contain"
        style={styles.image1}
      ></Image>
      <Text style={styles.piratePigeon1}>PIRATE PIGEON</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.enterRoomId}>Enter Room ID</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.genrateRoomId}>Genrate Room ID</Text>
      </TouchableOpacity>
      <Icon name="info" style={styles.icon1}></Icon>
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
    fontFamily: "zen-dots-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 25,
    marginTop: 38,
    marginRight: 1
  },
  button: {
    width: 258,
    height: 38,
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    marginTop: 68,
    alignSelf: "center"
  },
  enterRoomId: {
    fontFamily: "zen-dots-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 12,
    marginLeft: 66
  },
  button1: {
    width: 258,
    height: 38,
    backgroundColor: "rgba(23,95,197,1)",
    borderRadius: 100,
    marginTop: 31,
    alignSelf: "center"
  },
  genrateRoomId: {
    fontFamily: "zen-dots-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 11,
    marginLeft: 55
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
