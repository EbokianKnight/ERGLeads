import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import Application from '../layouts/application.js';
import Contacts from './Contacts';
import Venues from './Venues';
import Events from './Events';
import VenueGroups from './VenueGroups';
import VenueShowPage from './VenueShowPage';
import VenueNewPage from './VenueNewPage';
/* <Route exact path='/groups' component={VenueGroups} />
<Route exact path='/events' component={Events} /> */

const Router = (props) => (
  <ConnectedRouter { ...props }>
    <Application>
      <Route exact path='/' component={Contacts} />
      <Route exact path='/contacts' component={Contacts} />
      <Route exact path='/venues' component={Venues} />
      <Route exact path='/venues/new' component={VenueNewPage} />
      <Route exact path='/venues/edit/:id' component={VenueShowPage} />
    </Application>
  </ConnectedRouter>
);

export default Router;
