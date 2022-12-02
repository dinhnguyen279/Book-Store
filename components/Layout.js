/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ThemeProvider, Container, Box, CssBaseline } from "@mui/material";
import { theme } from "../utils/styles";
import Head from "next/head";

import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";

export default function Layout({
  children,
  commercePublicKey,
  title = "CarShop",
}) {
  return (
    <React.Fragment>
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>{`${title} - Book Store`}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1,shrink-to-fit=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar component="navbar" commercePublicKey={commercePublicKey} />
          <Container
            component="main"
            style={{
              padding: "2rem",
              paddingTop: "4rem",
            }}
          >
            {children}
          </Container>
          <Box mt={3}>
            <Footer component="footer" />
          </Box>
        </ThemeProvider>
      </>
    </React.Fragment>
  );
}
