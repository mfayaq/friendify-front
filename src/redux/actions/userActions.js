import {
  SET_USER,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_UNAUTHENTICATED,
} from "../types"
import { setErrors, clearErrors } from "./uiActions"
import axios from "axios"

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post("/login", userData)
    .then((res) => {
      console.log(res)
      const FBIdToken = res.data.access_token
      localStorage.setItem("FBIdToken", FBIdToken)
      axios.defaults.headers.common["Authorization"] = `Bearer ${FBIdToken}`
      dispatch(clearErrors())
      dispatch(getUserData())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
    })
}

export const signUpUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post("/signup", userData)
    .then((res) => {
      const FBIdToken = res.data.access_token
      localStorage.setItem("FBIdToken", `Bearer ${FBIdToken}`)
      axios.defaults.headers.common["Authorization"] = `Bearer ${FBIdToken}`
      dispatch(clearErrors())
      dispatch(getUserData())
    })
    .catch((err) => {
      if (err.response) {
        let { data } = err.response
        dispatch(setErrors(data))
      }
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken")
  delete axios.defaults.headers.common["Authorization"]
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .get("/user", { withCredentials: true })
    .then((res) => {
      console.log(res)
      dispatch({ type: SET_USER, payload: res.data })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => console.log(err))
}
