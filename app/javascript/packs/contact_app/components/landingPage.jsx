import React from 'react';
import { Button } from 'reactstrap';
import ContactTable from './contactTable';

class LandingPage extends React.Component {
  render() {
    return(
      <div class="contact-app-container">
        The Content will render here.
        <ContactTable/>
      </div>
    )
  }
}
export default LandingPage
