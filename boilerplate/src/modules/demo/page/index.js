import React, { Component } from 'react'
import { connect } from '@dx-groups/arthur'
import Module from './module'
import styles from './page.less'

@connect(
  ['demo.page'],
  state => state['demo.page'],
)
export default class Page extends Component {
  _handleAction = (e, _action) => {
    e.preventDefault()
    this.props.dispatch(Module.actions[_action]())
  }
  render() {
    return (
      <div className={styles.page}>
        <p>{this.props.count}</p>

        <button onClick={e => this._handleAction(e, 'increase')}>increase</button>
        <button onClick={e => this._handleAction(e, 'decrease')}>decrease</button>
      </div>
    )
  }
}
