import RestApi from '../middleware/restApi.js';

// ------------------------------------
// Constants
// ------------------------------------

export const RECEIVE_VENUE_ERRORS = 'RECEIVE_VENUE_ERRORS';
export const RECEIVE_VENUE = 'RECEIVE_VENUE';
export const RECEIVE_VENUES = 'RECEIVE_VENUES';

// ------------------------------------
// Actions
// ------------------------------------

const receiveVenue = (data) => ({ type: RECEIVE_VENUE, data });
const receiveVenues = (data) => ({ type: RECEIVE_VENUES, data });
const receiveErrors = (data) => ({ type: RECEIVE_VENUE_ERRORS, data });

// ------------------------------------
// Api Actions
// ------------------------------------

const VenueApi = new RestApi('/api/v1/venues');

const getVenue = (id) => (dispatch, getState) => {
  VenueApi.get(id)
    .then((res) => dispatch(receiveVenue(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const getVenues = () => (dispatch, getState) => {
  VenueApi.get()
    .then((res) => dispatch(receiveVenues(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const newVenue = (id, data) => (dispatch, getState) => {
  VenueApi.post(id, data)
    .then((res) => dispatch(receiveVenue(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const updateVenue = (id, data) => (dispatch, getState) => {
  VenueApi.patch(id, data)
    .then((res) => dispatch(receiveVenue(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

const destroyVenue = (id) => (dispatch, getState) => {
  VenueApi.delete(id)
    .then((res) => dispatch(receiveVenue(res)))
    .catch((err) => dispatch(receiveErrors(err)))
}

export default {
  show: getVenue,
  index: getVenues,
  create: newVenue,
  update: updateVenue,
  destroy: destroyVenue,
};
