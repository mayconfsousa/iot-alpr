import { saveActivity } from '@api';

const activities = {
  state: {
    activities: [],
    error: null,
  },
  reducers: {
    success(state) {
      return { ...state, loading: false };
    },
    failure(state, error) {
      return { ...state, loading: false, error };
    },
  },
  effects: {
    async saveActivity(data) {
      const response = await saveActivity(data);
      if (response.ok) this.success();
      else this.failure(response.error);
    },
  },
};

export default activities;
