import {combineReducers} from 'redux';
import authReducer from './slices/authSlice';
import taskSlice from './slices/taskSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskSlice,
});

export default rootReducer;
