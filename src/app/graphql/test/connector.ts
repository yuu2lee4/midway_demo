export default class TestConnector {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    async test() {
        return '111';
    }
}
