import 'babel-polyfill'
// Private API
async function fetchAsync(url, request) {
  try {
    console.log('REQUEST', url, request)
    const response = await fetch(url, request)
    return response.json();;
  } catch (json) {
    console.log("SOMETHING WENT WRONG:", json)
  }
}

const buildRequest = (opts = {}) => {
  return {
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
    method: 'GET',
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
    ...opts
  }
}

class RestApi {
  constructor(base_url) {
    this.base_url = base_url;
  }

  get(id = null) {
    const url = `${this.base_url}${ id ? '/' + id : ''}`;
    return fetchAsync(url, buildRequest());
  }

  put(id, data = {}) {
    const url = `${this.base_url}/${id}`;
    return fetchAsync(url, buildRequest({ method: 'PUT', data }));
  }

  patch(id, data = {}) {
    const url = `${this.base_url}/${id}`;
    return fetchAsync(url, buildRequest({ method: 'PATCH', data }));
  }

  post(data = {}) {
    const url = `${this.base_url}`;
    return fetchAsync(url, buildRequest({ method: 'POST', data }));
  }

  delete(id) {
    const url = `${this.base_url}/${id}`;
    return fetchAsync(url, buildRequest({ method: 'DELETE' }));
  }

};

// Public API
 export default RestApi
