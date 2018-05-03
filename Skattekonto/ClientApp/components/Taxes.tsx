import * as React from 'react';

interface ITaxesProps { }
interface ITaxesState {
	totalPayed: number;
	actualTax: number;
	hasFetchedData: boolean;
	amountToPay: number;
}

export class Taxes extends React.Component<ITaxesProps, ITaxesState> {
	public constructor(props: ITaxesProps) {
		super(props);
		this.state = {
			totalPayed: 0,
			actualTax: 0,
			hasFetchedData: false,
			amountToPay: 0
		};
		this.handleChangeBelopp = this.handleChangeBelopp.bind(this);
		this.handlePayment = this.handlePayment.bind(this);
	}

	public render() {
		let remaining = this.state.actualTax - this.state.totalPayed;
		let info = <div className="info">
			Du har betalat in {this.state.totalPayed} kr
			och ska få tillbaka {-remaining} kr
		</div>;
		if (!this.state.hasFetchedData)
			info = <div className="info">
				Loading...</div>;
		else if (remaining > 0)
			info = <div className="info">
				Du har betalat in {this.state.totalPayed} kr
				men det återstår {remaining} kr!!
			</div>;
		return (<div>
			<h1>Skattekonto</h1>
			{info}
			<div className="payment">
				Betala in: <br />
				<input type="text" placeholder="Ditt bankkonto" /> <br />
				<input type="text" placeholder="Belopp"
					value={this.state.amountToPay}
					onChange={this.handleChangeBelopp} /> <br />
				<button onClick={this.handlePayment}>Betala</button>
			</div>
		</div>);
	}
	handlePayment(event: any) {
		fetch('/api/PayTaxes?amount=' + this.state.amountToPay)
			.then(data => {
				this.fetchNewTaxInfo();
			})
		this.setState({ hasFetchedData: false });
	}
	handleChangeBelopp(event: any) {
		this.setState({ amountToPay: event.target.value });
	}

	fetchNewTaxInfo() {
		// fråga API:et efter aktuell data
		fetch('/api/GetTaxInfo')
			.then(data => {
				console.log('GetTaxInfo returned ', data);
				return data.json();
			})
			.then(json => {
				this.setState({
					totalPayed: json.totalPayed,
					actualTax: json.actualTax,
					hasFetchedData: true
				});
				console.log('GetTaxInfo json ', json);
			})
	}
	componentDidMount() {
		this.fetchNewTaxInfo();
	}
}