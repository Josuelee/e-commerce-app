import { useState, useEffect, useContext } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartContext from "./context/CartContext";

const App = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchCart, refreshCart } = useContext(CartContext);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products products={products} />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <Checkout
              order={order}
              handleCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
