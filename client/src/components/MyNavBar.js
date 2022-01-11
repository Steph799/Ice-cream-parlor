import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router';
import { navBarOptions, logoutConfirmation } from '../shared/constants';
import { pathname} from '../shared/url'


export default function MyNavBar({ setPathname }) {
    const navigate = useNavigate()
    const token = localStorage.getItem("adminToken");

    const logOut = () => {
        if (window.confirm(logoutConfirmation)) {
            localStorage.removeItem("adminToken");
            setPathname(pathname);
            navigate('/');
        }
    }
   
    const pageNavigate = (option) => {
        switch (option) {
            case "homepage":
            case "products":
            case "deliveries":
            case "aboutus":
            case "adminidentification":
            case "employees":
                setPathname(`/${option}`)
                navigate(option)

                break;

            default:  //just scroll to contact
                window.scrollTo(0, document.body.scrollHeight);
                break;
        }
    }

    return (
        <AppBar position="static" style={{ minWidth: "100%" }}>
            <Toolbar>
                {navBarOptions.map(({ navigate, name }, index) =>
                    <Button key={index} color="inherit" sx={{ flexGrow: 1 }}
                        onClick={() => pageNavigate(navigate)}>{name}{navigate === "contact" ? <EmailIcon fontSize="large" /> : null}
                    </Button>)}
                    
                {token ?
                 <Button color="error" sx={{ flexGrow: 1 }} onClick={() => pageNavigate("employees")}>
                     Employees
                </Button> : null}

                <Button color="inherit" sx={{ flexGrow: 1 }} onClick={() => token ? logOut() : pageNavigate("adminidentification")}>
                    {token ? "Manager mode" : "Admin"}
                </Button>
            </Toolbar>
        </AppBar>

    );
}
