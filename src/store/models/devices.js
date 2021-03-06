import { getDevices } from '@api';

const devices = {
  state: {
    devices: [],
    loading: false,
    error: null,
    selectedDevice: null,
  },
  reducers: {
    request(state) {
      return { ...state, loading: true };
    },
    success(state, devices) {
      return { ...state, loading: false, devices };
    },
    failure(state, error) {
      return { ...state, loading: false, error };
    },
    changeSelection(state, index) {
      return {
        ...state,
        selectedDevice: state.devices[index],
      };
    },
  },
  effects: {
    async getAll() {
      this.request();
      const response = await getDevices();
      if (response.ok) {
        this.success(response.data);
        if (response.data && response.data.length > 0) this.changeSelection(0);
      } else this.failure(response.error);
    },
  },
};

export default devices;
