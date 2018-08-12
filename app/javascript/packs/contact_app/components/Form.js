import React from 'react';
import { Form, Text, TextArea, Select, Option } from 'informed';

const Errors = ({errors}) => {
  if (!errors || errors.length == 0) return null;
  return errors.map((err, i) => <div key={i} className="form-errors">{err}</div>)
}

export default ({ formID, fields, onSubmit, disable }) =>
  <Form id={formID} onSubmit={onSubmit}>
    { renderFormFields(fields) }
    <button className="btn btn-submit" type="submit" disabled={disable}>
      Submit
    </button>
  </Form>;


// example field {
//   id: 'contact-field__first_name',
//   label: 'First Name'
//   type: "text|textArea|select",
//   field: 'location.state|first_name',
//   initialValue: '',
//   opts: [
//     { id: 'radio-one', label: 'One', value: '1' }
//   ]
// }
const renderFormFields = (fields) => {
  if (!fields || fields.length == 0) return null;

  return fields.map((field, idx) => {
    const hasErrors = field.errors && field.errors.length != 0 ? 'invalid' : '';

    return (
      <div key={idx} className={`field-control ${hasErrors}`} id={`${field.id}-control`}>
        <label htmlFor={field.id}>{field.label}</label>
        <GetField field={field}/>
        <Errors className="form-errors" errors={field.errors} />
      </div>
    );
  });
}

const GetField = ({ field }) => {
  switch (field.type) {
  case 'textArea':
    return <TextArea field={field.field} id={field.id} initialValue={field.initialValue} autoComplete="off"/>
  case 'select':
    return (
      <Select field={field.field} id={field.id} initialValue={field.initialValue}>
        <Option value='' disabled>Select One...</Option>
        {
          field.opts.map((opt, idx2) => {
            return (
              <Option value={opt.value} id={opt.id}>{opt.label}</Option>
            )
          })
        }
      </Select>
    )
  default: return <Text field={field.field} id={field.id} initialValue={field.initialValue} autoComplete="off"/>
  }
}
