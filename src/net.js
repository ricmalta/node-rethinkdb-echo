export async function xhr(opt) {
  const {
    uri = '/api/v1/messages/',
    method = 'GET',
    data,
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  } = opt;
  const authorization = null;
  // set the authorization header
  if (authorization) {
    headers.Authorization = authorization;
  }
  // HACK:
  // if (api.headers && api.headers.authorization) {
  //   headers.Authorization = api.headers.authorization;
  // }
  const options = {
    method,
    mode: 'cors',
    headers: typeof Headers === 'undefined' ? headers : new Headers(headers),
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  let url = `${process.env.NODE_ENV === 'development' ? '//localhost:9700' : ''}${uri}`;
  // start request
  return fetch(url, options)
    .then(res => {
      if (res.status === 204) {
        return '';
      }
      if (res.ok) {
        return res.json();
      }
      console.log({
        ok: res.ok,
        status: res.status,
      });
      return null;
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}

export { xhr as default };