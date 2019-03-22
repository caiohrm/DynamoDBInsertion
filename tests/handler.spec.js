require('dotenv').config();
const handler = require('../handler').insert;
const recuperar = require('../handler').recuperar;
const update = require('../handler').update;
const deletar = require('../handler').delete;

describe('TDD CRUD operations with DynamoDB', () => {
    const event = {};
    const context = {};
    let resp = {};
    it('Test: must insert item into database', (done) => {
        const callback = (ctx, data) => {
            resp = data;
            expect(resp.statusCode).toBe(200)
            done();
        };
        handler(event,context,callback)
    });

    it('Test: must retrieve item from database', (done) => {
        const callback = (ctx, data) => {
            resp = data;
            expect(resp.statusCode).toBe(200)
            expect(JSON.parse(resp.body)).toHaveProperty('Item');
            done();
        };
        recuperar(event,context,callback)
    });

    it('Test: must update item from database', (done) => {
        const callback = (ctx, data) => {
            resp = data;
            expect(resp.statusCode).toBe(200)
            expect(JSON.parse(resp.body)).toHaveProperty('Attributes.sobrenome');
            done();
        };
        update(event,context,callback)
    });

    it('Test: must delete item from database', (done) => {
        const callback = (ctx, data) => {
            resp = data;
            expect(resp.statusCode).toBe(200)
            done();
        };
        deletar(event,context,callback)
    });
});