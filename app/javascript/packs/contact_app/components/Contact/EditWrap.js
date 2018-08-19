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
    console.log("DELETE HAHA")
  }
  render() {
    const { record, errors, actions } = this.props;
    if (!record) return null;
    return(
      <div>
        <ContactForm record={record} errors={errors} actions={actions}/>
        <hr />
        <Button fluid onClick={this.open}>Delete Venue</Button>
        <Modal size='small' open={this.state.deleting} onClose={this.close}>
          <Modal.Header>Delete Venue</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {record.name}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>No</Button>
            <Button negative onClick={this.deleteRecord} icon='trash alternate outline' labelPosition='right' content="Yes Delete It." />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default EditWrap;
