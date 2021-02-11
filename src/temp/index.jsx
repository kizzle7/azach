import React, { Component } from "react";
import Header from './components/header'
import Footer from './components/footer'
import axios from 'axios';
import {server, port} from './config'
import {Link} from 'react-router-dom'

class App extends Component {

	state = {
		products: []
	}

	componentWillMount = () => {
		const token = sessionStorage.getItem('token')
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
	render() {
		return (
			<div>
				<Header />
				<section class="home_banner_area">
					<div class="overlay"></div>
					<div class="banner_inner d-flex align-items-center">
						<div class="container">
							<div class="banner_content row">
								<div class="offset-lg-2 col-lg-8">
									<h3>Fashion for
							<br />Everyone</h3>
									<p>                  Azach is not your everyday fashion brand, Azach is versatility, Azach is a culture,  Azach is functional, Azach is the brand that caters that your everyday fashion needs with it's own uniqueness.
.</p>
									<a class="white_bg_btn" href="/categories">View Collection</a>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class="hot_deals_area section_gap">
					<div class="container-fluid">
						<div class="row">
							<div class="col-lg-6">
								<div class="hot_deal_box">
									<img class="img-fluid" src="img/product/hot_deals/deal1.jpg" alt="" />
									<div class="content">
										<h2>Our Hot Deals of this Month</h2>
										<p>shop now</p>
									</div>
									<a class="hot_deal_link" href="#"></a>
								</div>
							</div>

							<div class="col-lg-6">
								<div class="hot_deal_box">
									<img class="img-fluid" src="img/product/hot_deals/deal1.jpg" alt="" />
									<div class="content">
										<h2>Our Hot Deals of Last Month</h2>
										<p>shop now</p>
									</div>
									<a class="hot_deal_link" href="#"></a>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section class="feature_product_area section_gap">
					<div class="main_box">
						<div class="container-fluid">
							<div class="row">
								<div class="main_title">
									<h2>Featured  Trending Products</h2>
									<p>checkout our trending products</p>
								</div>
							</div>
							<div class="row">
							{this.state.products.map((product) => {
								return(
								<div class="col col1" key={product._id}>
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src={`http://localhost:4000/uploads/${product.image.filename}`} alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<Link to={{pathname: `/product_information/${product._id}`}}>
													<i class="lnr lnr-cart"></i>
												</Link>
											</div>
										</div>
										<Link to={{pathname: `/product_information/${product._id}`}}>
											<h4>{product.name}</h4>
										</Link>
										
											<h4>{product.brand}</h4>
										
										<h5>#{product.price}.00</h5>
									</div>
								</div>
							)

							})}

								{/* <div class="col col2">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-2.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>
								<div class="col col3">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-3.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>
								<div class="col col4">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-4.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>
								<div class="col col5">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-5.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>

								<div class="col col6">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-5.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>

								<div class="col col7">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-4.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>

								<div class="col col8">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-5.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>
								<div class="col col9">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-1.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div>
								<div class="col col10">
									<div class="f_p_item">
										<div class="f_p_img">
											<img class="img-fluid" src="img/product/feature-product/f-p-4.jpg" alt="" />
											<div class="p_icon">
												<a href="#">
													<i class="lnr lnr-heart"></i>
												</a>
												<a href="#">
													<i class="lnr lnr-cart"></i>
												</a>
											</div>
										</div>
										<a href="#">
											<h4>Long Sleeve TShirt</h4>
										</a>
										<h5>#3000.00</h5>
									</div>
								</div> */}
							</div>

							<div class="row">
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
					</div>
				</section>

				<Footer />


			</div>
		);
	}
}

export default App;
