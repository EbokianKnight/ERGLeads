import React from 'react';
import VenueFormNew from '../../components/Venue/VenueFormNew.js';

class VenueNewPage extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.actions.clear();
  }
  componentWillUnmount() {
    this.props.actions.clear();
  }
  render() {
    const { problems, venues, record, errors, actions, loadingID, links } = this.props;
    if (problems) {
      return <div className="form-errors-warn">
        <h1>{problems.status}</h1>
        <div>{problems.message}</div>
      </div>;
    } else {
      return (
        <div className="venue-form-page">
          <div>
            <VenueFormNew venue={record} errors={errors} actions={actions} links={links} />
          </div>
        </div>
      );
    }
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { applicationLinks } from '../index.js';
import venueActions from '../../actions/venueActions';

const pluckProblemsFromState = (error_state) => {
  if (error_state.code != 'base_error') return null;
  if (error_state.errors.length == 0) return null;
  return {
    status: error_state.status,
    message: error_state.errors[0].message
  }
}

const shapeVenues = (venues) => {
  if (!venues) return [];
  return venues.map((v) => ({ key: v.id, title: v.name, id: v.id }))
}

const mapStateToProps = (state, ownProps) => {
  const error_state = state.venues.errors;
  const record = state.venues.venue;
  return (
    {
      venues: shapeVenues(state.venues.venues),
      record: record,
      errors: error_state,
      problems: pluckProblemsFromState(error_state),
    }
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(venueActions, dispatch),
  links: applicationLinks(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueNewPage);
