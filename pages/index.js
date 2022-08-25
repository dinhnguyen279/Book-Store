import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Slide,
  Alert,
  // CardActions,
  // Button,
} from "@mui/material";
import Layout from "../components/Layout";
import getCommerce from "../utils/commerce";
import Link from "next/link";

// import { AddShoppingCart } from "@mui/icons-material";
// import Router from "next/router";
export default function Home(props) {
  const { products } = props;
  // const addToCartHandler = () => Router.push("/cart");
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      {products.lenght === 0 && (
        <Alert severity="error">No product found</Alert>
      )}
      <Grid container spacing={1}>
        {products.map((pro) => (
          <Grid key={pro.id} item md={4} xs={12} px={2} py={6}>
            <Slide direction="up" in={true}>
              <Card variant="elevation">
                {/* <Link href={`/products/${pro.permalink}`}> */}
                <Link
                  href={{
                    pathname: "/products/[id]",
                    query: { id: pro.permalink },
                  }}
                >
                  <CardContent>
                    <CardMedia
                      component="img"
                      alt={pro.name}
                      image={pro.image.url}
                    />
                  </CardContent>
                </Link>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="green"
                    component="p"
                  >
                    {pro.name}
                  </Typography>
                  <Box>
                    <Typography variant="h2" color="Red" component="p">
                      {pro.price.formatted_with_symbol}
                    </Typography>
                  </Box>
                </CardContent>
                {/* <CardActions>
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
                </CardActions> */}
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return { props: { products } };
}
