import { useState, useEffect, useContext } from "react";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";

import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";

import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import CartContext from "../../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
const steps = ["Shipping address", "Payment details"];

const Checkout = ({ order, handleCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        
        setCheckoutToken(token);
      } catch (error) {
        navigate("/");
      }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevValue) => prevValue + 1);
  const backStep = () => setActiveStep((prevValue) => prevValue - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase!, {order.customer.firstname}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.costumer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};
export default Checkout;
