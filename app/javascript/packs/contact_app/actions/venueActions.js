import RestApi from '../middleware/restApi.js';

// ------------------------------------
// Constants
// ------------------------------------

export const RECEIVE_VENUE_ERRORS = 'RECEIVE_VENUE_ERRORS';
export const RECEIVE_VENUE = 'RECEIVE_VENUE';
export const RECEIVE_VENUES = 'RECEIVE_VENUES';
export const CLEAR_VENUE = 'CLEAR_VENUE';
export const SUBMIT_VENUE = 'SUBMIT_VENUE';

// ------------------------------------
// Actions
// ------------------------------------

const receiveRecord = (data) => ({ type: RECEIVE_VENUE, data });
const receiveRecords = (data) => ({ type: RECEIVE_VENUES, data });
const receiveErrors = (data) => ({ type: RECEIVE_VENUE_ERRORS, data });
const clearRecord = () => ({ type: CLEAR_VENUE });
const submitting = (submit) => ({ type: SUBMIT_VENUE, submit });

// ------------------------------------
// Api Actions
// ------------------------------------

const VenueApi = new RestApi('/api/v1/venues');

const show = (id) => (dispatch, getState) => {
  VenueApi.get(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const index = () => (dispatch, getState) => {
  VenueApi.get()
    .then((res) => dispatch(receiveRecords(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const create = (data) => (dispatch, getState) => {
  dispatch(submitting('in progress'));
  VenueApi.post({ venue: data })
    .then((res) => {
      dispatch(receiveRecord(res))
      dispatch(submitting('ok'))
    })
    .catch((err) => {
      dispatch(receiveErrors(err))
      dispatch(submitting('failed'))
    })
}

const update = (id, data) => (dispatch, getState) => {
  dispatch(submitting('in progress'));
  VenueApi.patch(id, { venue: data })
    .then((res) => {
      dispatch(receiveRecord(res))
      dispatch(submitting('ok'))
    })
    .catch((err) => {
      dispatch(receiveErrors(err))
      dispatch(submitting('failed'))
    })
}

const destroy = (id) => (dispatch, getState) => {
  VenueApi.delete(id)
    .then((res) => dispatch(receiveRecord(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const clear = () => (dispatch) => dispatch(clearRecord());

export default {
  clear,
  show,
  index,
  create,
  update,
  destroy
};
