import React from 'react';
import { Form, Text, TextArea, Select, Option } from 'informed';
import { Button } from 'semantic-ui-react';

export default ({ venueID, errors, record, disable, actions }) => {
  const onSubmitForm = (params) => {
    const contactParams = {
      ...params,
      connectable_type: 'Contact',
      connectable_id: venueID,
    }
    if (!record.id) actions.create(params);
    else actions.update(record.id, params);
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

  const id = record.id;

  return (
    <Form className='ui small form' onSubmit={onSubmitForm}>
      <div className={`field field-container${hasError('first_name')}`}>
        <label className='forml' htmlFor={`first_name-${id}`}>First Name</label>
        <Text className='formf' field='first_name' id={`first_name-${id}`} initialValue={record.first_name} />
        <Errors match='first_name'/>
      </div>
      <div className={`field field-container${hasError('last_name')}`}>
        <label className='forml' htmlFor={`last_name-${id}`}>Last Name</label>
        <Text className='formf' field='last_name' id={`last_name-${id}`} initialValue={record.last_name} />
        <Errors match='last_name'/>
      </div>
      <div className={`field field-container${hasError('job_title')}`}>
        <label className='forml' htmlFor={`job_title-${id}`}>Job Title</label>
        <Text className='formf' field='job_title' id={`job_title-${id}`} initialValue={record.job_title} />
        <Errors match='job_title'/>
      </div>

      <div className={`field field-container${hasError('email')}`}>
        <label className='forml' htmlFor={`email-${id}`}>Email Address</label>
        <div className='formf ui action input'>
          <Text className='formf' field='email' id={`email-${id}`} initialValue={record.email} />
          <a href={`mailto:${record.email}`} className="ui blue icon button">
            <i aria-hidden="true" className="paper plane icon"></i>
          </a>
        </div>
        <Errors match='email'/>
      </div>
      <div className={`field field-container${hasError('phone')}`}>
        <label className='forml' htmlFor={`phone-${id}`}>Phone Number</label>
        <Text className='formf' field='phone' id={`phone-${id}`} initialValue={record.phone} />
        <Errors match='phone'/>
      </div>
      <div className={`field field-container${hasError('ext')}`}>
        <label className='forml' htmlFor={`ext-${id}`}>Extension</label>
        <Text className='formf' field='ext' id={`ext-${id}`} initialValue={record.ext} />
        <Errors match='ext'/>
      </div>

      {/* LOCATION */}
      <div className={`field field-container${hasError('location.street')}`}>
        <label className='forml' htmlFor={`address1-${id}`}>Address1</label>
        <Text className='formf' field='location_attributes.street' id={`address1-${id}`}
          initialValue={record.location && record.location.street} />
        <Errors match='location.street'/>
      </div>
      <div className={`field field-container${hasError('location.street2')}`}>
        <label className='forml' htmlFor={`address2-${id}`}>Address2</label>
        <Text className='formf' field='location_attributes.street2' id={`address2-${id}`}
          initialValue={record.location && record.location.street2} />
        <Errors match='location.street2'/>
      </div>
      <div className={`field field-container${hasError('location.city')}`}>
        <label className='forml' htmlFor={`city-${id}`}>City</label>
        <Text className='formf' field='location_attributes.city' id={`city-${id}`}
          initialValue={record.location && record.location.city} />
        <Errors match='location.city'/>
      </div>
      <div className={`field field-container${hasError('location.state')}`}>
        <label className='forml' htmlFor={`state-${id}`}>State / Province</label>
        <Text className='formf' field='location_attributes.state' id={`state-${id}`}
          initialValue={record.location && record.location.state} />
        <Errors match='location.state'/>
      </div>
      <div className={`field field-container${hasError('location.zipcode')}`}>
        <label className='forml' htmlFor={`zipcode-${id}`}>Zipcode</label>
        <Text className='formf' field='location_attributes.zipcode' id={`zipcode-${id}`}
          initialValue={record.location && record.location.zipcode} />
        <Errors match='location.zipcode'/>
      </div>
      <div className={`field field-container${hasError('location.country')}`}>
        <label className='forml' htmlFor={`country-${id}`}>Country</label>
        <Select className='formf ui selection dropdown' field='location_attributes.country' id={`country-${id}`}
          initialValue={record.location && record.location.country}>
          { kindOfCountries.map((opt, idx) => <Option value={opt.value} key={idx}>{opt.text}</Option>) }
        </Select>
        <Errors match='location.country'/>
      </div>

      <div className={`field field-container${hasError('location.comments')}`}>
        <label className='forml' htmlFor={`comments-${id}`}>Comments</label>
        <TextArea className='formf' field='comments' id={`comments-${id}`} initialValue={record.comments} />
      </div>

      <Button className="blue" type="submit" fluid disabled={disable}>Submit</Button>
    </Form>
  );
};
