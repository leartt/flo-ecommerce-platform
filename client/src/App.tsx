import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '@src/components/Header';

import Home from '@src/pages/Home';
import About from '@src/pages/About';
import Shop from '@src/pages/Shop';
import Contact from '@src/pages/Contact';
import Cart from '@src/pages/Cart';
import Login from '@src/pages/Login';
import Signup from '@src/pages/Signup';
import Product from '@src/pages/Product';
import Checkout from '@src/pages/Checkout';

import ProtectedRoutes from '@src/ProtectedRoutes';
import useAuthStore from '@src/stores/auth';
import PaymentStatus from '@src/pages/PaymentStatus';

import theme from '@src/shared/theme';
import { ThemeProvider } from '@mui/material/styles';

/* eslint-disable */
const App = () => {
  const { getLoggedInUser, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      getLoggedInUser();
    }
    console.log('rendering entire app');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/status" element={<PaymentStatus />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        {/* used for displaying toast notification in every page */}
        <ToastContainer
          position="bottom-center"
          newestOnTop={true as boolean}
          limit={3}
          autoClose={3000}
          hideProgressBar={true as boolean}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
