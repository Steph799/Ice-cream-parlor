import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';
import { accessDenied, minPasswordDigitsError, minPasswordLength } from '../../shared/constants';
import { addInfo } from '../../shared/service'; 


const alertAccessDenied = (error) => alert(error)
 
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().min(minPasswordLength, minPasswordDigitsError).required('Required!'),
});
   

const theme = createTheme();

function AdminForm() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');    

        if (!(email && password)) { //empty field
            alertAccessDenied("Email & password are required");
            return;
        }

        try {
            const jwt = await addInfo("auth/login", { email: email, password: password })
            if (jwt){              
                const user = jwtDecode(jwt);
                if (user.isAdmin){
                    localStorage.setItem('adminToken', jwt);
                    navigate('/homepage')
                }
                else alertAccessDenied(accessDenied)  //it's a user but not an admin
            }                     
            else alertAccessDenied(accessDenied) //not even a user
        } catch (error) {
            alertAccessDenied(error)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"

                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"

                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AdminForm