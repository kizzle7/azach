import React, { Component, useEffect} from "react";
import Footer from './components/footer'
import {Card, Label, Input, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getAll, getCategory, getPrice, getCombo} from './Redux/action/category'
import Header from './components/header'
import {server, port} from './config';
import {connect} from 'react-redux'
import {Radio} from 'antd'
class Categories extends React.Component{

	state = {
		value : '',
		products: []
	}

	componentWillMount = () => {
		axios.get(`${server}:${port}/api/products`).
		then((res) => {
			if(res.data.products){
				this.setState({products : res.data.products})
			}
		}).
		catch((err) => {
			console.log(err)
		})
	}



	getAll = () => {
		axios.get(`${server}:${port}/api/products`).
		then((res) => {
			if(res.data.products){
				this.setState({products : res.data.products})
			}
		}).
		catch((err) => {
			console.log(err)
		})
	}

	getCategory = (cat) => {
		
		axios.get(`http://localhost:4000/api/category/${cat}`).
		then((res)=> {
			this.setState({products: res.data.categoryproducts})
		}).
		catch((err) => {
			console.log(err.message);
		   
		})
	}

	toto = () => {
		this.props.getAll()
	}

	onChange = e => {
		if(e.target.value === 1){
			// window.location.reload(true)
			this.getAll();
		}
		else if(e.target.value === "Male"){
			this.getCategory(e.target.value)

		}
		else if(e.target.value === "Female"){
			this.getCategory(e.target.value)
		}

	  };


render() {

  const {dynamicProducts} = this.props;



    return (
      <div>
        <Header />
		<Card body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>
				<br />

               <p className="text-center  text-white">Categories</p>
               </Card>

    <section class="cat_product_area section_gap">
		<div class="container-fluid">
			<div class="row">
			<div class="col-lg-3">
					<div class="left_sidebar_area">
						<aside class="left_widgets cat_widgets">
							<div class="l_w_title">
								<h3>Browse Categories</h3>
							</div>
							<div class="widgets_inner">
								<ul class="list">
									<li>
										<a href="#">Denim Jackets</a>
									</li>

									{/* <li>
										<a href="#">Wears</a>
										<ul class="list">
											<li>
												<a href="#">Frozen Fish</a>
											</li>
											<li>
												<a href="#">Dried Fish</a>
											</li>
											<li>
												<a href="#">Fresh Fish</a>
											</li>
											<li>
												<a href="#">Meat Alternatives</a>
											</li>
											<li>
												<a href="#">Meat</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">Others</a>
										<ul class="list">
                                    <li>
                                        <a href="#">Flat Rate: #5.00</a>
                                    </li>
                                    <li>
                                        <a href="#">Free Shipping</a>
                                    </li>
                                    <li>
                                        <a href="#">Flat Rate: #10.00</a>
                                    </li>
                                    <li class="active">
                                        <a href="#">Local Delivery: #2.00</a>
                                    </li>
                                </ul>
									</li> */}
									{/* <li>
										<a href="#">Home and Cleaning</a>
									</li> */}
								</ul>
							</div>
						</aside>
						<aside class="left_widgets p_filter_widgets">
							<div class="l_w_title">
								<h3>Product Filters</h3>
							</div>
									<div class="widgets_inner">
										<h4 className="font-weight-bold">Gender</h4>
										<ul class="list">
											<li>
											<Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1} className="pb-3">All</Radio><br />

        <Radio value={"Male"} className="pb-3">Male</Radio><br />
        <Radio value={"Female"}>Female</Radio><br />
      </Radio.Group>
											</li>
										</ul>
									</div><hr />

				
						</aside>
					</div>
				</div>
				<div class="col-lg-9">
					<div class="product_top_bar">
						<div class="left_dorp">
							<select class="sorting">
								<option value="1">Clothings</option>

							</select>

						</div>
						{/* <div class="right_page ml-auto">
							<nav class="cat_page" aria-label="Page navigation example">
								<ul class="pagination">
									<li class="page-item">
										<a class="page-link" href="#">
											<i class="fa fa-long-arrow-left" aria-hidden="true"></i>
										</a>
									</li>
									<li class="page-item active">
										<a class="page-link" href="#">1</a>
									</li>
									<li class="page-item">
										<a class="page-link" href="#">2</a>
									</li>
									<li class="page-item">
										<a class="page-link" href="#">3</a>
									</li>
									<li class="page-item blank">
										<a class="page-link" href="#">...</a>
									</li>
									<li class="page-item">
										<a class="page-link" href="#">6</a>
									</li>
									<li class="page-item">
										<a class="page-link" href="#">
											<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
										</a>
									</li>
								</ul>
							</nav>
						</div> */}
					</div>
					<div class="latest_product_inner row">
					{this.state.products.map((item) => {
						return(
							<div class="col-lg-3 col-md-3 col-sm-6" key={item._id}>
							<div class="f_p_item">
								<div class="f_p_img">
									<img class="img-fluid" src={`http://localhost:4000/uploads//${item.image.filename}`} alt="" />
									<div class="p_icon">
										<a href="#">
											<i class="lnr lnr-heart"></i>
										</a>
										<Link to={{pathname: `/product_information/${item._id}`}}>
											<i class="lnr lnr-cart"></i>
										</Link>
									</div>
								</div>
								<Link to={{pathname: `/product_information/${item._id}`}}>
									<h4>{item.name}</h4>
								</Link>
								<h5>#{item.price}</h5>
							</div>
						</div>

						)

					})}


					</div>
				</div>

			</div>

			<div class="row pt-5">
				<nav class="cat_page mx-auto" aria-label="Page navigation example">
					<ul class="pagination">
						<li class="page-item">
							<a class="page-link" href="#">
								<i class="fa fa-chevron-left" aria-hidden="true"></i>
							</a>
						</li>
						<li class="page-item active">
							<a class="page-link" href="#">01</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">02</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">03</a>
						</li>
						<li class="page-item blank">
							<a class="page-link" href="#">...</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">09</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">
								<i class="fa fa-chevron-right" aria-hidden="true"></i>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</section>

    <Footer />
      </div>
	);
				}

}
const map= state => ({
	dynamicProducts: state.products.products
})

export default connect(map, {getCategory,getAll,getPrice, getCombo})(Categories);
