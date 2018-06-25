import React from 'react';

class ContactTable extends React.Component {
  componentDidMount() {
    this.props.actions.index();
  }

  render() {
    return (
      <div>Testing</div>
    );
  }
}

export default ContactTable;
