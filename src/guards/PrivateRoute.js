import React from 'react';
import { AuthContext } from '../contexts/AuthStore';
import { Redirect, Route } from 'react-router-dom';
import { withAuthConsumer } from '../contexts/AuthStore';

const PrivateRoute = ({ component: Component, ...rest}) => {
  return(
    <AuthContext.Consumer>
      {( { isAuthenticated, user }) => (
        <Route {...rest} render= { (props) => {
          if(isAuthenticated()){
            if(!rest.role || rest.role === user.role) {
              return (<Component {...props} />);
            } else {
              return <Redirect to='/forbiden' />;
            }
          }
          return <Redirect to='/login' />;
        }} />
      )}
    </AuthContext.Consumer>
  );
}

export default withAuthConsumer(PrivateRoute);