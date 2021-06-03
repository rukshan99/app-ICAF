import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../../Shared/FormElements/Input';
import Button from '../../Shared/FormElements/Button';
import ErrorModal from '../../Shared/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';

import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import { useForm } from '../../Shared/hooks/form-hooks';
import { VALIDATOR_REQUIRE } from '../../Shared/Util/validators';

const BankForm = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            cardNo: {
                value: '',
                isValid: false
            },
            expDate: {
                value: '',
                isValid: false
            },
            cvv: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const paymentSubmitHandler = async event => {
        event.preventDefault();
        toast.success('Payment success');
        // try{
        //     const responseData = await sendRequest(
        //         '', //Add link to backend later 'http://localhost:5000/api/.....'
        //         'POST', 
        //         JSON.stringify({
        //             cardNo: formState.inputs.cardNo.value,
        //             expDate: formState.inputs.expDate.value,
        //             cvv: formState.inouts.cvv.value
        //         }),
        //         {
        //             'Content-Type': 'application/json'
        //         }
        //     );
        //     toast.success('Payment success');
        //     //auth.SignIn(responseData.user.id); 
        // } catch (err) {}
    };
    

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>  
        {isLoading && <LoadingSpinner asOverlay/>}  
            <form> {/* onSubmit={paymentSubmitHandler} */}
                <Input 
                        id="cardNo"
                        element="input" 
                        type="text" 
                        lable="Card Number" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter your card number." 
                        onInput={inputHandler}
                    />
                <Input 
                        id="expDate"
                        element="input" 
                        type="text" 
                        lable="Exp. Date" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter the expire date." 
                        onInput={inputHandler}
                    />
                    <Input 
                        id="cvv"
                        element="input" 
                        type="text" 
                        lable="cvv" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter the cvv." 
                        onInput={inputHandler}
                    />
                    <button onClick={toast.success('Payment successful')}>Pay</button>
                    {/*<Button type="submit" disabled={!formState.isValid}>Pay</Button>*/}
            </form>
        </React.Fragment>
    );

};

export default BankForm;