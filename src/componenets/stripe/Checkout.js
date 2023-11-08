import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { server } from '../shared/const';
import { AuthContext } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { courseDataAction } from '../redux/courseDataSlice';

const Checkout = ({ itemPrice, product_id, setRefetch, refetch }) => {

    const [cardError, setError] = useState('');
    const [clientSecret, setClientSecret] = useState("")
    const [paymentLoading, setPaymentLoading] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    // const itemPrice = booking;
    const { user } = useContext(AuthContext)
    const dispatch = useDispatch()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${server}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify({ itemPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [itemPrice]
    );
    const handleSubmit = async (event) => {
        setPaymentLoading(true)
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message)
            setPaymentLoading(false)
        } else {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card
                    },
                },
            );
            if (confirmError) {
                setPaymentLoading(false)
                setError(confirmError.message)
                return;
            }
            if (paymentIntent?.status === "succeeded") {
                setPaymentLoading(false)

                setError(null)
                // event.target.reset()
                const payment_id = paymentIntent?.id
                const payment_type = paymentMethod?.card.brand + " " + paymentMethod.type;
                const paymentTime = new Date();
                const { displayName, email } = user
                const allPaymentandUserInfo = { studentsInfo: { name: displayName, email }, paymentInfo: { payment_id, payment_type, paymentTime }, progress: 0 }

                axios.put(`${server}/enrolled`, {
                    id: product_id,
                    allPaymentandUserInfo,

                })
                    .then(data => {
                        toast.success("Enrolled Successfully")
                        setRefetch(!refetch);

                        dispatch(courseDataAction.setFetchAgain())

                    })
                    .catch(err => console.log(err));
            }
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className={`theme_bg mt-3 rounded  border-0 w-100 
             text-white px-3 py-2 fw-bolder ${paymentLoading ? 'd-none' : 'd-block'}`} type="submit"
                disabled={!stripe
                    || !clientSecret
                }>
                Pay Now
            </button>
            <button className={`btn w-100 btn-primary ${paymentLoading ? 'd-block' : 'd-none'}`} type="button" disabled>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing
            </button>
            {cardError && <p className="text-danger">{cardError}</p>}
        </form>
    );
};

export default Checkout;