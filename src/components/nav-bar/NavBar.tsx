import { Autocomplete, Card, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, TextField } from "@mui/material";
import NavBarButton from "./nav-bar-button/NavBarButton";
import "./NavBar.css";
import { AccountCircle, AddCircleOutline, FormatListBulleted, FormatListBulletedOutlined, Logout, MenuBookOutlined, Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RecipeLabel } from "../../models/RecipeLabel";
import { getAllRecipeLabels } from "../../services/recipeService";

type NavButton = {
  title: string;
  route: string;
  subMenu?: { title: string; route: string; icon: ReactElement }[];
};

const NavBar = () => {
  const navButtons: NavButton[] = [
    {
      title: "Meal Plans",
      route: "/mealplans",
      subMenu: [
        {
          title: "Current",
          route: "",
          icon: <MenuBookOutlined />
        },
        {
          title: "View All",
          route: "/mealplans",
          icon: <FormatListBulletedOutlined />
        },
        {
          title: "Create",
          route: "/mealplans/create",
          icon: <AddCircleOutline />
        },
      ],
    },
    {
      title: "Recipes",
      route: "/recipes",
      subMenu: [
        {
          title: "View All",
          route: "/recipes",
          icon: <FormatListBulleted />
        },
        {
          title: "Create",
          route: "/recipes/create",
          icon: <AddCircleOutline />
        },
      ],
    },
    {
      title: "Grocery List",
      route: "/grocerylist/current",
    },
  ];
  const [menuIndex, setMenuIndex] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { logout } = useAuth0();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [recipeLabels, setRecipeLabels] = useState<RecipeLabel[]>([]);
  const [init, setInit] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchValue] = useState<RecipeLabel | null>(null);

  useEffect(() => {
    if (!init) {
      setInit(true);
      setTimeout(() => {
        setRecipeLabels(getAllRecipeLabels());
      }, 250);
    }
  }, [recipeLabels, init]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  }

  const handleSearchClick = () => {
    const newSearchOpen = !searchOpen;
    setSearchOpen(newSearchOpen);
    setTimeout(() => {
      newSearchOpen && searchRef.current?.focus();
    }, 250)
  }

  return (
    <div className="nav-bar-container">
      <div className="max-page-content">
        <div className="nav-bar-title-container">
          <span className="flex-filler nav-bar-search-container">
            <span className="nav-bar-search-icon">
              <IconButton onClick={handleSearchClick}>
                <Search />
              </IconButton>
            </span>
            <Autocomplete
              value={searchValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Recipes"
                  inputRef={searchRef}
                  size='small'
                />
              )}
              PaperComponent={({ children }) => (
                <Paper sx={{ backgroundColor: 'var(--card-color)', borderRadius: '0 0 1rem 1rem' }}>
                  {children}
                </Paper>
              )}
              options={recipeLabels}
              sx={searchOpen ? { transition: 'width .5s', width: '20rem' } : { transition: 'width .5s', width: 0, visibility: 'hidden' }}
              onBlur={() => {
                setSearchOpen(false);
              }}
              onChange={(event: any, newValue: RecipeLabel | null) => {
                if(newValue) {
                  setSearchOpen(false);
                  searchRef.current?.blur();
                  navigate(`/recipes/${newValue.id}`);
                }
              }}
            />
          </span>
          <Link to="/" className="no-link-style nav-bar-app-title">
            <h1 className="nav-bar-app-title">
              Whisker
              <img
                className="nav-bar-title-logo"
                src="/WhiskerAndWhiskLogo.png"
                alt="Logo"
              />{" "}
              Whisk
            </h1>
          </Link>
          <span className="flex-filler flex-align-right">
            <IconButton onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ '& .MuiMenu-paper': { backgroundColor: "var(--card-color)" } }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </span>
        </div>
        <div className="nav-button-list-container">
          {navButtons.map((navButton: NavButton, index: number) => (
            <span
              className="nav-button-container"
              key={index}
              onMouseEnter={() => {
                setMenuIndex(index);
              }}
              onMouseLeave={() => {
                setMenuIndex(-1);
              }}
            >
              <Link to={navButton.route} className="no-link-style">
                <NavBarButton text={navButton.title} />
              </Link>
              {navButton.subMenu?.length && (
                <Card
                  sx={{
                    backgroundColor: "var(--card-color)",
                    position: "fixed",
                    visibility: menuIndex === index ? "visible" : "hidden",
                    opacity: menuIndex === index ? "1" : "0",
                    transition: "opacity .5s",
                    zIndex: 10,
                  }}
                >
                  <MenuList>
                    {navButton.subMenu.map(
                      (
                        button: { title: string; route: string; icon: ReactElement },
                        index: number
                      ) => (
                        <Link
                          key={index}
                          to={button.route}
                          className="no-link-style"
                        >
                          <MenuItem>
                            <ListItemIcon>
                              {button.icon}
                            </ListItemIcon>
                            <ListItemText>{button.title}</ListItemText>
                          </MenuItem>
                        </Link>
                      )
                    )}
                  </MenuList>
                </Card>
              )}
            </span>
          ))}
        </div>
        <div className="flex-filler"></div>
      </div>
      <Divider />
    </div>
  );
};

export default NavBar;
