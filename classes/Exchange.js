import * as utils from '../utils/general.js'
import Fund from './Fund.js'
import Stock from './Stock.js'
import { ERRORS } from '../utils/constants.js'
import CustomError from '../utils/error.js'

export default class Exchange {
	constructor() {
		this.FUNDS = []
		this.FUNDS_MAP = {}
	}

	async init() {
		const fundsData = await utils.readData()
		for (let fund of fundsData['funds']) {
			let fundStocks = []
			for (let stock of fund.stocks) {
				fundStocks.push(new Stock(stock))
			}
			let createdFund = new Fund(fund.name, fundStocks)
			this.FUNDS.push(createdFund)
			this.FUNDS_MAP[fund.name] = createdFund
		}
	}

	addStockToFund(fund, stock) {
		try {
			if (!this.FUNDS_MAP[fund]) {
				throw new CustomError(ERRORS.FUND_NOT_FOUND)
			} else {
				this.FUNDS_MAP[fund].addStock(new Stock(stock))
			}
		} catch (err) {
			throw err
		}
	}

	getFundsMap() {
		return this.FUNDS_MAP
	}

	getFund(name) {
		if (this.FUNDS_MAP[name]) {
			return this.FUNDS_MAP[name]
		} else {
			throw new CustomError(ERRORS.FUND_NOT_FOUND)
		}
	}
}
