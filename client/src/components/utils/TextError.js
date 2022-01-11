import React from 'react';
import  Alert  from '@mui/material/Alert';

const TextError = (props) => <Alert severity="error" className="error" > {props.children} </Alert>
      

export default TextError;
