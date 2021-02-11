import React, { Component } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import {Card, FormGroup, Label} from 'reactstrap'
import axios from 'axios'
import {server, port } from './config'
import {Input} from 'reactstrap'
import './index.css'

class Product extends Component {
	state = {
		
		singleProduct: {},
		qty: '',
		size: '',
		error:false
	}
	componentWillMount = () => {
		axios.get(`${server}:${port}/api/product/${this.props.match.params.id}`).
		then((res) => {
			if(res.data.product){
				this.setState({singleProduct: res.data.product})
			}
			
		}).
		catch((err) => {
			console.log(err)

		})
		
	}

	onChange = (e) => {
		const {name, value} = e.target;
		this.setState({[name] : value})
	}

	handleCart = (e) => {
		e.preventDefault()
		const userData = {
			qty: this.state.qty,
			size: this.state.size
		}
		if(userData.qty && userData.size){
		this.props.history.push({
			pathname: "/cart/" + this.props.match.params.id + "?qty=" + this.state.qty,
			state: userData
		})
	}
	else{
		this.setState({error:true})
		setTimeout(() => {
			this.setState({error:false})
		},2500)
	}


	}
    render() {

        return (
            <div>
				<Header />
				<Card body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>  
				<br />
				
               <p className="text-center  text-white">Product</p>
               </Card>

    <div class="product_image_area">
		<div class="container">
			<div class="row s_product_inner">
				<div class="col-lg-6">
					<div class="s_product_img">
						<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
						
							<div class="carousel-inner">
								<div class="carousel-item active">
									<img class="d-block w-100" src={`http://localhost:4000/uploads/${this.state.singleProduct.image ? this.state.singleProduct.image.filename: ""}`} alt="First slide" />
								</div>
								{/* <div class="carousel-item">
									<img class="d-block w-100" src="/img/bg_1.jpg" alt="Second slide" />
								</div>
								<div class="carousel-item">
									<img class="d-block w-100" src="/img/bg_1.jpg" alt="Third slide" />
								</div> */}
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-5 offset-lg-1">
				<p className="font-weight-bold pt-2">PRODUCT INFORMATION.</p>

					<div class="s_product_text">

						<h3>{this.state.singleProduct.name}</h3>
						<h2>#{this.state.singleProduct.price}</h2>
						<ul class="list">
						<li>
								<a href="#">
									<span>Brand</span> : {this.state.singleProduct.brand}</a>
							</li>
							<li>
								<a class="active" href="#">
									<span>Category</span> : {this.state.singleProduct.category}</a>
							</li>
							<li>
								<a href="#">
									<span>Availibility</span> :{this.state.singleProduct.stock > 0 ?   "In Stock" : "Not Available"}</a>
							</li>
							<li>
								<a href="#">
									<span>Description</span> : {this.state.singleProduct.description}</a>
							</li>
						</ul>
						<p className="font-weight-bold">PRODUCT ORDER QUANTITY.</p>
						<div className="row">
						<FormGroup className="col-md-4">
							<Label>Size</Label>
							<Input type="select" name="size" onChange={this.onChange} className={this.state.error && "error"}>
								<option>Select Size</option>
								<option>Small</option>
								<option>Medium</option>
								<option>Large</option>
								<option>X-Large</option>


							</Input>
						</FormGroup>
						</div>
						<div className="row">

						<FormGroup className="col-md-4">
						<label for="qty">Quantity:</label>
							<Input type="text" name="qty" id="exampleSelect" onChange={this.onChange} placeholder="Input Quantity"  className={this.state.error && "error"}/>
						</FormGroup>

						</div>
						
						{/* <div class="product_count col-md-4">
							<label for="qty">Quantity:</label>
							<Input type="text" name="qty" id="exampleSelect" onChange={this.onChange} />

                      {[...Array(this.state.singleProduct.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
						</div> */}
						{this.state.singleProduct.stock > 0  &&
						<div class="card_area">
							<a class="main_btn" href="/cart" onClick={this.handleCart}>Add to Cart</a>
							{/* <a class="icon_btn" href="#">
								<i class="lnr lnr lnr-diamond"></i>
							</a>
							<a class="icon_btn" href="#">
								<i class="lnr lnr lnr-heart"></i>
							</a> */}
						</div>}
					</div>
				</div>
			</div>
		</div>
	</div>

	<Footer />
                
            </div>
        );
    }
}

export default Product;