import React from 'react';
import ContactForm from './ContactForm.js';
import { Modal, Button } from 'semantic-ui-react';

class EditWrap extends React.Component {
  constructor() {
    super();
    this.state = { deleting: false };
  }
  open = () => { this.setState({ deleting: true }) }
  close = () => { this.setState({ deleting: false }) }
  deleteRecord = () => {
    this.actions.destroy(record.id);
  }
  render() {
    const { record, actions } = this.props;
    if (!record) return null;
    return(
      <div>
        <ContactForm record={record} actions={actions}/>
        <hr />
        <Button fluid onClick={this.open}>Delete Contact</Button>
        <Modal size='small' open={this.state.deleting} onClose={this.close}>
          <Modal.Header>Delete Contact</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {record.name}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>No</Button>
            <Button
              content="Yes Delete It."
              icon='trash alternate outline'
              labelPosition='right'
              negative onClick={() => actions.destroy(record.id)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default EditWrap;
