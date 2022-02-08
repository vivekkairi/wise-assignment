import Portfolio from './classes/Portfolio.js'
import Exchange from './classes/Exchange.js'
import { COMMANDS } from './utils/constants.js'
import CustomError from './utils/error.js'

export const handleInput = async (input) => {
	let exchange = new Exchange()
	await exchange.init()
	input = input.replace(/\\n/g, '\n')
	let commands = input.split('\n')
	let portfolio = new Portfolio()
	let output = []
	for (let command of commands) {
		try {
			let index = command.indexOf(' ')
			let [msg, data] = [command.slice(0, index), command.slice(index + 1)]
			if (msg == COMMANDS.CURRENT_PORTFOLIO) {
				let funds = data.split(' ')
				funds = funds.map((o) => exchange.getFund(o))
				portfolio.addFunds(funds)
			} else if (msg == COMMANDS.ADD_STOCK) {
				let [fund, stock] = data.split(' ', 1)
				exchange.addStockToFund(fund, stock)
			} else if (msg == COMMANDS.CALCULATE_OVERLAP) {
				let fund = exchange.getFund(data)
				let op = portfolio.calculateOverlap(fund)
				output = output.concat(op)
			}
		} catch (err) {
			if (err instanceof CustomError) output = output.concat(err.message)
			else {
				console.error(err)
				break
			}
		}
	}
	return output
}
