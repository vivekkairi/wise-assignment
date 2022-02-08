import fs from 'fs'
import * as readline from 'readline'
import * as path from 'path'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const readFile = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) {
				reject(err)
			}
			resolve(data)
		})
	})
}

export const readData = async () => {
	try {
		let fundsData = await readFile(
			path.join(path.resolve(), 'public', 'data.json')
		)
		fundsData = Buffer.from(fundsData)
		fundsData = JSON.parse(fundsData)
		return fundsData
	} catch (err) {
		console.log(err)
	}
}

export const prompt = (query = '') =>
	new Promise((resolve) => rl.question(query, resolve))
