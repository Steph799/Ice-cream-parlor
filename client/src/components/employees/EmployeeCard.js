import React from 'react';
import { useDispatch } from 'react-redux';
import { removeEmployee } from '../../redux/ducks/employeeDuck';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router';
import { addInfo } from '../../shared/service';
import { confirmDelete, passwordVerification, accessDenied } from '../../shared/constants';

export const myTypography = (variant, ...params) => {
    const str = params.length > 1 ? params.join(' ') : params
    return <Typography gutterBottom variant={variant} component="div">{str}</Typography>
}


function EmployeeCard({ employee, index}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { firstName, lastName, id, _id, role } = employee
    const employeePage = `${window.location.pathname}/${id}`;

    const handleDelete = () => {
        if (window.confirm(confirmDelete(firstName, lastName))) 
            dispatch(removeEmployee(_id, index))
    }

    const handleEdit = async () => {
        const password = prompt(passwordVerification) 
        if (!password) return;
        try {
            const login = await addInfo("auth/login", { email: employee.email, password: password })
            if (login) {
                employee.password = password
                navigate("/employeeform", { state: { employee: employee, index: index} })
            }
            else alert(accessDenied)
        } catch (error) {
            alert(error)
        }       
    }


    return (
        <Card sx={{ maxWidth: 345, border: 1 }} className="employeeCard"  >
            <CardContent>
                <div className='cardHeader'>
                    {myTypography("h5", firstName, lastName)}
                    {myTypography("h5", role)}
                    <Button onClick={() => navigate(employeePage, {state: employee})}>View more details</Button>
                </div>

                <div >
                    <Button size="large" title="Edit" style={{ float: "left" }} onClick={handleEdit}><ModeEditIcon /></Button>
                    <IconButton aria-label="delete" title="Delete" size="large" color="error" style={{ float: "right" }}
                        onClick={handleDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    )
}

export default EmployeeCard

