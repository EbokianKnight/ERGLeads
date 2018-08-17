import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const MenuNav = ({ links, linkTo }) => {
  const onClick = (path) => linkTo(path);
  return (
    <Menu fluid widths={links.length}>
      {
        links.map((link, key) =>
          <Menu.Item key={key} active={link.active} onClick={() => onClick(link.path)}>
            { link.icon ? <Icon name={link.icon} size='large' /> : null }
            { link.label }
          </Menu.Item>
        )
      }
    </Menu>
  );
}

// icon: 'address book outline'
// icon: 'users'
const mapStateToProps = (state, ownProps) => ({
  links: [
    {
      path: '/venues',
      active: '/venues' == state.router.location.pathname,
      label: 'Venues',
    },{
      path: '/',
      active: '/' == state.router.location.pathname,
      label: 'Contacts',
    },{
      path: '/venues/new',
      active: '/venues/new' == state.router.location.pathname,
      label: 'New Venue',
      icon: 'plus',
    }
  ]
})

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
const mapDispatchToProps = (dispatch) => ({
  linkTo: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);
