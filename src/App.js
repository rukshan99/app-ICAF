import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';



import MainNavigation from './Shared/Navigation/MainNavigation';
import SignIn from './User/pages/SignIn';
import Dashboard from './Admin/pages/Dashboard';
import Conference from './Admin/Components/conferenceDetails/conferenceDetails';
import Approved from './Admin/Components/aprrovedConference/approvedConference';
import PresentationDetails from './Admin/Components/presentationsDetails/presentationDetails';
import WorkshopsDetails from './Admin/Components/workshopsDetails/workshopsDetails';



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
          <Route path="/admin">
                <Dashboard />
          </Route>
          <Route path="/conferenceDetails/:id">
                <Conference />
          </Route>
          <Route path="/approvedConference/:id" component={Approved}>
          </Route>
          <Route path="/presentationDetails/:id" component={PresentationDetails}>
          </Route>
          <Route path="/workshopsDetails/:id" component={WorkshopsDetails}>
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