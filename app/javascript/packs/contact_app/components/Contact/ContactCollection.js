import React, { Component } from 'react';
import ContactForm from './EditWrap.js';
import ContactFormNew from './ContactFormNew.js';
import { Accordion, Icon, Header, Message } from 'semantic-ui-react';

const contructTitle = (record) => {
  if (!record.job_title) return record.full_name;
  return record.full_name + ', ' + record.job_title;
}

const ForEachContent = ({ parentID, record, actions }) => {
  if (record && record.status == 'ok') {
    const message = record.id == 'new' ?
      'Contact has successfully been created.' :
      'Contact has successfully been updated.'
    return (
      <Message positive
        onDismiss={() => actions.status(record.id, '')}
        icon='checkmark'
        header='Success!'
        content={`Successfully submitted the Contact.`}
      />
    )
  }
  if (record.id != 'new') return <ContactForm parentID={parentID} record={record} actions={actions} />;
  else return <ContactFormNew parentID={parentID} record={record} actions={actions} />;
}

const EachContact = ({ parentID, index, activeIndex, record, handleClick, actions }) => {
  return (
    <div key={index}>
      <Accordion.Title active={activeIndex == index} index={index} onClick={handleClick}>
        <Icon name='dropdown' />
        {
          record.id != 'new' ?
            <Header as={'span'}>{contructTitle(record)}</Header>
          : <Header className='new-contact' as={'span'}>New Contact</Header>
        }
      </Accordion.Title>
      <Accordion.Content active={activeIndex == index}>
        <ForEachContent parentID={parentID} record={record} actions={actions} />
      </Accordion.Content>
    </div>
  )

}

class ContactCollection extends Component {
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const activeIndex = this.props.selectedContact;
    const newIndex = activeIndex === index ? -1 : index;
    this.props.actions.select(newIndex);
  }

  render() {
    const { contacts, actions, parentID, selectedContact } = this.props;
    return (
      <Accordion>
        {
          contacts.map((record, idx) =>
            <EachContact key={idx}
              index={record.id}
              parentID={parentID}
              activeIndex={selectedContact}
              record={record}
              handleClick={this.handleClick}
              actions={actions}
            />
          )
        }
      </Accordion>
    )
  }
}

export default ContactCollection;
