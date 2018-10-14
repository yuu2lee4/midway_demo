import { plugin } from 'midway';
import * as SqlString from 'sqlstring';

export default abstract class BaseService {
  model: string;
  @plugin('mysql')
  database;
  constructor() {
    this.model = this.getModelName();
  }
  abstract getModelName(): string;
  success(result) {
    return {
      success: true,
      result,
    };
  }

  fail(message) {
    return {
      success: false,
      message,
    };
  }

  async index(params) {

    return this.findByPage(params);
  }

  async show(id) {
    return this.database.get(this.model, { id });
  }

  async update(params, options) {
    return this.database.update(this.model, params, options);
  }

  async create(record): Promise<any> {
    if (!record) { return; }
    const result = await this.database.insert(this.model, record);
    return { id: result.insertId };
  }

  async insertOrUpdate(rows, options: any = {}) {
    if (!Array.isArray(rows)) {
      rows = [rows];
    }
    if (!options.columns) {
      options.columns = Object.keys(rows[0]);
    }

    const params = [this.model, options.columns];
    const strs: string[] = [];
    for (const row of rows) {
      const values: any = [];
      for (const column of options.columns) {
        if (column in row) {
          values.push(row[column]);
        } else {
          values.push('');
        }
      }
      strs.push('(?)');
      params.push(values);
    }

    if (!options.update) {
      options.update = options.columns;
    }
    const sets: string[] = [];
    const values: string[] = [];
    for (const column of options.update) {
      sets.push('?? = VALUES(?)');
      values.push(column, SqlString.raw(column));
    }

    let sql = this.database.format('INSERT INTO ??(??) VALUES' + strs.join(', '), params);
    sql += ' ON DUPLICATE KEY UPDATE ';
    sql += this.database.format(sets.join(', '), values);
    return this.database.query(sql);
  }

  async destroy(id) {
    return this.remove({ id });
  }

  async count(query) {
    return this.database.count(this.model, query);
  }

  async findOne(query) {
    return this.database.get(this.model, query);
  }

  async find(query) {
    return this.database.select(this.model, query);
  }

  async findByPage({ where, columns, orders, pagin = { page: 1, pageSize: 10 } }) {
    const query = { where, columns, orders, limit: 1, offset: 1 };
    const page = Number(pagin.page || 1);
    const pageSize = Number(pagin.pageSize || 10);
    const from = (page - 1) * pageSize;
    query.limit = pageSize;
    query.offset = from;

    const allPromises = [this.count(where), this.find(query)];

    const [count, content] = await Promise.all(allPromises);
    const result = {
      count,
      page,
      pageSize,
      content,
    };
    return result;
  }

  async remove(query) {
    return this.database.delete(this.model, query);
  }
}
