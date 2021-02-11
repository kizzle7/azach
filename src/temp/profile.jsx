import React from 'react'
import Header from './components/header'
import { render } from '@testing-library/react'
import {addCart, removeItem, clearCart} from './Redux/action/cart'
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner'
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

class Profile extends React.Component{
    state = {
        process: false,
        fields: false
    }

	componentWillMount =() => {

	}



	render(){
		const {cart} = this.props;
		return(
			<>
			<Header />
			<Card className="" body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>  
					<br />
					
				   <p className="text-center  text-white">My Profile</p>
				   </Card>
	
		<section class="order_details p_120">
			<div class="container">
            <Form className="mt-0 pt-0">
          {this.state.process && <Loader type="TailSpin" className="text-center" width={50} height={50} />}
          {this.state.fields && <div classNam="alert alert-danger">All fields are required</div>}

            <div className="row">
                <div className="col-md-8">
                <FormGroup>
              <Label for="exampleEmail" className="font-weight-bold">
                Product Name
              </Label>
              <Input
                type="text"
                name="name"
                id="exampleEmail"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" className="font-weight-bold">
                Product Name
              </Label>
              <Input
                type="text"
                name="name"
                id="exampleEmail"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" className="font-weight-bold">
                Product Name
              </Label>
              <Input
                type="text"
                name="name"
                id="exampleEmail"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" className="font-weight-bold">
                Product Name
              </Label>
              <Input
                type="text"
                name="name"
                id="exampleEmail"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" className="font-weight-bold">
                Product Name
              </Label>
              <Input
                type="text"
                name="name"
                id="exampleEmail"
                onChange={this.onChange}
              />
            </FormGroup>

                </div>
              <div className="col-md-4">
              
</div>
</div>
</Form>
				
			</div>
		</section>
			</>
		)

	

	
    
}
}
export default Profile