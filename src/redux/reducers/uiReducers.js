import {
  SET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_ALL_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types"

const initialState = {
  loading: false,
  errors: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, loading: false, errors: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, [action.payload]: "" },
      }
    case CLEAR_ALL_ERRORS:
      return initialState
    case LOADING_UI:
      return { ...state, loading: true }
    case STOP_LOADING_UI:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default reducer
