import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Types from './NavigationTypes';
import Actions from './Actions';

export function registerScreens() {
  Navigation.registerComponent('example.Types', () => Types);
  Navigation.registerComponent('example.Actions', () => Actions);
  
}

