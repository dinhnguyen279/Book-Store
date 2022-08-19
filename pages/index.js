import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Slide,
  Link,
  Alert,
} from "@mui/material";
import Layout from "../components/Layout";
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
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={pro.name}
                      image={pro.image.url}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography variant="body2" color="gray" component="p">
                      {pro.name}
                    </Typography>
                    <Box>
                      <Typography variant="body1" color="gray" component="p">
                        {pro.price.formatted_with_symbol}
                      </Typography>
                    </Box>
                  </CardContent>
                </Link>
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
