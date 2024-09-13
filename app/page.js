"use client";

import Image from "next/image";
import {
  Box,
  Container,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { db } from "../firebase"; // Import Firebase config
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

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
  const { user, isLoaded } = useUser(); // Clerk's user object with loading check
  const [userVote, setUserVote] = useState(null); // Track current user's vote
  const [voteCounts, setVoteCounts] = useState({ trump: 0, kamala: 0 }); // Track vote counts for both candidates
  const [loading, setLoading] = useState(false); // Add loading state for Firestore operations
  const [error, setError] = useState(null); // Track any errors

  // Fetch vote counts for Trump and Kamala
  const fetchVotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "votes"));
      let trumpVotes = 0;
      let kamalaVotes = 0;

      querySnapshot.forEach((doc) => {
        const voteData = doc.data().vote;
        if (voteData === "trump") trumpVotes += 1;
        if (voteData === "kamala") kamalaVotes += 1;
      });

      setVoteCounts({ trump: trumpVotes, kamala: kamalaVotes });
    } catch (err) {
      console.error("Error fetching votes:", err);
      setError("Error fetching votes.");
    }
  };

  // Check if the user has already voted
  const checkUserVote = async () => {
    if (!user) return;

    const userDoc = doc(db, "votes", user.id); // Use Clerk's user ID as document ID
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      setUserVote(userSnapshot.data().vote); // Set the vote to the current userVote state
    }
  };

  const handleVote = async (vote) => {
    if (!user) return;

    setLoading(true);
    try {
      const email = user.primaryEmailAddress?.emailAddress || "No email found";

      // Call the new API route to submit the vote
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote, userId: user.id, email }),
      });

      const data = await response.json();

      if (data.success) {
        setUserVote(vote);
        fetchVotes();
      } else {
        setError("Error submitting your vote.");
      }
    } catch (err) {
      console.error("Error submitting vote:", err);
      setError("Error submitting your vote.");
    } finally {
      setLoading(false);
    }
  };

  // Load user's vote and vote counts when the component mounts
  useEffect(() => {
    if (isLoaded && user) {
      checkUserVote();
    }
    fetchVotes();
  }, [isLoaded, user]);

  if (!isLoaded) return <p>Loading user...</p>;

  return (
    <ThemeProvider theme={theme}>
      <SignedIn>
        <AppBar position="static" sx={{ bgcolor: "purple" }}>
          <Toolbar sx={{ position: "relative" }}>
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              style={{ flexGrow: 1 }}
            >
              Who will NYU students vote for?
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <SignedOut>
                <Button color="inherit" href="/sign-in">
                  {" "}
                  Login{" "}
                </Button>
                <Button color="inherit" href="/sign-up">
                  {" "}
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            height: "100vh",
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

            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => handleVote("trump")}
            >
              {" "}
              Donald Trump ({voteCounts.trump} votes)
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
              style={{ objectFit: "cover" }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handleVote("kamala")}
            >
              {" "}
              Kamala Harris ({voteCounts.kamala} votes)
            </Button>
          </Box>
        </Container>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ThemeProvider>
  );
}
