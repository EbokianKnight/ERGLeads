import React from 'react';
import Form from '../Form.js';

const VenueForm = ({ venue, errors, action }) => {
  const onSubmitForm = (params) => {
    if (!venue) action(params);
    else action(venue.id, params);
  }

  const pluckValidations = (error_state, key) => {
    if (!error_state || !error_state.errors) return [];
    const matches = error_state.errors.filter(obj => obj.parameter === key);
    if (matches.length === 0) return [];
    else return matches.map(err => err['message']);
  }

  const fields = [
    {
      id: 'venue-form-field__name',
      label: 'Venue Name',
      type: 'text',
      field: 'name',
      errors: pluckValidations(errors, 'name'),
      initialValue: venue.name,
    },{
      id: 'venue-form-field__phone',
      label: 'General Phone Number',
      type: 'text',
      field: 'phone',
      errors: pluckValidations(errors, 'phone'),
      initialValue: venue.phone,
    },{
      id: 'venue-form-field__ext',
      label: 'Extension',
      type: 'text',
      field: 'ext',
      errors: pluckValidations(errors, 'ext'),
      initialValue: venue.ext,
    },{
      id: 'venue-form-field__email',
      label: 'General Email',
      type: 'text',
      field: 'email',
      errors: pluckValidations(errors, 'email'),
      initialValue: venue.email,
    },{
      id: 'venue-form-field__website',
      label: 'Website',
      type: 'text',
      field: 'website',
      errors: pluckValidations(errors, 'website'),
      initialValue: venue.website,
    },{
      id: 'venue-form-field__city',
      label: 'City',
      type: 'text',
      field: 'location_attributes.city',
      errors: pluckValidations(errors, 'location.city'),
      initialValue: venue.location.city,
    },{
      id: 'venue-form-field__state',
      label: 'State',
      type: 'text',
      field: 'location_attributes.state',
      errors: pluckValidations(errors, 'location.state'),
      initialValue: venue.location.state,
    },{
      id: 'venue-form-field__country',
      label: 'Country',
      type: 'text',
      field: 'location_attributes.country',
      errors: pluckValidations(errors, 'location.country'),
      initialValue: venue.location.country,
    },{
      id: 'venue-form-field__address',
      label: 'Address',
      type: 'text',
      field: 'location_attributes.street',
      errors: pluckValidations(errors, 'location.street'),
      initialValue: venue.location.street,
    },{
      id: 'venue-form-field__address2',
      label: 'Address2',
      type: 'text',
      field: 'location_attributes.street2',
      errors: pluckValidations(errors, 'location.street2'),
      initialValue: venue.location.street2,
    },{
      id: 'venue-form-field__zipcode',
      label: 'Zipcode',
      type: 'text',
      field: 'location_attributes.zipcode',
      errors: pluckValidations(errors, 'location.zipcode'),
      initialValue: venue.location.zipcode,
    },{
      id: 'venue-form-field__kind',
      label: 'Kind of Venue',
      type: 'select',
      field: 'kind',
      opts: [
        { value: 'amphitheater', label: 'Amphitheater' },
        { value: 'casino', label: 'Casino' },
        { value: 'club-bar', label: 'Club / Bar' },
        { value: 'fair-festival', label: 'Fair / Festival' },
        { value: 'summer concert series', label: 'Summer Concert Series' },
        { value: 'theatre-pac', label: 'Theatre / Pac' },
        { value: 'other', label: 'Other' }
      ],
      errors: pluckValidations(errors, 'kind'),
      initialValue: venue.kind,
    },{
      id: 'venue-form-field__other_kind',
      label: 'Other Kind of Venue',
      type: 'text',
      field: 'other_kind',
      errors: pluckValidations(errors, 'other_kind'),
      initialValue: venue.other_kind,
    },{
      id: 'venue-form-field__comments',
      label: 'Comments',
      type: 'textArea',
      field: 'comments',
      errors: pluckValidations(errors, 'comments'),
      initialValue: venue.comments,
    }
  ];

  return (
    <Form
      formID={`venueform${venue.id}`}
      fields={fields}
      disable={venue.submit == 'in progress' || null}
      onSubmit={onSubmitForm}
    />
  )
}

export default VenueForm;
