import { Card, Divider, IconButton, MenuItem, MenuList } from '@mui/material';
import NavBarButton from './nav-bar-button/NavBarButton';
import './NavBar.css';
import React from 'react';
import { AccountCircle, Search } from '@mui/icons-material';

type NavButton = {
    title: string,
    subMenu?: string[];
};

const NavBar = () => {
    const navButtons: NavButton[] = [
        {
            title: "Meal Plans",
            subMenu: [
                "Current",
                "View All",
                "Create"
            ]
        },
        {
            title: "Recipes",
            subMenu: [
                "View All",
                "Create"
            ]
        },
        {
            title: "Grocery Lists",
            subMenu: [
                "Current",
                "View All"
            ]
        }
    ];
    const [menuIndex, setMenuIndex] = React.useState<number>(-1);

    return <div className='nav-bar-container'>
        <div className='max-page-content'>
            <div className='nav-bar-title-container'>
                <span className='flex-filler'>
                    <IconButton><Search /></IconButton>
                </span>
                <h1 className='nav-bar-app-title'>Pick a Plate</h1>
                <span className='flex-filler flex-align-right'>
                    <IconButton><AccountCircle /></IconButton>
                </span>
            </div>
            <div className='nav-button-list-container'>
                {navButtons.map((navButton: NavButton, index: number) =>
                    <span
                        className='nav-button-container'
                        key={index}
                        onMouseEnter={() => { setMenuIndex(index); }}
                        onMouseLeave={() => { setMenuIndex(-1); }}>
                        <NavBarButton text={navButton.title} />
                        {navButton.subMenu?.length && <Card sx={{
                            backgroundColor: 'var(--card-color)',
                            position: 'fixed',
                            visibility: menuIndex === index ? 'visible' : 'hidden',
                            opacity: menuIndex === index ? '1' : '0',
                            transition: 'opacity .5s'
                        }}>
                            <MenuList>
                                {navButton.subMenu.map((text: string, index: number) => <MenuItem key={index}>{text}</MenuItem>)}
                            </MenuList>
                        </Card>}
                    </span>)}
            </div>
            <div className='flex-filler'></div>
        </div>
        <Divider />
    </div>;
};

export default NavBar;