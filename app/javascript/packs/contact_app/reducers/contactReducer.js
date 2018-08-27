import {
  RECEIVE_CONTACT_ERRORS, RECEIVE_CONTACT, RECEIVE_CONTACTS, SET_CONTACT_STATUS,
  DESTROY_CONTACT, SELECT_CONTACT, emptyContact
} from '../actions/contactActions.js';
import {
  RECEIVE_VENUE, CLEAR_VENUE
} from '../actions/venueActions.js';


const removeByKey = (myObj, deleteKey) => {
  return Object.keys(myObj)
    .filter(key => key != deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
  }, {});
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_CONTACT_ERRORS]: (state, action) => ({
    ...state, contact: {
      ...state.contact,
      [action.id]: { ...state[action.id], errors: action.errors }
    }
  }),
  [RECEIVE_CONTACT]: (state, action) => ({
    ...state, contact: {
      ...state.contact,
      [action.id]: { ...state.contact[action.id], ...action.data.contact, errors: {} }
    }
  }),
  [SET_CONTACT_STATUS]: (state, action) => ({
    ...state, contact: {
      ...state.contact,
      [action.id]: { ...state.contact[action.id], status: action.status },
    }
  }),
  [RECEIVE_VENUE]: (state, action) => {
    const contacts = action.data.venue.contacts;
    let contactState = state.contact;
    contacts.forEach(c => contactState = {
      ...contactState, [c.id]: { ...contactState[c], ...c, errors: {} },
    });
    return { ...state, contact: contactState };
  },
  [DESTROY_CONTACT]: (state, action) => {
    const contactState = removeByKey(state.contact, action.id);
    return { ...state, selected: -1, contact: contactState };
  },
  [CLEAR_VENUE]: (state, action) => ({ ...state, contact: initialState.contact }),
  [SELECT_CONTACT]: (state, action) => ({ ...state, selected: action.id }),
  [RECEIVE_CONTACTS]: (state, action) => ({ ...state, ...action.data, errors: {} }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  contacts: [],
  selected: -1,
  contact: {
    new: emptyContact,
  }
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer
