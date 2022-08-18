import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Slide,
  Link,
  Alert,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  Input,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useContext } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { Store } from "../components/Store";
import getCommerce from "../utils/commerce";
import { useStyles } from "../utils/styles";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../utils/constants";
import Router from "next/router";

const dev = process.env.NODE_ENV === "development";
function Checkout(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    if (!cart.loading) {
      generateCheckoutToken();
    }
  }, [cart.loading]);
  // Tạo mã thông báo thanh toán
  const generateCheckoutToken = async () => {
    if (cart.data.line_items.length) {
      const commerce = getCommerce(props.commercePublicKey);
      const token = await commerce.checkout.generateToken(cart.data.id, {
        type: "cart",
      });
      setCheckoutToken(token);
      fetchShippingCountries(token.id);
    } else {
      Router.push("/cart");
    }
  };

  // Customer details
  const [firstName, setFirstName] = useState(dev ? "Trần" : "");
  const [lastName, setLastName] = useState(dev ? "Đinh Nguyễn" : "");
  const [email, setEmail] = useState(dev ? "tdinhnguyen279@gmail.com" : "");

  // Shipping details
  const [shippingName, setShippingName] = useState(
    dev ? "Trần Đinh Nguyễn" : ""
  );
  const [shippingStreet, setShippingStreet] = useState(
    dev ? "123 Nguyễn Bá Tòng" : ""
  );
  const [shippingPostalZipCode, setShippingPostalZipCode] = useState(
    dev ? "90909" : ""
  );
  const [shippingCity, setShippingCity] = useState(dev ? "TP. Tây Ninh" : "");
  const [shippingStateProvince, setShippingStateProvince] = useState(
    dev ? "Tỉnh Tây Ninh" : ""
  );
  const [shippingCountry, setShippingCountry] = useState(dev ? "Việt Nam" : "");
  const [shippingOption, setShippingOption] = useState({});

  //Payment details
  const [cardNum, setCardNum] = useState(dev ? "1234 6789 1234 6789" : "");
  const [expMonth, setExpMonth] = useState(dev ? "11" : "");
  const [expYear, setExpYear] = useState(dev ? "2022" : "");
  const [cvv, setCvv] = useState(dev ? "123" : "");
  const [billingPostalZipCode, setBillingPostalZipCode] = useState(
    dev ? "123456" : ""
  );

  //Shipping and fulfillment:thực hiện data
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);

  //Stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Customer information",
    "Shipping details",
    "Payment information",
  ];

  const handlerNext = () => {
    setActiveStep((prev) => prev + 1);
    if (activeStep === steps.length - 1) {
      // handlerCaptureCheckout();
    }
  };
  const [error, setError] = useState([]);
  const [checkoutToken, setCheckoutToken] = useState({});

  const handlerBack = () => {
    setError([]);
    setActiveStep((prev) => prev - 1);
  };

  const handlerShippingCountryChange = (e) => {
    const currentValue = e.target.value;
    setShippingCountry(currentValue);
    fetchSubdivisions(currentValue);
  };

  //Tìm và đưa vào Quốc gia vận chuyển từ commercejs
  const fetchShippingCountries = async (checkoutTokenId) => {
    const commerce = getCommerce(props.commercePublicKey);
    const countries = await commerce.services.localeListShippingCountries(
      checkoutToken
    );
    setShippingCountries(countries.countries);
  };
  //Tìm và đưa vào khu vực từ commercejs
  const fetchSubdivisions = async (countryCode) => {
    const commerce = getCommerce(props.commercePublicKey);
    const subdivisions = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions.subdivisions);
  };

  const handlerSubdivisionChange = (e) => {
    const currentValue = e.target.value;
    setShippingStateProvince(currentValue);
    fetchShippingOptions(checkoutToken.id, shippingCountry, currentValue);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const commerce = getCommerce(props.commercePublicKey);
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country: country,
        region: stateProvince,
      }
    );
    setShippingOptions(options);
    const shippingOption = options[0] ? options[0].id : null;
    setShippingOption(shippingOption);
  };

  const handlerShippingOptionChange = (e) => {
    const currentValue = e.target.value;
    setShippingOption(currentValue);
    console.log(currentValue);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="FirstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="LastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingName"
              label="ShippingName"
              name="shippingName"
              onChange={(e) => setShippingName(e.target.value)}
              value={shippingName}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingStreet"
              label="ShippingStreet"
              name="shippingStreet"
              onChange={(e) => setShippingStreet(e.target.value)}
              value={shippingStreet}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingCity"
              label="ShippingCity"
              name="shippingCity"
              onChange={(e) => setShippingCity(e.target.value)}
              value={shippingCity}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingPostalZipCode"
              label="ShippingPostalZipCode"
              name="shippingPostalZipCode"
              onChange={(e) => setShippingPostalZipCode(e.target.value)}
              value={shippingPostalZipCode}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="shippingCountry-label">Country</InputLabel>
              {/* Chọn quốc gia và update nó vào input  */}
              <Select
                labelId="shippingCountry-label"
                id="shippingCountry"
                label="Country"
                fullWidth
                value={shippingCountry}
                onChange={handlerShippingCountryChange}
              >
                {Object.keys(shippingCountries).map((idx) => (
                  <MenuItem value={idx} key={idx}>
                    {shippingCountries[idx]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingStateProvince-label">
                State / Province
              </InputLabel>
              {/* Chọn tỉnh thành và update nó vào input  */}
              <Select
                labelId="shippingStateProvince-label"
                id="shippingStateProvince"
                label="ShippingStateProvince"
                onChange={handlerSubdivisionChange}
                fullWidth
                value={shippingStateProvince}
                required
                className={classes.mt1}
              >
                {Object.keys(shippingSubdivisions).map((idx) => (
                  <MenuItem value={idx} key={idx}>
                    {shippingSubdivisions[idx]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingOption-label">Shipping Option</InputLabel>
              <Select
                labelId="shippingOption-label"
                id="shippingOption"
                label="Shipping Option"
                onChange={handlerShippingOptionChange}
                fullWidth
                value={shippingOption}
                required
                className={classes.mt1}
              >
                {shippingOptions.map((method, idx) => (
                  <MenuItem value={method.id} key={idx}>
                    {`${method.description} - $${method.price.formatted_with_code}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cardNum"
              label="Card Numbẻ"
              name="cardNum"
              onChange={(e) => setCardNum(e.target.value)}
              value={cardNum}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expMonth"
              label="Exp Month"
              name="expMonth"
              onChange={(e) => setExpMonth(e.target.value)}
              value={expMonth}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expYear"
              label="Exp Year"
              name="expYear"
              onChange={(e) => setExpYear(e.target.value)}
              value={expYear}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              onChange={(e) => setCvv(e.target.value)}
              value={cvv}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingPostalZipCode"
              label="CVV"
              name="billingPostalZipCode"
              onChange={(e) => setBillingPostalZipCode(e.target.value)}
              value={billingPostalZipCode}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <Layout title="Checkout" commercePublicKey={props.commercePublicKey}>
      <Typography variant="h6" color="black" component="h1">
        Checkout
      </Typography>
      {cart.loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card className={classes.p1}>
              <form>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box>
                  {activeStep === steps.length > 0 ? (
                    error && error.length > 0 ? (
                      <Box>
                        <List>
                          {error.map((error) => (
                            <ListItem key={error}>
                              <Alert severity="error">{error}</Alert>
                            </ListItem>
                          ))}
                        </List>
                        <Box className={classes.mt1}>
                          <Button onClick={handlerBack}>Back</Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <CircularProgress />
                        <Typography className={classes.instructions}>
                          Confirming Order
                        </Typography>
                      </Box>
                    )
                  ) : (
                    <Box>
                      {getStepContent(activeStep)}
                      <Box className={classes.mt1}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handlerBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handlerNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? "Confirm Order"
                            : "Next"}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </form>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">Order summary</Typography>
                </ListItem>
                {cart.data.line_items.map((lineItem) => (
                  <ListItem key={lineItem.id}>
                    <Grid container>
                      <Grid item xs={6}>
                        {lineItem.quantity} x {lineItem.name}
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          {lineItem.line_total.formatted_with_symbol}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Subtotal
                    </Grid>
                    <Grid item xs={6} align="right">
                      {cart.data.subtotal.formatted_with_symbol}
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

//Dynamic là 1 hàm từ next.js và set srr = false thì trang này sẽ chỉ được hiển thị ở client chứ k có ở BE
export default dynamic(() => Promise.resolve(Checkout), {
  srr: false,
});
