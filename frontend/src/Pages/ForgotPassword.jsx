import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import { Typography, Paper, Box, TextField, Stack, Button } from "@mui/material";

const otpschema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

function ForgotPassword() {
  const theme = useTheme();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset,} = useForm({
    resolver: yupResolver(otpschema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage(result.message);
        setErrorMessage("");
      } else {
        setErrorMessage(result.error || "Something went wrong");
        setSuccessMessage("");
      }
    } catch (error) {
  if (error.response) {
    setErrorMessage(error.response.data.error || "Server error");
  } else if (error.request) {
    setErrorMessage("Unable to reach server. Please try again.");
  } else {
    setErrorMessage("Unexpected error occurred.");
  }
}

    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 6,
          minWidth: 320,
          borderRadius: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5">Forgot Password</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: 3 }}
          >
            Send OTP
          </Button>
        </form>

        {successMessage && (
          <Typography sx={{ color: "green", mt: 2, fontWeight: 500 }}>
            {successMessage}
          </Typography>
        )}

        {errorMessage && (
          <Typography sx={{ color: "red", mt: 2, fontWeight: 500 }}>
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
