import { Navigation } from 'react-native-navigation';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { persistCache } from 'apollo-cache-persist';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';

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
  const cache = new InMemoryCache();
  const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const query = operation.getContext().cache.readQuery({
      query: gql`
        query getME {
          User @client {
            token
          }
        }
      `
    });

    const token = query.User.token != '' ? query.User.token : null;
    console.log('token', token);
    operation.setContext({
      headers: {
        token
      }
    });
    return forward(operation);
  });

  AsyncStorage.clear();
  const stateLink = withClientState({
    cache,
    resolvers,
    typeDefs,
    defaults
  });

  persistCache({
    cache,
    storage: AsyncStorage,
    trigger: 'background',
    debug: true
  });

  const apolloClient = new ApolloClient({
    cache,
    link: ApolloLink.from([authMiddleware, stateLink, httpLink])
  });

  Navigation.registerComponent(SCREENS.STARTSCREEN, () =>
    HOCS.withApollo(StartScreen, apolloClient)
  );

  Navigation.registerComponent(SCREENS.AUTH, () => HOCS.withApollo(AuthScreen, apolloClient));
  Navigation.registerComponent(SCREENS.HOME, () => HOCS.withApollo(Home, apolloClient));
  Navigation.registerComponent(SCREENS.SEARCH, () => HOCS.withApollo(Search, apolloClient));
  Navigation.registerComponent(SCREENS.SETTINGS, () => Settings);
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => Notifications);
  Navigation.registerComponent(SCREENS.PUBLICATIONS, () => Publications);
  Navigation.registerComponent(SCREENS.LOGIN, () => HOCS.withApollo(LoginScreen, apolloClient));
  Navigation.registerComponent(SCREENS.REGISTER, () =>
    HOCS.withApollo(RegisterScreen, apolloClient)
  );
}
