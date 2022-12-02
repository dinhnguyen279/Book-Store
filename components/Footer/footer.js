import React from "react";
import { Container, Grid, Box, Link, Typography } from "@mui/material";
import { useStyles } from "../../utils/styles";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailTwoToneIcon from "@mui/icons-material/AlternateEmailTwoTone";

const Footer = () => {
  const classes = useStyles();
  return (
    <Box color="white" style={{ background: "#208080" }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} px={{ xs: 3, sm: 5 }} py={{ xs: 3, sm: 5 }}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1} style={{ fontSize: "25px" }}>
              <Link
                href="/"
                color="inherit"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                BOOK-STORE
              </Link>
            </Box>
            <Typography variant="body1" py={1} letterSpacing={1} align="center">
              Book-Store là một ứng dụng website nơi khách hàng có thể mua sách
              trực tuyến. Thông qua cửa hàng sách này, người dùng có thể tìm
              kiếm một cuốn sách theo sở thích của mình và sau đó có thể thêm
              vào giỏ hàng và cuối cùng mua bằng giao dịch thẻ tín dụng.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1} style={{ fontSize: "25px" }}>
              PRODUCTS
            </Box>
            <Box
              style={{
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "1px solid white",
                },
                display: "flex",
              }}
              py={1}
            >
              <Link
                href="/"
                color="inherit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Book-Store
              </Link>
            </Box>
            <Box
              style={{
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "1px solid white",
                },
                display: "flex",
              }}
              py={1}
            >
              <Link
                href="/"
                color="inherit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Portfolio
              </Link>
            </Box>
            <Box
              style={{
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "1px solid white",
                },
                display: "flex",
              }}
              py={1}
            >
              <Link
                href="https://www.amazon.com/"
                color="inherit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Amazon
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} py={{ xs: 1, sm: 10 }}>
            <Box borderBottom={1} style={{ fontSize: "25px" }}>
              CONTACT
            </Box>
            <Box
              style={{
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "1px solid white",
                },
                display: "flex",
              }}
              py={1}
            >
              <EmailTwoToneIcon
                style={{
                  marginRight: "1rem !important",
                }}
              />
              bookstore@gmail.com
            </Box>
            <Box
              style={{
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "1px solid white",
                },
                display: "flex",
              }}
              py={1}
            >
              <LocalPhoneTwoToneIcon
                style={{
                  marginRight: "1rem !important",
                }}
              />
              + 84 01234567891
            </Box>
            <Box
              style={{
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "1px solid white",
                },
                display: "flex",
              }}
              py={1}
            >
              <HomeTwoToneIcon
                style={{
                  marginRight: "1rem !important",
                }}
              />
              Hồ Chí Minh, Việt Nam
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={5} borderTop={1} align="center">
          <Grid item sm={6} xs={12}>
            <Typography variant="body1" color="Background">
              &copy; {new Date().getFullYear()} Made by Huy&Nhan{". "}
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Link href="https://facebook.com" color="inherit" marginRight={1}>
              <FacebookTwoToneIcon />
            </Link>
            <Link href="https://github.com" color="inherit" marginRight={1}>
              <GitHubIcon />
            </Link>
            <Link href="/" color="inherit" marginRight={1}>
              <AlternateEmailTwoToneIcon />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Footer;
