import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Types and Actions Creators ------------------- */

export const { Types, Creators } = createActions({
  deviceListRequest: null,
  deviceListSuccess: ['devices'],
  deviceListFailure: ['error'],
  changeDeviceSelection: ['index'],
});

/* -------------------- Initial State -------------------------------- */

const INITIAL_STATE = Immutable({
  devices: [],
  loading: false,
  error: null,
  selectedDevice: null,
});

/* -------------------- Reducers ------------------------------------- */

const deviceListRequest = state => state.merge({ loading: true });

const deviceListSuccess = (state, { devices }) => state.merge({ loading: false, devices });

const deviceListFailure = (state, { error }) => state.merge({ loading: false, error });

const changeDeviceSelection = (state, { index }) =>
  state.merge({ selectedDevice: state.devices[index] });

/* -------------------- Hookup Reducers To Types --------------------- */

export default createReducer(INITIAL_STATE, {
  [Types.DEVICE_LIST_REQUEST]: deviceListRequest,
  [Types.DEVICE_LIST_SUCCESS]: deviceListSuccess,
  [Types.DEVICE_LIST_FAILURE]: deviceListFailure,
  [Types.CHANGE_DEVICE_SELECTION]: changeDeviceSelection,
});
