const axios = require('axios');
const URL = 'https://terencewaters.com/aplusandminus/wp-json/wp/v2/posts?per_page=100';

console.log('testing');

const getEntries = () => {
  axios.get(URL)
    .then(response => {
      const posts = response.data;
      const data = posts.map(post => ({
        title: post.title.rendered,
        image: post.featured_image_src,
        body: post.content.rendered,
        description: post.excerpt.rendered,
        author: post.author_name,
        tags: post.tags,
        date: post.date
      }));
  
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = getEntries;