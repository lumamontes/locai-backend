const axios = require('axios');
const crypto = require('crypto');

const gererate = function () {
    return crypto.randomBytes(20).toString('hex');
}

test('Shoud get imobbiles', async function () {
})