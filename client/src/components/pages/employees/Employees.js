import React, {  useEffect } from 'react'
import { Button, Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router'
import { fetchEmployees } from '../../../redux/ducks/employeeDuck'
import { useSelector, useDispatch } from 'react-redux';
import EmployeeCard from '../../employees/EmployeeCard';
import axios from 'axios';
import { AccessDenied } from '../../utils/AccessDenied';


function Employees() {
    const navigate = useNavigate();
    const employeeState = useSelector(state => state.employee)
    const dispatch=useDispatch();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('adminToken');
        dispatch(fetchEmployees());
    }, [])

    return (
        <div style={{ backgroundColor: "#dfa579"}}>
            {token ?
                <div>
                    <h1 style={{textAlign: "center", margin:0}}>Our employees</h1>
                    <Button variant="contained" onClick={() => navigate("/employeeform")}>Add new employee</Button>
                    {employeeState.loading ? <h2>Loading...</h2> : employeeState.error ? <h2>{employeeState.error}</h2> : (
                        <Container sx={{ py: 8 }} maxWidth="lg">
                            <Grid container spacing={4}   >
                                {employeeState?.employees?.map((employee, index) =>
                                    <Grid item key={employee._id} xs={12} sm={6} md={4}>
                                        <EmployeeCard employee={employee} index={index}/>                            
                                    </Grid>)}
                            </Grid>
                        </Container>
                    )}
                </div> : <AccessDenied/>}
        </div>
    )
}

export default Employees
