import React from 'react';
import {BrowserRouter as Router, Link, Switch, Redirect, Route} from 'react-router-dom';
import App from './index';
import Login from './login';
import Register from './register';
import Contact from './contact'
import Product from './product'
import Categories from './categories'
import Checkout from './checkout'
import Cart from './cart'
import Confirm from './confirm'
import AdminLogin from './Admin/login'
import Dashboard from './Admin/index'
import Create from './Admin/create'
import AdminProducts from './Admin/products'
import Admin_Delivery from './Admin/deliveries'
import 'antd/dist/antd.css';
import store from './store';
import {Provider} from 'react-redux';
import Profile from './profile'

class Show extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={App} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/register" component={Register} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/categories" component={Categories} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/cart/:id?" component={Cart} />
                        <Route path="/confirmation" component={Confirm} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/product_information/:id" component={Product} />
                        <Route path="/admin_login" component={AdminLogin} />
                        <Route path="/admin_dashboard" component={Dashboard} />
                        <Route path="/create_product" component={Create} />
                        <Route path="/admin_products" component={AdminProducts} />
                        <Route path="/admin_deliveries" component={Admin_Delivery} />




                    </Switch>
                </Router>
                </Provider>

        
        )
    }
}
export default Show;
