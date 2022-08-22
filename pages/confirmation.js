import React from "react";
import {
  Grid,
  Card,
  Typography,
  Slide,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
} from "@mui/material";
import { useContext } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { Store } from "../components/Store";
import { useStyles } from "../utils/styles";

function Confirmation(props) {
  const classes = useStyles();
  const { state } = useContext(Store);
  const { order } = state;

  return (
    <Layout title="Order" commercePublicKey={props.commercePublicKey}>
      {!order ? (
        <Alert icon={false} severity="error">
          No order found.
        </Alert>
      ) : (
        <React.Fragment>
          <Typography variant="h1" component="h1">
            Order
          </Typography>
          <Slide direction="up" in={true}>
            <Grid container spacing={1}>
              <Grid item xs={9}>
                {/* Thông tin khách hàng */}
                <Card className={classes.p1}>
                  <Typography variant="h2" component="h2">
                    Customer details
                  </Typography>
                  <Typography>
                    {order.customer.firstname}
                    {order.customer.lastname}
                  </Typography>
                  <Typography>{order.customer.email}</Typography>
                </Card>
                {/* Thông tin vận chuyển */}
                <Card className={[classes.p1, classes.mt1]}>
                  <Typography variant="h2" component="h2">
                    Shipping details
                  </Typography>
                  <Typography>{order.shipping.name}</Typography>
                  <Typography>{order.shipping.street}</Typography>
                  <Typography>
                    {order.shipping.town_city},{order.shipping.country_state}
                  </Typography>
                  <Typography>{order.shipping.country}</Typography>
                </Card>
                <Card className={[classes.p1, classes.mt1]}>
                  <Typography variant="h2" component="h2">
                    Payment details
                  </Typography>
                  {order.transactions && order.transactions[0] ? (
                    <>
                      <Typography>
                        {order.transactions[0].gateway_name}
                      </Typography>
                      <Typography>
                        Cart ending in {order.transactions[0].gateway_reference}
                      </Typography>
                      <Typography>
                        Transaction ID:
                        {order.transactions[0].gateway_transaction_id}
                      </Typography>
                    </>
                  ) : (
                    <Alert>No payment found.</Alert>
                  )}
                </Card>
              </Grid>
              <Card className={[classes.p1, classes.mt1]}>
                <Typography variant="h2" component="h2">
                  Order Item
                </Typography>
                <TableContainer>
                  <Table aria-label="Orders">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.order.line_items.map((cartItem) => (
                        <TableRow key={cartItem.name}>
                          <TableCell>{cartItem.name}</TableCell>
                          <TableCell align="right">
                            {cartItem.quantity}
                          </TableCell>
                          <TableCell align="right">
                            {cartItem.price.formatted_with_symbol}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
              <Grid item md={3} xs={12}>
                <Card>
                  <Typography variant="h2" component="h2">
                    Order Summary
                  </Typography>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Subtotal</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right">
                            {order.order.subtotal.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Tax</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right">
                            {order.tax.amount.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Total</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h3" align="right">
                            {order.order.total_with_tax.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Total paid</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h3" align="right">
                            {order.order.total_paid.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Slide>
        </React.Fragment>
      )}
    </Layout>
  );
}

//Dynamic là 1 hàm từ next.js và set srr = false thì trang này sẽ chỉ được hiển thị ở client chứ k có ở BE
export default dynamic(() => Promise.resolve(Confirmation), {
  srr: false,
});
