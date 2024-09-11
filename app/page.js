"use client";

import Image from "next/image";
import { Box, Container, Button } from "@mui/material";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          height: "100vh",
          mt: 4,
        }}
      >
        <Box
          sx={{
            width: "50%", // Left half
            backgroundColor: theme.palette.secondary.light, // Light red background
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/trump.avif"
            alt="Donald Trump"
            width={300}
            height={300}
            style={{ objectFit: "cover" }}
          />

          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
            {" "}
            Donald Trump
          </Button>
        </Box>

        <Box
          sx={{
            width: "50%", // Right half
            backgroundColor: theme.palette.primary.light, // Light blue background
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/kamala.webp"
            alt="Kamala"
            width={300} // Adjust image size
            height={300}
            style={{ objectFit: "cover" }} // Ensure image covers full width
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            {" "}
            Kamala Harris{" "}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
