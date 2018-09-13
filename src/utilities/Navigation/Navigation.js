import { Navigation } from 'react-native-navigation';
import { SCREENS } from '../../constants';

export const goHome = () => {
  return Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.HOME
      }
    }
  });
};

export const goAuth = () => {
  return Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.AUTH
      }
    }
  });
};
