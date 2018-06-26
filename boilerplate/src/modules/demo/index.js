import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from '@dx-groups/arthur/routerDom'

import Page from './page'

export default class Demo extends PureComponent {
  render() {
    return (
      <Switch>
        <Redirect exact from='/demo' to='/demo/page' />
        <Route exact path='/demo/page' component={Page} />
      </Switch>
    )
  }
}
