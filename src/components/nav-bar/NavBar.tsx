import { Divider } from '@mui/material';
import NavBarButton from './nav-bar-button/NavBarButton';
import './NavBar.css';

const NavBar = () => {
    const navButtons: string[] = [
        "Meal Plans",
        "Grocery List",
        "Recipes"
    ];
    return <div className='nav-bar-container'>
        <div className='max-page-content'>
            <h1 className='nav-bar-app-title'>App Title</h1>
            <div className='nav-button-container'>
                {navButtons.map((navButton: string) => <NavBarButton text={navButton} />)}
            </div>
        </div>
        <Divider />
    </div>;
};

export default NavBar;