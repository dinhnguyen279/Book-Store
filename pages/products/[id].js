/* eslint-disable @next/next/no-img-element */
import {
  Grid,
  Card,
  Typography,
  Box,
  Slide,
  List,
  ListItem,
  Select,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import Layout from "../../components/Layout";
import getCommerce from "../../utils/commerce";
import React, { useContext, useState } from "react";
import { useStyles } from "../../utils/styles";
import { Store } from "../../components/Store";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../../utils/constants";
import Router from "next/router";
import { AddShoppingCart } from "@mui/icons-material";

export default function Product(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);

  const classes = useStyles();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const commerce = getCommerce(props.commercePublicKey);
    const lineItem = cart.data?.line_items.find(
      (x) => x.product_id === product.id
    );

    if (lineItem) {
      const cartData = await commerce.cart.update(lineItem.id, quantity);
      dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
      Router.push("/cart");
    } else {
      const cartData = await commerce.cart.add(product.id, quantity);
      dispatch({ type: CART_RETRIEVE_REQUEST, payload: cartData.cart });
      Router.push("/cart");
    }
  };
  // const nextCart = () => {
  //   Router.push("/cart");
  // };
  return (
    <Layout title={product.name} commercePublicKey={props.commercePublicKey}>
      <Slide direction="down" in={true}>
        <Grid container sapcing={1}>
          <Grid item md={6}>
            <img
              src={product.image.url}
              alt={product.name}
              className={classes.largeImage}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <List>
              <ListItem>
                <Typography
                  gutterBottom
                  variant="h6"
                  color={"inherit"}
                  component="h1"
                >
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Box
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Slide>
      <Slide direction="up" in={true}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Price
                    </Grid>
                    <Grid item xs={6}>
                      {product.price.formatted_with_symbol}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      Status
                    </Grid>
                    <Grid item xs={6}>
                      {/* {product.quantity > 0 ? ( */}
                      {quantity > 0 ? (
                        <Alert icon={false} severity="success">
                          In Stock
                        </Alert>
                      ) : (
                        <Alert icon={false} severity="error">
                          Unavailable
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
                {/* {product.quantity > 0 && ( */}
                {quantity > 0 && (
                  <>
                    <ListItem>
                      <Grid container justifyContent="flex-end">
                        <Grid item xs={6}>
                          Quantity
                        </Grid>
                        <Grid item xs={6}>
                          <Select
                            labelId="quanitity-label"
                            id="quanitity"
                            fullWidth
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          >
                            {/* {[...Array(product.quantity).keys()].map((x) => ( */}
                            {[...Array(100).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={addToCartHandler}
                        endIcon={<AddShoppingCart />}
                      >
                        Add To Cart
                      </Button>
                    </ListItem>
                  </>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Slide>
    </Layout>
  );
}
// bởi vì dùng id trong url nên dùng getServerSideProps
export async function getServerSideProps({ params }) {
  const { id } = params;
  const commerce = getCommerce();
  const product = await commerce.products.retrieve(id, {
    type: "permalink",
  });
  return {
    props: {
      product,
    },
  };
}
