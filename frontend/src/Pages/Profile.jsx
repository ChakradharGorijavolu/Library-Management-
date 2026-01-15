import React from "react";
import { Card,CardContent,Typography,Avatar,Button,Stack,Box,} from "@mui/material";
import { useSelector } from "react-redux";
import { getUserName, getUserEmail, getUserId } from "../Redux/Selectors/userInfoSelector";

export default function Profile() {

  const userid = useSelector(getUserId);
  const userName = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  

  if (!email) {
    return (
      <Typography
        sx={{
          mt: 5,
          textAlign: "center",
          fontWeight: 600,
          color: "#1565c0",
        }}
      >
        Please login to view your profile.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: 500,
          borderRadius: 5,
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: 140,
            background: "linear-gradient(135deg, #1e88e5, #1565c0)",
          }}
        />

        <CardContent sx={{ textAlign: "center", mt: -8 }}>
         
          <Avatar
            sx={{
              width: 130,
              height: 130,
              margin: "auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              border: "4px solid white",
            }}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>ID : {userid}</Typography>
          <Typography variant="h6">Name : {userName}</Typography>
          <Typography variant="h6">Email : {email}</Typography>


          <Stack direction="row" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                padding: "10px 30px",
                fontSize: "0.95rem",
                borderRadius: 3,
              }}
            >
              Edit Profile
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}