import { controller, get, inject, provide, post, del } from 'midway';

@provide()
@controller('/city')
export class CityController {
  @inject('cityService')
  service;

  @get('/:id')
  async get(ctx): Promise<void> {
    const id: number = ctx.params.id;
    const res = await this.service.findOne({id});
    ctx.body = { code: 0, data: res };
  }
  @post()
  async save(ctx): Promise<void> {
    await this.service.insertOrUpdate(ctx.request.body);
    ctx.body = { code: 0, data: true };
  }
  @del('/:id')
  async remove(ctx): Promise<void> {
    await this.service.destroy(ctx.params.id);
    ctx.body = { code: 0, data: true };
  }
}
