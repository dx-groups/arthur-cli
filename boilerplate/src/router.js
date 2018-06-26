import React from 'react'
import {
  Route,
  Switch,
  Redirect
} from '@dx-groups/arthur/routerDom'
import { ConnectedRouter } from '@dx-groups/arthur/routerRedux'
import Loadable from 'react-loadable'
import { hot } from 'react-hot-loader'
import Layout from './Layout'

import demoRoutes from './modules/demo/routes'

function transformRoutes (routes, _parent = '/', _loader) {
  const tmpRoutes = []
  routes && routes.forEach(route => {
    const { children, parent = _parent, loader = _loader, ...rest } = route
    tmpRoutes.push(
      {
        ...rest,
        parent,
        loader,
      },
      ...transformRoutes(children, rest.path, loader)
    )
  })
  return tmpRoutes
}

const demos = transformRoutes(demoRoutes)

const routes = [
  ...demos,
]

function router ({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact from='/' to='/demo' />
        {
          routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={true}
              render={() => (
                <Layout>
                  {
                    route.component || (
                      Loadable({
                        loader: route.loader,
                        loading() {
                          return <div>Loading...</div>
                        }
                      })
                    )
                  }
                </Layout>
              )}
            />
          ))
        }
      </Switch>
    </ConnectedRouter>
  )
}

export default hot(module)(router)
