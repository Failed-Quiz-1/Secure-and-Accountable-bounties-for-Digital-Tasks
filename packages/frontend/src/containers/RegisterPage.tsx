import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import icon from "./../assets/icon.png";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { createUser } from "../utils/api";
import CopyToClipboard from "react-copy-to-clipboard";

const theme = createTheme();

const RegisterPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const history = useHistory();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    try {
      const result: string = await createUser(
        data.get("username")!.toString(),
        data.get("password")!.toString()
      );
      setMnemonic(result);
      setIsOpen(true);
      //alert("Please note down your mnemonic passwords: \n\n" + result);
      //history.push({
      //  pathname: "/login",
      //});
    } catch (error) {
      alert("The username already exists" + error);
    }
  };

  const navigateAway = () => {
    setIsOpen(false);
    history.push({
      pathname: "/login",
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={icon} alt="icon" style={{ width: "200px" }} />
            <Typography component="h1" variant="h5">
              FIVER REGISTRATION
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
      >
        <h2>Please note down your mnemonic password</h2>
        <p>{mnemonic}</p>
        <CopyToClipboard text={mnemonic}>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={()=>{alert('Copied!')}}            >
              Copy to clipboard
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={navigateAway}
            >
              Close
            </Button>
          </div>
        </CopyToClipboard>
      </Modal>
    </ThemeProvider>
  );
};

export default RegisterPage;
