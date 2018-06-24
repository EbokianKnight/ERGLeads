import RestApi from '../middleware/restApi.js';

// ------------------------------------
// Constants
// ------------------------------------

export const RECEIVE_CONTACT_ERRORS = 'RECEIVE_CONTACT_ERRORS';
export const RECEIVE_CONTACT = 'RECEIVE_CONTACT';
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';

// ------------------------------------
// Actions
// ------------------------------------

const receiveContact = (data) => ({ type: RECEIVE_CONTACT, data });
const receiveContacts = (data) => ({ type: RECEIVE_CONTACTS, data });
const receiveErrors = (data) => ({ type: RECEIVE_CONTACT_ERRORS, data });

// ------------------------------------
// Api Actions
// ------------------------------------

const ContactApi = new RestApi('/api/v1/contacts');

const getContact = (id) => (dispatch, getState) => {
  ContactApi.get(id)
    .then((res) => dispatch(receiveContact(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const getContacts = () => (dispatch, getState) => {
  ContactApi.get()
    .then((res) => dispatch(receiveContacts(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const newContact = (id, data) => (dispatch, getState) => {
  ContactApi.post(id, data)
    .then((res) => dispatch(receiveContact(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const updateContact = (id, data) => (dispatch, getState) => {
  ContactApi.patch(id, data)
    .then((res) => dispatch(receiveContact(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const destroyContact = (id) => (dispatch, getState) => {
  ContactApi.delete(id)
    .then((res) => dispatch(receiveContact(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

export default {
  show: getContact,
  index: getContacts,
  create: newContact,
  update: updateContact,
  destroy: destroyContact,
};
