import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorModal from '../../Shared/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';

import { useHttpClient } from '../../Shared/hooks/http-hook';

let paymentForm;

const BankForm = () => {

    const { isLoading, error, clearError } = useHttpClient();

    const [ cardNo, setCardNo ] = useState('');
    const [ expDate, setExpDate ] = useState('');
    const [ cvv, setCvv ] = useState('');
    const [ payment, setPayment ] = useState({
        amount: 1000,
        cardNo,
        expDate,
        cvv
    });

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>  
        {isLoading && <LoadingSpinner asOverlay/>}  
            <form> {/* onSubmit={paymentSubmitHandler} */}
                <input 
                        id="cardNo"
                        element="input" 
                        type="text" 
                        lable="Card Number" 
                        onChange={e => {
                            setCardNo(e.target.value);
                            setPayment({...payment, cardNo});
                            paymentForm = payment;
                        }}
                    />
                <input 
                        id="expDate"
                        element="input" 
                        type="date" 
                        lable="Exp. Date" 
                        onChange={e => {
                            setExpDate(e.target.value);
                            setPayment({...payment, expDate});
                            paymentForm = payment;
                        }}
                    />
                    <input 
                        id="cvv"
                        element="input" 
                        type="text" 
                        lable="cvv" 
                        onChange={e => {
                            setCvv(e.target.value);
                            setPayment({...payment, cvv});
                            paymentForm = payment;
                        }}
                    />
            </form>
        </React.Fragment>
    );
};


export { paymentForm };
//exports.paymentForm = paymentForm;

export default BankForm;

// <button onClick={toast.success('Payment successful')}>Pay</button>   {/*<Button type="submit" disabled={!formState.isValid}>Pay</Button>*/}