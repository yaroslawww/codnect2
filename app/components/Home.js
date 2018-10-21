// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
     console.log('componentWillUnmount');
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Link to={routes.HOST_CONNECTOR}>Host Connector</Link>
      </div>
    );
  }
}
