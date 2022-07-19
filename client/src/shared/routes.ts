import Home from '@src/pages/Home';
import Shop from '@src/pages/Shop';
import Contact from '@src/pages/Contact';
import About from '@src/pages/About';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

export default routes;
