import { Navigation } from 'react-native-navigation';
import { SCREENS, COLORS } from '../../constants';

export const goHome = () => {
  return Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: SCREENS.HOME
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
