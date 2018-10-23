// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import TabInfo from './TabInfo';
import { TAB_BASE, TAB_FILE, TAB_HOST } from '../../actions/hostConnector';
import styles from './HostConnector.scss';


type Props = {
  selectConfigFile: () => void,
  removeConfigFile: () => void,
  checkPreferences: () => void,
  hostConnector: object
};

export default class HostConnector extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      displayTab: '',
      displayInfo: {}
    };

    this.openBaseInfoTab = this.openBaseInfoTab.bind(this);
    this.openFileInfoTab = this.openFileInfoTab.bind(this);
    this.openHostInfoTab = this.openHostInfoTab.bind(this);
    this.removeConfigFileAction = this.removeConfigFileAction.bind(this);
  }

  componentDidMount() {
    this.props.checkPreferences();
  }

  removeConfigFileAction() {
    this.props.removeConfigFile();
    this.openBaseInfoTab();
  }

  openBaseInfoTab() {
    this.setState({
      displayTab: TAB_BASE,
      displayInfo: {}
    });
  }

  openFileInfoTab() {
    this.setState({
      displayTab: TAB_FILE,
      displayInfo: {
        selectConfigFile: this.props.selectConfigFile,
        removeConfigFile: this.removeConfigFileAction
      }
    });
  }

  openHostInfoTab(hostName) {
    this.setState({
      displayTab: TAB_HOST,
      displayInfo: {
        host: this.props.hostConnector.hosts[hostName]
      }
    });
  }

  renderHostsList(hosts) {
    const list = [];
    Object.keys(hosts).forEach((value) => {
      list.push(<li key={value} onClick={() => this.openHostInfoTab(value)}>
        <div className={styles.textWrapper}>
          <i className="fa fa-circle"/>&nbsp;{value}
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
          <i className="fa fa-laptop-code"/>&nbsp;Hosts:
        </div>
        <div className={styles.hostsList__content}>
          <ul>
            {this.renderHostsList(hostConnector.hosts)}
          </ul>
        </div>
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
            <TabInfo type={this.state.displayTab} data={this.state.displayInfo}/>
          </div>
        </div>
      </div>
    );
  }
}
