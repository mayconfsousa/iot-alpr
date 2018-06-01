import { saveActivity } from '@api';

const activities = {
  state: {
    activities: [],
    error: null,
  },
  reducers: {
    request(state) {
      return { ...state, loading: true };
    },
    success(state, activity) {
      return { ...state, loading: false, activities: [...state.activities, activity] };
    },
    failure(state, error) {
      return { ...state, loading: false, error };
    },
  },
  effects: {
    async saveActivity(activity) {
      this.request();
      const response = await saveActivity(activity);
      if (response.ok) this.success(response.data);
      else this.failure(response.error);
    },
  },
};

export default activities;
