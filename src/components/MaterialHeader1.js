import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialHeader1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton}>
          <MaterialCommunityIconsIcon
            name="keyboard-backspace"
            style={styles.leftIcon}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.rightIconButton}>
        <MaterialCommunityIconsIcon
          name="dots-vertical"
          style={styles.rightIcon}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
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
  }
});

export default MaterialHeader1;
