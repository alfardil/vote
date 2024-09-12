import { SignIn } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar
        position="static"
        sx={{ bgcolor: "white", borderRadius: "10px", color: "black" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: "black", flexGrow: 1 }}>
            VOTE :3
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit">
              <Link href="/sign-in" passHref>
                <Typography sx={{ textDecoration: "none", color: "inherit" }}>
                  Login
                </Typography>
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/sign-up" passHref>
                <Typography sx={{ textDecoration: "none", color: "inherit" }}>
                  Sign Up
                </Typography>
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" mb={2}>
          {" "}
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}
