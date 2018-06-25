import axios from 'axios';

function JWToken() {
  return Promise.resolve(localStorage.getItem("jwt"))
}

function api(url, options) {
  let authOptions = Object.assign({ url: url, method: 'GET' }, options)

  return JWToken().then(jwtToken => {
    if (jwtToken === '') {
      return Promise.reject(Error('Missing auth-token, needs login'))
    } else { 
      return axios(Object.assign(authOptions, { headers: { 'Authorization': "Bearer " + jwtToken } }))
    }
  }).catch(error => {
    return Promise.reject(error)
  })
}

function signup(data) {
  let authOptions = {
    method: 'POST',
    url: '/api/v1/users/sign_up',
    data: data,
    json: true
  };

  return axios(authOptions).catch(error => {
    return Promise.reject(error)
  })
}

function token(authData) {
  let authOptions = {
    method: 'POST',
    url: '/api/v1/user_token',
    data: authData,
    json: true
  };

  return axios(authOptions).then(response => {
    localStorage.setItem("jwt", response.data.jwt)
    return Promise.resolve(response.data.jwt)
  }).catch(error => {
    return Promise.reject(error)
  })
}

export default {
  JWToken,
  token,
  api,
  signup
};