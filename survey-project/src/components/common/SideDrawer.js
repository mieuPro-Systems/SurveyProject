import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupsIcon from "@mui/icons-material/Groups";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_CURRENT_USER } from "../../actions/types";
import AlertDialog from "./Modal";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerComponent() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [Color, setColor] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logoutClickHandler = () => {
    handleModalClickOpen();
  };

  const EmployeeIcons = [
    <GroupAddIcon />,
    <PeopleIcon />,
    <PersonAddAlt1Icon />,
    <GroupsIcon />,
  ];
  const EmployeeRoutes = [
    "addemployee",
    "viewemployees",
    "addfarmer",
    "viewfarmer",
  ];
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // modal
  const [modal, setModal] = React.useState(false);

  const handleModalClickOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const setConfirm = () => {
    dispatch({ type: SET_CURRENT_USER, payload: {} });
    localStorage.removeItem("faFaCoUserDetail");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "green" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            FaFaCo.
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={logoutClickHandler}
            edge="end"
            style={{ marginRight: 5, float: "right", marginLeft: "auto" }}
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Add Employee", "View Employee", "Add Farmer", "View Farmer"].map(
            (text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  if (EmployeeRoutes[index] === "addfarmer") {
                    navigate(EmployeeRoutes[index], {
                      state: { update: false },
                    });
                  } else {
                    navigate(EmployeeRoutes[index]);
                  }
                  setColor(index);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: Color === index ? "green" : "",
                  }}
                >
                  {
                    <Tooltip title={text} placement="right-end">
                      {EmployeeIcons[index]}
                    </Tooltip>
                  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      <AlertDialog
        modal={modal}
        handleModalClose={handleModalClose}
        handleModalClickOpen={handleModalClickOpen}
        modalMessage={"Are you sure want to Logout?"}
        modalTitle={"Logout"}
        setConfirm={setConfirm}
      />
    </Box>
  );
}
