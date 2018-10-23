// @flow
import React from 'react';

type Props = {
  data: object,
};

export default class TabFile extends React.Component<Props> {
  props: Props;

  render() {
    return <div>
      <button onClick={this.props.data.selectConfigFile}>
        Change file
      </button>
      <br/>
      <button onClick={() => this.props.data.removeConfigFile()}>
        Remove File
      </button>
    </div>;
  }
}
