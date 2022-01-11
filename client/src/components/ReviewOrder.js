import React, { useEffect } from 'react'
import { Button, Dialog, DialogContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import jwtDecode from 'jwt-decode';
import { deleteOrder, CleanOrder } from '../redux/ducks/shipmentDuck'
import { useDispatch } from 'react-redux'
import { deliveryProcessFailed, confirmationTime, exceededTimeMsg, thanksForBuying, confirmCancellationMsg } from '../shared/constants';


function ReviewOrder() {  //protected route
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()

    let cancelByUser = false
    let confirm=false

    const jwt = localStorage.getItem("token")
    if (!jwt) {
        if (localStorage.getItem("buyer")) localStorage.removeItem("buyer")
        alert(deliveryProcessFailed)
        navigate('/homepage') //return to home page
    }
    const shipment = jwtDecode(jwt);

    const { _id, details, time, firstName, lastName, phone, address, price, cardHolder, expiryDate } = shipment
    useEffect(() => {
        let counter = 0;
        const timer = setInterval(() => {
            counter++
            if (counter >= confirmationTime) {
                clearInterval(timer)
                goBack(exceededTimeMsg);
            }

        }, 1000);
        return () => { 
            if (cancelByUser || confirm) clearInterval(timer)
        }
    }, [])


    const cleanStorage = () => {
        localStorage.removeItem('token')
        if (localStorage.getItem("buyer")) localStorage.removeItem("buyer")
    }

    const handleConfirmation = () => {
        confirm=true
        cleanStorage()
        alert(thanksForBuying)
        dispatch(CleanOrder())
        navigate('/homepage')
    }

    //cancel
    const exit = async (reason) => {
        try {
            dispatch(deleteOrder(_id))
            cancelByUser = reason === "cancel";
            navigate('/deliveries')
        } catch (error) {
            alert(error.message)
        }
        finally {
            cleanStorage();
        }
    }

    const goBack = (exceededTime=false) => {
        if (exceededTime) {
            alert(exceededTime)
            exit("timeExceeded");
            return
        }
        if (window.confirm(confirmCancellationMsg)) exit("cancel");
    }

    return (
        <Dialog
            aria-labelledby="responsive-dialog-title"
            open={true}
            maxWidth="md">
            <DialogContent>
                <h1 style={{ textAlign: "center" }}>Review details</h1>
                <div style={{ display: "flex", margin: "auto", width: "75%" }}>
                    <div style={{ marginRight: "3rem" }}>
                        <h2>Order summary</h2>
                        <p>{details}.</p>
                        <p>Approx arriving time: {time}</p>
                        <p>Shipping: Free</p>
                        <h3>Total: {price}$</h3>
                        <h4>*delay can be up to 1 hour</h4>
                        <h4 style={{ color: "red" }}>Important: Once you confirm, you can't cancel the order!</h4>
                    </div>
                    <div>
                        <h2>Your details</h2>
                        <p>Full Name: {firstName} {lastName}</p>
                        <p>Phone: {phone}</p>
                        <p>Address: {address}</p>
                        <h2>Payment</h2>
                        <p>Card holder: {cardHolder}</p>
                        <p>Card number: xxxx-xxxx-xxxx-{state}</p>
                        <p>Expiry date: {expiryDate}</p>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button onClick={handleConfirmation} variant="contained">Place order</Button>
                    <Button onClick={()=>goBack()} color="error">Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewOrder


  