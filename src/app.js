// import React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
// import IonIcons from 'react-native-vector-icons/Ionicons';

import { registerScreens } from './screens';
import { SCREENS } from './constans';
registerScreens();

const tabs = [
  {
    label: 'Busquedas',
    screen: SCREENS.SEARCH,
    icon: require('../img/swap.png'),
    title: 'Buscar'
  },
  {
    label: 'Publicar',
    screen: SCREENS.PUBLICATIONS,
    icon: require('../img/swap.png'),
    title: 'Publicar'
  },
  {
    label: 'Inicio',
    screen: SCREENS.HOME,
    icon: require('../img/swap.png'),
    title: 'Inicio'
  },
  {
    label: 'Notificaciones',
    screen: SCREENS.NOTIFICATIONS,
    icon: require('../img/swap.png'),
    title: 'Notificaciones'
  },
  {
    label: 'Configuracion',
    screen: SCREENS.SETTINGS,
    icon: require('../img/swap.png'),
    title: 'Configuraciones'
  }
];

Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#fff',
    tabBarButtonColor: '#000',
    tabBarSelectedButtonColor: '#0075C4',
    tabFontFamily: 'BioRhyme-Bold'
  },
  appStyle: {
    tabBarBackgroundColor: '#0075C4',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#0075C4',
    navBarBackgroundColor: '#0075C4',
    statusBarColor: '#0075C4',
    tabFontFamily: 'BioRhyme-Bold'
  }
});
