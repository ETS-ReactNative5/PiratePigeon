import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput } from "react-native";
import MaterialHeader1 from "../components/MaterialHeader1";
import ChatBox from "../components/ChatBox";
import Icon from "react-native-vector-icons/Feather";

function ChatScreen(props) {
  return (
    <View style={styles.container}>
      <MaterialHeader1 style={styles.materialHeader1}></MaterialHeader1>
      <View style={styles.scrollAreaStackStack}>
        <View style={styles.scrollAreaStack}>
          <View style={styles.scrollArea}>
            <ScrollView
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            >
              <View style={styles.stackFiller}></View>
              <View style={styles.chatBoxStack}>
                <ChatBox style={styles.chatBox}></ChatBox>
                <Text style={styles.userName}>UserName</Text>
                <Text style={styles.loremIpsum}>
                  hey hi how are you user i am fne what about you how is it
                  going about
                </Text>
                <Text style={styles.loremIpsum4}></Text>
              </View>
            </ScrollView>
          </View>
          <TextInput
            placeholder="Type a message ..."
            keyboardAppearance="default"
            maxLength={500}
            multiline={true}
            style={styles.typeAMessage}
          ></TextInput>
        </View>
        <Icon name="send" style={styles.icon}></Icon>
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
    height: 56
  },
  scrollArea: {
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    right: 0,
    bottom: 56,
    borderWidth: 0,
    borderColor: "#000000",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 15
  },
  scrollArea_contentContainerStyle: {
    height: 685,
    flexDirection: "row"
  },
  stackFiller: {
    flex: 1,
    flexDirection: "row"
  },
  chatBox: {
    position: "absolute",
    height: 101,
    width: 295,
    backgroundColor: "rgba(57,123,226,1)",
    top: 0,
    right: 1
  },
  userName: {
    top: 10,
    position: "absolute",
    fontFamily: "zen-dots-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    height: 14,
    width: 252,
    right: 35
  },
  loremIpsum: {
    top: 33,
    position: "absolute",
    fontFamily: "zen-dots-regular",
    color: "rgba(255,255,255,1)",
    width: 287,
    height: 35,
    right: 0,
    fontSize: 12
  },
  loremIpsum4: {
    top: 79,
    position: "absolute",
    fontFamily: "zen-dots-regular",
    color: "rgba(255,255,255,1)",
    right: 24,
    fontSize: 8
  },
  chatBoxStack: {
    width: 296,
    height: 101,
    marginRight: 9,
    marginTop: 17
  },
  typeAMessage: {
    top: 684,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 57,
    width: 320,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(57,123,226,1)"
  },
  scrollAreaStack: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  icon: {
    position: "absolute",
    color: "rgba(57,123,226,1)",
    fontSize: 47,
    right: 3,
    bottom: 5
  },
  scrollAreaStackStack: {
    flex: 1,
    marginTop: 15,
    marginLeft: 6,
    marginRight: 6
  }
});

export default ChatScreen;
