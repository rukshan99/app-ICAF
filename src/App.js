import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';



import MainNavigation from './Shared/Navigation/MainNavigation';
import SignIn from './User/pages/SignIn';
import Sidebar from './Components/sidebar/Sidebar';


const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    let routes;

  
  
    const openSidebar = () => {
        setSidebarOpen(true);
      };
      
    const closeSidebar = () => {
        setSidebarOpen(false);
      };
    
      












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
            
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>

            <main>{routes}</main>
        </Router>
    );
};

export default App;