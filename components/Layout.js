/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"; // { useContext, useEffect }
import {
  // CssBaseline,
  ThemeProvider,
  // AppBar,
  // Toolbar,
  // Link,
  Container,
  Box,
  // Typography,
  // CircularProgress,
  // Badge,
  // IconButton,
  // Grid,
} from "@mui/material";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
// import NextLink from "next/link";
// import Image from "next/image";
// import getCommerce from "../utils/commerce";
// import { Store } from "./Store";
// import {
//   CART_RETRIEVE_REQUEST,
//   CART_RETRIEVE_SUCCESS,
// } from "../utils/constants";
// import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";
// import logo from "../public/assets/logoNguyen.png";

export default function Layout({
  children,
  commercePublicKey,
  title = "CarShop",
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>{`${title} - Book Store`}</title>
          {/* <link rel="icon" href={logo} /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1,shrink-to-fit=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Navbar component="navbar" commercePublicKey={commercePublicKey} />
          <Container component="main" className={classes.main}>
            {children}
          </Container>
          <Box mt={5}>
            <Footer component="footer" />
          </Box>
        </ThemeProvider>
      </>
    </React.Fragment>
  );
}
