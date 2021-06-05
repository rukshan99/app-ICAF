import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './Shared/Navigation/MainNavigation';
import ResearchPaper from './User/pages/ResearchPaper';
import SignIn from './User/pages/SignIn';

import { Role } from './_helpers/role';
import { PrivateRoute } from './_helpers/private-route';
import { authenticationService } from './services/authentication-service';

const App = () => {
  let currentUser = null;
  authenticationService.currentUser.subscribe(user => currentUser = user);
    const routes = currentUser ? (
        <Switch>
          <PrivateRoute path="/user11/research" roles={[Role.Admin]} component={ResearchPaper} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/auth">
                <SignIn />
          </Route>
          <PrivateRoute path="/user11/research" roles={[Role.Admin]} component={ResearchPaper} />
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