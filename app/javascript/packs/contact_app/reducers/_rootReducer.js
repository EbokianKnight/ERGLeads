import { combineReducers } from 'redux';

import contacts from './contactReducer';
import venues from './venueReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  contacts,
  venues,
  user,
});

export default rootReducer;
