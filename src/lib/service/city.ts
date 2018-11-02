import { provide } from 'midway';
import BaseService from './base';

@provide()
export default class CityService extends BaseService {
  getModelName() {
    return 'city';
  }
  async test() {
    return 'callService is ok';
  }
}
