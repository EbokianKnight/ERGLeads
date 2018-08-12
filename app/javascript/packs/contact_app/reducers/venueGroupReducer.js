import {
  RECEIVE_VENUE_GROUP_ERRORS, RECEIVE_VENUE_GROUP, RECEIVE_VENUE_GROUPS
} from '../actions/groupActions.js';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_VENUE_GROUP_ERRORS]: (state, action) => ({ ...state, errors: action.data }),
  [RECEIVE_VENUE_GROUP]: (state, action) => ({ ...state, ...action.data, errors: {} }),
  [RECEIVE_VENUE_GROUPS]: (state, action) => ({ ...state, ...action.data, errors: {} }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  venue_groups: [],
  venue_group: null,
  errors: {}
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer
