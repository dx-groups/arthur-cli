import React, { Component } from 'react'
import { connect } from '@dx-groups/arthur'
import Module from './module'

@connect(
  [''],
  state => {
    return {
      ...state,
    }
  },
)
export default class {{ name }} extends Component {
  render() {
    return (
      <div>{{ name }} page</div>
    )
  }
}
