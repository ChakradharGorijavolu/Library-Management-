import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Library() {
  const books = [
    {
      id: 1,
      title: "The Magical Forest",
      author: "J.K. Dreamer",
      img: "/images/storybook1.jpg",
      description:
        "An explorer enters a mystical forest filled with creatures and long-forgotten secrets.",
    },
    {
      id: 2,
      title: "Adventures of Luna",
      author: "Maya Harper",
      img: "/images/storybook2.jpg",
      description:
        "Luna and Leo journey beyond the stars on a magical quest of friendship and discovery.",
    },
    {
      id: 3,
      title: "The Hidden Castle",
      author: "Robert Dale",
      img: "/images/storybook3.jpg",
      description:
        "A mysterious castle appears in the mist — and only the brave can uncover its ancient secrets.",
    },
  ];

  return (
    <>
      <div style={{ paddingTop: "80px", textAlign: "center" }}>
        <h2><b>Welcome to the Library</b></h2>

        <div style={{ paddingTop: "50px" }}></div>

        <Grid container spacing={5}>
          {books.map((book) => (
            <Grid  key={book.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: 450,
                  borderRadius: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={book.img}
                  alt={book.title}
                  sx={{ objectFit: "contain" }}
                />

                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography>{book.author}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {book.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Button variant="contained" color="primary" size="small">
                    Borrow
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/book/${book.id}`}
                  >
                    Read Book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Library;
