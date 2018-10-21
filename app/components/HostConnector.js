// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Host from '../utils/class-host';
import Connector from '../utils/class-connector';
import styles from './HostConnector.scss';
import routes from '../constants/routes';
import { send } from "redux-electron-ipc";

type Props = {
  selectConfigFile: () => void,
  checkPreferences: () => void,
  hostConnector: object
};

export default class HostConnector extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      displayTab: null
    };

    this.openFileInfoTab = this.openFileInfoTab.bind(this);
    this.openHostInfoTab = this.openHostInfoTab.bind(this);
  }

  componentDidMount() {
    this.props.checkPreferences();
  }

  connectToServer(hostData) {
    const host = (new Host()).createFromObject(hostData);
    const hostConnector = new Connector(host);
    hostConnector.runSsh();
  }

  openFileInfoTab() {
    this.setState({
      displayTab: '#configfile'
    });
  }

  openHostInfoTab(hostName) {
    this.setState({
      displayTab: hostName
    });
  }

  renderHostsList(hosts) {
    const list = [];
    Object.keys(hosts).forEach((value) => {
      list.push(<li key={value} onClick={() => this.openHostInfoTab(value)}>
        <div className={styles.textWrapper}>
          <i className="fa fa-circle" />&nbsp;{value}
        </div>
        <i className="fa fa-chevron-right"/>
      </li>);
    });
    return list;
  }

  render() {
    const { selectConfigFile, hostConnector } = this.props;
    let configfile;
    let hostsList;
    let tabInfo;

    // Config file
    if (hostConnector.hosts === undefined || Object.keys(hostConnector.hosts).length === 0) {
      configfile = <div className={styles.configfile}>
        <div
          className={styles.configfile__upload}
          onClick={selectConfigFile}
        >
          <i className="fa fa-upload"/>&nbsp;Upload config
        </div>
      </div>;
    } else {
      configfile = <div className={styles.configfile}>
        <div
          className={styles.configfile__upload}
          onClick={() => this.openFileInfoTab()}
        >
          <i className="fa fa-file-code"/>&nbsp;{hostConnector.fileName}
        </div>
      </div>;
    }

    // Hosts List
    if (hostConnector.hosts === undefined || Object.keys(hostConnector.hosts).length === 0) {
      hostsList = '';
    } else {
      hostsList = <div className={styles.hostsList}>
        <div className={styles.hostsList__header}>
          <i className="fa fa-laptop-code" />&nbsp;Hosts:
        </div>
        <div className={styles.hostsList__content}>
          <ul>
            {this.renderHostsList(hostConnector.hosts)}
          </ul>
        </div>
      </div>;
    }

    // Tab info
    if (this.state.displayTab === '#configfile') {
      tabInfo = <div>
        <button onClick={selectConfigFile}>
          Change file
        </button>
      </div>;
    } else if (this.state.displayTab === null) {
      tabInfo = <div />;
    } else {
      tabInfo = <div>
        <h2>Host: {this.state.displayTab}</h2>
        <button onClick={() => this.connectToServer(hostConnector.hosts[this.state.displayTab])}>
          Connect to server
        </button>
      </div>;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.header__goback}>
            <Link to={routes.HOME}>
              <i className="fa fa-arrow-left fa-3x"/>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content__sidebar}>
            {configfile}
            {hostsList}
          </div>
          <div className={styles.content__data}>
            {tabInfo}
          </div>
        </div>
      </div>
    );
  }
}
