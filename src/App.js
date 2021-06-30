import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './Shared/Navigation/MainNavigation';
import ResearchPaper from './User/pages/ResearchPaper';
import SignIn from './User/pages/SignIn';
import Panel from './Editor/panel';
import Conference from './Editor/create-conference';
import ViewConference from './Editor/view-conference';
import UpdateConference from './Editor/update-conference';
import Workshops from './Editor/presentations-workshops';
import Home from './Home/home';
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
           <Route path="/"   component={Home} exact>
          </Route>
          <Route path="/auth">
                <SignIn />
          </Route>
          <Route path="/editor">
               <Panel/>
          </Route>
          <Route path="/conference">
               <Conference/>
          </Route>
          <Route path="/viewConferences">
               <ViewConference/>
          </Route>
          <Route path="/updateConference/:id"   component={UpdateConference}>
          </Route>
          <Route path="/presentation">
               <Presentation/>
          </Route>
          <Route path="/workshops/:id"   component={Workshops}>
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