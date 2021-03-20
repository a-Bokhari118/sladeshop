import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ProtectedRoute from './components/route/ProtectedRoute';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

//admin imports
import Dashboard from './components/admin/Dashboard';

// load loggedin user
import { loadUser } from './actions/userActions';
import store from './store';
import { useSelector } from 'react-redux';

// ================================
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProdcutsList from './components/admin/ProdcutsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={ProductDetails} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <ProtectedRoute path='/me' component={Profile} exact />
          <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
          <ProtectedRoute
            path='/password/update'
            component={UpdatePassword}
            exact
          />
          <Route path='/password/forgot' component={ForgotPassword} exact />
          <Route path='/password/reset/:token' component={NewPassword} exact />

          <Route path='/cart' component={Cart} exact />

          <ProtectedRoute path='/shipping' component={Shipping} exact />
          <ProtectedRoute path='/order/:id' component={OrderDetails} exact />
          <ProtectedRoute path='/confirm' component={ConfirmOrder} exact />

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path='/payment' component={Payment} exact />
            </Elements>
          )}

          <ProtectedRoute path='/success' component={OrderSuccess} exact />
          <ProtectedRoute path='/orders/me' component={ListOrders} exact />
        </div>
        <ProtectedRoute
          path='/dashboard'
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path='/admin/products'
          isAdmin={true}
          component={ProdcutsList}
          exact
        />
        <ProtectedRoute
          path='/admin/product'
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path='/admin/product/:id'
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <ProtectedRoute
          path='/admin/orders'
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path='/admin/order/:id'
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        {/* {!loading && user.role !== 'admin' && <Footer />} */}
      </div>
    </Router>
  );
}

export default App;
