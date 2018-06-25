import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import Application from '../layouts/application.js';
import Contacts from './Contacts';

const Router = (props) => (
  <ConnectedRouter { ...props }>
    <Application>
      <Route exact path='/' component={Contacts} />
    </Application>
  </ConnectedRouter>
);

export default Router;
