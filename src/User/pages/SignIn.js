import React, { useState, useContext } from 'react';

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
    const [isSignInMode, setIsSignInMode] = useState(true);
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
                <Button type="submit" disabled={!formState.isValid}>{isSignInMode ? 'Sign in' : 'Sign up'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>{isSignInMode ? 'Sign up' : 'Sign in'}</Button>
        </Card>
        </React.Fragment>
    );
};


export default SignIn;