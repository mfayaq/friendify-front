import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
//Components
import Navbar from "./components/Navbar";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={home}></Route>
						<Route exact path="/login" component={login}></Route>
						<Route exact path="/signup" component={signup}></Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
