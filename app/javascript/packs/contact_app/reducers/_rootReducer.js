import { combineReducers } from 'redux';

import contacts from './contactReducer';
import venues from './venueReducer';

const rootReducer = combineReducers({
  contacts,
  venues,
});

console.log('ROOT#REDUCER', contacts, venues)

export default rootReducer;
