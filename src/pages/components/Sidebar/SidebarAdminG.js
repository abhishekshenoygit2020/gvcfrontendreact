import React from 'react';

import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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
// import LOGO from "./../../../../src/Images/CarLogo.png";
// import LOGO from "../../../../src/Images/CarLogoNEW.png";
import UserLogo from "../../../../src/Images/user.png";
import CloseWarrantyLogo from "../../../../src/Images/Closed Warantee.png";
import DashbordLogo from "../../../../src/Images/Dashboard.png";
import DealershipLogo from "../../../../src/Images/Dealership.png";
import pendingWarrantyLogo from "../../../../src/Images/Pending Warantee.png";
import BW from "../../../../src/Images/BW.png";
import BuildWarrantyLogo from "../../../../src/Images/Build Warantee.png";
import warrantyproduct from "../../../../src/Images/Warantee Product.png";
import subCat from "../../../../src/Images/Sub cat.png";
import category from "../../../../src/Images/Category.png";
import LOGO from "../../../../src/Images/carCanada.png";
import ApplicationStore from '../../../utils/localStorageUtil';
import { useAuthContext } from '../../../context/AuthContext';
// import "./SideBarNew.css";
const drawerWidth = 280;

// Styled NavLink with conditional active class
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: green; /* Text color */
  &.active {
    background-color: #0e0e29; /* Highlight active link */
    color: white; /* Text color for active link */
  }
  &:hover {
    background-color: #004d00; /* Dark green hover effect */
  }
