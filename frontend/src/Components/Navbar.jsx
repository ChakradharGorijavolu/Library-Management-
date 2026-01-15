import * as React from "react";
import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Theme/ThemeContext";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../Redux/Reducers/userInfoReducer";
import { selectCartItems } from "../Redux/Selectors/cartSelector";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const { isAuthenticated } = useSelector((state) => state.user);

  // CART COUNT
  const cartItems = useSelector(selectCartItems);
  const cartCount = Object.values(cartItems).reduce((sum, it) => sum + it.qty, 0);

  // Load user from localStorage (ONLY once)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: 50, justifyContent: "center" }}>
        <Toolbar variant="dense">
          <Stack direction="row" spacing={5} sx={{ flexGrow: 1, marginRight: 2 }}>
            <Typography>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </Typography>

            {isAuthenticated && (
              <>
                <Typography>
                  <Link to="/lib" style={{ color: "white", textDecoration: "none" }}>
                    Library
                  </Link>
                </Typography>

                <Typography>
                  <Link to="/books" style={{ color: "white", textDecoration: "none" }}>
                    Books
                  </Link>
                </Typography>
              </>
            )}
          </Stack>

          {/* AUTH BUTTONS */}
          {!isAuthenticated && (
            <>
              <Typography sx={{ marginRight: 2 }}>
                <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                  Register
                </Link>
              </Typography>

              <Typography>
                <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
            </>
          )}

          {/* MENU BUTTON */}
          {isAuthenticated && (
            <div>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ marginLeft: 2, minWidth: 0 }}
              >
                <MenuIcon sx={{ fontSize: 28, color: "white" }} />
              </Button>

              {/* FIXED: SINGLE MENU ONLY */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/profile");
                  }}
                >
                  <PersonIcon style={{ marginRight: "8px" }} /> Profile
                </MenuItem>

                {/* MY CART */}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/Mycart");
                  }}
                >
                  <ShoppingCartIcon style={{ marginRight: "8px" }} /> My Cart ({cartCount})
                </MenuItem>

                {/* THEME SWITCH */}
                <MenuItem onClick={toggleTheme}>
                  {mode === "light" ? (
                    <>
                      <DarkModeIcon style={{ marginRight: "8px" }} /> Dark Mode
                    </>
                  ) : (
                    <>
                      <LightModeIcon style={{ marginRight: "8px" }} /> Light Mode
                    </>
                  )}
                </MenuItem>

                {/* Downloads */}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/downloads");
                  }}
                >
                  <DownloadIcon style={{ marginRight: "8px" }} /> Downloads
                </MenuItem>

                {/* Logout */}
                <MenuItem
                  sx={{ color: "red" }}
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
