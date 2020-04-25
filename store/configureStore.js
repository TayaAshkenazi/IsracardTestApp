import {createStore, combineReducers, applyMiddleware} from 'redux';
import movieReducer from '../src/reducers/movieReducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({movie: movieReducer});
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;
