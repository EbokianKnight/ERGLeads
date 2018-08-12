import {
  RECEIVE_EVENT_ERRORS, RECEIVE_EVENT, RECEIVE_EVENTS
} from '../actions/eventActions.js';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_EVENT_ERRORS]: (state, action) => ({ ...state, errors: action.data }),
  [RECEIVE_EVENT]: (state, action) => ({ ...state, ...action.data, errors: {} }),
  [RECEIVE_EVENTS]: (state, action) => ({ ...state, ...action.data, errors: {} }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  events: [],
  event: null,
  errors: {}
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer
