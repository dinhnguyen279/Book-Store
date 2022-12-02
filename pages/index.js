import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Slide,
  Alert,
  CardActionArea,
  ListItem,
  Button,
} from "@mui/material";
import Layout from "../components/Layout";
import getCommerce from "../utils/commerce";
import Link from "next/link";
import { AddShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../components/Store";
export default function Home(props) {
  const { products } = props;

  const router = useRouter();
  const addToCart = () => {
    router.push("/cart");
  };
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      {props.lenght === 0 && <Alert severity="error">No product found</Alert>}
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
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={pro.name}
                      image={pro.image.url}
                    />
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
                  </CardActionArea>
                </Link>
                <ListItem>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={addToCart}
                    endIcon={<AddShoppingCart />}
                  >
                    Add To Cart
                  </Button>
                </ListItem>
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
