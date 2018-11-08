// @flow
import React from 'react';
import { TAB_FILE } from '../../actions/hostConnector';

const fs = require('fs');

type Props = {
  data: object
};

export default class TabFile extends React.Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      fileValue: ''
    };
  }

  componentDidMount() {
    this.editConfigFile(this.props.data.filePath);
  }

  editConfigFile(filePath) {
    const self = this;
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        alert(`An error ocurred reading the file :${  err.message}`);
        return;
      }

      self.setState({ fileValue: data });
    });
  }

  saveConfigFile(filePath) {
    const self = this;
    fs.writeFile(filePath, this.state.fileValue, function(err) {
      if (err) {
        alert('An error ocurred updating the file' + err.message);
        console.log(err);
        return;
      }

      alert('The file has been succesfully saved');
      self.props.data.reUpdateConfigFile(filePath);
    });
  }

  render() {
    let fileData = this.fileData;
    return <div>
      <button onClick={this.props.data.selectConfigFile}>
        Change file
      </button>
      <br/>
      <button onClick={() => this.props.data.removeConfigFile()}>
        Remove File
      </button>
      <br/>
     {/* <button onClick={() => this.editConfigFile(this.props.data.filePath)}>
        Edit File
      </button>
      <br/>*/}
      <textarea rows="5" value={this.state.fileValue} onChange={(event) => {
        this.setState({ fileValue: event.target.value });
      }}></textarea>
      <br/>
      <button onClick={() => this.saveConfigFile(this.props.data.filePath)}>
        Save changes
      </button>
    </div>;
  }
}
