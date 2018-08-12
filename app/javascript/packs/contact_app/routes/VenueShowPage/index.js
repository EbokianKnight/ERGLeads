import React from 'react';
import Loader from '../../components/Loader.js';
import VenueForm from '../../components/Venue/VenueForm.js';

class VenueShowPage extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    if (id == 'new') this.props.actions.clear();
    if (/^\d+$/.test(id)) this.props.actions.show(id);
    else this.props.redirectToNew();
  }
  componentWillUnmount() {
    this.props.actions.clear();
  }
  render() {
    if (this.props.problems) {
      return <div className="form-errors-warn">
        <h1>{this.props.problems.status}</h1>
        <div>{this.props.problems.message}</div>
      </div>;
    } else if (this.props.match.params.id != 'new' && this.props.loadingID != this.props.match.params.id) {
      return <Loader />
    } else {
      const newRecord = this.props.match.params.id == 'new'
      const action = newRecord ? this.props.actions.create : this.props.actions.update;
      return (
        <div className="venue-form-page">
          <button onClick={this.props.backToIndex}>Back</button>
          <VenueForm
            venue={this.props.record}
            errors={this.props.errors}
            action={action}
          />
        </div>
      );
    }
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import venueActions from '../../actions/venueActions';

const pluckProblemsFromState = (error_state) => {
  if (error_state.code != 'base_error') return null;
  if (error_state.errors.length == 0) return null;
  return {
    status: error_state.status,
    message: error_state.errors[0].message
  }
}

const mapStateToProps = (state, ownProps) => {
  const error_state = state.venues.errors;
  const record = state.venues.venue;
  return (
    {
      loadingID: record.id,
      record: record,
      errors: error_state,
      problems: pluckProblemsFromState(error_state)
    }
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(venueActions, dispatch),
  backToIndex: () => dispatch(push('/venues')),
  redirectToNew: () => dispatch(push('/venues/new'))
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueShowPage);
