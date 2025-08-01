import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link, Outlet, NavLink } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';
import PropTypes from 'prop-types';
import { Box, Collapse, Toolbar, Stack, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

const drawerWidth = 240;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AppDrawerSidebar = ({ mobileOpen, handleDrawerClose, handleDrawerTransitionEnd, window }) => {
  const [openVendor, setOpenVendor] = useState(false);

  const handleClickVendor = () => {
    setOpenVendor(!openVendor);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const menuItemsAdmin = [
    {
      path: "/AddCompany",
      name: "Company",
      // icon:<DashboardCustomizeIcon />
      // openState: false,
      // icon:<ReportIcon />
      // childrens: [
      //     {
      //         path: "/AddCompany",
      //         name: "Add Company",
      //         // icon: <AddIcon />
      //     },
      //     {
      //         path: "/ViewCompany",
      //         name: "View Company",
      //         // icon: <ViewIcon />
      //     },
      // ],
    },
    // {
    //   path: "/AddMedicine",
    //   name: "Medicine",
    //   icon:<DashboardCustomizeIcon />
    //   openState: false,
    //   // icon:<ReportIcon />
    //   childrens: [
    //       {
    //           path: "/AddMedicine",
    //           name: "Add Medicine",
    //           // icon: <AddIcon />
    //       },
    //       {
    //           path: "/ViewMedicine",
    //           name: "View Medicine",
    //           // icon: <ViewIcon />
    //       },
    //   ],
    // },
    // {
    //   path: "/AddPharmacy",
    //   name: "Pharmacy",
    //   icon:<DashboardCustomizeIcon />,
    //   openState: false,
    //   // icon:<ReportIcon />
    //   childrens: [
    //       {
    //           path: "/AddPharmacy",
    //           name: "Add Pharmacy",
    //           // icon: <AddIcon />
    //       },
    //       {
    //           path: "/ViewPharmacy",
    //           name: "View Pharmacy",
    //           // icon: <ViewIcon />
    //       },
    //   ],
    // },
    {
      path: "/AddDistrict",
      name: "District",
      // openState: false,
      // // icon:<DomainIcon />
      // childrens: [
      //     {
      //         path: "/AddDistrict",
      //         name: "Add District",
      //         // icon: <AddIcon />
      //     },
      //     {
      //         path: "/ViewDistrict",
      //         name: "View District",
      //         // icon: <ViewIcon />
      //     },
      // ],
    },

    // {
    //   path: "/ViewUser",
    //   name: "User",
    //   // icon:<ChecklistRtlIcon />
    // },

    // {
    //   path: "/ViewComplaint",
    //   name: "Complaint",
    //   // icon:<LockResetSharpIcon />
    // },
    // {
    //   path: "/ChangePassword",
    //   name: "Settings",
    //   // icon:<AddAlertIcon />
    // },
  ];


  const drawerContent = (
    <div>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'inline-flex' }}>
          {/* <Logo color="light" height={32} width={122} /> */}
          <Typography color="var(--mui-palette-neutral-400)" variant="body2">
            LOGO
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'var(--mui-palette-neutral-950)',
            border: '1px solid var(--mui-palette-neutral-700)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            p: '4px 12px',
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
              Workspace
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              Devias
            </Typography>
          </Box>
          <MailIcon />
        </Box>
      </Stack>
      <Divider />

      {/* <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Vehicles" />
          </ListItemButton>
        </ListItem>
       
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickVendor}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Vendor" />
            {openVendor ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openVendor} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Main Vendor" />
              </ListItemButton>
            </ListItem>
           
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Sub Vendor 1" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Sub Vendor 2" />
              </ListItemButton>
            </ListItem>
           
          </List>
        </Collapse>
      </List> */}
      <Divider />


      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      {menuItemsAdmin.map((item, index) => (
        <StyledLink to={item.path} key={item.path}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon ? item.icon : (index % 2 === 0 ? <InboxIcon /> : <MailIcon />)}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        </StyledLink>
      ))}
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
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
