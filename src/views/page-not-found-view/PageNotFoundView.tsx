import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '../../components/nav-bar/NavBar'
import './PageNotFoundView.css'
import { Navigate } from 'react-router';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

const PageNotFoundView = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) { return null; };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    };

    return <>
        <NavBar />
        <div className='max-page-content page-not-found-container'>
            <SentimentVeryDissatisfied sx={{fontSize: '15rem', color: 'rgb(68, 68, 68)'}} />
            <h1 className='page-not-found-error-code'>404</h1>
            <h3 className='page-not-found-error-title'>Page not found</h3>
            <p className='page-not-found-error-message'>The Page you are looking for doesn't exist or another error occurred.</p>
        </div>
    </>
}

export default PageNotFoundView;