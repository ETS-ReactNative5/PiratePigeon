import React,{useState} from 'react';
import { View, StyleSheet, Image, Text, TextInput, Dimensions, TouchableOpacity, Pressable, Modal} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";

function NeedHelpScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [userEmail,setuserEmail]=useState("");
    const [userName,setuserName]=useState("");
    const [queries,setqueries]=useState("");
  
    const getUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email')
        if(email !== null) {
          setuserEmail(email);
        }
        const name = await AsyncStorage.getItem('name')
        if(name !== null && name !== undefined) {
          setuserName(name);
        }
      } catch(e) {
        // error reading value
      }
    }

    const get_share_data = async () => {
      firestore()
        .collection('NeedHelp')
        .doc()
        .set({
            email: userEmail,
            queries: queries,
        })
        .then(() => {
            alert("Thank You for Contating US !");
        });
        setqueries("");
        navigation.navigate("CreateRoom")
        
    }

    React.useEffect(() => {
        getUserEmail();
    }, []);

    return (
        <View style={styles.mainframe}>
            <Image source={require("../assets/images/background.jpg")} style={{width:"100%", height:"100%", position:"absolute"}}/>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                    <Text style={styles.tc}>{"T & C"}</Text>
                </TouchableOpacity>
                <Text style={styles.piratePigeon1}>Need Help ?</Text>
                <TextInput style={styles.input} placeholder={"Enter You Queries"} onChangeText={(text)=>setqueries(text)} multiline={true} maxLength={500}/>
                <TouchableOpacity style={styles.button1} onPress={()=>get_share_data()}>
                    <Text style={styles.genrateRoomId}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{"Terms & Conditions"}</Text>
                        <Text style={{fontFamily: "ZenDots",margin:10,justifyContent:"center",textAlign:"center"}}>{"Send a queryies asking for terms and we will mail down down to you as soon as possible !"}</Text>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    mainframe:{
        flex:1,
    },
    container:{
        alignItems:"center"
    },
    piratePigeon1: {
        fontFamily: "ZenDots",
        color: "#121212",
        textAlign: "center",
        fontSize: 25,
        marginTop: 38,
        marginRight: 1
    },
    tc: {
        fontFamily: "ZenDots",
        color: "#121212",
        textAlign: "center",
        marginTop: 10,
        marginLeft: "70%"
    },
    input:{
        borderWidth:0.8,
        width:Dimensions.get('window').width-50,
        height:Dimensions.get('window').width-50,
        backgroundColor:"white",
        borderRadius:15,
        margin:25,
        fontFamily: "ZenDots",
        justifyContent:"center",
        textAlign:"center",
        padding:15,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth:0.8,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "ZenDots",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily:"ZenDots",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
})
export default NeedHelpScreen;