`;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  height: '100px',
  ...theme.mixins.toolbar,
}));



const AppDrawerSidebar = ({ mobileOpen, handleDrawerClose, handleDrawerTransitionEnd, window }) => 
{
  const { sidebarItemIndex, setSidebarItemIndex } = useAuthContext();
  const sidebarIndex = ApplicationStore().getStorage('sideBarIndex');
  const container = window !== undefined ? () => window().document.body : undefined;
  // const [sidebarItemIndex, setSidebarItemIndex] = React.useState(sidebarIndex);
  const [sidebarSettingsIndex, setSidebarSettingsIndex] = React.useState(-1);


  const [openMenus, setOpenMenus] = React.useState({});

  const toggleSubMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };



  const menuItemsAdmin = [
    {
      path: "/Dashboard",
      name: "Dashboard",
    },
    {
      path: "/Users",
      name: "Users",
    },
   
    {
      name: "Reports",
      icon: <BarChartIcon />,
      children: [
        {
          path: "/reports/Users",
          name: "Sales",
          icon: <DescriptionIcon />,
        },
        {
          path: "/reports/Users",
          name: "Traffic",
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      path: "/ViewSalesrep",
      name: "Sales",
    },
    {
      path: "/ViewWarrantyProduct",
      name: "Warranty Products",
    },
    {
      path: "/ViewCategory",
      name: "Category",
    },
    {
      path: "/ViewSubCategory",
      name: "Subcategory",
    },
    {
      path: "/ViewwarrantyPro",
      name: "Warranty Protection",
    },
    {
      path: "/ViewDealership",
      name: "Dealership",
    },
    {
      path: "/BuildWarranty",
      name: "Build Warranty",
    },
    {
      path: "/ViewPendingWarranty",
      name: "Pending Warranty",
    },
    {
      path: "/ViewClosedWarranty",
      name: "Closed Warranty",
    },
    {
      path: "/LogList",
      name: "Logs",
    },
  ];

  const menuItemsSettings = [
    // {
    //   path: "/BuildWarranty",
    //   name: "Build Warranty",
    // },
    // {
    //   path: "/ViewPendingWarranty",
    //   name: "Pending Warranty",
    // },
    // {
    //   path: "/ViewClosedWarranty",
    //   name: "Closed Warranty",
    // },
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
      {/* <List>
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
                ApplicationStore().setStorage('sideBarIndex', index);
                setSidebarSettingsIndex(-1);
              }}
              sx={{ padding: '5px' }}
            >
              <ListItemButton
                sx={{
                  color: index === sidebarItemIndex ? '#0d2365' : 'grey', // navy blue color
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
                    index == 0 ? <img src={DashbordLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                      index == 1 ? <img src={UserLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                        index == 2 ? <img src={warrantyproduct} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                          index == 3 ? <img src={category} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                            index == 4 ? <img src={subCat} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                              index == 6 ? <img src={DealershipLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                                index == 5 ? <img src={BuildWarrantyLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                                  index == 7 ? <img src={BW} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                                    index == 8 ? <img src={pendingWarrantyLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                                      index == 9 ? <img src={CloseWarrantyLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} /> :
                                        <img src={CloseWarrantyLogo} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} />
                  }
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    minWidth: '40px',
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </StyledLink>
        ))}
      </List> */}

<List>
  {menuItemsAdmin.map((item, index) => {
    const isActive = sidebarItemIndex === index;

    // Handle items with children (like Reports)
    if (item.children) {
      return (
        <div key={item.name}>
          <ListItem disablePadding onClick={() => toggleSubMenu(item.name)}>
            <ListItemButton
              sx={{
                color: 'grey',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: 'rgb(231 231 231)',
                  color: '#08080d',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
              {openMenus[item.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMenus[item.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((subItem) => (
                <StyledLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <ListItemButton
                          sx={{
                            pl: 4,
                            color: 'grey',
                            '&:hover': {
                              backgroundColor: 'rgb(231 231 231)',
                              color: '#08080d',
                            },
                          }}
                        >
                        <ListItemIcon sx={{ color: 'grey' }}>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.name} />
                  </ListItemButton>
                </StyledLink>
              ))}
            </List>
          </Collapse>
        </div>
      );
    }

    // Regular item
    return (
      <StyledLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <ListItem
          disablePadding
          onClick={() => {
            setSidebarItemIndex(index);
            ApplicationStore().setStorage('sideBarIndex', index);
            setSidebarSettingsIndex(-1);
          }}
          sx={{ padding: '5px' }}
        >
          <ListItemButton
            sx={{
              color: isActive ? '#0d2365' : 'grey',
              backgroundColor: isActive ? 'rgb(231 231 231)' : '',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: 'rgb(231 231 231)',
                color: '#08080d',
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive ? '#0d2365' : 'grey' }}>
              {
                index === 0 ? <img src={DashbordLogo} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 1 ? <img src={UserLogo} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 3 ? <img src={category} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 4 ? <img src={subCat} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 5 ? <img src={BuildWarrantyLogo} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 6 ? <img src={DealershipLogo} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 7 ? <img src={BW} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 8 ? <img src={pendingWarrantyLogo} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                index === 9 ? <img src={CloseWarrantyLogo} alt="Logo" style={{ height: '18px', width: '20px' }} /> :
                <img src={warrantyproduct} alt="Logo" style={{ height: '18px', width: '20px' }} />
              }
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      </StyledLink>
    );
  })}
</List>

<Divider sx={{ borderColor: 'white', borderBottomWidth: 2 }} />
      

      {/* Code for the menu to open when mobile version....*/}
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
                  color: index === sidebarSettingsIndex ? '#0d2365' : 'grey', // navy blue color
                  backgroundColor: index === sidebarSettingsIndex ? 'rgb(231 231 231)' : '',
                  borderRadius: '10px',
                  fontweight: 500,
                  '&:hover': {
                    backgroundColor: 'rgb(231 231 231)', // Change background on hover
                    color: '#08080d', // Change text color on hover
                  },
                }}
              >
                <ListItemIcon sx={{ color: index === sidebarSettingsIndex ? '#0d2365' : 'grey' }}>
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
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      <Drawer
        
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': 
          {
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
          '& .MuiDrawer-paper': 
          {
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




AppDrawerSidebar.propTypes = {
  window: PropTypes.func,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerTransitionEnd: PropTypes.func.isRequired,
};

export default AppDrawerSidebar;