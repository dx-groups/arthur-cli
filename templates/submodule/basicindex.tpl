import React, { Component } from 'react';
import { connect } from '@dx-groups/arthur';
import { } from 'antd';

import Module from './module';

@connect(
  ['{{ statePoint }}.{{ name }}', 'common.showListSpin'],
  state => ({
    ...state['{{ statePoint }}.{{ name }}'],
    showListSpin: state['common.showListSpin'],
  }),
)
export default class {{ className }} extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Module.actions.getData());
  }

  render() {
    const { showListSpin } = this.props;

    return (
      <div></div>
    );
  }
}
