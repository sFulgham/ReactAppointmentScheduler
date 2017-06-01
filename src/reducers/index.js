import {combineReducers} from 'redux';
import appointments from './appointmentsReducer';

const rootReducer = combineReducers({
  appointments
});

export default rootReducer;
