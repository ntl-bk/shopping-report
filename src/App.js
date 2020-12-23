import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, deleteItems } from './actions';
import getCurrancy from './services/get-cur';
class App extends Component {
	state = { total: 0, currancy: '' };
	refDate = React.createRef();
	refAmount = React.createRef();
	refCurrancy = React.createRef();
	refName = React.createRef();
	componentDidMount() {
		getCurrancy().then((data) => {
			this.setState({ exchange: data });
		});
	}
	getCurrancy = (currancy) => {
		let arr = [...this.props.items];
		let totalAmount = this.countTotal(arr, currancy);
		this.setState({ total: totalAmount });
	};
	countTotal = (arr, currancy) => {
		this.setState({ currancy: currancy });
		const data = this.state.exchange;
		return arr
			.reduce((a, b) => {
				return a.concat(b.data);
			}, [])
			.map((b) => {
				let total = 0;
				if (data.rates) {
					if (currancy === 'EUR') {
						if (b.currancy === 'USD') {
							total +=
								(Number(data.rates.EUR) / Number(data.rates.USD)) *
								Number(b.amount);
						} else if (b.currancy === 'PLN') {
							total +=
								(Number(data.rates.EUR) / Number(data.rates.PLN)) *
								Number(b.amount);
						}
					} else if (currancy === 'PLN') {
						if (b.currancy === 'EUR') {
							total += Number(data.rates.PLN) * Number(b.amount);
						} else if (b.currancy === 'USD') {
							total +=
								(Number(data.rates.EUR) / Number(data.rates.USD)) *
								Number(data.rates.PLN) *
								Number(b.amount);
						}
					} else if (currancy === 'USD') {
						if (b.currancy === 'EUR') {
							total += Number(data.rates.USD) * Number(b.amount);
						} else if (b.currancy === 'PLN') {
							total +=
								(Number(data.rates.EUR) / Number(data.rates.PLN)) *
								Number(data.rates.USD) *
								Number(b.amount);
						}
					}
				}
				return total;
			}, 0);
	};
	render() {
		return (
			<div style={{ width: '715px', paddingTop: '30px', paddingLeft: '30px' }}>
				<div style={{ marginBottom: '15px' }}>
					<input
						type='date'
						ref={this.refDate}
						style={{ marginRight: '6px' }}
					/>
					<input
						type='number'
						ref={this.refAmount}
						placeholder='Amount'
						style={{ marginRight: '6px' }}
					/>
					<select ref={this.refCurrancy} style={{ marginRight: '6px' }}>
						<option value='Select' defaultValue='Select currancy'>
							Select Currancy
						</option>
						<option value='USD'>USD</option>
						<option value='PLN'>PLN</option>
						<option value='EUR'>EUR</option>
					</select>
					<input
						type='text'
						placeholder='Name'
						ref={this.refName}
						style={{ marginRight: '6px' }}
					/>
					<button
						onClick={() => {
							const date = this.refDate.current.value;
							const name = this.refName.current.value;
							const amount = this.refAmount.current.value;
							const currancy = this.refCurrancy.current.selectedOptions[0]
								.value;
							if (date && name && amount && currancy) {
								let item = {
									date: date,
									data: {
										name: name,
										amount: amount,
										currancy: currancy,
									},
								};
								this.props.itemAdded(item);
							}
						}}
						style={{ backgroundColor: '#82E0AA', padding: '3px 9px' }}
					>
						Add
					</button>
				</div>
				<div style={{ backgroundColor: '#D2B4DE', padding: '5px 0 15px 15px' }}>
					<h2>List</h2>
					{this.props.items.length !== 0 ? (
						this.props.items.map((obj, i) => {
							return (
								<div key={obj.date + i}>
									<div>
										<button
											onClick={() => {
												this.props.itemsDelete(obj.date);
											}}
										>
											Delete
										</button>
										<p>{obj.date}</p>
										{obj.data.map((purchase, i) => {
											return (
												<li key={purchase.name + i}>
													{purchase.name +
														' ' +
														purchase.amount +
														' ' +
														purchase.currancy}
												</li>
											);
										})}
									</div>
									<hr />
								</div>
							);
						})
					) : (
						<p>Create your first purchase report</p>
					)}
				</div>
				<div style={{ backgroundColor: '#F7DC6F', padding: '5px 0 15px 15px' }}>
					<p>Total</p>
					<select
						onChange={(e) => {
							this.getCurrancy(e.target.selectedOptions[0].value);
						}}
					>
						<option value='Select' defaultValue='Select currancy'>
							Select Currancy
						</option>
						<option value='USD'>USD</option>
						<option value='PLN'>PLN</option>
						<option value='EUR'>EUR</option>
					</select>
					<p>{this.state.total + ' ' + this.state.currancy}</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ reportList: { items } }) => {
	return { items };
};

const mapDispatchToProps = (dispatch) => {
	return {
		itemAdded: addItem(dispatch),
		itemsDelete: deleteItems(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
