import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuthContext } from "../../../context/AuthContext";
import ApplicationStore from "../../../utils/localStorageUtil";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "../../../../src/Images/carCanada.png";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

const pages = ["Products", "Pricing", "Blog"];
// const settings = ['Personal Information', 'Change Password', 'Logout'];

const URL = "/notifications/getNotifications";

function ResponsiveAppBar({
  handleDrawerToggle,
  mobileOpen,
  handleToggle,
  sidebarOpen,
}) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState([
    "Personal Information",
    "Change Password & OMVIC NO",
    "Logout",
  ]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, Logout } = useAuthContext();
  const userType = ApplicationStore().getStorage("user_type");
  const userEmail = ApplicationStore().getStorage("user_email");
  const username = ApplicationStore().getStorage("userName");

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // const navigate = useNavigate();

  //notification
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(URL);

        if (response.data && response.data.sucsess === 1) {
          setNotifications(response.data.data);
          const unread = response.data.data.filter(
            (item) => item.status === 0
          ).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);
  console.log("notifications", notifications);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const ChangePassword = () => {
    // Perform logout logic (e.g., clearing tokens, etc.)
    // After logging out, redirect to the login page
    navigate("/ChangePassword");
  };

  const personalInformation = () => {
    // Perform logout logic (e.g., clearing tokens, etc.)
    // After logging out, redirect to the login page
    navigate("/Personalinformation");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (userType === "admin" || userType == "user") {
      setSettings((prevSettings) =>
        prevSettings.filter((setting) => setting !== "Personal Information")
      );
    }
  }, [userType]);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        backgroundColor: "white", // White background
        borderBottom: "1px solid #e0e0e0", // Light gray border for bottom
        boxShadow: "0px 4px 8px rgba(600, 255, 255, 0.1)", // White shadow with 10% opacity
        zIndex: 1500,
      }}
    >
      <Container maxWidth="sx">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ margin: "0px 0", height: "50px", width: "150px" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              sx={{
                color: "navy", // White background
                // display:'none'
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              onClick={handleNotificationClick}
              sx={{ color: "navy", mr: 1 }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {notifications.length > 0 ? (
                <>
                  {notifications.slice(0, 6).map((note, index) => (
                    <MenuItem key={index} onClick={handleNotificationClose}>
                      {note.message}
                    </MenuItem>
                  ))}

                  {notifications.length > 6 && (
                    <MenuItem
                      onClick={() => {
                        handleNotificationClose();
                        // Redirect to full notifications page
                        navigate("/notifications");
                      }}
                      sx={{ justifyContent: "center", fontWeight: "bold" }}
                    >
                      Read More
                    </MenuItem>
                  )}
                </>
              ) : (
                <MenuItem disabled>No new notifications</MenuItem>
              )}
            </Menu>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                // display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#0d2365",
                textDecoration: "none",
                alignItems: "right",
              }}
            >
              {username ? username : ""}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, right: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AccountCircleIcon
                  sx={{
                    color: "navy", // White background
                    border: "1px solid navy",
                    fontSize: "30px",
                    marginRight: "10px",
                  }}
                />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Toggle" sx={{ display:"none"}}>
              <IconButton onClick={handleToggle} sx={{ p: 0, right: 0, display: { xs: 'none', sm: 'inline-flex' } }}>

                {
                  sidebarOpen ?  <MenuTwoToneIcon sx={{
                    color: 'navy', // White background
                    border: '1px solid navy',
                    fontSize: '30px'
                  }} /> : <MenuOpenTwoToneIcon sx={{
                    color: 'navy', // White background
                    border: '1px solid navy',
                    fontSize: '30px'
                  }} /> 
                }
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") {
                      Logout(); // Call Logout function if setting is 'Logout'
                    } else if (setting === "Change Password & OMVIC NO") {
                      ChangePassword(); // Call ChangePassword function if setting is 'Change Password'
                    } else if (setting === "Personal Information") {
                      personalInformation(); // Call personalInformation function if setting is 'Personal Information'
                    }
                    handleCloseUserMenu(); // Close menu after an action
                  }}
                  sx={{ textAlign: "center", color: "#08080d" }}
                >
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
