import React, { Component } from "react";
import Footer from '../components/footer'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Cookie from 'js-cookie'
import axios from 'axios'
import MUIDataTable from "mui-datatables";
import {Modal, Space} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
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
	Button
  } from "reactstrap";
  const { confirm } = Modal;
class Dashboard extends Component {
	state = {
		modal: false,
		orders: [],
		updateSuccess:false,
		deleteSuccess:false,
		detail: false,
		order: {}
	}

  toggle = () => this.setState({modal: true})

componentWillMount =() => {
	this.refresh()
}



refresh = () => {
	if(Cookie.getJSON('Admin')){
	const data = Cookie.getJSON('Admin');
	const token = data.token;
	axios.get(`http://localhost:4000/api/order`, {
		headers: {
			Authorization : `Bearer ${token}`
		}
	}).
	then((res) => {

		if(res.data.orders){
		this.setState({orders: res.data.orders})
		}
	})
}
else{
	this.props.history.push('/admin_login')

}
}

closedetail = () => {
	this.setState({detail:false})
}

// componentDidUpdate = () => {
// 	this.refresh();
// }

	getMuiTheme = () => createMuiTheme({
		overrides: {
			MUIDataTableHeadCell: {
				fixedHeaderOptions: {
					backgroundColor: `blue !important`,
				}
			},
			MUIDataTableHead: {
				root: {
					backgroundColor: `#1D252D !important`,

				}
			},
			MUIDataTableBodyRow: {
				root: {
					'&:nth-child(odd)': {
						backgroundColor: '#e3e9ed',
						data: {
							whiteSpace: 'nowrap'
						}

					}
				}
			},
			MuiTableCell: {
				root: {
					padding: '3px 3px 0 0',


				},
				body: {
					fontSize: '12px',
					textAlign: 'left',

				}
			},

			MUIDataTableSelectCell: {
				headerCell: {
					backgroundColor: 'white'
				},
				checked: `lightcoral !important`
			},
			MUIDataTablePagination: {
				root: {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center"
				},
				caption: {
					fontSize: 12
				}
			}
		}
	})

