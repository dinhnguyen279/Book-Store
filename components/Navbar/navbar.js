import React, { useContext, useEffect } from "react";
import {
  AppBar,
  CircularProgress,
  Badge,
  IconButton,
  Grid,
} from "@mui/material";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../../utils/constants";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Image from "next/image";
import Link from "next/link";
import getCommerce from "../../utils/commerce";
import { useStyles } from "../../utils/styles";
import { Store } from "../Store";

const Navbar = ({ commercePublicKey }) => {
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
    <>
      <AppBar
        position="static"
        color="secondary"
        elevation={10}
        className={classes.appBar}
      >
        <Grid container spacing={1} className={classes.flexFooter}>
          <Grid item xs={6} md={5} className={classes.flexAppbar}>
            {/* <Image src={logo} alt="logo" width="50px" height="60px" /> */}
            <Link href="/">
              <h2>BookShop</h2>
            </Link>
          </Grid>
          <Grid item xs={6} md={5} textAlign="right">
            <Link href="/cart">
              {cart.loading ? (
                <CircularProgress />
              ) : cart.data?.total_items > 0 ? (
                <IconButton
                  // component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge badgeContent={cart.data?.total_items} color="primary">
                    <ShoppingCartTwoToneIcon />
                  </Badge>
                </IconButton>
              ) : (
                <ShoppingCartTwoToneIcon />
              )}
            </Link>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};
export default Navbar;
