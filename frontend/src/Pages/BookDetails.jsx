import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Box, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

export default function BookDetails() {
  const { id } = useParams();
  const [storyText, setStoryText] = useState("Loading story...");

  const books = [
    {
      id: 1,
      title: "The Magical Forest",
      author: "J.K. Dreamer",
      img: "/images/storybook1.jpg",
      storyFile: "/stories/story1.txt",
    },
    {
      id: 2,
      title: "Adventures of Luna",
      author: "Maya Harper",
      img: "/images/storybook2.jpg",
      storyFile: "/stories/story2.txt",
    },
    {
      id: 3,
      title: "The Hidden Castle",
      author: "Robert Dale",
      img: "/images/storybook3.jpg",
      storyFile: "/stories/story3.txt",
    },
  ];

  const book = books.find((b) => b.id.toString() === id);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const res = await fetch(book.storyFile);
        const text = await res.text();
        setStoryText(text);
      } catch {
        setStoryText("Unable to load story file.");
      }
    };
    if (book) loadStory();
  }, [book]);

  if (!book) {
    return (
      <Typography variant="h5" sx={{ marginTop: "100px", textAlign: "center" }}>
        Book Not Found
      </Typography>
    );
  }

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    const textWidth = 500;
    const lineHeight = 20;

    const lines = doc.splitTextToSize(storyText, textWidth);
    let y = margin;

    lines.forEach((line) => {
      if (y > 800) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save(`${book.title}.pdf`);
  };

  return (
    <Box
      sx={{
        paddingTop: "90px",
        paddingBottom: "40px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f7fb",
      }}
    >
      <Card
        sx={{
          maxWidth: 750,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          backgroundColor: "white",
        }}
      >
        <CardMedia
          component="img"
          height="330"
          image={book.img}
          alt={book.title}
          sx={{ objectFit: "contain", padding: 2 }}
        />

        <CardContent sx={{ padding: "30px" }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {book.title}
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontStyle: "italic" }}>
            By {book.author}
          </Typography>

          <Typography
            sx={{
              whiteSpace: "pre-line",
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#444",
              backgroundColor: "#f9fafc",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
            }}
          >
            {storyText}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
            <Button variant="contained" color="primary" component={Link} to="/lib">
              Back to Library
            </Button>

            <Button variant="contained" color="secondary" onClick={downloadPDF}>
              <DownloadIcon sx={{ mr: 1 }} />
              Download Story
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
