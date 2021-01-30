import { CLEAR_ALL_ERRORS, CLEAR_ERRORS, SET_ERRORS } from "../types"

export const clearErrors = (keyToClear) => ({
  type: CLEAR_ERRORS,
  payload: keyToClear,
})

export const clearErrorsAll = () => ({
  type: CLEAR_ALL_ERRORS,
})

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors,
})
