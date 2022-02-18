import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import moment from 'moment';

const update_last_msg = async (user_id, friend_id, type, message) => {
      firestore()
    .collection('Users')
    .where('user_id', '==', user_id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        firestore()
          .collection('Users')
          .doc(documentSnapshot.id)
          .update({
            last_msg:
              type === 'message' ? message : type === 'image' ? 'Photo' : '',
            last_msg_time: moment().format('DD-MM-YYYY HH:MM:SS A').toString(),
          })
          .then(() => {
            console.log('User Data updated!');
          });
      });
    });
  firestore()
    .collection('Users')
    .where('user_id', '==', friend_id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        push_notification(documentSnapshot.data().token,documentSnapshot.data().full_Name,message,type);
        firestore()
          .collection('Users')
          .doc(documentSnapshot.id)
          .update({
            last_msg:
              type === 'message' ? message : type === 'image' ? 'Photo' : '',
            last_msg_time: moment().format('DD-MM-YYYY HH:MM:SS A').toString(),
          })
          .then(() => {
            console.log('User Data updated!');
          });
      });
    });
};

const push_notification = async (token,full_Name,message,type) => {
  var axios = require('axios');
  var data = JSON.stringify({
    to: String(token),
    message: {
      sound: 'default',
      body: 'test body',
      title: 'test title 1',
      content_available: true,
      priority: 'high',
    },
    data: {
      sound: 'default',
      body: 'test body',
      title: 'test title 2',
      content_available: true,
      priority: 'high',
    },
    notification: {
      sound: 'default',
      playSound: true,
      body: type === 'message' ? message : type === 'image' ? 'Photo' : '',
      title: full_Name,
      content_available: true,
      priority: 'high',
    },
  });

  var config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      Authorization:
        'key=AAAAAHVOWXo:APA91bH-jPe-GH2f75dsb8DIs3hhNgcbJdR7G7LO2xFdpMHKZBua4073wEZ3yk-uk_1yn20I2Oks3gO00IQU7stwcgt5oVthzkALIE9O4ftsVr_GHtOsa7glw0uF6AMPlxapALAUjlD8',
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {update_last_msg};
