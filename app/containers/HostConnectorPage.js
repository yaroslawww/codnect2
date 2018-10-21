import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HostConnector from '../components/HostConnector';
import * as HostConnectorActions from '../actions/hostConnector';

function mapStateToProps(state) {
  return {
    hostConnector: state.hostConnector
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HostConnectorActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostConnector);
