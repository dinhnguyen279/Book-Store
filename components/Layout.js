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
  ///
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
// import Footer from "./Footer/footer";
import logo from "../public/assets/logoNguyen.png";
////
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailTwoToneIcon from "@mui/icons-material/AlternateEmailTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
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
    <React.StrictMode>
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>{`${title} - Book Store`}</title>
          <link rel="icon" href={logo} />
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
                  </Link>
                </NextLink>
              </nav>
            </Toolbar>
          </AppBar>
          <Container component="main" className={classes.main}>
            {children}
          </Container>
          {/* <Box mt={5}>
            <Footer component="footer" maxWidth="md" />
          </Box> */}
          <Box color="white" className={classes.bgFooter} mt={5}>
            <Container>
              <Grid
                container
                spacing={5}
                px={{ xs: 3, sm: 5 }}
                py={{ xs: 3, sm: 5 }}
              >
                <Grid item xs={12} sm={4}>
                  <Box borderBottom={1} className={classes.title}>
                    <Link
                      href="/"
                      color="inherit"
                      className={`${classes.footerLink} ${classes.flexFooter} `}
                    >
                      {/* <Image src={logo} alt="logo" width="50px" height="60px" /> */}
                      BOOK-STORE
                    </Link>
                  </Box>
                  <Typography
                    variant="body1"
                    py={1}
                    letterSpacing={1}
                    align="center"
                  >
                    Book-Store là một ứng dụng website nơi khách hàng có thể mua
                    sách trực tuyến. Thông qua cửa hàng sách này, người dùng có
                    thể tìm kiếm một cuốn sách theo sở thích của mình và sau đó
                    có thể thêm vào giỏ hàng và cuối cùng mua bằng giao dịch thẻ
                    tín dụng.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box borderBottom={1} className={classes.title}>
                    PRODUCTS
                  </Box>
                  <Box className={classes.boxLink} py={1}>
                    <Link
                      href="/"
                      color="inherit"
                      className={classes.footerLink}
                    >
                      Book-Store
                    </Link>
                  </Box>
                  <Box className={classes.boxLink} py={1}>
                    <Link
                      href="https://github.com/dinhnguyen279"
                      color="inherit"
                      className={classes.footerLink}
                    >
                      Portfolio
                    </Link>
                  </Box>
                  <Box className={classes.boxLink} py={1}>
                    <Link
                      href="https://www.amazon.com/"
                      color="inherit"
                      className={classes.footerLink}
                    >
                      Amazon
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} py={{ xs: 1, sm: 10 }}>
                  <Box borderBottom={1} className={classes.title}>
                    CONTACT
                  </Box>
                  <Box className={classes.boxLink} py={1}>
                    <EmailTwoToneIcon className={classes.mr1} />
                    tdinhnguyen279@gmail.com
                  </Box>
                  <Box className={classes.boxLink} py={1}>
                    <LocalPhoneTwoToneIcon className={classes.mr1} />+ 84
                    0829954124
                  </Box>
                  <Box className={classes.boxLink} py={1}>
                    <HomeTwoToneIcon className={classes.mr1} />
                    Hồ Chí Minh, Việt Nam
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={1} mt={5} borderTop={1} align="center">
                <Grid item sm={6} xs={12}>
                  <Typography variant="body1" color="Background">
                    &copy; {new Date().getFullYear()} Made by DinhNguyen{". "}
                  </Typography>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Link
                    href="https://www.facebook.com/279.DinhNguyen"
                    color="inherit"
                    marginRight={1}
                  >
                    <FacebookTwoToneIcon />
                  </Link>
                  <Link
                    href="https://github.com/dinhnguyen279"
                    color="inherit"
                    marginRight={1}
                  >
                    <GitHubIcon />
                  </Link>
                  <Link href="" color="inherit" marginRight={1}>
                    <AlternateEmailTwoToneIcon />
                  </Link>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ThemeProvider>
      </>
    </React.StrictMode>
  );
}
