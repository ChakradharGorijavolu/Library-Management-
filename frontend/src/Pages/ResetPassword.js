/*import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Paper, TextField, Typography, Stack, Button } from "@mui/material";

const resetSchema = yup.object().shape({
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

function ResetPassword() {
  const [message, setMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(resetSchema),
  });

  const onSubmit = async (data) => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setMessage("No email found. Restart process.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: data.password }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Password reset successfully.");
        localStorage.removeItem("resetEmail");
      } else {
        setMessage(result.error || "Error resetting password.");
      }
    } catch (error) {
      setMessage("Server unreachable.");
    }

    reset();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5">Reset Password</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <TextField
              type="password"
              label="New Password"
              variant="standard"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Stack>

          <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
            Reset Password
          </Button>
        </form>

        <Typography sx={{ mt: 2 }}>{message}</Typography>
      </Paper>
    </Box>
  );
}

export default ResetPassword;*/
