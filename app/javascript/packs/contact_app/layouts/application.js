import React from 'react';
import Navigation from '../components/Navigation';

class Application extends React.Component {
  render() {
    return(
      <div className="contact-app-container">
        <div className="contact-app-main ">
          <Navigation />
          { this.props.children }
        </div>
      </div>
    )
  }
}
export default Application
