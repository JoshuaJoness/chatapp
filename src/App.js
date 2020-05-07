import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './screens/Join'
import Chat from './screens/Chat'

const App = () => {
	return(
		<Router>
			<Route path="/chat" component={Chat} />
			<Route path="/" exact component={Join} />		
		</Router>
	)

}

export default App
