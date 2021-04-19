import React, { useState, useContext } from 'react';

//import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import Input from '../../Shared/FormElements/Input';
import Button from '../../Shared/FormElements/Button';
import Card from '../../Shared/UIElements/Card';
import ErrorModal from '../../Shared/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';

import { useForm } from '../../Shared/hooks/form-hooks';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Shared/Util/validators';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';

import './SignIn.css';

const SignIn = () => {
    const auth = useContext(AuthContext);
    const [type, setType] = useState("Attendee");
    const [isSignInMode, setIsSignInMode] = useState(true);
    const [isAttendee, setIsAttendee] = useState(true);
    const [isResearcher, setIsResearcher] = useState(false);
    const [isWorkshopPresenter, setIsWorksopPresenter] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchModeHandler = () => {
        if(!isSignInMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsSignInMode(prevMode => !prevMode);
    };

    const signInSubmitHandler = async event => {
        event.preventDefault();

        if(isSignInMode) {
            try{
                const responseData = await sendRequest(
                    '', //Add link to backend later 'http://localhost:5000/api/.....'
                    'POST', 
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );

                auth.SignIn(responseData.user.id); 
            } catch (err) {}
        } else {
            try {
                const responseData = await sendRequest(
                    '', //Add link to backend later 'http://localhost:5000/api/.....'
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json',
                    }
                );
                auth.SignIn(responseData.user.id); 
            } catch(err) {}
        }
    };
    
    const typeSelectHandler = (value) => {
        
        setType(value);
        if(value==="Attendee") {
            setIsAttendee(true);
            setIsResearcher(false);
            setIsWorksopPresenter(false);
        }
        else if(value==="Researcher") {
            setIsAttendee(false);
            setIsResearcher(true);
            setIsWorksopPresenter(false);
        }
        else if(value==="Workshop Presenter") {
            setIsAttendee(false);
            setIsResearcher(false);
            setIsWorksopPresenter(true);
        }
       // console.log(value);
    };

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>    
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Please Sign in</h2>
            <hr />
            <form onSubmit={signInSubmitHandler}>
                {!isSignInMode && (
                    <Input 
                        id="name"
                        element="input" 
                        type="text" 
                        lable="Full name" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter your name." 
                        onInput={inputHandler}
                    />
                )}
                <Input 
                    id="email"
                    element="input" 
                    type="email" 
                    lable="E-mail" 
                    validators={[VALIDATOR_EMAIL()]} 
                    errorText="Please enter a valid E-mail." 
                    onInput={inputHandler}
                />
                <Input 
                    id="password"
                    element="input" 
                    type="password" 
                    lable="Password" 
                    validators={[VALIDATOR_MINLENGTH(6)]} 
                    errorText="Password should be at least 6 characters long." 
                    onInput={inputHandler}
                />
                {!isSignInMode && formState.isValid && (<p style={{fontWeight: "bold"}}>Type</p>)}
                {!isSignInMode && formState.isValid && (
                    <DropdownButton
                    className="dropbtn"
                    alignCenter
                    title={type} 
                    id="dropdown-menu-align-right"
                    onSelect={typeSelectHandler}
                      >
                          
                            <Dropdown.Item eventKey="Attendee">Attendee</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="Researcher">Researcher</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="Workshop Presenter">Workshop Presenter</Dropdown.Item>

                    </DropdownButton>
                )}
                {!isSignInMode && formState.isValid && (<br />)}
                {isAttendee && !isSignInMode && formState.isValid && (<p>Pay the price!!!</p>)}
                {isResearcher && !isSignInMode && formState.isValid && (<p>Upload the research paper!!!</p>)}
                {isWorkshopPresenter && !isSignInMode && formState.isValid && (<p>Upload the workshop proposal!!!</p>)}
                <Button type="submit" disabled={!formState.isValid}>{isSignInMode ? 'Sign in' : 'Sign up'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>{isSignInMode ? 'Sign up' : 'Sign in'}</Button>
        </Card>
        </React.Fragment>
    );
};


export default SignIn;