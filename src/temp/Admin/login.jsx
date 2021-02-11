/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import Cookie from 'js-cookie'
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormText,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import Spinner from 'react-loader-spinner'
import Footer from "../components/footer";
import axios from "axios";
import './App.css'
class AdminLogin extends React.Component {
  state = {
    load: false,
    status: false,
    email: "",
    password: "",
    token: false,
    catch: false,
    firstName: "",
    lastName: "",
    log:false
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onClick = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  };

  login = (e) => {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: true
    };
    this.setState({load: true})
    if (login.email && login.password) {
      this.setState({
        load: true,
      });
      axios
        .post(
          `http://localhost:4000/api/login/admin`,login
        )
        .then((res) => {
            Cookie.set('Admin', JSON.stringify(res.data.userAdmin))
            this.props.history.push('/admin_dashboard')
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            catch: true,
            load: !this.state.load,
          });
          setTimeout(() => {
            this.setState({
              catch: false,
            });
          }, 800);
        });
    } else {
      this.setState({
        status: true, load:false
      });
      setTimeout(() => {
        this.setState({
          status: false,
        });
      }, 1000);
    }
  };

  render() {
    if(this.state.log){
      return(
        <Redirect to="/admin_dashboard" />
      )
    }

    return (
      <>
           <div className="login-bg pb-5" style={{background:'white'}}>
         <div className="login-box">
      <Form style={{width:'21rem', background:'#222'}} className="borderLine">
        <h5 className="text-white font-weight-bold  text-center">Azach Admin Login.</h5>
        <div className="text-center image-underLogin"><img src={require('../img/logo2.jpg')} className="logoR" />
        </div>
        {this.state.catch && <p className="text-danger text-center pt-2 pb-0">Unathorised Login</p>}
        {this.state.load && <Spinner type="ThreeDots" className="text-center pt-1" width={50} height={30}  />}
        {this.state.status && <div className="alert alert-danger text-center mt-3">Fields are required!</div>}


      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="text-left text-white pt-2 ">UserID</Label>
         <Input type="email" name="email" id="exampleEmail" onChange={this.onChange} style={{border: this.state.status && '1px solid red'}} />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword" className="text-left text-white ">Password</Label>
     <Input type="password" name="password" id="examplePassword" onChange={this.onChange} style={{border: this.state.status && '1px solid red'}}  />
      </FormGroup>


      <div className="text-center">
      <Button size="md" className="mt-5" color="info"  className="" onClick={this.login}>Login</Button>

      </div>



    </Form>


         </div>
       </div>

      </>
    );
  }
}

export default AdminLogin;
