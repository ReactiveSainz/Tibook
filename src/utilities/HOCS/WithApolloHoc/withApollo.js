import React from 'react';
import { ApolloProvider } from 'react-apollo';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withApolloHOC = (WrappedComponent, client) => {
  class Enhance extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
};

export default withApolloHOC;
