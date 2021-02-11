import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer'
import {Card} from 'reactstrap'
import axios from 'axios'
import{server, port} from './config'
import Loader from 'react-loader-spinner'

class Register extends Component {
	state = {
		email : '',
		password: '',
		name: '',
		password2: '',
		success:false,
		error:false,
	serverError:false,
	fieldErrors:false,
	passwordError:false
	}

	onChange = (e) => {
		const {name, value} = e.target;
		this.setState({[name]: value})
	}

	register = (e) => {
		e.preventDefault();
			this.setState({load: true})
		if(this.state.password === this.state.password2){



		const registerData = {
			email:  this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			name:  this.state.name
		}
		if(registerData.email && registerData.password && registerData.password2 && registerData.name){

		axios.post(`${server}:${port}/api/register`, registerData).
		then((res) => {
			if(res.data.newUser){
				this.setState({success: true})
				setTimeout(() => {
					this.setState({success:false, load:false})
				},2500)
			}
			else{
				this.setState({error: true, load:false})
				setTimeout(() => {
					this.setState({error: false})
				},2500)
			}
		}).
		catch((err) => {
			this.setState({serverError: true, load:false})
			setTimeout(() => {
				this.setState({serverError:false})
			},2500)
		})
	}


	else{
		this.setState({fieldErrors: true})
		setTimeout(() => {
			this.setState({fieldErrors: false})
		},2500)
	}
}
else{
	this.setState({passwordError: true})
	setTimeout(() => {
		this.setState({passwordError:false})
	},2500)
}

	}
	render() {
		return (
			<div>
				<Header />
				<Card body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>
				<br />

               <p className="text-center  text-white">Register</p>
               </Card>

	<section class="login_box_area p_120">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="login_box_img">
						<img class="img-fluid" src="img/bg_1.jpg" alt="" />
						<div class="hover">

							<a class="main_btn" href="/login">Login</a>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner reg_form">
						<h3>Create an Account</h3>
						{this.state.load && <Loader type="TailSpin" width={45} height={45} className="pb-3" />}
						{this.state.error && <div className="alert alert-danger col-md-6 offset-3 text-center">Server Error</div>}
						{this.state.serverError && <div className="alert alert-danger col-md-6 offset-3 text-center">Server Error</div>}
						{this.state.success && <div className="alert alert-success col-md-6 offset-3 text-center">Account Created Successfully</div>}
						{this.state.fieldErrors && <div className="alert alert-danger col-md-6 offset-3 text-center">Fields Cannot be Empty</div>}
						{this.state.passwordError && <div className="alert alert-danger col-md-6 offset-3 text-center">Password Does Not Match</div>}




						<form class="row login_form">
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="name" name="name" placeholder="Name" onChange={this.onChange} />
							</div>
							<div class="col-md-12 form-group">
								<input type="email" class="form-control" id="email" name="email" placeholder="Email Address"  onChange={this.onChange}/>
							</div>
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="password" name="password" placeholder="Password" onChange={this.onChange} />
							</div>
							<div class="col-md-12 form-group">
								<input type="password" class="form-control" id="pass" name="password2" placeholder="Confirm password" onChange={this.onChange} />
							</div>
							<div class="col-md-12 form-group">
								<div class="creat_account">
									<input type="checkbox" id="f-option2" name="selector" />
									<label for="f-option2">Keep me logged in</label>
								</div>
							</div>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" class="btn submit_btn" onClick={this.register}>Register</button>
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

export default Register;
