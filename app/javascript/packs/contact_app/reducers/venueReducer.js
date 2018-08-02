import {
  RECEIVE_VENUE_ERRORS, RECEIVE_VENUE, RECEIVE_VENUES
} from '../actions/venueActions.js';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_VENUE_ERRORS]: (state, action) => ({ ...state, ...action.data }),
  [RECEIVE_VENUE]: (state, action) => ({ ...state, ...action.data }),
  [RECEIVE_VENUES]: (state, action) => ({ ...state, ...action.data }),
};

const emptyVenue = {
  id: null,
  name: '',
  phone: '',
  email: '',
  website: '',
  kind: '',
  other_kind: '',
  comments: '',
  location: {
    country: 'USA',
    state: '',
    city: '',
    street: '',
    zipcode: ''
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  venues: [],
  venue: emptyVenue,
  errors: []
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer
