import React, { useState } from "react";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../validations/authSchemas";
import { useTheme } from "@mui/material/styles";
import { Typography, Paper, Box, TextField, Stack, Button } from "@mui/material";

function Registration() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [showRules, setShowRules] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      alert("✅ " + response.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setSuccessMessage("❌ " + (error.response.data.error || "Registration failed"));
      } else {
        setSuccessMessage("❌ Unable to connect to server");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        placeItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 6,
          minWidth: 380,
          borderRadius: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4">Sign Up</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>

            <TextField
              label="Name"
              variant="standard"
              required
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              variant="standard"
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Mobile No"
              variant="standard"
              required
              {...register("mobileno")}
              error={!!errors.mobileno}
              helperText={errors.mobileno?.message}
            />

           <>
  <TextField
    label="Password"
    type="password"
    variant="standard"
    required
    {...register("password")}
    onFocus={() => setShowRules(true)}
    onBlur={() => setShowRules(false)}
    error={!!errors.password}
    
  />

  {showRules && (
    <ul style={{
      textAlign: "left",
      paddingLeft: "10px",
      marginTop: "6px",
      paddingBottom: "10px",
    }}>
      <li style={{ color: watch("password")?.length >= 8 ? "green" : "red", fontSize: "12px" }}>
        Minimum 8 characters
      </li>
      <li style={{ color: /[A-Za-z]/.test(watch("password")) ? "green" : "red", fontSize: "12px" }}>
        Must contain at least 1 alphabet
      </li>
      <li style={{ color: /\d/.test(watch("password")) ? "green" : "red", fontSize: "12px" }}>
        Must contain at least 1 number
      </li>
      <li style={{ color: /[@$!%*?#_&]/.test(watch("password")) ? "green" : "red", fontSize: "12px" }}>
        Must contain at least 1 special character (@$!%*?#_&)
      </li>
    </ul>
  )}

  {errors.password && !showRules && (
    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
      {errors.password.message}
    </p>
  )}
</>


          </Stack>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Register
          </Button>
        </form>

        {successMessage && (
          <Typography sx={{ color: "green", mt: 2, fontWeight: 500 }}>
            {successMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Registration;
