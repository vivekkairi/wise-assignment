export default class Stock {
	constructor(name) {
		this.name = name
	}

	compare(stock) {
		return this.name == stock.name
	}
}
