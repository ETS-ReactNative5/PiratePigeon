import React, { useState } from 'react';
import { View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";


import Constant from '../Constant/Constant';

function Layout({ props }) {

    return (

        <SafeAreaView style={styles.mainframe}>
            {/* <TouchableOpacity onPress={()=>{props.navigation.goback()}}> */}
            <TouchableOpacity onPress={() => { props.navigation.toggleDrawer() }}>
                <AntDesign name="closecircleo" style={styles.close} size={30} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
                            <Image source={Constant.User} style={styles.img} />
                <View style={{ margin: 10, alignSelf: "center" }}>
                    <Text style={{ fontSize: 18, textAlign: "center", width: "90%", fontFamily: "Roboto-medium", }} numberOfLines={1}>Abhishek Tripathi</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("UserProfileScreen")}>
                        <Text style={{ fontSize: 13, alignSelf: "center", color: "#ff2c55" }}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("MessagesScreen")}>
                <View style={{ flex: 1 }}>
                    <AntDesign name="download" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Inbox</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("NotificationScreen")}>
                <View style={{ flex: 1 }}>
                    <AntDesign name="bells" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Notification</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("SettingScreen")}>
                <View style={{ flex: 1 }}>
                    <AntDesign name="edit" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Edit Profile</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} >
                <View style={{ flex: 1 }}>
                    <AntDesign name="key" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Lock Screen</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("SettingScreen")}>
                <View style={{ flex: 1 }}>
                    <AntDesign name="setting" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Settings</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("PrivacyPolicyScreen")}>
                <View style={{ flex: 1 }}>
                    <FontAwesome name="sort-amount-asc" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>{"Privacy & Help"}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("CreateGroupORPage")}>
                <View style={{ flex: 1 }}>
                    <Entypo name="pencil" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Create Page</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} onPress={() => props.navigation.navigate("CreateGroupORPage")}>
                <View style={{ flex: 1 }}>
                    <Entypo name="network" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Create Group</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
            {/* <TouchableOpacity style={{flexDirection:"row",margin:5}} > */}
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flex: 1 }}>
                    <AntDesign name="poweroff" size={18} style={styles.icons} />
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    <Text style={styles.txt}>Log Out</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", alignSelf: "center" }} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    mainframe: {
        flex: 1,
        backgroundColor: "white",
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 360,
        margin: 15,
    },
    close: {
        color: "#ff2c55",
        alignSelf: "flex-end",
        margin: 10
    },
    icons: {
        alignSelf: "center",
        margin: 10
    },
    txt: {
        fontSize: 18,
        color: "black",
        alignSelf: "center"
    },
})
export default Layout;