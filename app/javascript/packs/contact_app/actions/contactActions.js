import RestApi from '../middleware/restApi.js';

// ------------------------------------
export const emptyContact = {
  id: 'new',
  first_name: '',
  last_name: '',
  job_title: '',
  phone: '',
  ext: '',
  email: '',
  comments: '',
  location: {
    country: 'USA',
    state: '',
    city: '',
    street: '',
    zipcode: ''
  },
  errors: {},
  status: ''
}

// ------------------------------------
// Constants
// ------------------------------------

export const RECEIVE_CONTACT_ERRORS = 'RECEIVE_CONTACT_ERRORS';
export const RECEIVE_CONTACT = 'RECEIVE_CONTACT';
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
export const DESTROY_CONTACT = 'DESTROY_CONTACT';
export const SET_CONTACT_STATUS = 'SET_CONTACT_STATUS';
export const SELECT_CONTACT = 'SELECT_CONTACT';

// ------------------------------------
// Actions
// ------------------------------------

const receiveRecord = (id, data) => ({ type: RECEIVE_CONTACT, id, data });
const receiveRecords = (data) => ({ type: RECEIVE_CONTACTS, data });
const receiveErrors = (id, errors) => ({ type: RECEIVE_CONTACT_ERRORS, id, errors });
const destroyRecord = (id) => ({ type: DESTROY_CONTACT, id });
const setStatus = (id, status) => ({ type: SET_CONTACT_STATUS, id, status });
const selectContact = (id) => ({ type: SELECT_CONTACT, id })

// ------------------------------------
// Api Actions
// ------------------------------------

const ContactApi = new RestApi('/api/v1/contacts');

const status = (id, status) => (dispatch) => dispatch(setStatus(id, status));
const select = (id) => (dispatch) => dispatch(selectContact(id));

const show = (id) => (dispatch, getState) => {
  ContactApi.get(id)
    .then((res) => dispatch(receiveRecord(id, res)))
    .catch((err) => dispatch(receiveErrors(id, err)))
}

const index = () => (dispatch, getState) => {
  ContactApi.get().then((res) => dispatch(receiveRecords(res)))
}

const create = (data) => (dispatch, getState) => {
  dispatch(setStatus('new', 'in progress'))
  ContactApi.post({ contact: data })
    .then((res) => {
      dispatch(receiveRecord(res.contact.id, res))
      dispatch(setStatus('new', 'ok'))
    })
    .catch((err) => dispatch(receiveErrors('new', err)))
}

const update = (id, data) => (dispatch, getState) => {
  dispatch(setStatus(id, 'in progress'))
  ContactApi.patch(id, { contact: data })
    .then((res) => {
      dispatch(receiveRecord(id, res));
      dispatch(setStatus(id, 'ok'))
    })
    .catch((err) => dispatch(receiveErrors(id, err)))
}

const destroy = (id) => (dispatch, getState) => {
  ContactApi.delete(id)
    .then((res) => dispatch(destroyRecord(id)))
    .catch((err) => dispatch(receiveErrors(id, err)))
}

export default {
  show,
  index,
  create,
  update,
  destroy,
  status,
  select
};
