import { Card, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import NavBarButton from "./nav-bar-button/NavBarButton";
import "./NavBar.css";
import { AccountCircle, AddCircleOutline, FormatListBulleted, FormatListBulletedOutlined, MenuBookOutlined, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { ReactElement, useState } from "react";

type NavButton = {
  title: string;
  route: string;
  subMenu?: { title: string; route: string; icon: ReactElement}[];
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

  return (
    <div className="nav-bar-container">
      <div className="max-page-content">
        <div className="nav-bar-title-container">
          <span className="flex-filler">
            <IconButton>
              <Search />
            </IconButton>
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
            <IconButton>
              <AccountCircle />
            </IconButton>
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
