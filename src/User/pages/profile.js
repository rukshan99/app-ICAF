import React, { useState } from 'react';

import { authenticationService } from '../../services/authentication-service';

import Card from '../../Shared/UIElements/Card';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';

import './SignIn.css';

let currentUser = null;

const Profile = () => {
    const [  isLoading, setIsLoading ] = useState(true);
    authenticationService.currentUser.subscribe(user => currentUser = user);
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);
    authenticationService.currentUser.subscribe(user => currentUser = user);
    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" integrity="undefined" crossorigin="anonymous"></link>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay/>}
                <img src="https://www.shareicon.net/data/128x128/2016/07/26/802043_man_512x512.png" class="rounded mx-auto d-block img-circle" alt="..." />
                <br />
                <h4>{currentUser._doc.name}</h4>
                <h6>{currentUser._doc.role}</h6>
                <hr />
                <p>Contact Details</p>
                <p>E-mail: <a href={"mailto:"+ currentUser._doc.email}>{currentUser._doc.email}</a></p>
            </Card>
        </React.Fragment>
    );
}

export default Profile;