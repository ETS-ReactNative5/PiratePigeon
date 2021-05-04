import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions,} from "react-native";

import auth from "@react-native-firebase/auth";

function LoadingScreen({navigation}) {

    const check_for_login_user = () =>{
      auth().onAuthStateChanged(function(user) {
        if (user) {
          navigation.navigate("CreateRoom")
        } else {
          navigation.navigate("SplashScreen")
        }
      });
    }
  
    React.useEffect(() => {
      setTimeout(() => {
        check_for_login_user();
      }, 750);
    }, []);

    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/background.jpg")} style={{width:"100%", height:"100%", position:"absolute"}}/>
        <Image
          source={require("../assets/images/pigeon-removebg-preview.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.piratePigeon}>PIRATE PIGEON</Text>

      </View>
    );
}
const styles = StyleSheet.create({
  piratePigeon: {
    fontFamily: "ZenDots",
    color: "#121212",
    textAlign: "center",
    fontSize:25,
  },
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 70,
    alignSelf:"center",
  },
})
export default LoadingScreen;