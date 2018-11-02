
import { inject } from 'midway';

export default class TempConnector {
  @inject('cityService')
  service;
  async notCallService() {
    return 'notCallService is ok';
  }
  async callService() {
    return this.service.test();
  }
}
