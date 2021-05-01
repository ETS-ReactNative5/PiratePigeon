import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

function ChatBox(props) {
  return <View style={[styles.container, props.style]}></View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15
  }
});

export default ChatBox;
