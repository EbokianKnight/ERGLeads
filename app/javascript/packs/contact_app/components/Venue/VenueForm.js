import React from 'react';
import { Form, Text, TextArea, Select, Option } from 'informed';
import { Message, Button, Header } from 'semantic-ui-react';

const kindOfVenues =  [
  { value: 'amphitheater', text: 'Amphitheater' },
  { value: 'casino', text: 'Casino' },
  { value: 'club-bar', text: 'Club / Bar' },
  { value: 'fair-festival', text: 'Fair / Festival' },
  { value: 'private-corporate', text: 'Private / Corporate' },
  { value: 'summer concert series', text: 'Summer Concert Series' },
  { value: 'theatre-pac', text: 'Theatre / Pac' },
  { value: 'other', text: 'Other' }
];

const kindOfCountries =  [
  { value: 'USA', text: 'USA' },
  { value: 'Canada', text: 'Canada' },
  { value: 'Mexico', text: 'Mexico' },
];

export default ({ errors, venue, disable, actions }) => {
  const onSubmitForm = (params) => {
    if (!venue.id) actions.create(params);
    else actions.update(venue.id, params);
  }

  const Errors = ({ match }) => {
    const matches = findErrors(match);
    if (matches.length === 0) return null;
    return matches.map((err, i) => <div key={i} className="has-errors">{err.message}</div>)
  }

  const findErrors = (match) => {
    if (!errors || !errors.errors) return [];
    const matches = errors.errors.filter(obj => obj.parameter === match);
    if (matches.length === 0) return [];
    else return matches
  }

  const hasError = (matcher) => {
    return findErrors(matcher).length > 0 ? ' error' : '';
  }

  const id = venue.id;

  // Fuck you chrome. autocomplete="new-password" shouldnt be needed on EVERY INPUT
  return (
    <Form className='ui small form' onSubmit={onSubmitForm} autoComplete="off">
      <Header textAlign='center' as='h2'>{venue.name}</Header>
      <div className={`field field-container${hasError('name')}`}>
        <label className='forml' htmlFor={`name-${id}`}>Name</label>
        <Text className='formf' field='name' id={`name-${id}`} initialValue={venue.name} autoComplete="new-password" />
        <Errors match='name'/>
      </div>
      <div className={`field field-container${hasError('kind')}`}>
        <label className='forml' htmlFor={`kind-${id}`}>Kind of Venue</label>
        <Select className='formf ui selection dropdown' field='kind' id={`kind-${id}`} initialValue={venue.kind}>
          <Option value='' disabled>Select One...</Option>
          { kindOfVenues.map((opt, idx) => <Option value={opt.value} key={idx}>{opt.text}</Option>) }
        </Select>
        <Errors match='kind'/>
      </div>
      <div className={`field field-container${hasError('other_kind')}`}>
        <label className='forml' htmlFor={`other_kind-${id}`}>Kind (If Other)</label>
        <Text className='formf' field='other_kind' id={`other_kind-${id}`} initialValue={venue.other_kind} autoComplete="new-password" />
        <Errors match='other_kind'/>
      </div>
      <div className={`field field-container${hasError('website')}`}>
        <label className='forml' htmlFor={`website-${id}`}>Website</label>
        {
          venue.website ?
            <div className='formf ui action input'>
              <Text className='formf' field='website' id={`website-${id}`} initialValue={venue.website} autoComplete="new-password" />
              <a href={venue.website} target='_blank' className='ui blue icon button'>
                <i aria-hidden='true' className='external share icon'></i>
              </a>
            </div>
          : <Text className='formf' field='website' id={`website-${id}`} initialValue={venue.website} autoComplete="new-password" />

        }
        <Errors match='website'/>
      </div>
      <div className={`field field-container${hasError('email')}`}>
        <label className='forml' htmlFor={`email-${id}`}>Email Address</label>
        {
          venue.email ?
            <div className='formf ui action input'>
              <Text className='formf' field='email' id={`email-${id}`} initialValue={venue.email} autoComplete="new-password" />
              <a href={`mailto:${venue.email}`} className="ui blue icon button">
                <i aria-hidden="true" className="paper plane icon"></i>
              </a>
            </div>
          : <Text className='formf' field='email' id={`email-${id}`} initialValue={venue.email} autoComplete="new-password" />

        }
        <Errors match='email'/>
      </div>
      <div className={`field field-container${hasError('phone')}`}>
        <label className='forml' htmlFor={`phone-${id}`}>Phone Number</label>
        {
          venue.phone ?
            <div className='formf ui action input'>
              <Text className='formf' field='phone' id={`phone-${id}`} initialValue={venue.phone} autoComplete="new-password" />
              <a href={`tel:${venue.phone.replace(/[^\d+]/g, '')}`} className="ui blue icon button">
                <i aria-hidden="true" className="phone icon"></i>
              </a>
            </div>
          : <Text className='formf' field='phone' id={`phone-${id}`} initialValue={venue.phone} autoComplete="new-password" />

        }
        <Errors match='phone'/>
      </div>
      <div className={`field field-container${hasError('ext')}`}>
        <label className='forml' htmlFor={`ext-${id}`}>Extension</label>
        <Text className='formf' field='ext' id={`ext-${id}`} initialValue={venue.ext} autoComplete="new-password" />
        <Errors match='ext'/>
      </div>

      {/* LOCATION */}
      <div className={`field field-container${hasError('location.street')}`}>
        <label className='forml' htmlFor={`address1-${id}`}>Address1</label>
        <Text className='formf' field='location_attributes.street' id={`address1-${id}`} autoComplete="new-password"
          initialValue={venue.location && venue.location.street} />
        <Errors match='location.street'/>
      </div>
      <div className={`field field-container${hasError('location.street2')}`}>
        <label className='forml' htmlFor={`address2-${id}`}>Address2</label>
        <Text className='formf' field='location_attributes.street2' id={`address2-${id}`} autoComplete="new-password"
          initialValue={venue.location && venue.location.street2} />
        <Errors match='location.street2'/>
      </div>
      <div className={`field field-container${hasError('location.city')}`}>
        <label className='forml' htmlFor={`city-${id}`}>City</label>
        <Text className='formf' field='location_attributes.city' id={`city-${id}`} autoComplete="new-password"
          initialValue={venue.location && venue.location.city} />
        <Errors match='location.city'/>
      </div>
      <div className={`field field-container${hasError('location.state')}`}>
        <label className='forml' htmlFor={`state-${id}`}>State / Province</label>
        <Text className='formf' field='location_attributes.state' id={`state-${id}`} autoComplete="new-password"
          initialValue={venue.location && venue.location.state} />
        <Errors match='location.state'/>
      </div>
      <div className={`field field-container${hasError('location.zipcode')}`}>
        <label className='forml' htmlFor={`zipcode-${id}`}>Zipcode</label>
        <Text className='formf' field='location_attributes.zipcode' id={`zipcode-${id}`} autoComplete="new-password"
          initialValue={venue.location && venue.location.zipcode} />
        <Errors match='location.zipcode'/>
      </div>
      <div className={`field field-container${hasError('location.country')}`}>
        <label className='forml' htmlFor={`country-${id}`}>Country</label>
        <Select className='formf ui selection dropdown' field='location_attributes.country' id={`country-${id}`}
          initialValue={venue.location && venue.location.country} autoComplete="new-password">
          { kindOfCountries.map((opt, idx) => <Option value={opt.value} key={idx}>{opt.text}</Option>) }
        </Select>
        <Errors match='location.country'/>
      </div>

      <div className={`field field-container${hasError('location.comments')}`}>
        <label className='forml' htmlFor={`comments-${id}`}>Comments</label>
        <TextArea className='formf' field='comments' id={`comments-${id}`} initialValue={venue.comments} autoComplete="new-password" />
      </div>
      {
        venue.submit == 'ok' ?
          <Message positive
            onDismiss={() => actions.status('')}
            onClick={() => actions.status('')}
            icon='checkmark'
            header='Success!'
            content={`Successfully updated the Venue.`}
          /> : null
      }
      <Button className="blue" type="submit" fluid disabled={disable}>Submit</Button>
    </Form>
  );
};
