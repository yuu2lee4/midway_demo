import { provide } from 'midway';
import BaseService from './base';

@provide()
export default class TestService extends BaseService {
  getModelName() {
    return 'user';
  }
}
