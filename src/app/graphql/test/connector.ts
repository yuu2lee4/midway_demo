
import { inject } from 'midway';

export default class TempConnector {
  @inject('cityService')
  service;
  async test1() {
    return this.service.getModelName();
  }
}
