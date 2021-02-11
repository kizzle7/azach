import React from 'react';
import Footer from './components/footer';
import Header from './components/header'
import {Card, Input, Button} from 'reactstrap'
import {connect } from 'react-redux';

import {addCart, removeItem} from './Redux/action/cart'
class Cart extends React.Component{
   
    componentWillMount = () => {
        console.log(this.props)
        const size = this.props.history.location.state  ? this.props.history.location.state.size : "medium"
        const productID = this.props.match.params.id;
        const qty= this.props.history.location.state ? this.props.history.location.state.qty : 1
        this.props.addCart(productID, qty, size)
    }

    removeItem = (id) => {
        this.props.removeItem(id)
    }

    proceedToshipping = () => {
        this.props.history.push('/checkout')
    }

    render(){
        const {cart} = this.props;
        console.log(cart)

    return(
        <div>
            <Header />
            <Card body inverse style={{ backgroundColor: ' #222222', borderColor: ' #222222', paddingTop:'8rem' }}>  
				<br />
				
               <p className="text-center  text-white">Cart</p>
               </Card>

<section class="cart_area pt-5">
<div class="container">
    <div class="cart_inner">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {cart.length === 0 ?
                <div className="text-center pt-5 d-flex justify-content-center font-weight-bold">Cart is Empty</div> : 
                <tbody>
                    {cart.map((item) => {
                        return (
                          <tr key={item.name}>
                            <td>
                            <div class="media pr-0">
  <img src={`http://localhost:4000/uploads/${item.image.filename}`} class="mr-3" style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
  <div class="media-body">
    <h5 class="mt-0">{item.name}</h5>
   {item.description}
  </div>
</div>
                            </td>
                            <td>
                              <h5 className="ml-1">#{item.price}</h5>
                            </td>
                            <td>
                              <div class="product_count pt-0 ">
                                
                                <label for="qty">Quantity Selected: <span className="font-weight-bold">{item.qty}</span></label>
                                <Input
                                  type="select"
                                  value={item.qty} onChange={(e)=> this.props.addCart(item.product,e.target.value)}
                                  
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  
                               


                                </Input>
                              </div>
                              
							
							
						    
                            </td>
                            <td>
                            <Button size="md" color="danger" className="mt-2" style={{background: 'red', color:'white'}}  onClick={this.removeItem.bind(this,item.product)}>Remove</Button>

                            </td>
                          </tr>
                        );

                    })}
           
                
                    <tr class="bottom_button">
                        <td>
                           
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            <h5>Subtotal ({cart.length}) Item(s)</h5>
                        </td>
                        <td>
                            <h5>#{cart.reduce((a,c) => a + c.price * c.qty, 0)}</h5>
                        </td>
                        
                    </tr>
                    <tr class="shipping_area">
                        <td>

                        </td>
                        <td>

                        </td>
                      
                        <td>
                            <h5>Shipping</h5>
                        </td>
                        <td>
                            <div class="shipping_box">
                                <ul class="list">
                            
                                    <li class="#">
                                        <a href="#">Delivery: #0.00</a>
                                    </li>
                                </ul>
                               
                            </div>
                        </td>
                    </tr>
                    <tr class="out_button_area">
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            <div class=" text-right">
                                <Button color="info" size="lg" onClick={this.proceedToshipping}>Proceed to checkout</Button>
                            </div>
                        </td>
                    </tr>
                </tbody>}
            </table>
        </div>
    </div>
</div>
</section>
<Footer />


        </div>
        
    )
}
}
const map = state => ({
    cart : state.cart.cartItems
})
export default connect(map,{addCart, removeItem})(Cart);
