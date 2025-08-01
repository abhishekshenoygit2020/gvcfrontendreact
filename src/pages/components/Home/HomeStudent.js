import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Link, Outlet, NavLink } from "react-router-dom";
import AppDrawer from '../Sidebar/SideBarAdminD';
import SidebarUser from '../Sidebar/SidebarUser';
import SidebarDealership from '../Sidebar/SideBarDealership';
import ApplicationStore from '../../../utils/localStorageUtil';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MainContent from './MainD';
import ResponsiveAppBar from '../Sidebar/AppBarMI';
import Container from '@mui/material/Container';
// import "./Home.css";



const HomeAdmin = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const userType = ApplicationStore().getStorage('user_type');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(240);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
      setDrawerWidth(240);
      setSidebarOpen(true);
    }
  };

  const handleToggle = () => {
    const newSidebarState = !sidebarOpen;
    setSidebarOpen(newSidebarState);
    setDrawerWidth(newSidebarState ? 240 : userType == "admin" ? 135 : 105);
  };

  useEffect(() => {
    document.body.style.overflow = 'auto'; // enable scroll
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ResponsiveAppBar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} handleToggle={handleToggle} sidebarOpen={sidebarOpen} />
      <div >
        {/* Conditional rendering for Sidebar based on userType */}
        {userType === "admin" ? (
          <>
            <IconButton
              onClick={() => {
                const isOpen = sidebarOpen || mobileOpen;
                setSidebarOpen(!isOpen);
                setMobileOpen(!isOpen);
                setDrawerWidth(!isOpen ? 240 : userType === 'admin' ? 135 : 105);
              }}
              sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                // display: "none",
                zIndex: 1301, // Above sidebar
                pointerEvents: 'auto',
                backgroundColor: 'grey',
                boxShadow: 2,
                color: '#333', // Dark grey icon color
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              {(sidebarOpen || mobileOpen) ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
            <Box
              className='scrollableNew'
              component="nav"
              sx={{
                width: { xs: '100%', sm: drawerWidth }, // Full width on extra-small screens (mobile), fixed 240px on larger screens
                flexShrink: { sm: 0 },
                // "display": sidebarOpen ? "block" : "none"
              }}
            >
              {/* Admin Sidebar */}
              <AppDrawer
                mobileOpen={mobileOpen}
                handleDrawerClose={() => setMobileOpen(false)}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                drawerWidth={drawerWidth}
                sidebarOpen={sidebarOpen}
                sx={{
                  width: { sm: 240 },
                  flexShrink: 0,
                  position: { sm: 'fixed' }, // Fixed on larger screens
                  height: '100vh',

                }}
              />
            </Box>
          </>

        ) : userType == "dealership" ?
          (
            <Box
              component="nav"
              sx={{
                width: { xs: '100%', sm: drawerWidth },
                flexShrink: { sm: 0 },
              }}
            >
              {/* Dealership Sidebar */}
              <SidebarDealership
                mobileOpen={mobileOpen}
                handleDrawerClose={() => setMobileOpen(false)}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                drawerWidth={drawerWidth}
                sidebarOpen={sidebarOpen}
                sx={{
                  width: { sm: 240 },
                  flexShrink: 0,
                  position: { sm: 'fixed' }, // Fixed on larger screens
                  height: '100vh',
                }}
              />
            </Box>
          ) : userType == "manager" ?
            (
              <Box
                component="nav"
                sx={{
                  width: { xs: '100%', sm: drawerWidth },
                  flexShrink: { sm: 0 },
                }}
              >
                {/* Dealership Sidebar */}
                <SidebarDealership
                  mobileOpen={mobileOpen}
                  handleDrawerClose={() => setMobileOpen(false)}
                  handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                  drawerWidth={drawerWidth}
                  sidebarOpen={sidebarOpen}
                  sx={{
                    width: { sm: 240 },
                    flexShrink: 0,
                    position: { sm: 'fixed' }, // Fixed on larger screens
                    height: '100vh',
                  }}
                />
              </Box>
            ) : (
              <Box
                component="nav"
                sx={{
                  width: { xs: '100%', sm: drawerWidth },
                  flexShrink: { sm: 0 },
                }}
              >
                {/* User Sidebar */}
                <SidebarUser
                  mobileOpen={mobileOpen}
                  handleDrawerClose={() => setMobileOpen(false)}
                  handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                  drawerWidth={drawerWidth}
                  sidebarOpen={sidebarOpen}
                  sx={{
                    width: { sm: 240 },
                    flexShrink: 0,
                    position: { sm: 'fixed' }, // Fixed on larger screens
                    height: '100vh',
                  }}
                />
              </Box>
            )}
      </div>


      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // position: { sm: 'absolute' }, // Fixed on larger screens
          // marginLeft: { sm: 240 }, // Push content to the right of the sidebar on larger screens
          padding: { xs: 1, sm: 6 }, // Less padding on mobile, more on larger screens
          width: { xs: '100%', sm: `calc(100% - 240px)` }, // Full width on mobile, adjusted on larger screens
        }}
      >
        <Container maxWidth={false} disableGutters className='scrollable'>
          <Outlet />
          {/* <MainContent /> */}
        </Container>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#f8f9fa', // Subtle background
          padding: '5px', // Top and bottom padding
          boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
          fontSize: '14px', // Adjust font size for a professional look
          color: '#6c757d', // Muted text color
          fontFamily: 'Arial, sans-serif', // Clean font style
          letterSpacing: '0.5px', // Slight letter spacing for readability
          height: '40px',
          display: "none"
        }}
      >
        <span>Web Application developed by <strong>Alham Webtech</strong></span>
      </Box>
    </Box>
  );
};

HomeAdmin.propTypes = {
  window: PropTypes.func,
};

export default HomeAdmin;
