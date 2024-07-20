import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { grey, blue } from "@mui/material/colors";
import "./Form.css";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AnimatedPage from "./AnimatedPage";
import { useAuth } from "../../features/AuthContext";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [alignment, setAlignment] = useState("Login");
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null && newAlignment !== alignment) {
      setAlignment(newAlignment);
      setIsLogin(newAlignment === "login");
    }
  };

  const FormContainer = styled("div")({
    opacity: 0,
    transition: "opacity 1s ease, display 0s 1s",
    display: "none",
    "&.active": {
      opacity: 1,
      transition: "opacity 1s ease",
      display: "block",
    },
  });

  const ToggleButton = styled(MuiToggleButton)(() => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "transparent",
    },
    "&:not(.Mui-selected)": {
      color: "black",
      backgroundColor: "transparent",
    },
  }));

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const inputStyles = {
    "&:before": {
      borderBottomColor: "white", // normal state
      transition: "border-color 0.3s ease",
    },
    "&:after": {
      borderBottomColor: "white", // focused state
      transition: "border-color 0.3s ease",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white", // hover state
      transition: "border-color 0.3s ease",
    },
    input: {
      color: "white",
      transition: "color 0.3s ease",
    },
  };

  const labelStyles = {
    color: "white",
    transition: "color 0.3s ease",
    "&.Mui-focused": {
      color: "white", // focused label color
      transition: "color 0.3s ease",
    },
  };

  return (
    <div className="form-log">
      <div className="wrapper">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            value="login"
            selected={alignment === "login"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </ToggleButton>
          <ToggleButton
            selected={alignment === "register"}
            value="register"
            onClick={() => setIsLogin(false)}
          >
            Register
          </ToggleButton>
        </ToggleButtonGroup>
        <FormContainer className={isLogin ? "active" : ""}>
          <AnimatedPage>
            <form action="" onSubmit={handleLogin}>
              <TextField
                required
                id="standard-required"
                variant="standard"
                label="Email"
                color="primary"
                InputProps={{ sx: inputStyles }}
                InputLabelProps={{ sx: labelStyles }}
                sx={{ width: "300px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="standard-password"
                variant="standard"
                label="Password"
                margin="normal"
                InputProps={{ sx: inputStyles }}
                InputLabelProps={{ sx: labelStyles }}
                sx={{ width: "300px" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: grey[50],
                      "&.Mui-checked": {
                        color: blue[100],
                      },
                    }}
                    defaultChecked
                  />
                }
                label="Remember me"
              />
              <Link href="#" underline="hover" color="inherit">
                {"Forgot password?"}
              </Link>
              <Button
                variant="outlined"
                fullWidth
                href="#text-buttons"
                color="inherit"
                style={{ color: "#fff", fontFamily: "Poppins", fontSize: 16 }}
              >
                Login
              </Button>
              <Typography m={2}>
                Don't have an account?
                <Link
                  href="#"
                  underline="hover"
                  color="inherit"
                  onClick={() => {
                    setIsLogin(false);
                    setAlignment("register");
                  }}
                >
                  {" Register"}
                </Link>
              </Typography>
            </form>
          </AnimatedPage>
        </FormContainer>

        <FormContainer className={!isLogin ? "active" : ""}>
          <AnimatedPage>
            <form action="" onSubmit={handleRegister}>
              <TextField
                required
                id="standard-required"
                variant="standard"
                label="Name"
                color="primary"
                margin="normal"
                InputProps={{ sx: inputStyles }}
                InputLabelProps={{ sx: labelStyles }}
                sx={{ width: "300px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                id="standard-required"
                variant="standard"
                label="Email"
                color="primary"
                margin="normal"
                InputProps={{ sx: inputStyles }}
                InputLabelProps={{ sx: labelStyles }}
                sx={{ width: "300px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="standard-password"
                variant="standard"
                label="Password"
                margin="normal"
                InputProps={{ sx: inputStyles }}
                InputLabelProps={{ sx: labelStyles }}
                sx={{ width: "300px" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                color="inherit"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{
                  fontFamily: "Poppins",
                  display: "flex",
                  marginTop: 20,
                }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                href="#text-buttons"
                color="inherit"
                style={{ fontFamily: "Poppins", marginTop: 20, fontSize: 16 }}
              >
                Register
              </Button>
              <Typography m={2}>
                Already have an account?
                <Link
                  href="#"
                  underline="hover"
                  color="inherit"
                  onClick={() => {
                    setIsLogin(true);
                    setAlignment("login");
                  }}
                >
                  {" Login"}
                </Link>
              </Typography>
            </form>
          </AnimatedPage>
        </FormContainer>
      </div>
    </div>
  );
};

export default Form;
