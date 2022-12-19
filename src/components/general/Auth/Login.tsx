import * as React from "react";
import {
  Button,
  TextField,
  Grid,
  CssBaseline,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Container } from "@mui/system";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";
import Signout from "./Signout";

interface loginCredential {
  email: string;
  password: string;
}

export const Login = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [user, loading] = useAuthState(auth);

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginObject.email, loginObject.password);
  };

  const [loginObject, setLoginObject] = useState<loginCredential>({
    email: "",
    password: "",
  });

  if (loading) {
    return (
      <>
        <Container
          maxWidth={"sm"}
          sx={{ marginTop: "5%", textAlign: "center" }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (user) {
    return (
      <>
        <Container
          maxWidth={"sm"}
          sx={{ marginTop: "5%", textAlign: "center" }}
        >
          <Typography>You are currently signed in as</Typography>
          <Typography>{user.email}</Typography>
          <Signout />
        </Container>
      </>
    );
  }

  const signIn = (
    <>
      <CssBaseline />
      <Container maxWidth={"sm"} sx={{ marginTop: "5%" }}>
        <form onSubmit={handleLogin} autoComplete="off">
          <Grid
            container
            spacing={3}
            justifyItems={"center"}
            alignItems={"stretch"}
            direction={"column"}
          >
            <Grid item />
            <Grid item>
              <TextField
                id="Email"
                label="email"
                type={"email"}
                autoComplete="email"
                required
                fullWidth
                onChange={(event) => {
                  setLoginObject({
                    email: event.target.value,
                    password: loginObject.password,
                  });
                }}
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                id="Password"
                label="password"
                autoComplete="current-password"
                required
                fullWidth
                onChange={(event) => {
                  setLoginObject({
                    email: loginObject.email,
                    password: event.target.value,
                  });
                }}
                type={"password"}
              />
            </Grid>

            <Grid item container>
              <Container sx={{ display: "flex" }}>
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
                <Link
                  href="/forgot"
                  variant="body1"
                  sx={{
                    flexGrow: 1,
                    justifySelf: "flex-start",
                    textAlign: "end",
                  }}
                >
                  {"Forgot Password?"}
                </Link>
              </Container>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );

  return signIn;
};

export default Login;
