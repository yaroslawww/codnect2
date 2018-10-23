// @flow
import React from 'react';
import {TAB_FILE, TAB_HOST} from '../../actions/hostConnector';
import TabFile from './TabFile';
import TabHost from './TabHost';

type Props = {
  type: string,
  data: object,
};

export default class TabInfo extends React.Component<Props> {
  props: Props;

  render() {
    switch (this.props.type) {
      case TAB_FILE:
        return <TabFile data={this.props.data}/>;
      case TAB_HOST:
        return <TabHost data={this.props.data}/>;
      default:
        return '';
    }
  }
}
