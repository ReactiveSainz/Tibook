// import React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { SCREENS } from './constants';
import registerScreens from './screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.STARTSCREEN
      }
    }
  });

  Navigation.setDefaultOptions({
    layout: {
      backgroundColor: 'white',
      orientation: ['portrait']
    }
  });
});
