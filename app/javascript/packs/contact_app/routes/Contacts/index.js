// ------------------------------------
// Smart Component
// ------------------------------------

import React from 'react';

const display = (contact) => {
  return `${contact.first_name} ${contact.last_name}`
};

class Contacts extends React.Component {
  componentDidMount() {
    this.props.actions.index();
  }

  render() {
    return this.props.data.contacts.map((contact, idx) => {
      return <div key={idx}>{ display(contact) }</div>;
    });
  }
}

// ------------------------------------
// Container
// ------------------------------------

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import contactActions from '../../actions/contactActions';

const mapStateToProps = (state, ownProps) => ({
  data: state.contacts,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contactActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
