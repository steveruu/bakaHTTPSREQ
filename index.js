const dotenv = require('dotenv').config();
const axios = require('axios');

let refresh = process.env.REFRESH_TOKEN;
let bakaURL = "https://bakalar.pslib.cz/rodice";

let accessToken;
const data = `client_id=ANDR&grant_type=refresh_token&refresh_token=${refresh}`;

axios.post(`${bakaURL}/api/login`, data, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(response => {
  console.log(response.data);
  accessToken = response.data.access_token;
})
.catch(error => {
  console.log(error.response.status, error.response.data);
});

axios.get(`${bakaURL}/api/3/timetable/permanent`, data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error.response.status, error.response.data);
  });
  