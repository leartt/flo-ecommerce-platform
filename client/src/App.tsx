import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from '@src/pages/Home';
import About from '@src/pages/About';
import Shop from '@src/pages/Shop';
import Contact from '@src/pages/Contact';
import Header from './components/Header';

/* eslint-disable */
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      /* used for displaying toast notification in every page */
      <ToastContainer
        position="bottom-center"
        newestOnTop={true as boolean}
        limit={3}
        autoClose={3000}
        hideProgressBar={true as boolean}
      />
    </Router>
  );
};

export default App;
