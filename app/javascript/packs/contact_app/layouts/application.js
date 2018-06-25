import React from 'react';

class Application extends React.Component {
  render() {
    return(
      <div className="contact-app-container">
        <div className="contact-app-main ">
          { this.props.children }
        </div>
      </div>
    )
  }
}
export default Application
