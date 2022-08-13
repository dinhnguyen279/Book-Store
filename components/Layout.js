import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Link,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
import NextLink from "next/link";

export default function Layout({
  children,
  commercePublicKey,
  title = "CoolShop",
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - CoolShop`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.AppBar}
        >
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                CoolShop
              </Link>
            </NextLink>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="inherit"
                  href="/cart"
                  className={classes.link}
                />
                Cart
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        <Container component="footer" maxWidth="md">
          <Box mt={5}>
            <Typography variant="body2" color="GrayText" align="center">
              {"@ "}
              DinhNguyenShop 2022
              {". "}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
