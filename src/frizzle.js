'use strict';

import request from 'superagent';
import xml2js from 'xml2js';

const ENDPOINT = 'http://webservices.nextbus.com/service/publicXMLFeed';

class Frizzle {
    constructor(agency = 'sf-muni') {
        this.agency = agency;
    }

    setAgency(agency) {
      this.agency = agency;
    }

    agencies() {
      return this.request('agencyList');
    }

    routes() {
      return this.request('routeList');
    }

    route(routeTag) {
      if (!routeTag) {
        return false;
      }
      return this.request('routeConfig', { r: routeTag });
    }

    predictions(params) {
      if (!params || !params.route || !params.stop) {
        return false;
      }
      return this.request('predictions', { r: params.route, s: params.stop });
    }

    request(command, params = {}) {
        return new Promise((resolve, reject) => {
            request
                .get(ENDPOINT)
                .set('Content-type', 'text/plain')
                .query(Object.assign({ command, a: this.agency }, params))
                .end((error, result) => {
                    if (error) {
                        reject(new Error(error));
                    } else {
                        const parser = new xml2js.Parser();
                        parser.parseString(result.text, (error, result) => {
                            if (error) {
                                reject(new Error(error));
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
        });
    }
}

export default Frizzle;
