import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import routes from './shared/routes';

/* eslint-disable */
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
