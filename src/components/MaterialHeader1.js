import React, { Component,useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, Pressable} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import database from "@react-native-firebase/database";

function MaterialHeader1({navigation,roomID}) {
  
  const [modalVisible, setModalVisible] = useState(false);

  const deletechat = async () => {
    await database()
      .ref('Chat')
      .child(roomID)
      .remove();
      navigation.navigate("CreateRoom")
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton} onPress={()=>navigation.goBack()}>
          <MaterialCommunityIconsIcon
            name="keyboard-backspace"
            style={styles.leftIcon}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.rightIconButton} onPress={()=>setModalVisible(!modalVisible)}>
        <MaterialCommunityIconsIcon
          name="dots-vertical"
          style={styles.rightIcon}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete Chat Room Permanently</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible);deletechat();}}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    justifyContent: "space-between",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  leftIconButton: {
    padding: 11
  },
  leftIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  },
  friendName: {
    fontSize: 14,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    lineHeight: 18
  },
  leftIconButtonRow: {
    height: 48,
    flexDirection: "row",

  },
  rightIconButton: {
    padding: 11,
    alignItems: "center",
  },
  rightIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default MaterialHeader1;
