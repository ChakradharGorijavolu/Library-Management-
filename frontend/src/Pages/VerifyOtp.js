/*import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Paper, Typography, TextField, Stack, Button } from "@mui/material";

const otpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup.string().length(6, "OTP must be 6 digits").required("OTP is required")
});

function VerifyOtp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage("OTP Verified Successfully!");
        setErrorMessage("");

        // 🔥 Redirect to Reset Password page after 1 sec
        setTimeout(() => {
          window.location.href = "/reset-password";
        }, 1000);

        localStorage.setItem("resetEmail", data.email); // store email
      } else {
        setErrorMessage(result.error || "Invalid OTP");
      }
    } catch (error) {
      setErrorMessage("Cannot reach server.");
    }

    reset();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5">Verify OTP</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Email"
              variant="standard"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Enter OTP"
              variant="standard"
              {...register("otp")}
              error={!!errors.otp}
              helperText={errors.otp?.message}
            />
          </Stack>

          <Button variant="contained" color="success" type="submit" sx={{ mt: 3 }}>
            Verify OTP
          </Button>
        </form>

        {successMessage && <Typography sx={{ color: "green", mt: 2 }}>{successMessage}</Typography>}
        {errorMessage && <Typography sx={{ color: "red", mt: 2 }}>{errorMessage}</Typography>}
      </Paper>
    </Box>
  );
}

export default VerifyOtp;   */
