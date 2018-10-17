import { controller, get, inject, provide, post, del } from 'midway';

@provide()
@controller('/city')
export class CityController {
  @inject('cityService')
  service;
  /**
   *
   * @api {get} /city/:id 获取城市信息
   * @apiName getCity
   * @apiGroup city
   * @apiVersion  0.1.0
   *
   * @apiParam  {Number} id 城市ID
   *
   * @apiSuccess (200) {Number} id 城市ID
   *
   * @apiSuccess (200) {String} name 城市名
   *
   * @apiSuccess (200) {Float} lat 经度
   *
   * @apiSuccess (200) {Float} lng 纬度
   *
   * @apiSuccess (200) {String} summary 城市介绍
   *
   */
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
