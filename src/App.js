import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './Shared/Navigation/MainNavigation';
import SignIn from './User/pages/SignIn';

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    let routes;
  
    const signIn = useCallback((uid) => {
      setIsSignedIn(true);
      setUserId(uid);
    }, []);
    const signOut = useCallback(() => {
      setIsSignedIn(false);
      setUserId(null);
    }, []);

    routes = (
        <Switch>
          <Route path="/auth">
                <SignIn />
          </Route>
          <Redirect to="/" />
        </Switch>
      );



    return (
        <Router>
            <MainNavigation />
            <main>{routes}</main>
        </Router>
    );
};

export default App;