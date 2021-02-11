import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Card } from 'reactstrap';
import axios from 'axios';
import Cookie from 'js-cookie'
export default class Create extends React.Component{
  state = {
    name: '',
    price: '',
    brand: '',
    stock: '',
    category: '',
    rating: '',
    image: ''

  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]:  value})
  }

  fileChange = (e) => {
    this.setState({image: e.target.fils[0]})

  }

  create = () => {
    const product = new FormData();
    product.append('name', this.state.name);
    product.append('price', this.state.price);
    product.append('brand', this.state.brand);
    product.append('stock', this.state.stock);
    product.append('category', this.state.category);
    product.append('rating', this.state.rating);
    product.append('image', this.state.image, this.state.image.name)

    console.log(product)
    const data = Cookie.getJSON('user');
    const token= data.token

    axios.post('http://localhost:4000/api/admin/create', product, {
      headers: {
        Authorization : `Bearer ${token}`,
        ContentType : 'multipart/form-data',
      }
    }).
    then((res) => {
      if(res.data.product){
      
        // this.props.history.push({
        //   pathname: '/admin_products',
        //   status: true
        // })
      }
    })
  }

 

 

 render(){
  const info = Cookie.getJSON('user');
  const username = info.name
  return(
      
    <>
<div className="headeri fixed-top pb-0">
      <a href="/admin_dashboard"><h4 className="text-white font-weight-bold mr-auto ">ADMIN {username} <i className="fa fa-user-circle"></i></h4></a>
      <p className="font-weight-bold text-white">Create Product</p>

    </div>




<section class="mt-5">
<div class="container">
<Form className="col-md-6 offset-3 pb-5 pt-5 product_border">
  <FormGroup>
    <Label for="exampleEmail" className="font-weight-bold">Product Name</Label>
    <Input type="text" name="name" id="exampleEmail" onChange ={this.onChange}  />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Price</Label>
    <Input type="number" name="price" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>
<FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Brand</Label>
    <Input type="text" name="brand" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>
<FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Stock</Label>
    <Input type="text" name="stock" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Category</Label>
    <Input type="text" name="category" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Rating</Label>
    <Input type="text" name="rating" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>
<FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Description</Label>
    <Input type="textarea" name="description" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>
<FormGroup>
    <Label for="examplePassword" className="font-weight-bold">Product Image</Label>
    <Input type="file" name="image" id="examplePassword" onChange ={this.onChange} />
  </FormGroup>

<Button className="btn btn-info" size="md" onClick={this.create}>Create Product</Button>
</Form>

  </div>
</section>
    </>
)

 }
    
}