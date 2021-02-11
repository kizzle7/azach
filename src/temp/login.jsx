
import React, { Component, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer'
import { CardHeader, Card, CardTitle, FormGroup, Input, Label } from 'reactstrap';
import {useSelector,useDispatch} from 'react-redux';
import Cookie from 'js-cookie'
import {server, port} from './config'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './index.css'

import {Modal} from 'antd'

class Login extends React.Component{
	state = {
		email: '',
		password: '',
		errorMsg: '',
		error:false,
		serverError:false,
		load:false,
		field: false
	}


onChange = (e) => {
 	const {name, value} = e.target;
	this.setState({
		[name]: value
	})
}


 login = (e) => {
		e.preventDefault();
		
		const loginData = {
			email: this.state.email,
			password: this.state.password
		}
		if(loginData.email && loginData.password){
			this.setState({load:true})
		axios.post(`${server}:${port}/api/login`,
			loginData
		).
		then((res) => {
			if(res.data.user){
				Cookie.set('user', JSON.stringify(res.data.user))
				this.setState({load: false})
				this.props.history.push('/');
			}
			else{
				this.setState({errorMsg: res.data.msg, error: true, load:false})
				setTimeout(() => {
					this.setState({error:false})
				},2000)
			}
		}).
		catch((err) => {
			this.setState({serverError: true, load:false})
			setTimeout(() => {
				this.setState({serverError: false})
			},2000)
		})
	}
	else{
		this.setState({field: true})
		setTimeout(() => {
			this.setState({field: false})
		},2000)
	}


	}
	render(){
		if(Cookie.getJSON('user')){
			this.props.history.push('/')
		}
		return (
			<div>
				<Header />
				<Card body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>
				<br />

							 <p className="text-center  text-white">Login</p>
							 </Card>



	<section class="login_box_area p_120">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="login_box_img">
						<img class="img-fluid" src="img/bg_1.jpg" alt="" />
						<div class="hover">
							<h4>New to our Azach?</h4>
							<a class="main_btn" href="/register">Create an Account</a>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner">
						<h3>Log in To Your Account</h3>
						{this.state.load && <Loader type="TailSpin" width={30} height={30} className="pb-3" />}
					{this.state.error && <div className="alert alert-danger   text-center">Server Error!</div>}
					{this.state.serverError && <div className="alert alert-danger  col-md-6 offset-3 text-center">Server Error</div>}
					{this.state.field && <div className="alert alert-danger col-md-6 offset-3 text-center">Email And Password Required</div>}


						<form class="row login_form" onSubmit={this.login} >
							<div class="col-md-12 form-group">
							<input type="email" name="email" className="form-control"  onChange ={this.onChange} style={{borderBottom: this.state.field && '1px solid red'}}  placeholder ="Email"  />

							</div>
							<div class="col-md-12 form-group">
								<input type="password" name="password" className="form-control" style={{borderBottom: this.state.field && '1px solid red'}}  onChange ={this.onChange} placeholder="Password"  />
							</div>

							<div class="col-md-12 form-group">
								<div class="creat_account">
									<input type="checkbox" id="f-option2" name="selector" />
									<label for="f-option2">Keep me logged in</label>
								</div>
							</div>
							<div class="col-md-12 form-group">
								<button class="btn submit_btn" onClick={this.login}>Log In</button>
								<a href="#">Forgot Password?</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>


	<Footer />








			</div>
		);
	}
	}






export default Login;
