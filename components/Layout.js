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
    // }, []);
  }, [commercePublicKey, dispatch]);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - Book Store`}</title>
        <link rel="icon" href="logoNguyen.png" />
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
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h5"
                color="inherit"
                noWrap
                href="/"
                className={`${classes.toolbarTitle} ${classes.flexAppbar}`}
              >
                <Image src={logo} alt="logo" width="50px" height="60px" />
                BookShop
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
                      <ShoppingCartTwoToneIcon />
                    </Badge>
                  ) : (
                    <ShoppingCartTwoToneIcon />
                  )}
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        <Box mt={5}>
          <Footer component="footer" maxWidth="md" />
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}
