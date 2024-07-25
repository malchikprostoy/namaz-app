import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../features/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate(); // Use this to navigate after registration

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Add state to hold error messages

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.response?.data?.message || "Error registering");
    }
  };

  const inputStyles = {
    "&:before": {
      borderBottomColor: "black", // normal state
      transition: "border-color 0.3s ease",
    },
    "&:after": {
      borderBottomColor: "black", // focused state
      transition: "border-color 0.3s ease",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "black", // hover state
      transition: "border-color 0.3s ease",
    },
    input: {
      color: "black",
      transition: "color 0.3s ease",
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px transparent inset",
        WebkitTextFillColor: "black",
        transition: "background-color 5000s ease-in-out 0s",
      },
    },
  };

  const labelStyles = {
    color: "black",
    transition: "color 0.3s ease",
    "&.Mui-focused": {
      color: "black", // focused label color
      transition: "color 0.3s ease",
    },
  };

  return (
    <div className="form-log">
      <div className="wrapper">
        <Box
          component="form"
          autoComplete="off"
          noValidateaction=""
          onSubmit={handleRegister}
        >
          <Typography
            style={{ color: "black", fontFamily: "Poppins", fontSize: 30 }}
          >
            Register
          </Typography>
          {error && (
            <Typography color="error" style={{ marginBottom: "1rem" }}>
              {error}
            </Typography>
          )}
          <TextField
            required
            id="standard-required"
            variant="standard"
            label="Name"
            margin="normal"
            InputProps={{ sx: inputStyles }}
            InputLabelProps={{ sx: labelStyles, shrink: true }}
            sx={{ width: "300px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            variant="standard"
            label="Email"
            margin="normal"
            InputProps={{ sx: inputStyles }}
            InputLabelProps={{ sx: labelStyles, shrink: true }}
            sx={{ width: "300px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            id="standard-password"
            variant="standard"
            margin="normal"
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            InputProps={{
              sx: inputStyles,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ background: "transparent" }}
                  >
                    {showPassword ? (
                      <Visibility
                        style={{
                          color: "black",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        style={{
                          color: "black",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ sx: labelStyles, shrink: true }}
            sx={{ width: "300px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            style={{
              fontFamily: "Poppins",
              display: "flex",
              marginTop: 20,
              color: "black",
              borderColor: "black",
            }}
          >
            Upload file
          </Button>
          <Button
            variant="outlined"
            fullWidth
            type="submit"
            style={{
              color: "black",
              border: "1px solid #000",
              borderRadius: "5px",
              fontFamily: "Poppins",
              fontSize: 16,
              marginTop: 20,
              background: "transparent",
            }}
          >
            Register
          </Button>
          <Typography
            m={2}
            style={{
              color: "black",
              fontFamily: "Poppins",
            }}
          >
            Already have an account?
            <Link
              href="/login"
              underline="hover"
              style={{
                color: "black",
                fontFamily: "Poppins",
              }}
            >
              {" Login"}
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Register;
