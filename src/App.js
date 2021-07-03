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
import Dashboard from './Admin/pages/Dashboard';
import Conference from './Admin/Components/conferenceDetails/conferenceDetails';
import Approved from './Admin/Components/aprrovedConference/approvedConference';
import PresentationDetails from './Admin/Components/presentationsDetails/presentationDetails';
import WorkshopsDetails from './Admin/Components/workshopsDetails/workshopsDetails';

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
            <Footer />
        </Router>
    );
};

export default App;