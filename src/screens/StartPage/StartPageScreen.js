import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { NAV } from '../../utilities/';

const GET_TOKEN = gql`
  query getME {
    User @client {
      token
    }
  }
`;

class StartPageScreen extends Component {
  render() {
    return (
      <Query query={GET_TOKEN}>
        {({ loading, error, data }) => {
          if (error) return null;
          if (loading || !data) return null;
          {
            if (data.User.token !== '') NAV.default.goHome();
            else NAV.default.goAuth();
          }
          return null;
        }}
      </Query>
    );
  }
}

export default StartPageScreen;
