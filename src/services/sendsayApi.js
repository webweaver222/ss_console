export default class SendSayApi {

    _url = 'https://api.sendsay.ru'
    

    get = async(url) => {

      return fetch(this._base + url, {
          method: 'get',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
      })
  }  

    authentication = async (req, url = this._url) => {
         return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: this.getRequestBody(req)
        })
    }

    try_pong = async (session) => {
      return fetch(this._url , {
        method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: this.getRequestBody({
              session,
              action: "pong",
            })
      })
    }

    logout = async (session) => {
      return fetch(this._url , {
        method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: this.getRequestBody({
              session,
              action: "logout",
            })
      })
    }


    getRequestBody(req) {
      let requestBody = `apiversion=100&json=1`;
  
      requestBody += `&request=${encodeURIComponent(this.getRequestData(req))}`;
      //requestBody += `&request.id=${encodeURIComponent(this.getRequestId())}`;
  
      return requestBody;
    }
  
    getRequestData(req) {
      const finalReq = { ...req };
  
      /*if (this.apiKey) {
        finalReq.apikey = this.apiKey;
      } else if (this.session) {
        finalReq.session = this.session;
      }
  
      if (this.policy) {
        finalReq['lbac.policy'] = this.policy;
      }*/
  
      return JSON.stringify(finalReq);
    }
}