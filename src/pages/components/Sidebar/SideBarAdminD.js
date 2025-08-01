import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import LOGOimg from "./../../../../src/Images/GVClogo.png";
// import LOGO from "./../../../../src/Images/CarLogo.png";
// import LOGO from "../../../../src/Images/CarLogoNEW.png";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import UserLogo from "../../../../src/Images/user.png";
import CloseWarrantyLogo from "../../../../src/Images/Closed Warantee.png";
import DashbordLogo from "../../../../src/Images/Dashboard.png";
import DealershipLogo from "../../../../src/Images/Dealership.png";
import DealershipProduct from "../../../../src/Images/dealershipProduct.png";
import salesRepProduct from "../../../../src/Images/salesrepProduct.png";
import pendingWarrantyLogo from "../../../../src/Images/Pending Warantee.png";
import warrantyPr from "../../../../src/Images/Warantee Protection.png";
import BW from "../../../../src/Images/BW.png";
import BuildWarrantyLogo from "../../../../src/Images/Build Warantee.png";
import warrantyproduct from "../../../../src/Images/Warantee Product.png";
import subCat from "../../../../src/Images/Sub cat.png";
import category from "../../../../src/Images/Category.png";
import Log from "../../../../src/Images/log.png";
import LOGO from "../../../../src/Images/carCanada.png";
import ApplicationStore from "../../../utils/localStorageUtil";
import { useAuthContext } from "../../../context/AuthContext";
import CommisionDetails01 from "../../../../src/Images/Icons/Commission details-01.png";
import Commission01 from "../../../../src/Images/Icons/Commission-01.png";
import Invoice01 from "../../../../src/Images/Icons/Invoice-01.png";
import GiftCard from "../../../../src/Images/Icons/Gift card-01.png";
import Pricing01 from "../../../../src/Images/Icons/Pricing-01.png";
import Relationshipmanager01 from "../../../../src/Images/Icons/Relationship Manager area-01.png";
import Salesrep01 from "../../../../src/Images/Icons/Salesrep Commission Area-01.png";
import Warrantypackage01 from "../../../../src/Images/Icons/Warantte Packagge-01.png";
import warranty01 from "../../../../src/Images/Icons/Warranty-01.png";
import NotificationsIcon from "@mui/icons-material/Notifications"; //notifications

import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";

// import "./SideBarNew.css";
// const drawerWidth = 240;

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: "100px",
  ...theme.mixins.toolbar,
}));

