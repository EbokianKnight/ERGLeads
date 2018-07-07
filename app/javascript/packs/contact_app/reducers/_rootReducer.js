import { combineReducers } from 'redux';

import contacts from './contactReducer';
import venues from './venueReducer';
import user from './userReducer';
import venue_groups from './venueGroupReducer';
import events from './eventReducer';

const rootReducer = combineReducers({
  contacts,
  venues,
  user,
  venue_groups,
  events,
});

export default rootReducer;
