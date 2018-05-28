import { call, put } from 'redux-saga/effects';

import api from '../../api';
import { Types } from '../devices';

// eslint-disable-next-line
export function* deviceListRequest(action) {
  const response = yield call(api.get, '/devices');
  if (response.ok) {
    yield put({ type: Types.DEVICE_LIST_SUCCESS, devices: response.data });
    yield put({ type: Types.CHANGE_DEVICE_SELECTION, index: 0 });
  } else {
    yield put({ type: Types.DEVICE_LIST_FAILURE, error: response.error });
  }
}
