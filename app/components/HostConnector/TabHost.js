// @flow
import React from 'react';
import Host from '../../utils/class-host';
import Connector from '../../utils/class-connector';

type Props = {
  data: object
};

export default class TabHost extends React.Component<Props> {
  props: Props;

  render() {
    const host = (new Host()).createFromObject(this.props.data.host);
    const hostConnector = new Connector(host);

    return <div>
      <h2>Host: {host.name}</h2>
      <button onClick={() => hostConnector.runSsh()}>
        Connect to server
      </button>
    </div>;
  }
}
