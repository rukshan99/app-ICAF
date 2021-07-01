import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './Shared/Navigation/MainNavigation';
import SignIn from './User/pages/SignIn';
import Profile from './User/pages/profile';

import { Role } from './_helpers/role';
import { PrivateRoute } from './_helpers/private-route';
import { authenticationService } from './services/authentication-service';
import Footer from './Shared/Footer/footer';
import Downloads from './downloads/downloads';
import Researcher from './Reviewer/pages/researchersList';
import WorkshopPresenter from './Reviewer/pages/presentersList'
import researcherDocument from './Reviewer/pages/documentViewResercher';
import presenterDocument from './Reviewer/pages/documentViewPresenter'

const App = () => {
  let currentUser = null;
  authenticationService.currentUser.subscribe(user => currentUser = user);
    const routes = currentUser ? (
        <Switch>
          <Route path="/downloads" exact>
            <Downloads />
          </Route>
          <PrivateRoute path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/downloads" exact>
            <Downloads />
          </Route>
          <Route path="/auth">
                <SignIn />
          </Route>
          <Route path="/researchersList">
                <Researcher />
          </Route>
          <Route path="/workshopPresentersList">
                <WorkshopPresenter />
          </Route>
          <Route path="/researcher/:id" component={researcherDocument}/>
          <Route path="/presenter/:id" component={presenterDocument}/>
          <Redirect to="/" />
          </Switch>
       
      );

    return (
        <Router>
            <MainNavigation />
            <main>{routes}</main>
            <Footer />
          
        </Router>

    );
};

export default App;