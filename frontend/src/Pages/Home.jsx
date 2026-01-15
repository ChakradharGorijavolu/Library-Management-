import { Typography, Card, CardContent } from "@mui/material";
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/* ---------------- Search Bar Styles ---------------- */
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  padding: "4px 0",
  width: "100%",
  maxWidth: 350,
  marginBottom: "20px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));


/* ---------------- Smaller Card Style ---------------- */
const cardStyle = {
  flex: "1 1 calc(33% - 20px)",
  margin: "10px",
  minHeight: "90px",         // 🔥 reduced height
  borderRadius: "10px",
  backgroundColor: "#87CEEB", // Sky Blue
  color: "#033256",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
};

export default function Home() {
  const { state } = useContext(AuthContext);
  const cards = [
    "Improve knowledge — read books",
    "Time pass — read books",
    "Tell stories to kids — read books",
    "Improve your learning — read books",
    "Develop creativity — read books",
    "Reduce stress — read books",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        <h4>Welcome  <span style={{ color: "#1976d2" }}> {state.user?.name} </span> to Library Management System</h4>
      </Typography>

      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
        
        {/* LEFT SIDE IMAGE - Perfect */}
        <div
          style={{
            flex: 1,
            background: "#f8f9ff",
            borderRadius: "15px",
            padding: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <img
            src="/images/homepage.jpg"
            alt="Library"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div style={{ flex: 1, padding: "20px" }}>
          
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInput placeholder="Search books…" />
          </SearchContainer>

          {/* ---------- Smaller Cards Section ---------- */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {cards.map((text, index) => (
              <Card key={index} sx={cardStyle}>
                <CardContent sx={{ padding: "10px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: 600 }}
                  >
                    {text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
