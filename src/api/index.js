import { create } from 'apisauce';

const api = create({
  baseURL: 'https://puc-asd-iot.azurewebsites.net/api/',
});

const getDevices = () =>
  api.get('dispositivos?code=Pp7JQpNXF4C0s1fFKkZcC8rNbUlmBcy6FaDJZW5igwsaOPsmvNIppg==');

const saveActivity = data =>
  api.post('atividades?code=Dqjak9ouLgAhPOHstbzk6Ycul7yS1mwJ0nnc5TIqOlzRuLAjyY64lA==', data);

export { getDevices, saveActivity };

export default api;
