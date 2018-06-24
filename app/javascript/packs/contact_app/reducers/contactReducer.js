import {
  RECEIVE_CONTACT_ERRORS, RECEIVE_CONTACT, RECEIVE_CONTACTS
} from '../actions/contactActions.js';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_CONTACT_ERRORS]: (state, action) => ({ ...state, ...action.data }),
  [RECEIVE_CONTACT]: (state, action) => ({ ...state, ...action.data }),
  [RECEIVE_CONTACTS]: (state, action) => ({ ...state, ...action.data }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  contacts: [],
  contact: null,
  errors: []
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer
