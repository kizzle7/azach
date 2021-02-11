import React, { Component } from "react";
import Footer from "../components/footer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { Modal } from "antd";
import {getMuiTheme} from '../components/mui'
import MUIDataTable from "mui-datatables";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import FileBase64 from 'react-file-base64';
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
import Cookie from "js-cookie";
import axios from "axios";
import { product } from "ramda";


class Admin_Products extends Component {
  state = {
    modal: false,
    first:true,
    second:false,
    product: {},
   	products: [],
  	productsInformation: false,
    edit:false,
    name: '',
    price: '',
    description: '',
    brand: '',
    stock: '',
    category: '',
    rating: '',
    review:'',
    image: '',
    process: false,
    sucess:false,
    upid: '',
    upname: '',
    upprice: '',
    updescription: '',
    upbrand: '',
    upstock: '',
    upcategory: '',
    uprating: '',
    upimage: '',
    upreview: '',
    alertUpdate: false,
    alertDel:false,
    fields: false


  };

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})

  }

  getFiles =(files) => {
    this.setState({ image: files })
  }


  refresh = () => {
    if(Cookie.getJSON('Admin')){
    const data = Cookie.getJSON("Admin");
    const token = data.token;
    axios
      .get(`http://localhost:4000/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({ products: res.data.products });
      });}
      else{
        this.props.history.push('/admin_login')
      }
  }

  componentWillMount = () => {
   this.refresh()
  };

  editable = (e) => {
	  e.preventDefault()
	  this.setState({edit:true})
  }

  closeProductInformation = () => {
	  this.setState({productsInformation:false, edit:false, first:true})
  }



  options = (e) => {
    e.preventDefault();
  };

  toggle = () => this.setState({ modal: true , first:false});

  viewTerminalData = (id) => {
    const product = id.rowData[0]
    this.setState({first:false})
    axios.get(`http://localhost:4000/api/product/${product}`,
    ).
    then((res) => {
      if(res.data.product){
      this.setState({productsInformation:true, product: res.data.product,upid:id.rowData[0],upname: res.data.product.name, upprice:res.data.product.price,
        upbrand: res.data.product.brand, upstock: res.data.product.stock, updescription: res.data.product.description,uprating: res.data.product.rating,
        upcategory: res.data.product.category, uprating: res.data.product.rating, upimage:res.data.product.image, upreview: res.data.product.review
        
      })
     
    }
    })
  };

  closeProduct = () => this.setState({ modal: false , first:true});

  newProduct = () => {
    this.setState({first:false})
    if(this.state.name && this.state.brand && this.state.description && this.state.rating & this.state.review && this.state.stock && this.state.price && this.state.category && this.state.image){
    const data = Cookie.getJSON("Admin");
    const token = data.token;
    const product =  new FormData();
    product.append('name',this.state.name );
    product.append('brand',this.state.brand);
    product.append('description',this.state.description);
    product.append('rating',this.state.rating);
    product.append('review',this.state.review);
    product.append('stock',this.state.stock);
    product.append('price',this.state.price);
    product.append('category',this.state.category);
    product.append('image',this.state.image, this.state.image.name);
    this.setState({process: true})
    axios.post(`http://localhost:4000/api/admin/create`,product, {
      headers: {
        Authorization : `Bearer ${token}`,
        ContentType : 'multipart/form-data',
      }
    }).
    then((res) => {
      console.log(res.data)
      this.setState({process:false, modal:false, success:true,first: true, edit:false})
      setTimeout(() => {
        this.setState({success:false})
      },2500)
      this.refresh()
    })
  }else{
    this.setState({fields:true})
    setTimeout(() => {
      this.setState({fields: false})
    })
  }
  }

  showDelete = (id) => {
    confirmAlert({
      message: "Admin!, Are you sure to do delete this Product.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const data = Cookie.getJSON('Admin');
            const token = data.token;
            const terminal = id.rowData[0];
            axios
              .delete(
                `http://localhost:4000/api/admin/${terminal}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data.result);
                this.setState({ alertDel: true, first:true });
                setTimeout(() => {
                  this.setState({ alertDel: false });
                }, 2500);
                this.refresh();
              });
          },
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  }; 

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  fileChange = (e) => {
    this.setState({image: e.target.files[0]})

  }

  fileChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  update = () => {
    this.setState({productsInformation:false, process:true})
    const updateData = {
      name: this.state.upname,
      brand: this.state.upbrand,
      price: this.state.upprice,
      description: this.state.updescription,
      review: this.state.upreview,
      rating: this.state.uprating,
      image: this.state.upimage,
      stock: this.state.upstock,
      category: this.state.upcategory,

    };
    confirmAlert({
      message: "Are you sure to do update this item?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const data =  Cookie.getJSON('Admin')
            const token = data.token
            axios
              .put(
                `http://localhost:4000/api/admin/${this.state.upid}`,
                updateData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data.result);
                this.setState({
                  first:true,
                  process:false,
                  alertUpdate: true,edit:false
                });
                setTimeout(() => {
                  this.setState({ alertUpdate: false });
                }, 2500);
                this.refresh();
              });
          },
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  render() {

    if(Cookie.getJSON('Admin') === undefined){
      this.props.history.push('/admin_login')

    }
    const TerminalsM = [
      {
        name: "Product ID",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Product Name",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Product Price",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },

      {
        name: "Product Brand",
        options: {
          filter: false,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Product Category",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Stock",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Rating",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Review",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
              style: {
                backgroundColor: "white",

                whiteSpace: "pre",
                color: "#172433",
              },
            };
          },
        },
      },
      {
        name: "Action",
        options: {
          filter: false,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              key={2}
              onClick={() => updateDirection(2)}
              style={{ cursor: "pointer", color: "#172433" }}
            >
              {columnMeta.name}
            </th>
          ),
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <Tooltip title={"View Terminal"}>
                  <Button
                    onClick={this.viewTerminalData.bind(this, tableMeta)}
                    className="mt-0 mb-0"
                    color="info"
                    size="sm"
                  >
                    View Details
                  </Button>
                </Tooltip>
                <Tooltip title={"Delete Terminal"}>
                  <Button
                    onClick={this.showDelete.bind(this, tableMeta)}
                    className="mt-0 mb-0"
                    color="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </Tooltip>
              </>
            );
          },
        },
      },
    ];
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
    };

    let products = [];
    let innerArray3 = [];

    this.state.products.forEach((res) => {
      let jsObjs = res;
      innerArray3 = [];
      innerArray3.push(jsObjs._id);
      innerArray3.push(jsObjs.name);
      innerArray3.push(jsObjs.price);
      innerArray3.push(jsObjs.brand);
      innerArray3.push(jsObjs.category);
      innerArray3.push(jsObjs.stock);
      innerArray3.push(jsObjs.rating);
      innerArray3.push(jsObjs.review);
      products.push(innerArray3);
    });

  

    const imagepath = `http://localhost:4000/uploads/` 


    return (
      <div>
        <div className="headeri fixed-top pb-0">
          <a
            href="/admin_dashboard"
            className="pl-3 text-white font-weight-bold mr-auto"
          >
            <h4 className="text-white">
              ADMIN USER- {Cookie.getJSON('Admin') ? Cookie.getJSON('Admin').name : ""} <i className="fa fa-user-circle"></i>
            </h4>
          </a>
          <a
            href="/admin_products"
            className="pr-5 text-white font-weight-bold"
          >
            <p>PRODUCTS TRAY</p>
          </a>
          <a
            href="/admin_deliveries"
            className="pr-5 text-white font-weight-bold"
          >
            <p>DELIVERIES </p>
          </a>

        </div>

        <Card className="card-stats pt-5">
          <CardBody>
            <Row>
              <Col md="12">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-info pt-2 pl-3">
                    Admin Admin_Products / <span>Customers Orders</span>
                  </p>
                  <Button color="info" size="sm" onClick={this.toggle}>
                    New Product <i className="fa fa-plus-circle"></i>
                  </Button>
                </div>
              </Col>
              <Col></Col>
            </Row>
          </CardBody>
        </Card>
        {this.state.success &&
         <div className="alert alert-success text-center col-md-6 offset-3">Product was created successfully</div>}
          {this.state.alertDel &&
         <div className="alert alert-danger text-center col-md-6 offset-3">Product was Deleted successfully</div>}
         {this.state.alertUpdate &&
         <div className="alert alert-success col-md-6 offset-3 text-center">Product was was updated successfully</div>}
         {this.state.first &&
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"AZACH BASE PRODUCTS LIST"}
            data={products}
            columns={TerminalsM}
            options={options}
          />
        </MuiThemeProvider>}

        <Modal
          title="Create New Product"
          visible={this.state.modal}
          footer={null}
          onCancel={this.closeProduct}
          style={{ marginTop: "5rem" }}
          okText="Submit"
          cancelText="Clear"
          maskClosable={false}
          centered={true}
          width={900}
        >
          <Form className="">
          {this.state.process && <Loader type="TailSpin" className="text-center" width={50} height={50} />}
          {this.state.fields && <div classNam="alert alert-danger">All fields are required</div>}

            <div className="row">
              <div className="col-md-4">
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
            <div  className="col-md-4">
            <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Price
              </Label>
              <Input
                type="number"
                name="price"
                id="examplePassword"
                onChange={this.onChange}
              />
            </FormGroup>
            </div>
            <div className="col-md-4">
            <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Brand
              </Label>
              <Input
                type="text"
                name="brand"
                id="examplePassword"
                onChange={this.onChange}
              />
            </FormGroup>
            </div>
            <div className="col-md-4">
            <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Stock Number
              </Label>
              <Input
                type="Number"
                name="stock"
                id="examplePassword"
                onChange={this.onChange}
              />
            </FormGroup>
            </div>
            <div className="col-md-4">
            <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Category
              </Label>
              <Input
                type="select"
                name="category"
                id="examplePassword"
                onChange={this.onChange}>
                  <option>Select Category</option>
                  <option>Male</option>
                  <option>Female</option>
                </Input>
              
            </FormGroup>
            </div>
            <div className="col-md-4">
            <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Rating
              </Label>
              <Input
                type="number"
                name="rating"
                id="examplePassword"
                onChange={this.onChange}
              />
            </FormGroup>

            </div>
            </div>
            <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Description
              </Label>
              <Input
                type="textarea"
                name="description"
                id="examplePassword"
                onChange={this.onChange}
              />
            </FormGroup>
           
        
           <div className="row">
             <div className="col-md-6">
             <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Image
              </Label><br />
            <Input type="file" name="image" onChange={this.fileChange} />
            </FormGroup>

             </div>
             <div className="col-md-6">
             <FormGroup>
              <Label for="examplePassword" className="font-weight-bold">
                Product Review Number
              </Label><br />
            <Input type="text" name="review" onChange={this.onChange} />
            </FormGroup>
             </div>
           </div>
            
            <div className="text-right">
           <Button className="btn btn-info" size="sm" onClick={this.newProduct}>
             Create Product
           </Button>
           </div>
           

          </Form>
        </Modal>

        <Modal
          title="Product Information"
          visible={this.state.productsInformation}
          footer={null}
          onCancel={this.closeProductInformation}
          style={{ marginTop: "5rem" }}
          okText="Submit"
          cancelText="Clear"
          maskClosable={false}
          width={900}
          centered={true}
        >
          <Form className="">
          {this.state.process && <Loader type="TailSpin" className="text-center" width={50} height={50} />}

		  {!this.state.edit ?
            <div className="row">
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="exampleEmail" className="font-weight-bold">
                        Product Name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="exampleEmail"
                        value={this.state.product.name}
                        disabled
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Price
                      </Label>
                      <Input
                        type="number"
                        name="price"
                        id="examplePassword"
                        value={this.state.product.price}
                        disabled
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Brand
                      </Label>
                      <Input
                        type="text"
                        name="brand"
                        id="examplePassword"
                        value={this.state.product.brand}
                        disabled
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Stock
                      </Label>
                      <Input
                        type="text"
                        name="stock"
                        id="examplePassword"
                        value={this.state.product.stock}
                        disabled
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Category
                      </Label>
                      <Input
                        type="text"
                        name="category"
                        id="examplePassword"
                        value={this.state.product.category}
                        disabled
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Rating
                      </Label>
                      <Input
                        type="text"
                        name="rating"
                        id="examplePassword"
                        value={this.state.product.rating}
                        disabled
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Description
                      </Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="examplePassword"
                        value={this.state.product.description}
                        disabled
                      />
                    </FormGroup>
                  </div>
                  
                  <div className="col-md-6 offset-3 mt-2 text-center">
                   <img src={imagepath +  this.state.product.image} alt="product Image" className="w-100" />
                  </div>

            </div> :

			<div className="row">
			<div className="col-md-4">
                    <FormGroup>
                      <Label for="exampleEmail" className="font-weight-bold">
                        Product Name
                      </Label>
                      <Input
                        type="text"
                        name="upname"
                        id="exampleEmail"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Price
                      </Label>
                      <Input
                        type="number"
                        name="upprice"
                        id="examplePassword"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Brand
                      </Label>
                      <Input
                        type="text"
                        name="upbrand"
                        id="examplePassword"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Stock
                      </Label>
                      <Input
                        type="text"
                        name="upstock"
                        id="examplePassword"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Category
                      </Label>
                      <Input
                        type="select"
                        name="upcategory"
                        id="examplePassword"
                        onChange={this.onChange}
                      >
                        <option>Please Select</option>
                        <option>Male</option>
                        <option>Female</option>

                      </Input>
                    </FormGroup>
                  </div>

                  <div className="col-md-4">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Rating
                      </Label>
                      <Input
                        type="text"
                        name="uprating"
                        id="examplePassword"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Description
                      </Label>
                      <Input
                        type="textarea"
                        name="updescription"
                        id="examplePassword"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="ml-3">
                    <FormGroup>
                      <Label for="examplePassword" className="font-weight-bold">
                        Product Image
                      </Label>
                      <Input
                        type="file"
                        name="upimage"
                        id="examplePassword"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </div>
			</div>}

            <div className="text-right">
              {!this.state.edit ? (
                <Button
                  className="btn btn-info"
                  size="sm"
                  onClick={this.editable}
                >
                  Edit Product
                </Button>
              ) : (
                <Button
                  className="btn btn-info"
                  size="sm"
                  onClick={this.update}
                >
                  Update Product
                </Button>
              )}
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
  dataSet = [
    ["3563ee738363yu63dh37383",  "Balen Jacket", "2000",  "Gucci", "Jacket", "200","10","78"],
    ["3563ee738363yu63dh37382","Tentra Short", "8000",  "DENIM", 'Short', "200","10","78"],
    ["3563ee738363yu63dh37381",  "Head Warmer", "9000",  "FENDI",'Trousers',"200","10","78"],
    ["3563ee738363yu63dh37387", "Duragg", "13000", "BURBERRY",'Denim Jacket',"200","10","78"],
    ["3563ee738363yu63dh37380", "Custom Jacket", "21000", "DENIM", "Hentai Short", "200","10","78"],
    ["3563ee738363yu63dh37388",  "Gucci Belt", "11000", "DENIM", 'JumpSuit',"200","10","78"],
    ["3563ee738363yu63dh37386",  "Fendi Tie",  "1300", "DENIM","Chinos","200","10","78"],
    ["3563ee738363yu63dh373s9",  "Alexa RoundNeck", "20000", "DENIM", "Nickers","200","10","78"],


  ]
}

export default Admin_Products;
