import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import LandingPage from './components/landingPage';

const Router = (props) => (
  <ConnectedRouter { ...props }>
    <div>
      <Route exact path='/' component={LandingPage} />
    </div>
  </ConnectedRouter>
)
export default Router;
