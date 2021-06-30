import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './Shared/Navigation/MainNavigation';
import ResearchPaper from './User/pages/ResearchPaper';
import SignIn from './User/pages/SignIn';
import Panel from './Editor/panel';
import Editor from './Editor/editor';
import Presentation from './Editor/presentation';


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
          <Route path="/panel">
               <Panel/>
          </Route>
          <Route path="/conference">
               <Editor/>
          </Route>
          <Route path="/presentation">
               <Presentation/>
          </Route>
          <Route path="/user11/research">
                <ResearchPaper />
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