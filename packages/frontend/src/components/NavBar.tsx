import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Menu } from "semantic-ui-react";
import { getUserId, getUsername, removeUser } from "./../utils/util";
import { useHistory } from "react-router";
import { getListItemAvatarUtilityClass } from "@mui/material";

const NavBar = () => {
  const history = useHistory();
  const [activeItem, setactiveItem] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(!isNaN(getUserId()));
  return (
    <Menu secondary>
      <Link to="/home">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => setactiveItem("home")}
        />
      </Link>
      <Link to="/profile">
        <Menu.Item
          name="Profile"
          active={activeItem === "profile"}
          onClick={() => setactiveItem("profile")}
        />
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>
          {!isNaN(getUserId()) && (
            <Button floated="right" basic color="green">
              {getUsername()}
            </Button>
          )}
        </Menu.Item>
        <Menu.Item
          name={isLoggedIn ? "Logout" : "Login"}
          active={activeItem === "logout"}
          onClick={() => {
            setIsLoggedIn(false);
            if (!isNaN(getUserId())) removeUser();
            history.push("/login");
          }}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
