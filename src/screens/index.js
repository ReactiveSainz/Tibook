import { Navigation } from 'react-native-navigation';
import ApolloClient from 'apollo-boost';
import { SCREENS } from '../constants';
import { HOCS } from '../utilities/';
import { resolvers, typeDefs, defaults } from '../state';

import StartScreen from './StartPage';
import AuthScreen from './Auth/';
import Home from './Home';
import Search from './Search';
import Settings from './Settings';
import Notifications from './Notifications';
import Publications from './Publications';
import LoginScreen from './Login';
import RegisterScreen from './Register';

export default function registerScreens() {
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000',
    clientState: {
      resolvers,
      typeDefs,
      defaults
    }
  });
  Navigation.registerComponent(SCREENS.STARTSCREEN, () =>
    HOCS.withApollo(StartScreen, apolloClient)
  );
  Navigation.registerComponent(SCREENS.AUTH, () => HOCS.withApollo(AuthScreen, apolloClient));
  Navigation.registerComponent(SCREENS.HOME, () => HOCS.withApollo(Home, apolloClient));
  Navigation.registerComponent(SCREENS.SEARCH, () => Search);
  Navigation.registerComponent(SCREENS.SETTINGS, () => Settings);
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => Notifications);
  Navigation.registerComponent(SCREENS.PUBLICATIONS, () => Publications);
  Navigation.registerComponent(SCREENS.LOGIN, () => LoginScreen);
  Navigation.registerComponent(SCREENS.REGISTER, () => RegisterScreen);
}
