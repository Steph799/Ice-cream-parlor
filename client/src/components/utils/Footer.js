import React from 'react'
import Typography from '@mui/material/Typography';

const Copyright=()=> {
    return (
        <Typography variant="body2" >
            {'Copyright © '}        
            {new Date().getFullYear()} - Jaujita Ice creams - All rights reserved         
        </Typography>
    );
}

const Footer = () =>
    <footer>
        <span>{Copyright()}</span>
    </footer>


export default Footer
