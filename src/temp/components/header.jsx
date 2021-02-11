import React, { Component } from "react";
import Cookie from 'js-cookie'
import {Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {Badge} from 'reactstrap'
import Tooltip from "@material-ui/core/Tooltip";

class Header extends Component {
  state = {
    logout : false
  }

  logout = () => {
    Cookie.remove('user');
    this.setState({logout: true})
  }
  render() {
    // if(!Cookie.getJSON('user') === undefined){
    //   this.props.history.push('/login')

	// }
	const {cart} = this.props;

    if(this.state.logout){
      return(
      <Redirect to ="/login" />
    )
    }

    const user = Cookie.getJSON('user');
    return (
      <div>
        <header class="header_area fixed-top" style={{position:'fixed'}}>
		<div class="top_menu row m0">
			<div class="container-fluid">
				<div class="float-left">
					<p>Call Us: +234 806 479 2146</p>
				</div>
				<div class="float-right">
					<ul class="right_side">
          {!Cookie.getJSON('user') &&
						<li>
							<a href="/login" >
								Login/Register
							</a>
						</li>}

            {Cookie.getJSON('user') &&
						<li>
							<a href="#">
								ACCOUNT NAME- <span className="font-weight-bold">{user.name}</span>
							</a>
						</li>}

						{Cookie.getJSON('user') &&
						<li onClick={this.logout}>
							<a href="#">
								LOG OUT <i className="fa fa-sign-out"></i>
							</a>
						</li>}
					</ul>
				</div>
			</div>
		</div>
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light">
				<div class="container-fluid">
					<a class="navbar-brand logo_h" href="/">
						<img src={require('../img/logo.jpg')} alt="" width="23%" />
					</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
					 aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<div class="row w-100">
							<div class="col-lg-7 pr-0">
								<ul class="nav navbar-nav center_nav pull-right">
									<li class="nav-item font-weight-bold">
										<a class="nav-link font-weight-bold" href="/">Home</a>
									</li>
									<li class="nav-item">
										<a class="nav-link font-weight-bold" href="/categories">Shop categories</a>
									</li>
									{/* <li class="nav-item submenu dropdown">
										<a href="/categories" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop Categories</a>
										<ul class="dropdown-menu">
											<li class="nav-item">
												<a class="nav-link" href="/category">Shop Category</a></li>
												<li class="nav-item">
													<a class="nav-link" href="/product">Product Details</a></li>
													<li class="nav-item">
														<a class="nav-link" href="/checkout">Product Checkout</a></li>
														<li class="nav-item">
															<a class="nav-link" href="/cart">Shopping Cart</a>
														</li>
														<li class="nav-item">
															<a class="nav-link" href="/confirm">Confirmation</a>
														</li>

										</ul>
									</li> */}
									{/* <li class="nav-item submenu dropdown">
										<a href="#" class="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a> */}
										{/* <ul class="dropdown-menu">
											<li class="nav-item">
												<a class="nav-link" href="#">Blog</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="single-blog.html">Blog Details</a>
											</li>
										</ul> */}
									{/* </li> */}
									<li class="nav-item submenu dropdown">
										<a href="#" class="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ABOUT US</a>
										{/* <ul class="dropdown-menu">
											<li class="nav-item">
												<a class="nav-link" href="login.html">Login</a></li>
												<li class="nav-item">
													<a class="nav-link" href="tracking.html">Tracking</a></li>
													<li class="nav-item">
														<a class="nav-link" href="elements.html">Elements</a>
													</li>
										</ul> */}
									</li>

								</ul>
							</div>

							<div class="col-lg-5">
								<ul class="nav navbar-nav navbar-right right_nav pull-right">
									<hr />
									{/* <li class="nav-item">
										<a href="#" class="icons">
											<i class="fa fa-search" aria-hidden="true"></i>
										</a>
									</li> */}

									<hr />
									{Cookie.getJSON('user') &&
									<Tooltip title="My Profile">
										<li class="nav-item">
										<a href="/profile" class="icons">
											<i class="fa fa-user" aria-hidden="true"></i>
										</a>
									</li>

									</Tooltip>
									}

									<hr />

									{/* <li class="nav-item">
										<a href="#" class="icons">
											<i class="fa fa-heart-o" aria-hidden="true"></i>
										</a>
									</li> */}

									<hr />

									<li class="nav-item">
										<a href="/cart" class="icons">
											<i class="lnr lnr lnr-cart "></i>
											{cart.length !==0 && <Badge color="secondary">{cart.length}</Badge>}
										
										</a>
									</li>

									<hr />
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	</header>
      </div>
    );
  }
}

const map = state => ({
	cart: state.cart.cartItems
})

export default connect(map)(Header);
