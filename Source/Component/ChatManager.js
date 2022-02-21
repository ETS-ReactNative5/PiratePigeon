import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import FinalChatManager from './FinalChatManager';

export default function ChatManager({id, type, item, en_key, navigation}) {
  const theme = useSelector(state => state.theme.theme);

  const convertTime = time => {
    let result = item.time
      ? moment(item.time, 'DD-MM-YYYY HH:MM:SS A').format('DD-MM-YYYY') ===
        moment().format('DD-MM-YYYY')
        ? moment(item.time, 'DD-MM-YYYY HH:MM:SS A').format('HH:MM A')
        : moment(item.time, 'DD-MM-YYYY HH:MM:SS A').format('DD-MM-YYYY')
      : '';
    return result;
  };

  const styles = StyleSheet.create({
    mainFrame: {
      marginBottom: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: id % 2 === 0 ? 0 : 20,
      borderBottomLeftRadius: id % 2 === 0 ? 20 : 0,
      margin: 10,
      flexDirection: 'column',
      width: '75%',
      alignSelf: id % 2 === 0 ? 'flex-end' : 'flex-start',
      backgroundColor: id % 2 === 0 ? Color.primary : Color.secondary,
      overflow: 'hidden',
    },
    timedisplaytext: {
      color: 'a' == 'a' ? 'white' : '#131313',
      fontSize: 9,
      alignSelf: 'flex-end',
      marginRight: 10,
      fontFamily: 'Roboto-Light',
    },
  });

  return (
    <View style={styles.mainFrame}>
      <View style={{flexDirection: 'column', padding: 2, flex: 1}}>
        <FinalChatManager
          type={type}
          id={id}
          item={item}
          en_key={en_key}
          navigation={navigation}
        />
        <Text style={styles.timedisplaytext}>{convertTime()}</Text>
      </View>
    </View>
  );
}
