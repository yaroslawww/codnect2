import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type appStateType = {
  +hosts: object
};

export type Action = {
  +type: string
};

export type HostsUpdatedAction = {
  +type: string,
  +hosts: object
};

export type GetState = () => appStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
