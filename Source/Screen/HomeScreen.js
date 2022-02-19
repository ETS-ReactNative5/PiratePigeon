import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Searchbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import HomeList from '../Component/HomeList';
import AppDrawer from '../Component/AppDrawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const userData = useSelector(state => state.UserDataReducer.userData);

  const [drawer_modal,set_drawer_modal] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [home_chat_list, set_home_chat_list] = useState([]);

  const fetch_home_list = async () => {
    firestore()
      .collection('HomeList')
      .where('user_id', '==', userData.user_id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size !== 0) {
          querySnapshot.forEach(documentSnapshot => {
            firestore()
              .collection('Users')
              .where('user_id', '==', documentSnapshot.data().friend_id)
              .get()
              .then(querySnapshot2 => {
                querySnapshot2.forEach(documentSnapshot2 => {
                  let data = {
                    room_data: documentSnapshot.data(),
                    friend_data: documentSnapshot2.data(),
                  };
                  set_home_chat_list(oldArray => [...oldArray, data]);
                });
              });
          });
        } else {
          // save_data_underfirebase(userData);
        }
      });
  };

  React.useEffect(() => {
    fetch_home_list();
  }, []);

  const styles = StyleSheet.create({
    mainframe: {
      flex: 1,
      backgroundColor: theme === 'light' ? Color.light : Color.dark,
    },
    headerContainer: {
      flexDirection: 'row',
      padding: 20,
      backgroundColor: theme === 'light' ? Color.light : Color.dark,
    },
    editicon: {
      fontSize: 30,
      color: theme === 'light' ? Color.dark : Color.light,
    },
    headingtxt: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: theme === 'light' ? Color.dark : Color.light,
      fontSize: 30,
      fontWeight: 'bold',
    },
    searchbar: {
      width: Dimensions.get('window').width - 40,
      alignSelf: 'center',
      borderRadius: 20,
      backgroundColor: '#e6e6e6',
      marginBottom: 25,
    },
  });
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>set_drawer_modal(!drawer_modal)}>
          <FontAwesome name="bars" style={styles.editicon} />
        </TouchableOpacity>
        <Text style={styles.headingtxt}>Messages</Text>
        <FontAwesome
          name="edit"
          style={styles.editicon}
          onPress={() => navigation.navigate('MyContacts')}
        />
      </View>
      <ScrollView
        style={{backgroundColor: theme === 'light' ? Color.light : Color.dark}}>
        <Searchbar
          placeholder="Search for users"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        {home_chat_list.map((item, index) => {
          return (
            <HomeList
              pphoto={item.friend_data.pphoto}
              full_Name={item.friend_data.full_Name}
              last_msg={item.room_data.last_msg}
              last_msg_time={item.room_data.last_msg_time}
              navigation={() =>
                navigation.navigate('ChatScreen', {
                  querySnapshot: item.room_data,
                  type: 'self',
                  friend_details: item.friend_data,
                })
              }
            />
          );
        })}
      </ScrollView>
      <AppDrawer modalVisible={drawer_modal} onDrawerToggle={()=>set_drawer_modal(!drawer_modal)} />
    </SafeAreaView>
  );
}
