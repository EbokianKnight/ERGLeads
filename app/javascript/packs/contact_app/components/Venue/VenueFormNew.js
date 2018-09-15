import React from 'react';
import { Form, Text, TextArea, Select, Option } from 'informed';
import { Button, Header, Message } from 'semantic-ui-react';

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

class VenueFormNew extends React.Component {
  constructor(props) { super(props); }
  componentDidMount() {
    if (!this.props.loading) this.props.actions.clear();
  }

  render() {
    const { errors, venue, disable, actions, loading, links } = this.props;
    const loadingCSS = loading ? ' loading' : '';

    const onSubmitForm = (params) => {
      if (!venue.id) actions.create(params);
      else links.venueEdit(venue.id);
    }

    const findErrors = (match) => {
      if (!errors || !errors.errors) return [];
      const matches = errors.errors.filter(
        obj => obj.parameter === match
      );
      if (matches.length === 0) return [];
      else return matches
    }

    const Errors = ({ match }) => {
      const matches = findErrors(match);
      if (matches.length === 0) return null;
      return matches.map((err, i) => <div key={i} className="has-errors">{err.message}</div>)
    }

    const hasError = (matcher) => {
      return findErrors(matcher).length > 0 ? ' error' : '';
    }

    if (venue && venue.id && venue.submit == 'ok') {
      return (
        <Message positive
          onDismiss={() => links.venueEdit(venue.id)}
          onClick={() => links.venueEdit(venue.id)}
          icon='checkmark'
          header='Success!'
          content={`${venue.name} has been successfully created.`}
        />
      )
    }

    return (
      <Form className={`ui small form${loadingCSS}`} onSubmit={onSubmitForm}>
        {
          loading ?
            <Header textAlign='center' as='h2'>Loading... Venue</Header>
          : <Header textAlign='center' as='h2'>New Venue</Header>
        }

        <div className={`field field-container${hasError('name')}`}>
          <label className='forml' htmlFor='name-new'>Name</label>
          <Text className='formf' field='name' id='name-new' />
          <Errors match='name'/>
        </div>
        <div className={`field field-container${hasError('kind')}`}>
          <label className='forml' htmlFor='kind-new'>Kind of Venue</label>
          <Select className='formf ui selection dropdown' field='kind' id='kind-new'>
            <Option value='' disabled>Select One...</Option>
            { kindOfVenues.map((opt, idx) => <Option value={opt.value} key={idx}>{opt.text}</Option>) }
          </Select>
          <Errors match='kind'/>
        </div>
        <div className={`field field-container${hasError('other_kind')}`}>
          <label className='forml' htmlFor='other_kind-new'>Kind (If Other)</label>
          <Text className='formf' field='other_kind' id='other_kind-new'/>
          <Errors match='other_kind'/>
        </div>
        <div className={`field field-container${hasError('website')}`}>
          <label className='forml' htmlFor='website-new'>Website</label>
          <Text className='formf' field='website' id='website-new' />
          <Errors match='website'/>
        </div>
        <div className={`field field-container${hasError('email')}`}>
          <label className='forml' htmlFor='email-new'>Email Address</label>
          <Text className='formf' field='email' id='email-new' />
          <Errors match='email'/>
        </div>
        <div className={`field field-container${hasError('phone')}`}>
          <label className='forml' htmlFor='phone-new'>Phone Number</label>
          <Text className='formf' field='phone' id='phone-new' />
          <Errors match='phone'/>
        </div>
        <div className={`field field-container${hasError('ext')}`}>
          <label className='forml' htmlFor='ext-new'>Extension</label>
          <Text className='formf' field='ext' id='ext-new' />
          <Errors match='ext'/>
        </div>

        {/* LOCATION */}
        <div className={`field field-container${hasError('location.street')}`}>
          <label className='forml' htmlFor='address-new'>Address1</label>
          <Text className='formf' field='location_attributes.street' id='address-new' />
          <Errors match='location.street'/>
        </div>
        <div className={`field field-container${hasError('location.street2')}`}>
          <label className='forml' htmlFor='address2-new'>Address2</label>
          <Text className='formf' field='location_attributes.street2' id='address2-new' />
          <Errors match='location.street2'/>
        </div>
        <div className={`field field-container${hasError('location.city')}`}>
          <label className='forml' htmlFor='city-new'>City</label>
          <Text className='formf' field='location_attributes.city' id='city-new' />
          <Errors match='location.city'/>
        </div>
        <div className={`field field-container${hasError('location.state')}`}>
          <label className='forml' htmlFor='state.new'>State / Province</label>
          <Text className='formf' field='location_attributes.state' id='state.new' />
          <Errors match='location.state'/>
        </div>
        <div className={`field field-container${hasError('location.zipcode')}`}>
          <label className='forml' htmlFor='zipcode-new'>Zipcode</label>
          <Text className='formf' field='location_attributes.zipcode' id='zipcode-new' />
          <Errors match='location.zipcode'/>
        </div>
        <div className={`field field-container${hasError('location.country')}`}>
          <label className='forml' htmlFor='country-new'>Country</label>
          <Select className='formf ui selection dropdown' field='location_attributes.country' id='country-new'>
            { kindOfCountries.map((opt, idx) => <Option value={opt.value} key={idx}>{opt.text}</Option>) }
          </Select>
          <Errors match='location.country'/>
        </div>

        <div className={`field field-container${hasError('location.comments')}`}>
          <label className='forml' htmlFor='comments-new'>Comments</label>
          <TextArea className='formf' field='comments' id='comments-new' />
        </div>

        <Button className="blue" type="submit" fluid disabled={disable}>Submit</Button>
      </Form>
    );
  }
}

export default VenueFormNew;
