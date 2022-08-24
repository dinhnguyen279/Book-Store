/* eslint-disable react-hooks/exhaustive-deps */
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
  IconButton,
  Grid,
} from "@mui/material";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import getCommerce from "../utils/commerce";
import { Store } from "./Store";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../utils/constants";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Footer from "./Footer/footer";
import logo from "../public/assets/logoNguyen.png";

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
          <CssBaseline />
          <AppBar
            position="static"
            color="secondary"
            elevation={10}
            className={classes.appBar}
          >
            <Grid container spacing={1} className={classes.flexFooter}>
              <Grid item xs={6} md={5} className={classes.flexAppbar}>
                <Image src={logo} alt="logo" width="50px" height="60px" />
                <NextLink href="/">
                  <h2>BookShop</h2>
                </NextLink>
              </Grid>
              <Grid item xs={6} md={5} textAlign="right">
                <NextLink href="/cart">
                  {cart.loading ? (
                    <CircularProgress />
                  ) : cart.data?.total_items > 0 ? (
                    <IconButton
                      component={Link}
                      to="/cart"
                      aria-label="Show cart items"
                      color="inherit"
                    >
                      <Badge
                        badgeContent={cart.data?.total_items}
                        color="primary"
                      >
                        <ShoppingCartTwoToneIcon />
                      </Badge>
                    </IconButton>
                  ) : (
                    <ShoppingCartTwoToneIcon />
                  )}
                </NextLink>
              </Grid>
            </Grid>
          </AppBar>
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
