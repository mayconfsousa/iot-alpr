import { takeLatest } from 'redux-saga/effects';

/* Types */
import { Types as DeviceTypes } from '../devices';

/* Sagas */
import { deviceListRequest } from './devices';

export default function* root() {
  yield [takeLatest(DeviceTypes.DEVICE_LIST_REQUEST, deviceListRequest)];
}
