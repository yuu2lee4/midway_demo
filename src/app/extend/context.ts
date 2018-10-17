import { Context } from 'egg';

const SYMBOL_CONNECTOR: any = Symbol('connector');

export default {

    /**
     * connector instance
     * @member Context#connector
     */
    get connector(this: Context) {
      /* istanbul ignore else */
      if (!this[SYMBOL_CONNECTOR]) {
        const connectors = {};
        for (const [type, clazz] of this.app.connectorClass) {
          connectors[type] = new clazz(this);
        }
        this[SYMBOL_CONNECTOR] = connectors;
      }
      return this[SYMBOL_CONNECTOR];
    },
};
