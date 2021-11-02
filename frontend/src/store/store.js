import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {matchReducer} from './reducers/matchReducer';
import {userReducer} from './reducers/userReducer';

const rootReducer = combineReducers({
  matchStore: matchReducer,
  userStore: userReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
