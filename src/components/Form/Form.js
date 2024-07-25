import React, { useState } from "react";
import "./Form.css";
import { styled } from "@mui/material/styles";
import Login from "./Login";
import Register from "./Register";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [alignment, setAlignment] = useState("login");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null && newAlignment !== alignment) {
      setAlignment(newAlignment);
      setIsLogin(newAlignment === "login");
    }
  };

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
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Form;
