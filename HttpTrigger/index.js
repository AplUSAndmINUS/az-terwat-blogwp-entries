const axios = require('axios');

const getEntries = require('../index');
const writeBlobStorage = require('blobStorage.js');
const URL = 'https://terencewaters.com/aplusandminus/wp-json/wp/v2/posts?per_page=100';
console.log('testing');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const blogData = getEntries();

    context.res = {
        status: 200, /* Defaults to 200 */
        blogData
    };

    writeBlobStorage(context, req);
}
