import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Container, Typography } from "@material-ui/core";
import CartEmpty from "./CartEmpty";
import CartFilled from "./CartFilled";
import useStyles from "./style";

const Cart = () => {
  const classes = useStyles();
  const { cart } = useContext(CartContext);

  const isEmpty = !cart.line_items?.length;

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isEmpty ? (
        <CartEmpty classes={classes} />
      ) : (
        <CartFilled classes={classes} />
      )}
    </Container>
  );
};
export default Cart;
