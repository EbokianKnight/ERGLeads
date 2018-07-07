import React from 'react';

const drawPaths = ({ path, links, linkTo }) => {
  return Object.keys(links).map((link, i) => {
    return (
      <div key={i}
        onClick={linkTo(links[link].path)}
        className={ links[link].active ? "active-link" : ''}
      >
        { links[link].title }
      </div>
    );
  })
}

const Navigation = (props) => {
  return (
    <div className="table-navigation">
      { drawPaths(props) }
    </div>
  );
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';

const mapStateToProps = (state, ownProps) => ({
  links: {
    contacts: {
      path: '/',
      active: '/' == state.router.location.pathname,
      title: 'Contacts'
    },
    venues: {
      path: '/venues',
      active: '/venues' == state.router.location.pathname,
      title: 'Venues'
    },
    groups: {
      path: '/groups',
      active: '/groups' == state.router.location.pathname,
      title: 'Groups'
    },
    events: {
      path: '/events',
      active: '/events' == state.router.location.pathname,
      title: 'Events'
    }
  },
})

const mapDispatchToProps = (dispatch) => ({
  linkTo: (path) => () => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
