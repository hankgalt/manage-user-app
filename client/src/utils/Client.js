import axios from 'axios';
import { SockJS } from 'sockjs-client';
import { Stomp } from 'stompjs';

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

function register(registrations) {
  let socket = SockJS('/users') 
  let stompClient = Stomp.over(socket)
  stompClient.connect({}, () = frame => {
    for (let registration of registrations) {
      console.log(registration);
      stompClient.subscribe(registration.route, registration.callback);
    }
  });
}

export default {
  JWToken,
  token,
  api,
  signup,
  register
};