import { SET_USER, LOADING_UI } from "../types";
import { setErrors, clearErrors } from "./uiActions";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post("/login", userData)
		.then(res => {
			console.log(res);
			const FBIdToken = res.data.access_token;
			axios.defaults.headers.common["Authorization"] = `Bearer ${FBIdToken}`;
			dispatch(getUserData());
			dispatch(clearErrors());
			history.push("/");
		})
		.catch(err => {
			dispatch(setErrors(err.response.data));
		});
};

export const getUserData = () => dispatch => {
	axios
		.get("/user")
		.then(res => {
			console.log(res);
			dispatch({ type: SET_USER, payload: res.data });
		})
		.catch(err => console.log(err));
};
