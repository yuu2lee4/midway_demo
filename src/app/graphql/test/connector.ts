
import { inject } from 'midway';

export default class TempConnector {
  @inject('cityService')
  service;
  async test1() {
    return '123123';
    // return this.service.getModelName();
  }
}
