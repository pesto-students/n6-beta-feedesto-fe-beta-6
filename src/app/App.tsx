import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Discussions from './features/discussions/Discussions'
import Home from './features/home/Home'
import Users from './features/users/Users'

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/users">
						<Users />
					</Route>
					<Route exact path="/discussions">
						<Discussions />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}
