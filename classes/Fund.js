export default class Fund {
	constructor(name, stocks) {
		this.name = name
		this.stocks = stocks
		this.total = this.stocks.length
	}

	addStock(upcomingStock) {
		for (let stock of this.stocks) {
			if (stock.compare(upcomingStock)) {
				return
			}
		}
		this.stocks.push(upcomingStock)
		this.total += 1
	}

	overlap(fund) {
		let common = 0
		for (let baseStock of this.stocks) {
			for (let stock of fund.stocks) {
				if (baseStock.compare(stock)) {
					common++
				}
			}
		}
		return ((2 * 100 * common) / (this.total + fund.total)).toFixed(2)
	}

	compare(fund) {
		return this.fund.name == fund.name
	}

	getStocks() {
		return this.stocks
	}
}
