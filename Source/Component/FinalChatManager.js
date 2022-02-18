import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProgressBar, Colors} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import CryptoJS from 'react-native-crypto-js';

import Color from '../Constant/Color';
import Constant from '../Constant/Constant';

export default function FinalChatManager({type, id, item, en_key}) {
  const theme = useSelector(state => state.theme.theme);
  const [imagesdata, set_imagesdata] = useState({
    ImageWidth: 0,
    ImageHeight: 0,
  });
  let dimensions = Dimensions.get('window');
  const ImageUrl =
    'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg';

  useEffect(() => {
    if (type === 'image') {
      Image.getSize(
        ImageUrl,
        (Width, Height) => {
          set_imagesdata({ImageWidth: Width, ImageHeight: Height});
          console.log(Width, Height);
        },
        errorMsg => {
          console.log(errorMsg);
        },
      );
    }
  }, []);

  const decrypt_msg = (msg) => {
    let bytes  = CryptoJS.AES.decrypt(msg, en_key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  const styles = StyleSheet.create({
    txtmsgbody: {
      color: 'a' == 'a' ? 'white' : '#131313',
      padding: 2,
      marginLeft: 10,
      fontFamily: 'Roboto-Regular',
      fontSize: 15,
    },
    imagebody: {
      height: Math.round(((dimensions.width / 1.35) * 9) / 16),
      width: dimensions.width / 1.35,
      padding: 5,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    playiconVideo: {
      fontSize: 45,
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
    },
    playiconAudio: {
      fontSize: 30,
      color: theme === 'light' ? Color.dark : Color.light,
      alignSelf: 'center',
      padding: 10,
    },
    videoplayBtn: {
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      top: '38%',
      backgroundColor: 'lightgrey',
      borderRadius: 360,
    },
    contactbtnscontainer: {
      flexDirection: 'row',
      marginVertical: 5,
    },
    contactbtns: {
      flex: 1,
      textAlign: 'center',
      marginHorizontal: 20,
      padding: 10,
      backgroundColor: id % 2 === 0 ? '#af99ff' : '#413861',
      borderRadius: 7.5,
      color: 'a' == 'a' ? 'white' : '#131313',
    },
    contactname: {
      color: 'a' == 'a' ? 'white' : '#131313',
      textAlign: 'left',
      marginLeft: 25,
      fontSize: 18,
      fontWeight: '700',
      marginVertical: 10,
    },
  });
  return (
    <>
      {type === 'message' ? (
        <Text style={styles.txtmsgbody}>{decrypt_msg(item.message)}</Text>
      ) : type === 'image' ? (
        <Image source={{uri: ImageUrl}} style={styles.imagebody} />
      ) : type === 'video' ? (
        <View>
          <Image source={{uri: ImageUrl}} style={styles.imagebody} />
          <View style={styles.videoplayBtn}>
            <AntDesign name="play" style={styles.playiconVideo} />
          </View>
        </View>
      ) : type === 'location' ? (
        <Image
          source={{
            uri: 'https://www.lockedownseo.com/wp-content/uploads/2013/11/add-map-marker-google-maps.webp',
          }}
          style={styles.imagebody}
        />
      ) : type === 'contact' ? (
        <>
          <Text style={styles.contactname}>Abhishek Tripathi</Text>
          <View style={styles.contactbtnscontainer}>
            <TouchableOpacity style={{flex: 1}}>
              <Text style={styles.contactbtns}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <Text style={styles.contactbtns}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : type === 'audio' ? (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="play" style={styles.playiconAudio} />
          </View>
          <ProgressBar
            progress={0.7698521589}
            color={Colors.red800}
            style={{height: 10, paddingHorizontal: 5, alignSelf: 'center'}}
          />
        </>
      ) : null}
    </>
  );
}
