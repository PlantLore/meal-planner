import { Card, Divider, IconButton, MenuItem, MenuList } from '@mui/material';
import NavBarButton from './nav-bar-button/NavBarButton';
import './NavBar.css';
import React from 'react';
import { AccountCircle, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router';

type NavButton = {
    title: string,
    route: string,
    subMenu?: { title: string, route: string; }[];
};

const NavBar = () => {
    const navigate = useNavigate();

    const navButtons: NavButton[] = [
        {
            title: "Meal Plans",
            route: "",
            subMenu: [
                {
                    title: "Current",
                    route: ""
                },
                {
                    title: "View All",
                    route: ""
                },
                {
                    title: "Create",
                    route: ""
                }
            ]
        },
        {
            title: "Recipes",
            route: "/recipe",
            subMenu: [
                {
                    title: "View All",
                    route: "/recipes"
                },
                {
                    title: "Create",
                    route: ""
                }
            ]
        },
        {
            title: "Grocery Lists",
            route: "",
            subMenu: [
                {
                    title: "Current",
                    route: ""
                },
                {
                    title: "View All",
                    route: ""
                }
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
                        <span onClick={() => { navigate(navButton.route); }}>

                            <NavBarButton text={navButton.title} />
                        </span>
                        {navButton.subMenu?.length && <Card sx={{
                            backgroundColor: 'var(--card-color)',
                            position: 'fixed',
                            visibility: menuIndex === index ? 'visible' : 'hidden',
                            opacity: menuIndex === index ? '1' : '0',
                            transition: 'opacity .5s'
                        }}>
                            <MenuList>
                                {navButton.subMenu.map(
                                    (button: { title: string, route: string; }, index: number) =>
                                        <MenuItem key={index} onClick={() => { navigate(button.route); }}>
                                            {button.title}
                                        </MenuItem>)}
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