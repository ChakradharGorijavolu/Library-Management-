import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/authSchemas";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {Typography, Paper, Box, TextField, Stack, Button,} from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Reducers/userInfoReducer";

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { dispatch: authDispatch } = useContext(AuthContext);
  const reduxDispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/lib");
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      const result = response.data;
      setSuccessMessage("Login Successful!");
      localStorage.setItem("token", "userLoggedIn");
      localStorage.setItem("user", JSON.stringify(result.user));

      authDispatch({
        type: "LOGIN",
        payload: result.user,
      });

  
      reduxDispatch(
        setUser({
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        })
      );

      navigate("/lib");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error || "Invalid credentials");
      } else {
        alert("Network error. Server not reachable.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
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
        <Typography variant="h4">Sign In</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="standard"
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              variant="standard"
              required
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Stack>

          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Log In
          </Button>

          <Typography
            sx={{ mt: 2, color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Typography>
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

export default Login;
