import { createStore } from 'redux';
import rootReducer from './reducers';

// Định nghĩa middleware, nếu cần
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const store = createStore(rootReducer);

export default store;