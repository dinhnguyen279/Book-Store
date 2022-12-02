import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
export const theme = createTheme({
  //kieu kiểu
  typography: {
    h1: {
      fontSize: "2.2rem",
      fontWeight: "400",
      margin: "2rem 0",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: "400",
      margin: "1rem 0",
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: "400",
      margin: "1rem 0",
    },
  },
  //Màu

  palette: {
    primary: {
      main: "#f0c000",
    },
    secondary: {
      main: "#208080",
    },
    error: {
      main: "#f04000",
    },
    background: {
      main: "#ffffff",
    },
  },
});
export const useStyles = makeStyles((theme) => ({
  appBar: {
    // borderBottom: `1px solid ${theme.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    textDecoration: "none",
  },
  link: {
    margin: "1rem",
  },
  main: {
    padding: "2rem",
    paddingTop: "4rem",
  },
  largeImage: {
    maxWidth: "40rem",
    width: "100%",
  },
  mt1: {
    marginTop: "1rem !important",
  },
  mr1: {
    marginRight: "1rem !important",
  },
  p1: {
    padding: "1rem !important",
  },
  formControl: {
    margin: "5px",
    minWidth: "120",
    width: "100%",
  },
  card: {},
  instructions: {},
  logo: {
    // objectFit: "cover",
    width: "10%",
  },
  footerLink: {
    textDecoration: "none",
  },

  boxLink: {
    cursor: "pointer",
    "&:hover": {
      borderBottom: "1px solid white",
    },
    display: "flex",
  },
  title: {
    fontSize: "25px",
  },
  flexFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexAppbar: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  bgFooter: {
    background: "#208080",
  },
}));
// export const useStyles = makeStyles((theme) =>
//   createStyles({
//     AppBar: {
//       borderBottom: `1px solid ${theme.divider}`,
//       display: "flex",
//     },
//     toolbar: {
//       flexWrap: "wrap",
//     },
//     toolbarTitle: {
//       flexGrow: 1,
//     },
//     link: {
//       margin: "1rem",
//       justifyContent: "space-between",
//     },
//     main: {
//       padding: "1rem",
//       paddingTop: "5rem",
//     },
//     largeImage: {
//       maxWidth: "40rem",
//       width: "100%",
//     },
//     mt1: {
//       marginTop: "1rem !important",
//     },
//     p1: {
//       padding: "1rem !important",
//     },
//     formControl: {
//       margin: "5px",
//       minWidth: "120",
//       width: "100%",
//     },
//     card: {},
//     instructions: {},
//   })
// );
