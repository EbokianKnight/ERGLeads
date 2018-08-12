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

async function simpleFetch (url, options) {
  let promise = fetch(new Request(url, options));
  let response = await promise;
  console.log('SIMPLE', response);
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

export const queryString = (params) => {
  const keys = Object.keys(params)
  let strings = []
  keys.forEach((k, i) => {
    if (Array.isArray(params[k])) {
      params[k].forEach(p => strings.push(`${k}[]=${p}`))
    } else {
      strings.push(`${k}=${params[k]}`)
    }
  })
  return strings.join('&')
}

class RestApi {
  constructor(base_url, opts) {
    this.base_url = base_url;
    this.opts = opts || {};
  }

  get(id = null, data = null, skipFetch = false) {
    const url = `${this.base_url}${ id ? '/' + id : ''}`;
    const query = data ? `?${queryString(data)}` : ''
    if (skipFetch) return simpleFetch(url + query, buildRequest(this.opts));
    return fetchAsync(url + query, buildRequest(this.opts));
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
