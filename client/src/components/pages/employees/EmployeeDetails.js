import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import { convertDate } from '../../../shared/constants'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import { myTypography } from '../../employees/EmployeeCard';
import { getAge, googleMapAddress } from '../../../shared/constants'
import { Button } from '@mui/material';
import { constructAddress } from './EmployeeForm'
import { AccessDenied } from '../../utils/AccessDenied';
import NotFound from '../../NotFound';

function EmployeeDetails() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const token = localStorage.getItem('adminToken');
    
    if (!state) return < NotFound />

    const { email, phone, address, role, hireDate, birthDate, firstName, lastName, id } = state
    const addressObject = constructAddress(address.split(' '))
    const { city, houseNumber, street } = addressObject

    return (
        <>
            {token?        
                    <div style={{ padding: "1rem", backgroundColor: "lightGray" }}>
                        <h1 style={{ textAlign: "center" }}>Details on {firstName} {lastName}</h1>
                        {myTypography("h6", "Role: ", role)}
                        {myTypography("h6", "ID: ", id)}
                        {myTypography("h6", "Contact: ")}

                        <div style={{ margin: "1rem" }}>
                            <Typography variant="body1" color="text.secondary">
                                <PhoneIcon /> {phone}
                            </Typography>
                            <p><EmailIcon /> <a href={`mailto: ${email}`} style={{ fontSize: '1.5rem' }}>{email}</a></p>
                        <HomeIcon /><a href={googleMapAddress(street, houseNumber, city)} target={"_blank"} rel="noreferrer noopener">{address}</a> 
                        </div>

                        {myTypography("h7", "Hire date: ", convertDate(new Date(hireDate)), `(Seniority: ${getAge(new Date(hireDate))} years)`)}
                        {myTypography("h7", "Birth date: ", convertDate(new Date(birthDate)), `(Age: ${getAge(new Date(birthDate))})`)}
                        <Button variant="contained" onClick={() => navigate(-1)}>Return to employees page</Button>
                    </div>
             : <AccessDenied />}
        </>

    )
}

export default EmployeeDetails
