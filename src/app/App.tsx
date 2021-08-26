import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Discussions from './pages/discussions/Discussions'
import Home from './pages/home/Home'
import Users from './pages/users/Users'

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
