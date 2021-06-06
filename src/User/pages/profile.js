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
                {currentUser._doc.role != "Attendee" &&
                <React.Fragment>
                <hr />
                <p>Submissions</p>    
                <iframe src={currentUser._doc.document.docData} alt="document" className="process__image" width="100%" height="350" frameBorder="0" allowFullScreen/>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                    <a type="button" className="btn btn-outline-primary" download="Document" href={currentUser._doc.document.docData}>Download</a>
                    </div>
                </div>
                <p>Submission status: 
                    {currentUser._doc.document.docStatus === "Pending" && <span className="text-light bg-warning"> {currentUser._doc.document.docStatus} </span>}
                    {currentUser._doc.document.docStatus === "Accepted" && <span className="text-light bg-success"> {currentUser._doc.document.docStatus} </span>}
                    {currentUser._doc.document.docStatus === "Rejected" && <span className="text-light bg-danger"> {currentUser._doc.document.docStatus} </span>}
                    </p>
                </React.Fragment>}
            </Card>
        </React.Fragment>
    );
}

export default Profile;