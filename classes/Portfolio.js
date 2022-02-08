import { ERRORS } from '../utils/constants.js'

export default class Portfolio {
	constructor(funds = []) {
		this.funds = funds
	}

	addFunds(funds) {
		this.funds = this.funds.concat(funds)
		this.funds = [...new Set(this.funds)]
	}

	calculateOverlap(fund) {
		let output = []
		for (let currentFund of this.funds) {
			let percent = currentFund.overlap(fund)
			output.push(`${fund.name} ${currentFund.name} ${percent}%`)
		}
		return output
	}

	getFunds() {
		return this.funds
	}
}
