import { CLEAR_ERRORS, SET_ERRORS } from "../types";

export const clearErrors = keyToClear => ({
	type: CLEAR_ERRORS,
	payload: keyToClear,
});

export const setErrors = errors => ({
	type: SET_ERRORS,
	payload: errors,
});
