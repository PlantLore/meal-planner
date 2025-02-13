import './NavBarButton.css';

const NavBarButton = ({ text }: { text: string; }) => {
    return <p className='hover-underline-animation nav-bar-button-text'>{text}</p>;
};

export default NavBarButton;