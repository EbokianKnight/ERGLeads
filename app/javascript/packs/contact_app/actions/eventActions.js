import RestApi from '../middleware/restApi.js';

// ------------------------------------
// Constants
// ------------------------------------

export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

// ------------------------------------
// Actions
// ------------------------------------

const receiveRecord = (data) => ({ type: RECEIVE_EVENT, data });
const receiveRecords = (data) => ({ type: RECEIVE_EVENTS, data });
const receiveErrors = (data) => ({ type: RECEIVE_EVENT_ERRORS, data });

// ------------------------------------
// Api Actions
// ------------------------------------

const EventApi = new RestApi('/api/v1/events');

const show = (id) => (dispatch, getState) => {
  EventApi.get(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const index = () => (dispatch, getState) => {
  EventApi.get()
    .then((res) => dispatch(receiveRecords(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const create = (data) => (dispatch, getState) => {
  EventApi.post(data)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const update = (id, data) => (dispatch, getState) => {
  EventApi.patch(id, data)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const destroy = (id) => (dispatch, getState) => {
  EventApi.delete(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

export default {
  show,
  index,
  create,
  update,
  destroy
};
