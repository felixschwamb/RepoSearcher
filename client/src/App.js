import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/bookmarks" exact component={Bookmarks} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
