import Bugsnag, { Client } from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { sendRequest } from 'services/networkService'

export let bugSnagClient: Client

const initiateBugsnag = async () => {
	const { BUGSNAG_KEY } = await sendRequest.get('misc/bugsnagKey')
	bugSnagClient = Bugsnag.createClient({
		apiKey: BUGSNAG_KEY,
		plugins: [new BugsnagPluginReact()],
	})
}

initiateBugsnag()
