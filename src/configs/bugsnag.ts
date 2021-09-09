import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

import { BUGSNAG_KEY } from './env.json'

export const bugsnagClient = Bugsnag.createClient({
	apiKey: BUGSNAG_KEY,
	plugins: [new BugsnagPluginReact()],
})
