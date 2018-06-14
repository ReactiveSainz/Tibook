import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import { SCREENS } from '../constans';

import Home from './Home';
import Search from './Search';
import Settings from './Settings';
import Notifications from './Notifications';
import Publications from './Publications';

export function registerScreens() {
  Navigation.registerComponent(SCREENS.HOME, () => Home);
  Navigation.registerComponent(SCREENS.SEARCH, () => Search);
  Navigation.registerComponent(SCREENS.SETTINGS, () => Settings);
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => Notifications);
  Navigation.registerComponent(SCREENS.PUBLICATIONS, () => Publications);
}
