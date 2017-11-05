// JS Goes here - ES6 supported

import axios from 'axios';
import SiteDrawer from './site/siteDrawer';

console.log('----------------------------------------');
console.log('App has loaded');
console.log('----------------------------------------');

SiteDrawer();

var el = $('#fivehundred');

/*axios.get('https://api.500px.com/v1/photos', {
    params: {
      feature: "user",
      username: "twonewnatives",
      consumer_key: "RgAZO3RwsFWdy1eNCnwiC5JaSBxTFypd3cvVbVMl"
    }
  })
  .then(function (response) {
    console.log(response);
    for (let photo in response.data.photos) {
      el.append('<img src="' + response.data.photos[photo].image_url + '" />');
    }
  })
  .catch(function (error) {
    console.log(error);
  });*/

  const user_id = "19709765",
        gallery_id = "cedar-creek";

/* axios.get('https://api.500px.com/v1/users/' + user_id + '/galleries/' + gallery_id + '/items', {
      params: {
        //user_id: "19709765",
        //gallery_id: "cedar-creek",
        image_size: 4,
        consumer_key: "RgAZO3RwsFWdy1eNCnwiC5JaSBxTFypd3cvVbVMl"
      }
    })
    .then(function (response) {
      console.log(response);
      for (var photo in response.data.photos) {
        el.append('<img src="' + response.data.photos[photo].image_url + '" />');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
*/
