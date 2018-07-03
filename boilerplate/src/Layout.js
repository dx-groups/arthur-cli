import React, { Component, createElement } from 'react';
import styles from './Layout.less';
import logo from './logo.png';

export default class Layout extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <header className={styles.layout_header}>
          <img src={logo} alt="logo" />
          <h1>Hello, arthur</h1>
        </header>
        <div className={styles.layout_content}>{createElement(this.props.children)}</div>
      </div>
    );
  }
}
