/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ThemeProvider, Container, Box } from "@mui/material";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";

import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";

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
