
import axios from 'axios';
import { CONSTANTS } from '../constants';

export class IncidentService {
  
  getIncident(params) {
    return axios.get(CONSTANTS.API_URL + '?' + new URLSearchParams(params))
  }

  getIncidentDetail(id) {
    return axios.get(CONSTANTS.API_URL + '/' + id)
  }
}