const AppDrawerSidebar = ({
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  window,
  drawerWidth,
  sidebarOpen,
}) => {
  // const { sidebarItemIndex, setSidebarItemIndex } = useAuthContext();
  const sidebarIndex = ApplicationStore().getStorage("sideBarIndex");
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [sidebarItemIndex, setSidebarItemIndex] = React.useState(sidebarIndex);
  const [sidebarSettingsIndex, setSidebarSettingsIndex] = React.useState(-1);
  const location = useLocation();
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
      path: "/ViewDealership",
      name: "Dealerships",
    },
    {
      path: "/RelationshipUserList",
      name: "Relationship Managers",
    },
    {
      path: "/Users",
      name: "Users",
    },
    {
      path: "/Notifications",
      name: "Notifications",
      icon: <NotificationsIcon />,
    },
    // {
    //   path: "/ViewSalesrep",
    //   name: "Sales Rep",
    // },

    // {
    //   path: "/ViewWarrantyProduct",
    //   name: "Customize Pricing",
    // },
    // {
    //   path: "/ViewDealershipWarrantyProduct",
    //   name: "Dealership Pricing",
    // },
    // {
    //   path: "/ViewSalesrepWarrantyProduct",
    //   name: "Sales Rep Pricing",
    // },
    // {
    //   path: "/ViewCategory",
    //   name: "Category",
    // },
    // {
    //   path: "/ViewSubCategory",
    //   name: "Subcategory",
    // },

    {
      name: "Warranty Packages",
      icon: (
        <img
          src={Warrantypackage01}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      ),
      children: [
        {
          path: "/ViewCategory",
          name: "Category",
          icon: (
            <img
              src={category}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
        {
          path: "/ViewSubCategory",
          name: "Subcategory",
          icon: (
            <img
              src={subCat}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
        {
          path: "/ViewwarrantyPro",
          name: "Warranty Protection",
          icon: (
            <img
              src={warrantyPr}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
        {
          path: "/ViewWarrantyProduct",
          name: "Warranty Products",
          icon: (
            <img
              src={warrantyproduct}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
      ],
    },
    {
      name: "Pricing ",
      icon: (
        <img
          src={Pricing01}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      ),
      children: [
        {
          path: "/WarrantyCustomiseProducts",
          name: "Customize Pricing",
          icon: (
            <img
              src={DashbordLogo}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
        {
          path: "/ViewDealershipWarrantyProduct",
          name: "Dealership Pricing",
          icon: (
            <img
              src={DealershipProduct}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
        {
          path: "/ViewSalesrepWarrantyProduct",
          name: "Sales Rep Pricing",
          icon: (
            <img
              src={salesRepProduct}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
        },
        {
          path: "/ViewSalesrepGiftCommission",
          icon: (
            <img
              src={GiftCard}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
          name: "Gift Card",
        },
      ],
    },
    {
      name: "Warranty",
      icon: (
        <img
          src={warranty01}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      ),
      children: [
        {
          path: "/BuildWarranty",
          name: "Build Warranty",
          icon: (
            <img
              src={BW}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
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
          ),
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
          ),
        },
        {
          path: "/ViewRestoreWarranty",
          name: "Recycle Bin",
          icon:<RestoreFromTrashIcon />,
        },
      ],
    },
    {
      name: "Commission",
      icon: (
        <img
          src={Commission01}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      ),
      children: [
        // {
        //   path: "/ViewCommissionPerc",
        //   icon: <img src={CommisionDetails01} alt="Logo" style={{ margin: '20px 0', height: '18px', width: '20px' }} />,
        //   name: "Commission Details",
        // },
        {
          path: "/ViewRelationshipCommission",
          icon: (
            <img
              src={Relationshipmanager01}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
          name: "Relationship Manager",
        },
        {
          path: "/ViewSalesrepCommission",
          icon: (
            <img
              src={Salesrep01}
              alt="Logo"
              style={{ margin: "20px 0", height: "18px", width: "20px" }}
            />
          ),
          name: "Sales Rep",
        },
      ],
    },

    // {
    //   path: "/ViewwarrantyPro",
    //   name: "Warranty Protection",
    // },

    // {
    //   path: "/BuildWarranty",
    //   name: "Build Warranty",
    // },
    // {
    //   path: "/ViewPendingWarranty",
    //   name: "Pending Warranty",
    // },
    {
      path: "/ViewInvoicingData",
      icon: (
        <img
          src={Invoice01}
          alt="Logo"
          style={{ margin: "20px 0", height: "18px", width: "20px" }}
        />
      ),
      name: "Invoicing",
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
      <Stack spacing={2} sx={{ p: 3, margin: "20px 0" }}>
        <Box sx={{ display: "inline-flex" }}>
          <Typography color="white" variant="body2">
            {/* <img src={LOGO} alt="Logo" style={{ margin: '20px 0', height: '100px', width: '100px' }} /> */}
          </Typography>
        </Box>
      </Stack>
      <List>
        {menuItemsAdmin.map((item, index) => {
          let isActive = sidebarItemIndex === item.name;

          // Handle items with children (like Reports)
          if (item.children) {
            return (
              <div key={item.name}>
                <ListItem
                  disablePadding
                  onClick={() => toggleSubMenu(item.name)}
                >
                  <Tooltip title={item.name} arrow>
                    <ListItemButton
                      // title={item.name}
                      sx={{
                        color: "grey",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "rgb(231 231 231)",
                          color: "#08080d",
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{ display: sidebarOpen ? "block" : "none" }}
                      />
                      {openMenus[item.name] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <Collapse
                  in={openMenus[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((subItem) => (
                      <StyledLink
                        key={subItem.path}
                        to={subItem.path}
                        // className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        <Tooltip title={subItem.name} arrow>
                          <ListItemButton
                            // title={item.name}
                            sx={{
                              pl: 4,
                              color:
                                location.pathname === subItem.path
                                  ? "#0d2365"
                                  : "grey",
                              backgroundColor:
                                location.pathname === subItem.path
                                  ? "rgb(231 231 231)"
                                  : "",
                              "&:hover": {
                                // backgroundColor: 'rgb(231 231 231)',
                                backgroundColor:
                                  sidebarItemIndex == subItem.name
                                    ? "rgb(231 231 231)"
                                    : "",
                                color: "#08080d",
                              },
                            }}
                            onClick={() => {
                              setSidebarItemIndex(item.name);
                              ApplicationStore().setStorage(
                                "sideBarIndex",
                                subItem.name
                              );
                              setSidebarSettingsIndex(-1);
                            }}
                          >
                            <ListItemIcon sx={{ color: "grey" }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.name}
                              sx={{ display: sidebarOpen ? "block" : "none" }}
                            />
                          </ListItemButton>
                        </Tooltip>
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
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <ListItem
                disablePadding
                onClick={() => {
                  setSidebarItemIndex(item.name);
                  ApplicationStore().setStorage("sideBarIndex", item.name);
                  setSidebarSettingsIndex(-1);
                }}
                sx={{ padding: "5px" }}
              >
                <Tooltip title={item.name} arrow>
                  <ListItemButton
                    // title={item.name}
                    sx={{
                      color: isActive ? "#0d2365" : "grey",
                      backgroundColor: isActive ? "rgb(231 231 231)" : "",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "rgb(231 231 231)",
                        color: "#08080d",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? "#0d2365" : "grey" }}>
                      {index === 0 ? (
                        <img
                          src={DashbordLogo}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 1 ? (
                        <img
                          src={DealershipLogo}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 2 ? (
                        <img
                          src={UserLogo}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 3 ? (
                        <img
                          src={UserLogo}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 5 ? (
                        <img
                          src={subCat}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 6 ? (
                        <img
                          src={BuildWarrantyLogo}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 7 ? (
                        <ReceiptIcon />
                      ) : index === 8 ? (
                        <img
                          src={Invoice01}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 9 ? (
                        <img
                          src={Log}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : index === 10 ? (
                        <img
                          src={CloseWarrantyLogo}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      ) : (
                        <img
                          src={Log}
                          alt="Logo"
                          style={{ height: "18px", width: "20px" }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ display: sidebarOpen ? "block" : "none" }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </StyledLink>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "white", borderBottomWidth: 2 }} />

      {/* Code for the menu to open when mobile version....*/}
      <List>
        {menuItemsSettings.map((item, index) => (
          <StyledLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <ListItem
              disablePadding
              onClick={() => {
                setSidebarSettingsIndex(index);
                setSidebarItemIndex(-1);
              }}
              sx={{ padding: "0px" }}
            >
              <Tooltip title={item.name} arrow>
                <ListItemButton
                  sx={{
                    color: index === sidebarSettingsIndex ? "#0d2365" : "grey", // navy blue color
                    backgroundColor:
                      index === sidebarSettingsIndex ? "rgb(231 231 231)" : "",
                    borderRadius: "10px",
                    fontweight: 500,
                    "&:hover": {
                      backgroundColor: "rgb(231 231 231)", // Change background on hover
                      color: "#08080d", // Change text color on hover
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        index === sidebarSettingsIndex ? "#0d2365" : "grey",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "inherit",
                      fontSize: "1rem",
                      display: sidebarOpen ? "block" : "none",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "rgb(231 231 231)" /* Background color */,
            color: "black" /* Text color */,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            padding: "1%",
            backgroundColor: "rgb(231 231 231 / 38%)" /* Background color */,
            color: "grey" /* Text color */,
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
