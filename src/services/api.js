class RequestApi {
  _url;

  constructor() {
    this._url = "";
  }

  prepareRequest(method, url) {
    this.setUrl(url);

    switch (method) {
      case "GET": {
        return async (headers) => await this.get(headers);
      }

      case "POST": {
        return async (headers, body) => await this.post(headers, body);
      }
    }
  }

  setUrl(string) {
    this._url = string;
  }

  get(headers) {
    return fetch(this._url, { method: "get", headers });
  }

  post(headers, body) {
    console.log(typeof body);
    return fetch(this._url, {
      method: "post",
      body: JSON.stringify(body),
      headers,
    });
  }
}

export default RequestApi;
