import { Card, Divider, IconButton, MenuItem, MenuList } from "@mui/material";
import NavBarButton from "./nav-bar-button/NavBarButton";
import "./NavBar.css";
import { AccountCircle, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";

type NavButton = {
  title: string;
  route: string;
  subMenu?: { title: string; route: string }[];
};

const NavBar = () => {
  const navButtons: NavButton[] = [
    {
      title: "Meal Plans",
      route: "",
      subMenu: [
        {
          title: "Current",
          route: "",
        },
        {
          title: "View All",
          route: "",
        },
        {
          title: "Create",
          route: "/mealplans/create",
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
        },
        {
          title: "Create",
          route: "/recipes/create",
        },
      ],
    },
    {
      title: "Grocery Lists",
      route: "",
      subMenu: [
        {
          title: "Current",
          route: "",
        },
        {
          title: "View All",
          route: "",
        },
      ],
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
            <h1 className="nav-bar-app-title">Whisker & Whisk</h1>
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
                        button: { title: string; route: string },
                        index: number
                      ) => (
                        <Link
                          key={index}
                          to={button.route}
                          className="no-link-style"
                        >
                          <MenuItem>{button.title}</MenuItem>
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
