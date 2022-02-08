import { expect } from 'chai'
import Exchange from '../classes/Exchange.js'
import Fund from '../classes/Fund.js'
import Portfolio from '../classes/Portfolio.js'
import Stock from '../classes/Stock.js'
import { ERRORS } from '../utils/constants.js'

describe('Unit tests', async () => {
	let portfolio = new Portfolio()

	it('add funds to portfolio', () => {
		let stocks = [
			new Stock('INDRAPRASTHA GAS LIMITED'),
			new Stock('COLGATE - PALMOLIVE (INDIA) LIMITED'),
		]
		let fund = new Fund('ICICI_PRU_NIFTY_NEXT_50_INDEX', stocks)
		portfolio.addFunds([fund])
		expect(portfolio.getFunds()).to.have.members([fund])
	})

	it('calculate overlap', () => {
		let fund = new Fund('MIRAE_ASSET_EMERGING_BLUECHIP', [
			new Stock('COLGATE - PALMOLIVE (INDIA) LIMITED'),
		])
		let output = portfolio.calculateOverlap(fund)
		expect(output).to.be.an('array')
		expect(output).to.be.members([
			'MIRAE_ASSET_EMERGING_BLUECHIP ICICI_PRU_NIFTY_NEXT_50_INDEX 66.67%',
		])
	})

	it('FUND_NOT_FOUND', () => {
		let exchange = new Exchange()
		expect(function () {
			exchange.getFund('DUMMY FUND')
		}).to.throw(ERRORS.FUND_NOT_FOUND)
	})

	it('add stock to fund', async () => {
		let exchange = new Exchange()
		await exchange.init()
		let fundName = 'ICICI_PRU_NIFTY_NEXT_50_INDEX'
		let stockName = 'NEW STOCK'
		exchange.addStockToFund(fundName, stockName)
		let fund = exchange.getFund(fundName)
		let output = fund.getStocks()
		output = output.map((o) => o.name)
		expect(output).to.contain(stockName)
	})

	it('add stock to fund - FUND_NOT_FOUND', async () => {
		let exchange = new Exchange()
		await exchange.init()
		let fundName = 'INVALID_FUND'
		let stockName = 'NEW STOCK'
		expect(function () {
			exchange.addStockToFund(fundName, stockName)
		}).to.throw(ERRORS.FUND_NOT_FOUND)
	})
})
