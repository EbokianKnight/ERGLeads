// ------------------------------------
// Smart Component
// ------------------------------------

import React from 'react';
import VenueTable from '../../components/Venue/VenueTable.js'

class Venues extends React.Component {
  constructor() { super() }
  componentDidMount() { this.props.actions.index() }
  render() {
    return (
      <VenueTable venues={this.props.venues} linkTo={this.props.linkToForm} />
    );
  }
}

// ------------------------------------
// Container
// ------------------------------------

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import venueActions from '../../actions/venueActions';

const mapStateToProps = (state, ownProps) => ({
  venues: state.venues.venues,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(venueActions, dispatch),
  linkToNew: () => dispatch(push('venues/new')),
  linkToForm: (id) => dispatch(push(`/venues/edit/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Venues);
