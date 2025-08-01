import React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import LOGOimg from "./../../../../src/Images/GVClogo.png";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import UserLogo from "../../../../src/Images/user.png";
import CloseWarrantyLogo from "../../../../src/Images/Closed Warantee.png";
import DashbordLogo from "../../../../src/Images/Dashboard.png";
import DealershipLogo from "../../../../src/Images/Dealership.png";
import pendingWarrantyLogo from "../../../../src/Images/Pending Warantee.png";
import BuildWarrantyLogo from "../../../../src/Images/Build Warantee.png";
import Salesrep01 from "../../../../src/Images/Icons/Salesrep Commission Area-01.png";
// import LOGO from "./../../../../src/Images/CarLogo.png";
import ApplicationStore from '../../../utils/localStorageUtil';
import LOGO from "../../../../src/Images/carCanada.png";

const drawerWidth = 240;

// Styled NavLink with conditional active class
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white; /* Text color */
  &.active {
    background-color: #0e0e29; /* Highlight active link */
    color: white; /* Text color for active link */
  }
  &:hover {
    background-color: #004d00; /* Dark green hover effect */
  }
`;

const SidebarDealership = ({ mobileOpen, handleDrawerClose, handleDrawerTransitionEnd, window }) => {
  const container = window !== undefined ? () => window().document.body : undefined;
  const [sidebarItemIndex, setSidebarItemIndex] = React.useState(0);
  const [sidebarSettingsIndex, setSidebarSettingsIndex] = React.useState(-1);
  const dealershipNew = ApplicationStore().getStorage('dealership');
  const menuItemsAdmin = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: (
        <img
          src={DashbordLogo}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      )
    },
    {
      path: "/Users",
      name: "Sales Users",
      icon: (
        <img
          src={UserLogo}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      )
    },
    {
      path: "/BuildWarranty",
      name: "Build Warranty",
      icon: (
        <img
          src={BuildWarrantyLogo}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      )
    },
    {
      path: "/ViewPendingWarranty",
      name: "Pending Warranty",
      icon: (
        <img
          src={pendingWarrantyLogo}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      )
    },
    {
      path: "/ViewClosedWarranty",
      name: "Closed Warranty",
      icon: (
        <img
          src={CloseWarrantyLogo}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      )
    },
    // {
    //   path: "/ViewRestoreWarranty",
    //   name: "Recycle Bin",
    //   icon: <RestoreFromTrashIcon />,
    // },

    ...(dealershipNew == "42" || dealershipNew == "48"
      ? [
        {
          path: "/ViewSalesrepCommission",
          name: "Sales Rep",
          icon: (
            <img
              src={Salesrep01}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          )
        },
      ]
      : []),
  ];

  const menuItemsSettings = [

  ];

  const drawerContent = (
    <div>
      <Stack spacing={2} sx={{ p: 3, margin: '20px 0' }}>
        <Box sx={{ display: 'inline-flex', }}>
          <Typography color="white" variant="body2">
            {/* <img src={LOGO} alt="Logo" style={{ margin: '20px 0', height: '100px', width: '100px' }} /> */}
          </Typography>
        </Box>
      </Stack>
      {/* <Divider sx={{ borderColor: 'white', borderBottomWidth: 2 }} /> */}
      <List>
        {menuItemsAdmin.map((item, index) => (
          <StyledLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <ListItem
              disablePadding
              onClick={() => {
                setSidebarItemIndex(index);
                setSidebarSettingsIndex(-1);
              }}
              sx={{ padding: '5px' }}
            >
              <ListItemButton
                sx={{
                  color: index === sidebarItemIndex ? '#000080' : 'grey', // navy blue color
                  backgroundColor: index === sidebarItemIndex ? 'rgb(231 231 231)' : '',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: 'rgb(231 231 231)', // Change background on hover
                    color: '#08080d', // Change text color on hover
                  },
                }}
              >
                <ListItemIcon sx={{ color: index === sidebarItemIndex ? '#0d2365' : 'grey' }}>
                  {
                   item.icon
                  }
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <Divider sx={{ borderColor: 'white', borderBottomWidth: 2 }} />
      <List>
        {menuItemsSettings.map((item, index) => (
          <StyledLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <ListItem
              disablePadding
              onClick={() => {
                setSidebarSettingsIndex(index);
                setSidebarItemIndex(-1);
              }}
              sx={{ padding: '0px' }}
            >
              <ListItemButton
                sx={{
                  color: index === sidebarSettingsIndex ? '#000080' : 'grey', // navy blue color
                  backgroundColor: index === sidebarSettingsIndex ? 'rgb(231 231 231)' : '',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: 'rgb(231 231 231)', // Change background on hover
                    color: '#08080d', // Change text color on hover
                  },
                }}
              >
                <ListItemIcon sx={{ color: index === sidebarSettingsIndex ? '#000080' : 'grey' }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'rgb(231 231 231)', /* Background color */
            color: 'black', /* Text color */
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            padding: '1%',
            backgroundColor: 'rgb(231 231 231 / 38%)', /* Background color */
            color: 'grey', /* Text color */
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

SidebarDealership.propTypes = {
  window: PropTypes.func,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerTransitionEnd: PropTypes.func.isRequired,
};

export default SidebarDealership;
