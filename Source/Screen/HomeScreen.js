import React from 'react';
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

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';
import HomeList from '../Component/HomeList';

export default function HomeScreen({navigation}) {
  const theme = useSelector(state => state.theme.theme);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

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
        <Text style={styles.headingtxt}>Messages</Text>
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
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
        <HomeList navigation={()=>navigation.navigate('ChatScreen')}/>
      </ScrollView>
    </SafeAreaView>
  );
}
