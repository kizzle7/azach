import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Card, Button } from "reactstrap";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import axios from 'axios'
import { connect } from "react-redux";
import { Modal } from "antd";
import {server, port} from './config'
import './index.css'
const flat = 200;

class Checkout extends React.Component {
	state = {
		fname: '',
		lastname: '',
		phone: '',
		email: '',
		country: '',
		address: '',
		city: '',
		product: this.props.cart,
		info:false,
		preveiw:false,
		error:false,
		paymentframe: false

	}



	cancelpreview = () => {
		this.setState({preveiw:false})
	}

	onChange = (e) => {
		const {name, value} = e.target;
		this.setState({[name]: value})
	}

	takeDetails = (e) => {
		e.preventDefault();
		const info = {
			firstname: this.state.fname,
			lastname: this.state.lastname,
			phonenumber: this.state.phone,
			email: this.state.email,
			city: this.state.city,
			address: this.state.address,
			
		}
		if(info.firstname && info.lastname && info.phonenumber && info.email && info.email && info.city && info.address){
			this.setState({preveiw:true})
		}
		else{

			this.setState({error: true})
			setTimeout(() => {
				this.setState({error:false})
			},2500)
		}
		

	}

	order =() => {
		const data =  Cookie.getJSON('user');
		const token = data.token
		const info = {
			firstname: this.state.fname,
			lastname: this.state.lastname,
			phonenumber: this.state.phone,
			email: this.state.email,
			city: this.state.city,
			address: this.state.address,
			products : this.state.product,
			
		}
		axios.post(`${server}:${port}/api/order`, info, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		}).
		then((res) => {
			if(res.data.order){
				this.setState({info: true, preveiw: false, paymentframe: true })
			}
		})

	}
  render() {
	const { cart } = this.props;
    if (Cookie.getJSON("user") === undefined || cart.length === 0 ) {
      this.props.history.push({
		  pathname: '/login',
		  state: {msg : 'You have an Empty Cart!'}
	  });
	}
	
	const price = cart.reduce((a, c) => a + c.price * c.qty, 0);

	const config = {
		reference: '5672aa6wyh76470376',
		email: "abimbolavictor3@gmail.com",
		amount: cart.reduce((a, c) => a + c.price * c.qty, 0) ,
		publicKey: 'pk_test_0a4edde00a3b8fdf7b68ab787aedda79bb53d3fa',
	};

	
	
	const PaystackHookExample = () => {
		const initializePayment = usePaystackPayment(config);
		return (
			<div>
				<button onClick={() => {
					initializePayment()
				}}>Paystack Hooks Implementation</button>
			</div>
		);
	};
	
	const componentProps = {
		...config,
		text: 'Paystack Button Implementation',
		onSuccess: () => null,
		onClose: () => null
	};

	console.log(cart)

    return (
      <div>
        <Header />
        <Card
          body
          inverse
          style={{
            backgroundColor: " #222222",
            borderColor: " #222222",
            paddingTop: "8rem",
          }}
        >
          <br />

          <p className="text-center  text-white">Checkout</p>
        </Card>

        <section class="checkout_area section_gap">
          <div class="container">
            <div class="billing_details">
				{this.state.error &&
				<div className="alert alert-danger text-center">All Fields Are Required!!</div>}
              <div class="row">
				  {!this.state.info ?
                <div class="col-lg-8">
                  <h3>Billing/Shipping Details</h3>
                  <form
                 
                  >
                    <div class="col-md-6 form-group p_star">
                      <input
                        type="text"
                        class="form-control"
                        id="first"
						name="fname"
						onChange={this.onChange}
						placeholder ="First Name"
                      />
                     
                    </div>
                    <div class="col-md-6 form-group p_star">
                      <input
                        type="text"
                        class="form-control"
                        id="last"
						name="lastname"
						onChange={this.onChange}
						placeholder ="Last Name"

                      />
                      
                    </div>

                    <div class="col-md-6 form-group p_star">
                      <input
                        type="text"
                        class="form-control"
                        id="number"
						name="phone"
						onChange={this.onChange}
						placeholder = "Phone Number"

                      />
                      
                    </div>
                    <div class="col-md-6 form-group p_star">
                      <input
                        type="text"
                        class="form-control"
                        id="email"
						name="email"
						onChange={this.onChange}
						placeholder="Email"
                      />
                     
                    </div>
                    <div class="col-md-12 form-group p_star">
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        name="compemailany"
                        value="Nigeria"
                        disabled
                      />
                    </div>
                    <div class="col-md-12 form-group p_star">
                      <input
                        type="text"
                        class="form-control"
                        id="add1"
						name="city"
						onChange={this.onChange}
						placeholder="City"

                      />
                    </div>
                    <div class="col-md-12 form-group p_star">
                      <textarea
                        name=""
                        class="form-control"
                        id="add2"
						name="address"
						onChange={this.onChange}
						placeholder ="Address"
						
                      ></textarea>
                   
                    </div>
					<Button color="info"  size="md"  className="btn btn-block mt-3" onClick={this.takeDetails}>SUBMIT</Button>
                  </form>
				</div>:
				    <div class="col-lg-8">
					<h3 className="text-success">Your Information has been submitted Successfully, Please Proceed to Payment to finalize your order</h3>
					<form
				   
					>
					  <div class="col-md-6 form-group p_star">
						<input
						  type="text"
						  class="form-control"
						  id="first"
						  name="fname"
						  value={this.state.fname}
						  disabled
						/>
					
					  </div>
					  <div class="col-md-6 form-group p_star">
						<input
						  type="text"
						  class="form-control"
						  id="last"
						  name="lastname"
						  value={this.state.lastname}
						  disabled
  
						/>
						
					  </div>
  
					  <div class="col-md-6 form-group p_star">
						<input
						  type="text"
						  class="form-control"
						  id="number"
						  name="phone"
						  value={this.state.phone}
						  disabled
  
						/>
					
					  </div>
					  <div class="col-md-6 form-group p_star">
						<input
						  type="text"
						  class="form-control"
						  id="email"
						  name="email"
						  value={this.state.email}
						  disabled
						  
						/>
						
					  </div>
					  <div class="col-md-12 form-group p_star">
						<input
						  type="text"
						  class="form-control"
						  id="email"
						  name="compemailany"
						  value="Nigeria"
						  disabled
						/>
					  </div>
					  <div class="col-md-12 form-group p_star">
						<input
						  type="text"
						  class="form-control"
						  id="add1"
						  name="city"
						  value={this.state.city}
						  disabled
  
						/>
					  </div>
					  <div class="col-md-12 form-group p_star">
						<textarea
						  name=""
						  class="form-control"
						  id="add2"
						  name="address"
						  value={this.state.address}
						  disabled
  
						  
						></textarea>
					
					  </div>
					</form>
				  </div>}
                {this.state.paymentframe ?
                <div class="col-lg-4">
                  <div class="order_box">
                    <h2>Your Order</h2>
                    <ul class="list">
                      <li>
                        <a href="#">
                          Product
                          <span>Total</span>
                        </a>
                      </li>
                      {cart.map((item) => {
                        return (
                          <li>
                            <a href="#">
                              {item.name}
                              <span class="middle">x 0{item.qty}</span>
                              <span class="last">#{item.price}.00</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul class="list list_2">
                      <li>
                        <a href="#">
                          Subtotal
                          <span>
                            #{cart.reduce((a, c) => a + c.price * c.qty, 0)}.00
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Shipping
                          <span>Flat rate: #000.00</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Total
                          <span>#{price}.00</span>
                        </a>
                      </li>
                    </ul>

					<div class="creat_account pb-2">
					<input type="checkbox" id="f-option4" name="selector" />
					<label for="f-option4">I’ve read and accept the </label>
					<a href="#">terms & conditions*</a>
				  </div>
				  <PaystackConsumer {...componentProps} >
                {({initializePayment}) => <Button className="pt-1 pb-1 mt-2 btn-block" color="success" onClick={() => initializePayment()}>PROCEED TO PAYMENT</Button>}
            </PaystackConsumer>
                  </div>
				</div>:
				<div class="col-lg-4 blurry">
				<div class="order_box">
				  <h2>Your Order</h2>
				  <ul class="list">
					<li>
					  <a href="#">
						Product
						<span>Total</span>
					  </a>
					</li>
					{cart.map((item) => {
					  return (
						<li>
						  <a href="#">
							{item.name}
							<span class="middle">x 0{item.qty}</span>
							<span class="last">#{item.price}.00</span>
						  </a>
						</li>
					  );
					})}
				  </ul>
				  <ul class="list list_2">
					<li>
					  <a href="#">
						Subtotal
						<span>
						  #{cart.reduce((a, c) => a + c.price * c.qty, 0)}.00
						</span>
					  </a>
					</li>
					<li>
					  <a href="#">
						Shipping
						<span>Flat rate: #200.00</span>
					  </a>
					</li>
					<li>
					  <a href="#">
						Total
						<span>#{price + flat}.00</span>
					  </a>
					</li>
				  </ul>

				  <div class="creat_account pb-2">
					<input type="checkbox" id="f-option4" name="selector" />
					<label for="f-option4">I’ve read and accept the </label>
					<a href="#">terms & conditions*</a>
				  </div>
				  <PaystackConsumer {...componentProps} >
                {({initializePayment}) => <Button className="pt-1 pb-1 mt-5 btn-block" color="success" onClick={() => initializePayment()}>PROCEED TO PAYMENT</Button>}
            </PaystackConsumer>
				</div>
			  </div>}
              </div>
            </div>
          </div>
        </section>

        <Modal
          title="Personal Information Confirmation"
          visible={this.state.preveiw}
          onCancel={this.cancelpreview}
          okText="Create"
          cancelText=""
          maskClosable={false}
		  footer={null}
		  width={800}
		  centered={true}
		  
        >
			<div className="row">
				<div className="col-md-6 form-group">
					<label className="font-weight-bold">First Name</label>
					<input type ="text" value={this.state.fname}  className="form-control" disabled />
				</div>
				<div className="col-md-6 form-group">
					<label className= "font-weight-bold">Last Name</label>
					<input type ="text" value={this.state.lastname}  className="form-control" disabled />
				</div>
				</div>
				<div className="form-group">
					<label className="font-weight-bold">Email</label>
					<input type ="text" value={this.state.email}   className="form-control" disabled />
				</div>
				<div className=" form-group">
					<label className="font-weight-bold">Phone Number</label>
					<input type ="text" value={this.state.phone}  className="form-control" disabled />
				</div>
				<div className=" form-group">
					<label className="font-weight-bold">City</label>
					<input type ="text" value={this.state.city}   className="form-control" disabled />
				</div>
				<div className=" form-group">
					<label className="font-weight-bold">Address</label>
					<input type ="text" value={this.state.address}  className="form-control" disabled />
				</div>

			
			<div className="text-right">
				<Button color="success"  size="md" onClick ={this.order}>SUBMIT</Button>
			</div>
          
        </Modal>

        <Footer />
      </div>
    );
  }
}
const map = (state) => ({
  cart: state.cart.cartItems,
});

export default connect(map)(Checkout);
