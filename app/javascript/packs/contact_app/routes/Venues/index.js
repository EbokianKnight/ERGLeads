// ------------------------------------
// Smart Component
// ------------------------------------

import React from 'react';
import VenueTable from '../../components/Venue/VenueTable.js'

class Venues extends React.Component {
  constructor(props) { super(props) }
  componentDidMount() { this.props.actions.index() }
  render() {
    return (
      <VenueTable venues={this.props.venues} linkTo={this.props.links.venueEdit} />
    );
  }
}

// ------------------------------------
// Container
// ------------------------------------

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { applicationLinks } from '../index.js';
import venueActions from '../../actions/venueActions';

const mapStateToProps = (state, ownProps) => ({
  venues: state.venues.venues,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(venueActions, dispatch),
  links: applicationLinks(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Venues);
