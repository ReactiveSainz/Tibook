import { Navigation } from 'react-native-navigation';
import { SCREENS, COLORS } from '../../constants';

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
      stack: {
        children: [
          {
            component: {
              name: SCREENS.AUTH
            }
          }
        ],
        options: {
          topBar: {
            visible: false
          }
        }
      }
    }
  });
};
