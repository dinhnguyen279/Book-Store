import React, { useContext, useEffect } from "react";
import {
  AppBar,
  CircularProgress,
  Badge,
  IconButton,
  Grid,
  FormControl,
  Input,
} from "@mui/material";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../../utils/constants";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import SearchIcon from "@mui/icons-material/Search";
// import Image from "next/image";
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
        <Grid
          container={true}
          spacing={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={4} md={4}>
            {/* <Image src={logo} alt="logo" width="50px" height="60px" /> */}
            <Link href="/">
              <h2>BookShop</h2>
            </Link>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              textAlign: "center",
              display: "flex",
              position: "relative",
            }}
          >
            <FormControl
              id="inputItem"
              fullWidth
              style={{
                outline: "none",
                borderRadius: "100px",
                background: "white",
              }}
            >
              <Input
                disableUnderline
                fullWidth
                placeholder="Search..."
                style={{
                  paddingLeft: "1rem",
                  color: "GrayText",
                }}
              >
                Search
              </Input>
            </FormControl>
            <IconButton
              style={{
                position: "absolute",
                top: "60%",
                right: "0%",
                transform: "translate(0,-50%)",
              }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} md={4} textAlign="right">
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
