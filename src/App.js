import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AuthRoute from "./routes/AuthRoute"
import "./App.css"
//Redux
import { Provider } from "react-redux"
import store from "./redux/store"
//Components
import Navbar from "./components/Navbar"
//Pages
import home from "./pages/home"
import login from "./pages/login"
import signup from "./pages/signup"

import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types"
import { getUserData } from "./redux/actions/userActions"

import jwtDecode from "jwt-decode"
import axios from "axios"

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("FBIdToken")
    console.log("token: " + token)
    if (token && token !== null) {
      const decodedToken = jwtDecode(token)
      console.log(decodedToken.exp < Date.now())

      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("token expired getting new one")
        axios
          .get("/getToken", { withCredentials: true })
          .then((res) => res.data.access_token)
          .then((token) => localStorage.setItem("FBIdToken", token))
          .then(() => getUserData())
          .then(() => store.dispatch({ type: SET_AUTHENTICATED }))
          .catch(() => store.dispatch({ type: SET_UNAUTHENTICATED }))
      } else {
        console.log("token not expired :D ")
        store.dispatch({ type: SET_AUTHENTICATED })
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        store.dispatch(getUserData())
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <AuthRoute exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
