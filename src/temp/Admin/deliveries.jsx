import React, { Component } from "react";
import Footer from '../components/footer'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from '@material-ui/core/Switch';
import axios from 'axios'
import Cookie from 'js-cookie'
import MUIDataTable from "mui-datatables";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
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
	Modal, ModalHeader, ModalBody, ModalFooter
  } from "reactstrap";
	import { withStyles} from '@material-ui/core/styles';
	import classnames from 'classnames';
	const customStyles = {
	  BusinessAnalystRow: {
	    '& td': { color:"green", fontWeight: 'bold'}
	  },
	  BusinessAnalystRow2: {
	    '& td': { color:'orange', fontWeight: 'bold'}
	  },
	  BusinessAnalystRow3: {
	    '& td': { color:'red', fontWeight: 'bold'}
	  },
	  NameCell: {
	    fontWeight: 900
	  },
	};
class Admin_Delivery extends Component {
	state = {
		modal: false,
		deliveries: [],
		alertDel:false
	}

  toggle = () => this.setState({modal: true})



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

	componentWillMount =() => {
		this.refresh()
	}

	refresh = () => {
		if(Cookie.getJSON('Admin')){

		
		const data = Cookie.getJSON("Admin");
		const token = data.token;
		axios
		  .get(`http://localhost:4000/api/deliveries`, {
			headers: {
			  Authorization: `Bearer ${token}`,
			},
		  })
		  .then((res) => {
			this.setState({ deliveries: res.data.addressed });
		  });
		}
		else{
			this.props.history.push('/admin_login')
		}
	  }

	options = (e) => {
		e.preventDefault()

	}

