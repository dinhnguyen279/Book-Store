/* eslint-disable @next/next/no-img-element */
import {
  Alert,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Slide,
  Link,
} from "@mui/material";
// import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import getCommerce from "../utils/commerce";
export default function Home(props) {
  const { products } = props;
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      {products.lenght === 0 && <Alert>No product found</Alert>}
      <Grid container spacing={1}>
        {products.map((pro) => (
          <Grid key={pro.id} item md={3}>
            <Slide direction="up" in={true}>
              <Card>
                <Link href={`/products/${pro.permalink}`}>
                  {/* <Link href="/about"> */}
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={pro.name}
                      image={pro.image.url}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="GrayText"
                      component="p"
                    >
                      {pro.name}
                    </Typography>
                    <Box>
                      <Typography
                        variant="body1"
                        color="GrayText"
                        component="p"
                      >
                        {pro.price.formatted_with_symbol}
                      </Typography>
                    </Box>
                  </CardContent>
                </Link>
              </Card>
            </Slide>
          </Grid>
          // <div key={pro.id}>
          //   <img src={pro.image.url} alt={pro.name} />
          //   <p>{pro.name}</p>
          //   <p>{pro.price.formatted_with_symbol}</p>
          // </div>
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
