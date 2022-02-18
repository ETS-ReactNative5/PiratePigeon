import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import Contacts from 'react-native-contacts';
import {Searchbar} from 'react-native-paper';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import ContactList from '../Component/ContactList';
import moment from 'moment';

export default function MyContacts({navigation}) {
  const theme = useSelector(state => state.theme.theme);
  const userData = useSelector(state => state.UserDataReducer.userData);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [user_contact, set_user_contact] = useState([]);

  const get_all_contact = async () => {
    firestore()
      .collection('Users')
      .where('email', '!=', userData.email)
      .get()
      .then(querySnapshot => {
        let temp = [];
        querySnapshot.forEach(documentSnapshot => {
          temp.push(documentSnapshot);
        });
        set_user_contact(temp);
      });
  };

  React.useEffect(() => {
    get_all_contact();
  }, []);

  const navigate_user = async (friend_id,friend_details) => {
    firestore()
      .collection('HomeList')
      .where('user_id', '==', userData.user_id)
      .where('friend_id', '==', friend_id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size !== 0) {
          querySnapshot.forEach(documentSnapshot => {
            navigation.navigate('ChatScreen', {querySnapshot:documentSnapshot.data(),type:"firebase",friend_details:friend_details});
          });
        } else {
          let room_id = makeid(250);
          let key = makeid(10);
          let data = {
            user_id: userData.user_id,
            friend_id: friend_id,
            room_id: room_id,
            key: key,
            last_msg: '',
            last_msg_time: moment().format('DD-MM-YYYY HH:MM:SS A').toString(),
          };
          firestore()
            .collection('HomeList')
            .add(data)
            .then(resp => {
              let data2 = {
                user_id: friend_id,
                friend_id: userData.user_id,
                room_id: room_id,
                key: key,
                last_msg: '',
                last_msg_time: moment().format('DD-MM-YYYY HH:MM:SS A').toString(),
              };
              firestore()
                .collection('HomeList')
                .add(data2)
                .then(resp2 => {
                  navigation.navigate('ChatScreen', {querySnapshot:data,type:"self",friend_details:friend_details});
                });
            });
        }
      });
  };

  function makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

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
        <FontAwesome name="bars" style={styles.editicon} />
        <Text style={styles.headingtxt}>Contacts</Text>
        <FontAwesome name="edit" style={styles.editicon} />
      </View>
      <ScrollView
        style={{backgroundColor: theme === 'light' ? Color.light : Color.dark}}>
        <Searchbar
          placeholder="Search for users"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        {user_contact.map(item => (
          <ContactList
            full_Name={item._data.full_Name.toString()}
            pphoto={item._data.pphoto.toString()}
            user_id={item._data.user_id.toString()}
            navigation={() => navigate_user(item._data.user_id,item._data)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
