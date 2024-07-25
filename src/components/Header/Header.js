// Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../../features/AuthContext";
import "./Header.css";
import logo from "../../assets/img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header d-flex justify-content-between w-50">
      <div className="header_left d-flex align-items-center gap-2">
        <img src={logo} alt="Logo" width={50} height={50} />
        <h2>NAMAZ-APP</h2>
      </div>
      <div className="header_right d-flex align-items-center gap-2">
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.name?.charAt(0) || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          {user ? (
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Link to="/login">
                  <Button variant="outlined" color="inherit">
                    Login
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register">
                  <Button variant="outlined" color="inherit">
                    Register
                  </Button>
                </Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default Header;
