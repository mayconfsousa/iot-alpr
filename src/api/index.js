import { create } from 'apisauce';

const api = create({
  baseURL: 'https://puc-asd-iot.azurewebsites.net/api/',
});

const DEVICES_API_CODE = 'Pp7JQpNXF4C0s1fFKkZcC8rNbUlmBcy6FaDJZW5igwsaOPsmvNIppg==';
const ACTIVITIES_API_CODE = 'Dqjak9ouLgAhPOHstbzk6Ycul7yS1mwJ0nnc5TIqOlzRuLAjyY64lA==';

const getDevices = () => api.get(`dispositivos?code=${DEVICES_API_CODE}`);

const saveActivity = data => api.post(`atividades?code=${ACTIVITIES_API_CODE}`, data);

export { getDevices, saveActivity };
