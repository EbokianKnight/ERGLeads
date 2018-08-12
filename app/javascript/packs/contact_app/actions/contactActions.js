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

const receiveRecord = (data) => ({ type: RECEIVE_CONTACT, data });
const receiveRecords = (data) => ({ type: RECEIVE_CONTACTS, data });
const receiveErrors = (data) => ({ type: RECEIVE_CONTACT_ERRORS, data });

// ------------------------------------
// Api Actions
// ------------------------------------

const ContactApi = new RestApi('/api/v1/contacts');

const show = (id) => (dispatch, getState) => {
  ContactApi.get(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const index = () => (dispatch, getState) => {
  ContactApi.get()
    .then((res) => dispatch(receiveRecords(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const create = (data) => (dispatch, getState) => {
  ContactApi.post({ contact: data })
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const update = (id, data) => (dispatch, getState) => {
  ContactApi.patch(id, { contact: data })
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const destroy = (id) => (dispatch, getState) => {
  ContactApi.delete(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

export default {
  show,
  index,
  create,
  update,
  destroy,
};
