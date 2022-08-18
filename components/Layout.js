import React, { useContext, useEffect } from "react";
import {
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Link,
  Container,
  Box,
  Typography,
  CircularProgress,
  Badge,
} from "@mui/material";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
import NextLink from "next/link";
import getCommerce from "../utils/commerce";
import { Store } from "./Store";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../utils/constants";

export default function Layout({
  children,
  commercePublicKey,
  title = "CarShop",
}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  useEffect(() => {
    const fetchCart = async () => {
      const commerce = getCommerce(commercePublicKey);
      dispatch({ type: CART_RETRIEVE_REQUEST });
      const cartData = await commerce.cart.retrieve();
      dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData });
    };
    fetchCart();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - DinhNguyenShop`}</title>
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
          elevation={10}
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
                DinhNguyenShop
              </Link>
            </NextLink>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="h6"
                  color="inherit"
                  href="/cart"
                  className={classes.link}
                >
                  {cart.loading ? (
                    <CircularProgress />
                  ) : cart.data?.total_items > 0 ? (
                    <Badge
                      badgeContent={cart.data?.total_items}
                      color="primary"
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
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
