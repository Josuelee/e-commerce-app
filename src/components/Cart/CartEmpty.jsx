import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const CartEmpty = ({ classes }) => {
  return (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );
};
export default CartEmpty;
