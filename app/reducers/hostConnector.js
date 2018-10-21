// @flow
import { UPDATE_HOSTS } from '../actions/hostConnector';
import type { HostsUpdatedAction } from './types';

export default function hosts(
  hostsList: object = {},
  action: HostsUpdatedAction
) {
  switch (action.type) {
    case UPDATE_HOSTS:
      return action.hosts;
    default:
      return hostsList;
  }
}
