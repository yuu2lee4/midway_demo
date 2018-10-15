import { controller, get, provide, inject } from 'midway';

@provide()
@controller('/')
export class HomeController {
  @inject('cityService')
  testS;

  @get('/')
  async index(ctx) {
    ctx.body = `Welcome to midwayjs!`;
  }
  @get('/test')
  async test(ctx) {
    const res = await this.testS.test();
    ctx.body = {success: true, message: 'OK', data: res};
  }
}
