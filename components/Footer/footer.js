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
    <Box color="white" className={classes.bgFooter}>
      <Container maxWidth="lg">
        <Grid container spacing={5} px={{ xs: 3, sm: 5 }} py={{ xs: 3, sm: 5 }}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1} className={classes.title}>
              <Link
                href="/"
                color="inherit"
                className={`${classes.footerLink} ${classes.flexFooter} `}
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
            <Box borderBottom={1} className={classes.title}>
              PRODUCTS
            </Box>
            <Box className={classes.boxLink} py={1}>
              <Link href="/" color="inherit" className={classes.footerLink}>
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
              <LocalPhoneTwoToneIcon className={classes.mr1} />+ 84 0829954124
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
  );
};

export default Footer;
