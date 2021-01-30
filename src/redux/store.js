import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import user from "./reducers/userReducers"
import data from "./reducers/dataReducers"
import ui from "./reducers/uiReducers"

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  user,
  data,
  ui,
})

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
