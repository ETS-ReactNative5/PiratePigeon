import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerLayout from '../Component/DrawerLayout'

import HomeScreen from '../Screen/HomeScreen';
import ChatScreen from '../Screen/ChatScreen';

const Drawer = createDrawerNavigator();

export default function AppS() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerLayout props={props} />} drawerPosition={"left"} initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
    </Drawer.Navigator>
  );
}
