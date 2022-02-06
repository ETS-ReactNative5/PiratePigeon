import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
          <View style={styles.seperator}>
            <MaterialCommunityIcons name='file-document' style={styles.icon} />
            <Text style={styles.icondesctext}>Document</Text>
          </View>
          <View style={styles.seperator}>
            <MaterialCommunityIcons name='camera' style={styles.icon} />
            <Text style={styles.icondesctext}>Camera</Text>
          </View>
          <View style={styles.seperator}>
            <AntDesign name='picture' style={styles.icon} />
            <Text style={styles.icondesctext}>Gallery</Text>
          </View>
        </View>
        <View style={styles.rowcontainer}>
          <View style={styles.seperator}>
            <MaterialIcons name='audiotrack' style={styles.icon} />
            <Text style={styles.icondesctext}>Audio</Text>
          </View>
          <View style={styles.seperator}>
            <AntDesign name='enviroment' style={styles.icon} />
            <Text style={styles.icondesctext}>Location</Text>
          </View>
          <View style={styles.seperator}>
            <MaterialCommunityIcons name='contacts' style={styles.icon} />
            <Text style={styles.icondesctext}>Contact</Text>
          </View>
        </View>
      </View>
    </RBSheet>
  );
}