	view = (id) => {
	const data = Cookie.getJSON("Admin");
	const token = data.token;
	const order  = id.rowData[1]
    axios
      .get(`http://localhost:4000/api/order/${order}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.order) {
          this.setState({ detail : true, order: res.data.order });
        }
      });
		
	}

	 showConfirmAddress = (id) =>  {

		confirmAlert({
			message: "Do you Want to Address this Order? By Confirming this Order request, You are sure you have recieved the expected payment for this order in your wallet!",
			buttons: [
			  {
				label: "Yes",
				onClick: () => {
					const idVal = id.rowData[1];
					const data = Cookie.getJSON("Admin");
					const token = data.token;
					const status = {
						status: 1
					}
				 axios
				.put(`http://localhost:4000/api/order_edit/${idVal}`, status, {
				  headers: {
					Authorization: `Bearer ${token}`,
				  },
				})
				.then((res) => {
				  if(res.data.order){
					  this.setState({updateSuccess: true})
					  setTimeout(() => {
						  this.setState({updateSuccess:false})
					  },2500)
					  this.refresh();
				  }
				});
				},
			  },
			  {
				label: "No",
				onClick: () => console.log("Click No"),
			  },
			],
		  });

	  }


	showDeleteConfirm =(id) => {
		confirmAlert({
			message: "Do you Want to Delete this Order?",
			buttons: [
			  {
				label: "Yes",
				onClick: () => {
					const idVal = id.rowData[1];
					const data = Cookie.getJSON('Admin');
					const token = data.token
					axios.delete(`http://localhost:4000/api/order_delete/${idVal}`, {
						headers: {
							Authorization : `Bearer ${token}`
						}
					}).
					then((res) => {
						if(res.data.msgi){
							this.setState({deleteSuccess:  true})
							setTimeout(() => {
								this.setState({deleteSuccess:false})
							},2500)
							this.refresh()
						}
					})
				},
			  },
			  {
				label: "No",
				onClick: () => console.log("Click No"),
			  },
			],
		  });
	}

	logout = (e) => {
		e.preventDefault()
		Cookie.remove('Admin')
		this.props.history.push('/admin_login')

	}

	render() {
		
	  if(Cookie.getJSON('Admin') === undefined){
      this.props.history.push('/admin_login')

	}

		const total = this.state.order.products? this.state.order.products.reduce((a, c) => a + c.price * c.qty, 0): "";
		const flat = 200;

		let orders = [];
		let innerArray3 = [];
	
		this.state.orders.forEach((res) => {
		  let jsObjs = res;
		  innerArray3 = [];
		  innerArray3.push(jsObjs._id);
		  innerArray3.push(jsObjs.firstname);
		  innerArray3.push(jsObjs.lastname);
		  innerArray3.push(jsObjs.email);
		  innerArray3.push(jsObjs.phonenumber);
		  innerArray3.push(jsObjs.city);
		  innerArray3.push(jsObjs.address);
		  innerArray3.push(jsObjs.status === 0 ? "Not Paid" : "Paid");


		  orders.push(innerArray3);
		});

		const TerminalsM = [
			{
				name: "View",
				options: {
				  filter: false,
				  customHeadRender: (columnMeta, updateDirection) => (
					<th
					  key={2}
					  onClick={() => updateDirection(2)}
					  style={{ cursor: "pointer", color: "#172433", paddingLeft: '1rem' }}
					>
					  {columnMeta.name}
					</th>
				  ),
				  sort: false,
				  empty: true,
				  customBodyRender: (value, tableMeta, updateValue) => {
					return (
					  <>
						<Tooltip title={"View Order"}>
						  <Button
							onClick={this.view.bind(this, tableMeta)}
							className="ml-3 mt-1 mb-1"
							size="sm"
							color="info"
							

						  >
							<i className="fa fa-dashcube"></i>
						  </Button>
						  </Tooltip>
				
					  </>
					);
				  },
				},
			  },
			{
				name: "Order ID",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433', paddingRight: '1rem' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'
							}
						};
					},

				}
			},
			{
				name: "First Name",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433', paddingRight: '2rem' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'
							}
						};
					},

				}
			},
			{

				name: "Last Name",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433', paddingRight: '2rem' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'
							}
						};
					}
				}
			},
			{

				name: "Email",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'
							}
						};
					}
				}
			},

			{

				name: "Phone Number",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'
							}
						};
					}
				}
			},

			{
				name: 'City',
				options: {
					filter: false,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433', paddingRight: '3rem' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'
							}
						};
					}
				}
			},
			{
				name: "Address",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433', paddingRight: '1rem' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'

							}
						};
					}
				}
			},
			
		
			{
				name: "Status",
				options: {
					filter: true,
					customHeadRender: (columnMeta, updateDirection) => (
						<th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer', color: '#172433', paddingRight: '2rem' }}>
							{columnMeta.name}
						</th>
					),
					setCellHeaderProps: (value) => {
						return {

							style: {
								backgroundColor: 'white',

								whiteSpace: 'pre',
								color: '#172433'

							}
						};
					}
				}
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
						{this.state.updateSuccess ?
						  <Button
							onClick={this.showConfirmAddress.bind(this, tableMeta)}
							className="mt-0 mb-0"
							size="sm"
							color="info"
							disabled

						  >
							Address Order
						  </Button>:
						   <Button
						   onClick={this.showConfirmAddress.bind(this, tableMeta)}
						   className="mt-0 mb-0"
						   size="sm"
						   color="info"

						 >
						   Address Order
						 </Button>}

						</Tooltip>
						<Tooltip title={"Delete Terminal"}>
						  <Button
							onClick={this.showDeleteConfirm.bind(this, tableMeta)}
							color="danger"
							className="mt-0 mb-0"
							size="sm"
						  >
							Delete Order
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
			selectableRows:false

		};
	

	
	

		return (
			<div>
				<div className="headeri fixed-top pb-0">
					<a href="/admin_dashboard" className="pl-3 text-white font-weight-bold mr-auto"><h4 className="text-white" >ADMIN USER- {Cookie.getJSON('Admin') ? Cookie.getJSON('Admin').name: ""} <i className="fa fa-user-circle"></i></h4></a>
					<a href="/admin_products" className="pr-5 text-white font-weight-bold"><p>PRODUCTS TRAY</p></a>
					<a href="/admin_deliveries" className="pr-5 text-white font-weight-bold"><p>DELIVERIES </p></a>
					<a href="/admin_deliveries" onClick={this.logout} className="pr-5 text-white font-weight-bold"><p>LOG OUT </p></a>


				</div>


				<Card className="card-stats pt-5">
					<CardBody>
						<Row >
							<Col md="12">
								<div className="d-flex justify-content-between align-items-center">
									<p className="text-info pt-2 pl-3">Admin Dashboard / <span>Customers Orders</span></p>
								</div>
							</Col>
							<Col>

							</Col>
						</Row>
					</CardBody>
				</Card>
                {this.state.updateSuccess && <div className="alert alert-success col-md-6 offset-3 text-center">Order was Addressed Successfully</div>}
				{this.state.deleteSuccess && <div className="alert alert-danger col-md-6 offset-3 text-center">Order was Deleted Successfully</div>}
                <div className="ml-3 mr-3">
				<MuiThemeProvider theme={this.getMuiTheme()}>
					<MUIDataTable
						title={"AZACH CUSTOMER ORDERS LIST"}
						data={orders}
						columns={TerminalsM}
						options={options}
					/>
				</MuiThemeProvider>
				</div>



				<Modal
          title="View Order Detail"
          visible={this.state.detail}
          onCancel={this.closedetail}
          footer={null}
          okText="Add Terminal"
          cancelText="Clear"
          maskClosable={false}
          width={800}
        >
			<div className="row">
				
				<div className="col-md-6">
					<FormGroup>
						<Label className="font-weight-bold">Order Id</Label>
						<Input type="text" value={this.state.order._id} disabled />
					</FormGroup>
					</div>
					<div className="col-md-6">
					<FormGroup>
						<Label className="font-weight-bold">First Name</Label>
						<Input type="text" value={this.state.order.firstname} disabled />
					</FormGroup>
					</div>

					<div className="col-md-4">
					<FormGroup>
					
						<Label className="font-weight-bold">Last Name</Label>
						<Input type="text" value={this.state.order.lastname} disabled />
					</FormGroup>
					</div>
					<div className="col-md-4">

					<FormGroup>
						<Label className="font-weight-bold">Email</Label>
						<Input type="text" value={this.state.order.email} disabled />
					</FormGroup>
					</div>
					<div className="col-md-4">

					<FormGroup>
						<Label className="font-weight-bold">Phone Number</Label>
						<Input type="text" value={this.state.order.phonenumber} disabled />
					</FormGroup>
					</div>
					<div className="col-md-4">
					<FormGroup>
						<Label className="font-weight-bold">City</Label>
						<Input type="text" value={this.state.order.city} disabled />
					</FormGroup>
					</div>
					<div className="col-md-4">
					<FormGroup>
						<Label className="font-weight-bold">Address</Label>
						<Input type="text" value={this.state.order.address} disabled />
					</FormGroup>
					</div>
					<div className="col-md-4">
					<FormGroup>
						<Label className="font-weight-bold">Payment Status</Label>
						<Input type="text" value={this.state.order.status === 1 ? "PAID" :"NOT PAID"} disabled />
					</FormGroup>

				</div>
				
			</div>
			<hr />
				<div class="order_details_table">
				<h2 className="text-center">Order Details</h2>
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Product</th>
								<th scope="col">Quantity</th>
								<th scope="col">Price</th>

							</tr>
						</thead>
						<tbody>
							{this.state.order.products ? this.state.order.products.map((order) => {
								return(
								<tr key={order._id}>
								<td>
									<p>{order.name}</p>
								</td>
								<td>
									<h5>x {order.qty}</h5>
								</td>
								<td>
									<p># {order.price}</p>
								</td>
							</tr>
								)

							})

							
							
							
							
							
							: 
						""}
						<tr>
									<td>
										<h4>Subtotal</h4>
									</td>
									<td>
										<h5></h5>
									</td>
									<td>
										<p>#{total}</p>
									</td>
								</tr>
							
						
						</tbody>
					</table>
				</div>
			</div>

		</Modal>

			</div>
			
		);
	}

}

export default Dashboard;
