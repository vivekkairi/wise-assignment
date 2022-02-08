import { expect } from 'chai'
import { readFileSync } from 'fs'
import { handleInput } from '../core.js'

describe('Test Cases', () => {
	let testCases = JSON.parse(Buffer.from(readFileSync('tests/testCases.json')))

	for (let [i, testCase] of testCases.entries()) {
		it(`Test Case #${i}`, async () => {
			let output = await handleInput(testCase.input)
			expect(output).to.have.all.members(testCase.output)
		})
	}
})
