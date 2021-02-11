import React from 'react'
import Header from './components/header'
import {Card, Form, FormGroup, Label, Button} from 'reactstrap'
import { render } from '@testing-library/react'
import {addCart, removeItem, clearCart} from './Redux/action/cart'
import {connect} from 'react-redux';
import axios from 'axios'
import { XAxis } from 'react-vis'

class Confirm extends React.Component{

	componentWillMount =() => {
		this.props.clearCart()

	}


	api  = () => {
		const data = {
			product_id: 6205,
			pay_item_id: 101,
			amount: 'XXXXXXX',
			currency: 566,
			site_redirect_url:'http://abc.com/getresponse',
			txn_ref: 'XXXAFTXXX',
			hash: 'D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F'

		}
		axios.post(`https://sandbox.interswitchng.com/webpay/pay`, data).
		then((res) => {
			console.log(res.data)
		})
	}



	render(){
		const {cart} = this.props;
		return(
			<>
			<Header />
			<Card body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>  
					<br />
					
				   <p className="text-center  text-white">Order Confirmation</p>
				   </Card>
	
		<section class="order_details p_120">
			<div class="container">
				<h3 class="title_confirmation">Thank you. Your order has been received.</h3>
				<Button color="info" onClick={this.api}>Pay</Button>
				<div class="row order_d_inner">
					<div class="col-lg-4">
						<div class="details_item">
							<h4>Order Info</h4>
							<ul class="list">
								<li>
									<a href="#">
										<span>Order number</span> : 60235</a>
								</li>
								<li>
									<a href="#">
										<span>Date</span> : Los Angeles</a>
								</li>
								<li>
									<a href="#">
										<span>Total</span> : USD 2210</a>
								</li>
								<li>
									<a href="#">
										<span>Payment method</span> : Check payments</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="details_item">
							<h4>Billing Address</h4>
							<ul class="list">
								<li>
									<a href="#">
										<span>Street</span> : 56/8</a>
								</li>
								<li>
									<a href="#">
										<span>City</span> : Los Angeles</a>
								</li>
								<li>
									<a href="#">
										<span>Country</span> : United States</a>
								</li>
								<li>
									<a href="#">
										<span>Postcode </span> : 36952</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="details_item">
							<h4>Shipping Address</h4>
							<ul class="list">
								<li>
									<a href="#">
										<span>Street</span> : 56/8</a>
								</li>
								<li>
									<a href="#">
										<span>City</span> : Los Angeles</a>
								</li>
								<li>
									<a href="#">
										<span>Country</span> : United States</a>
								</li>
								<li>
									<a href="#">
										<span>Postcode </span> : 36952</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="order_details_table">
					<h2>Order Details</h2>
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">Product</th>
									<th scope="col">Quantity</th>
									<th scope="col">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<p>Pixelstore fresh Blackberry</p>
									</td>
									<td>
										<h5>x 02</h5>
									</td>
									<td>
										<p>$720.00</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>Pixelstore fresh Blackberry</p>
									</td>
									<td>
										<h5>x 02</h5>
									</td>
									<td>
										<p>$720.00</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>Pixelstore fresh Blackberry</p>
									</td>
									<td>
										<h5>x 02</h5>
									</td>
									<td>
										<p>$720.00</p>
									</td>
								</tr>
								<tr>
									<td>
										<h4>Subtotal</h4>
									</td>
									<td>
										<h5></h5>
									</td>
									<td>
										<p>$2160.00</p>
									</td>
								</tr>
								<tr>
									<td>
										<h4>Shipping</h4>
									</td>
									<td>
										<h5></h5>
									</td>
									<td>
										<p>Flat rate: $50.00</p>
									</td>
								</tr>
								<tr>
									<td>
										<h4>Total</h4>
									</td>
									<td>
										<h5></h5>
									</td>
									<td>
										<p>$2210.00</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>

		<div>
			<p>
			Payment shit</p>
			<form name="form1" action="https://sandbox.interswitchng.com/webpay/pay" method="post">

<input name="product_id" type="hidden" value="6204"/>
<inpu name="pay_item_id" type="hidden" value="101"/>
{/* <input name="amount" type="hidden" value="2000"/>
<input name="currency" type="hidden" value="566"/>
<input name="txn_ref "type="hidden" value="010120161130AM9999"/>
<input name="site_redirect_url "type="hidden" value="localhost:3000/confirmation"/> */}
<input name="Hash" type="hidden" value="E187B1191265B18338B5DEBAF9F38FEC37B170FF582D4666DAB1F098304D5EE7F3BE15540461FE92F1D40332FDBBA34579034EE2AC78B1A1B8D9A321974025C4"/>
<button type="submit" >Submit</button>

</form>
			
			


			
			</div>
	
		<section class="subscription-area section_gap">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-8">
						<div class="section-title text-center">
							<h2>Subscribe for Our Newsletter</h2>
							<span>We won’t send any kind of spam</span>
						</div>
					</div>
				</div>
				<div class="row justify-content-center">
					<div class="col-lg-6">
						<div id="mc_embed_signup">
							<form target="_blank" novalidate action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
							 method="get" class="subscription relative">
								<input type="email" name="EMAIL" placeholder="Email address" 
								 required="" />
								<div style={{position: 'absolute',left: '-5000px'}}>
										<input type="text" name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" />
									</div> 
								<button type="submit" class="newsl-btn">Get Started</button>
								<div class="info"></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
			</>
		)

	

	
    
}
}
const map = state => ({
    cart : state.cart.cartItems
})
export default connect(map,{clearCart})(Confirm);