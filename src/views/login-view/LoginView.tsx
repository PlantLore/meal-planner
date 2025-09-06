import { Button, Paper } from '@mui/material';
import './LoginView.css';
import { Checklist, ListAlt, MenuBookOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

const LoginView = () => {
    const navigate = useNavigate();
    const {loginWithRedirect} = useAuth0();
    const handleSignIn = () => {
        loginWithRedirect().then(() => {
            navigate("/");
        });
    }
    return (
        <div className="login-view-container">
            <Paper elevation={3} sx={{
                width: 'fit-content',
                maxWidth: '30vw',
                height: 'fit-content',
                backgroundColor: 'var(--card-color)',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '2px',
                padding: '1rem',
                gap: '1rem',
                fontSize: '1.2rem',
                borderRadius: '.75rem'
            }}>
                <h1 className="login-view-title">
                    Whisker
                    <img
                        className="login-view-title-logo"
                        src="/WhiskerAndWhiskLogo.png"
                        alt="Logo"
                    />{" "}
                    Whisk
                </h1>
                <div className="login-view-app-action">
                    <ListAlt fontSize="large" sx={
                        {
                            backgroundColor: 'var(--snack-color)',
                            padding: '.75rem',
                            borderRadius: '2rem',
                            overflow: 'visible'
                        }
                    } />
                    <h3 className="login-view-app-action-title">Build and Browse Recipes</h3>
                </div>
                <div className="login-view-app-action">
                    <MenuBookOutlined fontSize="large" sx={
                        {
                            backgroundColor: 'var(--sweet-treat-color)',
                            padding: '.75rem',
                            borderRadius: '2rem',
                            overflow: 'visible'
                        }
                    } />
                    <h3 className="login-view-app-action-title">Create Meal Plans</h3>
                </div>
                <div className="login-view-app-action">
                    <Checklist fontSize="large" sx={
                        {
                            backgroundColor: 'var(--dinner-color)',
                            padding: '.75rem',
                            borderRadius: '2rem',
                            overflow: 'visible'
                        }
                    } />
                    <h3 className="login-view-app-action-title">Generate Grocery Lists</h3>
                </div>
                <Button
                    variant='contained'
                    size='large'
                    fullWidth
                    sx={{
                        backgroundColor: 'var(--button-positive-color)',
                        '&:hover': {
                            backgroundColor: 'var(--button-positive-hover-color)',
                        },
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                    }}
                    onClick={handleSignIn}
                >Sign In</Button>
            </Paper>
        </div>
    );
}

export default LoginView;