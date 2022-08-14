/* eslint-disable @next/next/no-img-element */
import {
  // Alert,
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
} from "@mui/material";
import Alert from "@mui/lab";
import Layout from "../../components/Layout";
import getCommerce from "../../utils/commerce";
import { useState } from "react";
import { useStyles } from "../../utils/styles";

export default function Product(props) {
  const [quantity, setQuantity] = useState(1);
  const { product } = props;

  const classes = useStyles();

  const addToCartHandler = async () => {
    console.log("Todo: add to cart");
  };
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      <Slide direction="up" in={true}>
        <Grid container sapcing={1}>
          <Grid item md={6}>
            <img
              src={product.image.url}
              alt={product.name}
              className={classes.largeImage}
            />
          </Grid>
          <Grid item md={3} xs={12}>
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
          <Grid item md={3} xs={12}>
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
                      {product.quantity > 0 ? (
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
                {product.quantity > 0 && (
                    <>
                      <ListItem>
                        <Grid container justifyContent="flex-end">
                          <Grid item xs={6}>
                            <Select
                              labelId="quantity-label"
                              id="quantity"
                              fullWidth
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            >
                              {[...Array(product.quantity).keys()].map((x) => (
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
                          color="primary"
                          onLick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </ListItem>
                    </>
                  ) &&
                  console.log(product.quantity)}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Slide>
    </Layout>
  );
}

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
