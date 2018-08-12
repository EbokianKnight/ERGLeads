import 'babel-polyfill'
// Private API
async function fetchAsync (url, options) {
  // await response of fetch call
  let response = await fetch(new Request(url, options));
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  if (/^2\d\d$/.test(response.status)) return data;
  throw(data)
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
  constructor(base_url, opts) {
    this.base_url = base_url;
    this.opts = opts || {};
  }

  get(id = null) {
    const url = `${this.base_url}${ id ? '/' + id : ''}`;
    return fetchAsync(url, buildRequest(this.opts));
  }

  put(id, data = {}) {
    const url = `${this.base_url}/${id}`;
    return fetchAsync(url, buildRequest({
      method: 'PUT',
      body: JSON.stringify(data),
      ...this.opts
    }));
  }

  patch(id, data = {}) {
    const url = `${this.base_url}/${id}`;
    return fetchAsync(url, buildRequest({
      method: 'PATCH',
      body: JSON.stringify(data),
      ...this.opts
    }));
  }

  post(data = {}) {
    const url = `${this.base_url}`;
    return fetchAsync(url, buildRequest({
      method: 'POST',
      body: JSON.stringify(data),
      ...this.opts
    }));
  }

  delete(id) {
    const url = `${this.base_url}/${id}`;
    return fetchAsync(url, buildRequest({ method: 'DELETE', ...this.opts }));
  }

};

// Public API
 export default RestApi
