import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import ChatManager from '../Component/ChatManager';

export default function AddSheet({ refRBSheet }) {
  const theme = useSelector(state => state.theme.theme);

  const feature_update = async () => {
    alert("Feature Update Inprogress !");
  }

  const styles = StyleSheet.create({
    mainframe: {
      flex: 1,
    },
    bottomsheetstylescustom: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme === 'light' ? Color.light : '#1d1b25',
    },
    rowcontainer: {
      flexDirection: 'row',
      flex: 1,
    },
    icon: {
      fontSize: 30,
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
    },
    seperator: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'center',
    },
    icondesctext: {
      fontSize: 15,
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
    },
  });
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      myCustomStyleProp={styles.bottomsheetstylescustom}
    >
      <View style={styles.mainframe}>
        <View style={styles.rowcontainer}>
          <TouchableOpacity style={styles.seperator} onPress={feature_update}>
            <MaterialCommunityIcons name='file-document' style={styles.icon} />
            <Text style={styles.icondesctext}>Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seperator}  onPress={feature_update}>
            <MaterialCommunityIcons name='camera' style={styles.icon} />
            <Text style={styles.icondesctext}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seperator}  onPress={feature_update}>
            <AntDesign name='picture' style={styles.icon} />
            <Text style={styles.icondesctext}>Gallery</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowcontainer}>
          <TouchableOpacity style={styles.seperator}  onPress={feature_update}>
            <MaterialIcons name='audiotrack' style={styles.icon} />
            <Text style={styles.icondesctext}>Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seperator}  onPress={feature_update}>
            <AntDesign name='enviroment' style={styles.icon} />
            <Text style={styles.icondesctext}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seperator}  onPress={feature_update}>
            <MaterialCommunityIcons name='contacts' style={styles.icon} />
            <Text style={styles.icondesctext}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
}
