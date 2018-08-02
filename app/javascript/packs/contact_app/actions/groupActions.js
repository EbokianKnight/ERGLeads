import RestApi from '../middleware/restApi.js';

// ------------------------------------
// Constants
// ------------------------------------

export const RECEIVE_VENUE_GROUP_ERRORS = 'RECEIVE_VENUE_GROUP_ERRORS';
export const RECEIVE_VENUE_GROUP = 'RECEIVE_VENUE_GROUP';
export const RECEIVE_VENUE_GROUPS = 'RECEIVE_VENUE_GROUPS';

// ------------------------------------
// Actions
// ------------------------------------

const receiveRecord = (data) => ({ type: RECEIVE_VENUE_GROUP, data });
const receiveRecords = (data) => ({ type: RECEIVE_VENUE_GROUPS, data });
const receiveErrors = (data) => ({ type: RECEIVE_VENUE_GROUP_ERRORS, data: data.errors });

// ------------------------------------
// Api Actions
// ------------------------------------

const VenueGroupApi = new RestApi('/api/v1/venue_groups');

const show = (id) => (dispatch, getState) => {
  VenueGroupApi.get(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const index = () => (dispatch, getState) => {
  VenueGroupApi.get()
    .then((res) => dispatch(receiveRecords(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const create = (data) => (dispatch, getState) => {
  VenueGroupApi.post(data)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const update = (id, data) => (dispatch, getState) => {
  VenueGroupApi.patch(id, data)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const destroy = (id) => (dispatch, getState) => {
  VenueGroupApi.delete(id)
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
