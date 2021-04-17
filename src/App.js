import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './Shared/Navigation/MainNavigation';

const App = () => {




    return (
        <Router>
            <MainNavigation />
        
        </Router>
    );
};

export default App;