	viewTerminalData = (id) => {
		const updateData = {
		  delivery: 1
		 
		};
		confirmAlert({
		  message: "Are you sure you ready to deliver this item?.",
		  buttons: [
			{
			  label: "Yes",
			  onClick: () => {
				const data =  Cookie.getJSON('Admin')
				const token = data.token
				const ID = id.rowData[0]
				axios
				  .put(
					`http://localhost:4000/api/confirm/${ID}`,
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
					  delivery:true,
					
					});
					setTimeout(() => {
					  this.setState({ delivery: false });
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
	

	  showDelete = (id) => {
		confirmAlert({
		  message: "Admin!, Are you sure to do delete this Delivery.",
		  buttons: [
			{
			  label: "Yes",
			  onClick: () => {
				const data = Cookie.getJSON('Admin');
				const token = data.token;
				const terminal = id.rowData[0];
				axios
				  .delete(
					`http://localhost:4000/api/delivery/${terminal}`,
					{
					  headers: {
						Authorization: `Bearer ${token}`,
					  },
					}
				  )
				  .then((res) => {
					console.log(res.data.result);
					this.setState({ alertDel: true });
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

	render() {

		if(Cookie.getJSON('Admin') === undefined){
			this.props.history.push('/admin_login')

		}
		let deliver = [];
		let innerArray3 = [];
	
		this.state.deliveries.forEach((res) => {
		  let jsObjs = res;
		  innerArray3 = [];
		  innerArray3.push(jsObjs._id);
		  innerArray3.push(jsObjs.firstname + ' ' +  jsObjs.lastname);
		  innerArray3.push(jsObjs.address);
		  innerArray3.push(jsObjs.city);
		  innerArray3.push(jsObjs.status ===1 ? "Addressed and Ready For Delivery" : "Not Addressed");
		  innerArray3.push(jsObjs.delivery ===1 ? "Delivered" : "Pending Delivery");
		  deliver.push(innerArray3);
		});
	

		const options = {
				filter: true,
				selectableRows: true,
				filterType: "dropdown",
				responsive: "stacked",
				rowsPerPage: 7,
				setRowProps: (row) => {
					return {
						className: classnames(
							{
								[this.props.classes.BusinessAnalystRow]: row[5] === "Delivered"
							},
							{
								[this.props.classes.BusinessAnalystRow2]: row[5] === "Pending"

							},
							{
								[this.props.classes.BusinessAnalystRow3]: row[5] === "Complication in Delivery"

							},




							),
						style: {border: '2px solid #fff', whiteSpace:'nowrap', paddingRight:'10rem'

					}
					};
				},
			};
		const TerminalsM = [
			{
				name: "Order ID",
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
					},

				}
			},
			{
				name: "Orderer's Name",
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
					},

				}
			},
		
		

			{
				name: 'Address',
				options: {
					filter: false,
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
				name: "Order Status",
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
				name: "Delivery Status",
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
							color="success"
							>
							<i class="fa fa-calendar-check-o"></i>
							</Button>
						</Tooltip>
						<Tooltip title={"View Terminal"}>
						  <Button
							onClick={this.showDelete.bind(this, tableMeta)}
							className="mt-0 mb-0"
							color="danger"
						  >
							<i className="fa fa-trash" />
						  </Button>
						</Tooltip>


					  </>
					);
				  },
				},
			  },

		];


		// const info =  Cookie.getJSON('user');
		// const username =  info.name
		return (
			<div>
				<div className="headeri fixed-top pb-0">
					<a href="/admin_dashboard" className="pl-3 text-white font-weight-bold mr-auto text-white"><h4 className="text-white">ADMIN USER- {Cookie.getJSON('Admin') ? Cookie.getJSON('Admin').name : ""}<i className="fa fa-user-circle"></i></h4></a>
					<a href="/admin_products" className="pr-5 text-white font-weight-bold"><p>PRODUCTS TRAY</p></a>
					<a href="/admin_deliveries" className="pr-5 text-white font-weight-bold"><p>DELIVERIES </p></a>

				</div>


				<Card className="card-stats pt-5">
					<CardBody>
						<Row >
							<Col md="12">
								<div className="d-flex justify-content-between align-items-center">
									<p className="text-info pt-2 pl-3">Admin Deliveries / <span>Customers Orders</span></p>





								</div>
							</Col>
							<Col>

							</Col>
						</Row>
					</CardBody>
				</Card>
                {this.state.alertDel && <div className="alert alert-danger col-md-6 offset-3">Delivery  Deleted successfully</div>}
				<div className="">
				<MuiThemeProvider theme={this.getMuiTheme()}>
					<MUIDataTable
						title={"AZACH DELIVERIES LIST"}
						data={deliver}
						columns={TerminalsM}
						options={options}
					/>
				</MuiThemeProvider>
				</div>


				{this.state.modal &&
				<div id="success" class="modal modal-message fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-close"></i>
                    </button>
                    <h2>Thank you</h2>
                    <p>Your message is successfully sent...</p>
                </div>
            </div>
        </div>
    </div>}

			</div>
		);
	}
	dataSet = [
		["3eegdhd67836383gd63", "Mathew727", "6272hsgs338h", "Denim Jacket", "No 7, Festac Street Lagos", "Pending", "23/06/2020"],
		["3eegdhd67836383gd63", "Tobyias", "6272hsgs338h", "Denim Jacket", "No 7, Festac Street Lagos", "Delivered", "23/06/2020"],
		["3eegdhd67836383gd63", "Lamba12", "6272hsgs338h", "Denim Jacket", "No 7, Festac Street Lagos", "Delivered", "23/06/2020"],

		["3eegdhd67836383gd63", "Dare9", "6272hsgs338h", "Denim Jacket", "No 7, Festac Street Lagos", "Pending", "23/06/2020"],
		["3eegdhd67836383gd63", "sexyt33", "6272hsgs338h", "Denim Jacket", "No 7, Festac Street Lagos", "Complication in Delivery", "23/06/2020"],





	]
}

export default withStyles(customStyles, {name: "ExampleCard.js"})(Admin_Delivery);
