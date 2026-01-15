import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../Redux/Selectors/cartSelector";
import { increaseQty, decreaseQty } from "../Redux/Reducers/cartReducer";

/* AMAZON STYLE WRAPPERS */
const PageContainer = styled(Box)(() => ({
  padding: "30px",
  background: "#f3f3f3",
  minHeight: "100vh",
}));

const ItemCard = styled(Paper)(() => ({
  display: "flex",
  borderRadius: 12,
  padding: "14px",
  background: "#fff",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  transition: "0.2s",
  "&:hover": { boxShadow: "0 4px 18px rgba(0,0,0,0.12)" },
}));

const QtyBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  background: "#e7f3ff",
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid #bcd9ff",
}));

export default function MyCartPage() {
  const dispatch = useDispatch();

  const cartItemsObj = useSelector(selectCartItems);
  const cartItems = useMemo(() => Object.values(cartItemsObj || {}), [cartItemsObj]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const increase = (id) => dispatch(increaseQty(id));
  const decrease = (id) => dispatch(decreaseQty(id));

  const removeItem = (id, qty) => {
    for (let i = 0; i < qty; i++) dispatch(decreaseQty(id));
  };

  return (
    <PageContainer>
      <Grid container spacing={3}>
        
        {/* LEFT SIDE — ITEMS */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Shopping Cart ({cartItems.length})
          </Typography>

          {cartItems.length === 0 ? (
            <Paper sx={{ padding: 5, textAlign: "center", borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary">
                Your Cart is Empty
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((item) => (
                <ItemCard key={item.id}>
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{
                      width: 110,
                      height: 110,
                      objectFit: "contain",
                      background: "#fafafa",
                      borderRadius: 2,
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {item.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.pages}
                    </Typography>

                    <Typography sx={{ mt: 1, fontWeight: 700 }}>
                      ₹{item.price}
                      <Typography
                        component="span"
                        sx={{
                          color: "#777",
                          ml: 1,
                          textDecoration: "line-through",
                          fontSize: "13px",
                        }}
                      >
                        ₹{item.mrp}
                      </Typography>
                    </Typography>

                    {/* Quantity Controls */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <QtyBox>
                        <IconButton size="small" onClick={() => decrease(item.id)}>
                          <RemoveIcon fontSize="16px" />
                        </IconButton>

                        <Typography sx={{ mx: 1, minWidth: 14, textAlign: "center" }}>
                          {item.qty}
                        </Typography>

                        <IconButton size="small" onClick={() => increase(item.id)}>
                          <AddIcon fontSize="16px" />
                        </IconButton>
                      </QtyBox>

                      <IconButton
                        onClick={() => removeItem(item.id, item.qty)}
                        sx={{ ml: 2 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </ItemCard>
              ))}
            </Box>
          )}
        </Grid>

        {/* RIGHT SIDE — SUMMARY */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: 3,
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Order Summary
            </Typography>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Typography>Subtotal</Typography>
              <Typography fontWeight={700}>₹{subtotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography>Delivery</Typography>
              <Typography sx={{ color: "green" }}>FREE</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                ₹{subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontSize: "16px",
                borderRadius: 2,
                background: "#ff9f00",
                "&:hover": { background: "#fb8c00" },
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
