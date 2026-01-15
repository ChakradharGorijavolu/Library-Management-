// FULL WORKING BOOKS COMPONENT WITH REDUX CART

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../Redux/Reducers/cartReducer";

/* FIXED SIZE CARD */
const StyledCard = styled(Card)(() => ({
  width: "240px",
  height: "400px",
  borderRadius: "16px",
  overflow: "hidden",
  background: "#ffffff",
  border: "1px solid #eee",
  display: "flex",
  flexDirection: "column",
}));

/* Search Bar */
const SearchContainer = styled("div")(() => ({
  position: "relative",
  borderRadius: "25px",
  background: "#ffffff",
  width: 300,
  height: 42,
  border: "1px solid #ddd",
  display: "flex",
  alignItems: "center",
  paddingLeft: 42,
  paddingRight: 12,
}));

const StyledInput = styled(InputBase)(() => ({
  width: "100%",
  fontSize: "15px",
  color: "#333",
}));

export default function Books() {
  const dispatch = useDispatch();

  // ✅ FIX: Only ONE useSelector, OUTSIDE MAP
  const cartItems = useSelector((state) => state.cart.items);

  const [searchTerm, setSearchTerm] = useState("");

  const genPages = () => `${Math.floor(Math.random() * 230) + 70} pages`;
  const genStock = () => Math.floor(Math.random() * 6) + 3;

  const [books, setBooks] = useState([
    { id: 1, name: "The Good, the Bad & the True", pages: genPages(), price: 60, mrp: 80, stock: genStock(), img: "/images/book1.png" },
    { id: 2, name: "Your Body Already Knows", pages: genPages(), price: 65, mrp: 85, stock: genStock(), img: "/images/book2.png" },
    { id: 3, name: "Atomic Habits", pages: genPages(), price: 70, mrp: 90, stock: genStock(), img: "/images/book3.png" },
    { id: 4, name: "The Psychology of Money", pages: genPages(), price: 75, mrp: 95, stock: genStock(), img: "/images/book4.png" },
    { id: 5, name: "The Housemaid", pages: genPages(), price: 80, mrp: 100, stock: genStock(), img: "/images/book5.png" },
    { id: 6, name: "The 48 Laws of Power", pages: genPages(), price: 85, mrp: 105, stock: genStock(), img: "/images/book6.png" },
    { id: 7, name: "Tintin in Tibet", pages: genPages(), price: 90, mrp: 110, stock: genStock(), img: "/images/book7.png" },
    { id: 8, name: "Diary of a Wimpy Kid – Dog Days", pages: genPages(), price: 95, mrp: 115, stock: genStock(), img: "/images/book8.png" },
    { id: 9, name: "Before the Coffee Gets Cold", pages: genPages(), price: 100, mrp: 120, stock: genStock(), img: "/images/book9.png" },
    { id: 10, name: "House of Flame and Shadow", pages: genPages(), price: 110, mrp: 130, stock: genStock(), img: "/images/book10.png" },
    { id: 11, name: "And Then There Were None", pages: genPages(), price: 120, mrp: 140, stock: genStock(), img: "/images/book11.png" },
    { id: 12, name: "Demon Slayer", pages: genPages(), price: 130, mrp: 150, stock: genStock(), img: "/images/book12.png" },
  ]);

  const filteredBooks = books.filter((b) =>
    `${b.name} ${b.price}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const decreaseStock = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id && b.stock > 0 ? { ...b, stock: b.stock - 1 } : b
      )
    );
  };

  const increaseStock = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, stock: b.stock + 1 } : b))
    );
  };

  return (
    <Box sx={{ padding: "30px" }}>
      {/* Search */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <SearchContainer>
          <SearchIcon style={{ position: "absolute", left: 12 }} />
          <StyledInput
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Box>

      {/* GRID */}
      <Grid container spacing={3}>
        {filteredBooks.map((b) => {
          const qty = cartItems[b.id]?.qty || 0; // ❤️ Correct usage

          return (
            <Grid item key={b.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  image={b.img}
                  alt={b.name}
                  sx={{
                    height: "170px",
                    width: "100%",
                    objectFit: "contain",
                    background: "#fafafa",
                    padding: "10px",
                  }}
                />

                <CardContent
                  sx={{
                    height: "210px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontSize="15px" fontWeight={600}>
                    {b.name}
                  </Typography>

                  <Typography fontSize="13px" sx={{ color: "#666" }}>
                    {b.pages}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography fontSize="16px" fontWeight="bold">
                      ₹{b.price}
                    </Typography>
                    <Typography
                      fontSize="13px"
                      sx={{ ml: 1, textDecoration: "line-through", color: "#aaa" }}
                    >
                      ₹{b.mrp}
                    </Typography>
                  </Box>

                  <Typography fontSize="13px" fontWeight={600} sx={{ textAlign: "center" }}>
                    Stock: {b.stock}
                  </Typography>

                  {/* ADD / COUNTER */}
                  {qty === 0 ? (
                    <Box
                      onClick={() => {
                        if (b.stock === 0) return;
                        dispatch(addToCart(b));
                        decreaseStock(b.id);
                      }}
                      sx={{
                        background: b.stock === 0 ? "#ccc" : "#2e7d32",
                        borderRadius: "10px",
                        width: "80px",
                        margin: "auto",
                        height: "30px",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        cursor: b.stock === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      <h6>Add</h6>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background: "#2e7d32",
                        borderRadius: "10px",
                        width: "90px",
                        margin: "auto",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingX: 1,
                        color: "#fff",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          dispatch(decreaseQty(b.id));
                          increaseStock(b.id);
                        }}
                        sx={{ color: "#fff", width: 22, height: 22 }}
                      >
                        <RemoveIcon sx={{ fontSize: 18 }} />
                      </IconButton>

                      <Typography fontSize="14px" fontWeight="600">
                        {qty}
                      </Typography>

                      <IconButton
                        size="small"
                        disabled={b.stock === 0}
                        onClick={() => {
                          dispatch(increaseQty(b.id));
                          decreaseStock(b.id);
                        }}
                        sx={{ color: "#fff", width: 22, height: 22 }}
                      >
                        <AddIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
