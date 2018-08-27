import React from 'react';
import VenueForm from '../../components/Venue/VenueForm.js';
import VenueFormNew from '../../components/Venue/VenueFormNew.js';
import VenueNav from '../../components/Venue/VenueNav.js';
import ContactCollection from '../../components/Contact/ContactCollection.js';
import { Modal, Button } from 'semantic-ui-react';

class VenueShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleting: false };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (/^\d+$/.test(id)) this.props.actions.show(id);
    else this.props.links.venueNew();
  }
  componentWillUnmount() {
    this.props.actions.clear();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      this.props.actions.clear();
      setTimeout(() => {
        nextProps.actions.show(nextProps.match.params.id);
      }, 300);
    }
  }
  close = () => { this.setState({ deleting: false }); }
  open = () => { this.setState({ deleting: true }); }
  deleteRecord = () => {
    if (!this.props.record.id) return;
    this.props.actions.destroy(this.props.record.id);
    this.props.links.contacts();
  }
  deleteContactRecord = (id) => {
    if (!this.props.record.id) return;
    this.props.contactActions.destroy(id);
    this.props.links.contacts();
  }
  render() {
    const {
      problems, venues, record, errors, actions, loadingID, links,
      contacts, contactActions, selectedContact
    } = this.props;
    if (problems) {
      return <div className="form-errors-warn">
        <h1>{problems.status}</h1>
        <div>{problems.message}</div>
      </div>;
    } else if (!this.props.loadingID) {
      return (
        <div className="venue-form-page">
          <div>
            <VenueNav
              list={venues}
              actions={actions}
              id={loadingID}
              navigateTo={links.venueEdit}
            />
            <VenueFormNew loading={true} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="venue-form-page">
          <div>
            <VenueNav
              list={venues}
              actions={actions}
              id={loadingID}
              navigateTo={links.venueEdit}
            />
            <VenueForm venue={record} errors={errors} actions={actions}/>
            <hr />
            <Button fluid onClick={this.open}>Delete Venue</Button>
            <Modal size='small' open={this.state.deleting} onClose={this.close}>
              <Modal.Header>Delete Venue</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want to delete {this.props.record.name}?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.close}>No</Button>
                <Button
                  negative
                  onClick={this.deleteRecord}
                  icon='trash alternate outline'
                  labelPosition='right'
                  content="Yes Delete It."
                />
              </Modal.Actions>
            </Modal>
          </div>
          <div>
            <ContactCollection
              selectedContact={selectedContact}
              parentID={record.id}
              contacts={contacts}
              actions={contactActions}
            />
          </div>
        </div>
      );
    }
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { applicationLinks } from '../index.js';
import { normalizeString } from '../../utils';
import venueActions from '../../actions/venueActions';
import contactActions from '../../actions/contactActions';

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

// Transforms object look into sorted array for consistent display
const sortContacts = (contacts) => {
  if (!contacts) return [];
  return Object.values(contacts).sort((a,b) => {
    if (b.id == 'new') return -1
    if (normalizeString(a.last_name) > normalizeString(b.last_name)) return 1;
    if (normalizeString(a.last_name) < normalizeString(b.last_name)) return -1;
    return 0;
  });
};

const mapStateToProps = (state, ownProps) => {
  const error_state = state.venues.errors;
  const record = state.venues.venue;
  return (
    {
      venues: shapeVenues(state.venues.venues),
      loadingID: record.id,
      record: record,
      selectedContact: state.contacts.selected,
      contacts: sortContacts(state.contacts.contact),
      errors: error_state,
      problems: pluckProblemsFromState(error_state)
    }
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(venueActions, dispatch),
  contactActions: bindActionCreators(contactActions, dispatch),
  links: applicationLinks(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueShowPage);
