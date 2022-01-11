import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { useNavigate } from 'react-router'
import { productsDetails } from '../../shared/constants'

function ProductDetails({ product }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);

    const chosenProduct = productsDetails.find(element => element.product === product)

    return (
        <Dialog
            aria-labelledby="responsive-dialog-title"
            open={open}
            onClose={() => { setOpen(false); navigate(-1) }}
            maxWidth="md"
        >
            <DialogContent>
                    <h1>{product}</h1>
                    <h3> {chosenProduct.basicData}</h3>
                    <h4>Prices:</h4>
                    {chosenProduct.price.map((p, index) => <p key={index}>{p}</p>)}       
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetails
