import { handleInput } from './core.js'
import { prompt } from './utils/general.js'

const main = async () => {
	let data = await prompt('')
	let output = await handleInput(data)
	console.log(output.join('\n'))
	process.exit()
}

main()
