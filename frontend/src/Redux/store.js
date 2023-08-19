import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
    compose
  } from "redux";
  import { studentReducer } from "./reducer";
  import thunk from "redux-thunk";
  
  const rootReducer = combineReducers({ student: studentReducer });
  
  const ownThunk = (store) => (next) => (action) => {
  
    console.log("type of action is ", typeof action);
  
    if (typeof action === "function") {
  
      return action(store.dispatch);

    }

    next(action);
  };
  
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        })
      : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(thunk)

  );
  
  export const store = createStore(rootReducer, enhancer);