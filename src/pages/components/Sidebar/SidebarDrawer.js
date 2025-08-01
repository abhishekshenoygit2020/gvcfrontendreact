import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from '../../../context/AuthContext';
import ApplicationStore from "../../../utils/localStorageUtil";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  zIndex: 1, // Correct the typo here
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  height: '100px',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// ... (previous code) ...

export default function SideBarDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubList, setOpenSubList] = React.useState(false);
  const { user, Logout, trackgeneration } = useAuthContext();
  const [sidebarIndex, setSidebarIndex] = React.useState(0);
  const user_type = ApplicationStore().getStorage('user_type');

  const handleSideBar = () => {
    setOpen(!open);
  };

  const [active, setActive] = React.useState(false);
  const menuItemsAdmin = [
    {
      path: "/Dashboard",
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
    {
      path: "/AddMedicine",
      name: "Medicine",
      // icon:<DashboardCustomizeIcon />
      // openState: false,
      // // icon:<ReportIcon />
      // childrens: [
      //     {
      //         path: "/AddMedicine",
      //         name: "Add Medicine",
      //         // icon: <AddIcon />
      //     },
      //     {
      //         path: "/ViewMedicine",
      //         name: "View Medicine",
      //         // icon: <ViewIcon />
      //     },
      // ],
    },
    {
      path: "/AddPharmacy",
      name: "Pharmacy",
      // icon:<DashboardCustomizeIcon />
      // openState: false,
      // // icon:<ReportIcon />
      // childrens: [
      //     {
      //         path: "/AddPharmacy",
      //         name: "Add Pharmacy",
      //         // icon: <AddIcon />
      //     },
      //     {
      //         path: "/ViewPharmacy",
      //         name: "View Pharmacy",
      //         // icon: <ViewIcon />
      //     },
      // ],
    },
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

    {
      path: "/ViewUser",
      name: "User",
      // icon:<ChecklistRtlIcon />
    },

    {
      path: "/ViewComplaint",
      name: "Complaint",
      // icon:<LockResetSharpIcon />
    },
    {
      path: "/ChangePassword",
      name: "Settings",
      // icon:<AddAlertIcon />
    },
  ];


  const handleSubList = () => {
    setOpenSubList(!openSubList);
  }


  return (
    <Drawer sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }} variant="permanent" open={open}>
      <DrawerHeader></DrawerHeader>
      <Divider />
      <List style={{ padding: '10px' }}>
        {user_type === "admin"
          ? menuItemsAdmin.map((text, index) => (
            text.childrens ? (
              <div key={text.name}>
                <Link to={text.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(index)}>
                  <ListItem disablePadding sx={{ display: 'block', backgroundColor: index === sidebarIndex ? '#0745bbf0' : '', }}>
                    <ListItemButton
                      sx={{
                        minHeight: 50,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        "&:hover": {
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: index === sidebarIndex ? 'white' : '#0745bbf0',
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0, color: index === sidebarIndex ? 'white' : '#0745bbf0' }} />
                      {text.childrens ? (
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: index === sidebarIndex ? 'white' : '#0745bbf0',
                          }}
                        >
                          <IconButton onClick={() => handleSubList(index)} style={{ color: "white" }}>
                            {openSubList && sidebarIndex === index ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                          </IconButton>
                        </ListItemIcon>
                      ) : ""}
                    </ListItemButton>
                  </ListItem>
                </Link>
                {text.childrens && openSubList && sidebarIndex === index ? (
                  text.childrens.map((childText, childIndex) => (
                    <Link to={childText.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(childIndex)}>
                      <ListItem key={childText} disablePadding sx={{ display: 'block', height: 50 }} >
                        <ListItemButton
                          sx={{
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            bgcolor: childIndex === sidebarIndex ? "rgba(255, 255, 255, 0.04)" : "",
                            borderRadius: open ? '10px' : '',
                            "&:hover": {
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                              color: childIndex === sidebarIndex ? 'white' : '#0745bbf0',
                            }}
                          >
                            {/* Add appropriate icons here */}
                          </ListItemIcon>
                          <ListItemText primary={childText.name} sx={{ opacity: open ? 1 : 0, color: childIndex === sidebarIndex ? 'white' : '#0745bbf0' }} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))
                ) : null}
              </div>
            ) : (
              <Link to={text.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(index)}>
                <ListItem disablePadding sx={{ display: 'block', backgroundColor: index === sidebarIndex ? '#0745bbf0' : '', }}>
                  <ListItemButton
                    sx={{
                      minHeight: 50,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      "&:hover": {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: index === sidebarIndex ? 'white' : '#0745bbf0',
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0, color: index === sidebarIndex ? 'white' : '#0745bbf0' }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          ))
          : user_type === ""
        }
      </List>
      <Divider />
    </Drawer>
  );
}
