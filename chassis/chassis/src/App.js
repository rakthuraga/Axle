import { Routes, Route } from 'react-router-dom';
import Nav from './js/Nav';
import Home from './js/Home';
import Shop from './js/Shop';
import './css/App.css';
import home_icon from "./img/home-icon.svg";
import cart_icon from "./img/cart-icon.svg";
import orders_icon from "./img/orders-icon.svg";
import ProductDetails from './js/ProductDetails';
import Checkout from './js/Checkout';
import Payment from './js/Payment';
import Orders from './js/Orders';
import OrderDetails from './js/OrderDetails';
import OrderConfirmed from './js/OrderConfirmed';


const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/shop/:query",
    element: <Shop />
  },
  {
    path: "/shop/product/:id",
    element: <ProductDetails />
  },
  {
    path: "/shop/checkout",
    element: <Checkout />
  },
  {
    path: "/shop/checkout/payment",
    element: <Payment />
  },
  {
    path: "/shop/checkout/payment/confirmation/:orderNumber",
    element: <OrderConfirmed />
  },
  {
    path: "/orders",
    element: <Orders />
  },
  {
    path: "/orders/detail/:orderId",
    element: <OrderDetails />
  },
]

const nav_routes = [
  {
    name: "Home",
    path: "/",
    icon: home_icon,
    element: <Home />
  },
  {
    name: "Shop",
    path: "/shop",
    icon: cart_icon,
    element: <Shop />
  },
  {
    name: "Orders",
    path: "/orders",
    icon: orders_icon,
    element: <Orders />
  }
  
]

function App() {
  return (
    <>
      {window.innerWidth > 1200 ? 
        <>
          <Nav routes={nav_routes} />

          <Routes>
            {routes.map((route, index) =>
              <Route path={route.path} element={route.element} key={index} />
            )}
          </Routes>
        </>
      :
        <p className="mobile-msg"><strong>Please view on desktop.</strong> Mobile website is still being worked on.</p>
      }
    </>
  );
}

export default App;
