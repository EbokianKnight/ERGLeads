import React, { Component } from 'react'
import ContactForm from './EditWrap.js';
import ContactFormNew from './ContactFormNew.js';
import { Accordion, Icon, Header } from 'semantic-ui-react'

const contructTitle = (record) => {
  if (!record.job_title) return record.full_name;
  return record.full_name + ', ' + record.job_title;
}

const EachContact = ({ index, activeIndex, record, handleClick, errors, actions }) => {
  console.log(index, record)
  return (
    <div key={record && record.id || index}>
      <Accordion.Title active={activeIndex == index} index={index} onClick={handleClick}>
        <Icon name='dropdown' />
        {
          record ?
            <Header as={'span'}>{contructTitle(record)}</Header>
          : <Header as={'span'}>New Contact</Header>
        }
      </Accordion.Title>
      <Accordion.Content active={activeIndex == index}>
        {
          (!record) ?
            <ContactFormNew record={record} errors={errors} actions={actions} />
          : <ContactForm record={record} errors={errors} actions={actions} />
        }
      </Accordion.Content>
    </div>
  )

}

class ContactCollection extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { contacts, errors, actions } = this.props;
    const { activeIndex } = this.state;
    const arrayOfContacts = (contacts && contacts.length) ? [...contacts, null] : [null];
    return (
      <Accordion>
        {
          arrayOfContacts.map((record, idx) =>
            <EachContact key={idx}
              index={idx}
              activeIndex={activeIndex}
              record={record}
              handleClick={this.handleClick}
              errors={errors || []}
              actions={actions}
            />
          )
        }
      </Accordion>
    )
  }
}

export default ContactCollection;
